// both `html` and `svg` template literal tags are polluted
// with a `for(ref[, id])` and a `node` tag too
interface Tag {
  <A extends Array<Placeholder<any>>>(
    template: TemplateStringsArray,
    ...values: A
  ): Effect<Placeholder.Env<A>, never, Interpolation>
  for(
    ref: object,
    id: unknown
  ): <A extends Array<Placeholder<any>>>(
    template: TemplateStringsArray,
    ...placeholders: A
  ) => Effect<Placeholder.Env<A>, never, Node | Wire>
  node: <A extends Array<Placeholder<any>>>(
    template: TemplateStringsArray,
    ...values: A
  ) => Effect<
    Placeholder.Env<A>,
    Template.InvalidElementException | Template.MissingNodeException,
    Node
  >
}

function tag(
  type: "html" | "svg"
): Tag {
  const keyed = WeakCache.empty<
    object,
    HashMap<
      unknown,
      <A extends Array<Placeholder<any>>>(
        type: "html" | "svg",
        template: TemplateStringsArray,
        placeholders: A
      ) => Effect<Placeholder.Env<A>, never, Wire | Node>
    >
  >()

  return Object.assign(
    // non keyed operations are recognized as instance of Portal
    // during the "unroll", recursively resolved and updated
    <A extends Array<Placeholder<any>>>(
      template: TemplateStringsArray,
      ...placeholders: A
    ): Effect<Placeholder.Env<A>, never, Interpolation> =>
      Many.from(placeholders).map((values) => Interpolation(type, template, values)),
    {
      // keyed operations need a reference object, usually the parent node
      // which is showing keyed results, and optionally a unique id per each
      // related node, handy with JSON results and mutable list of objects
      // that usually carry a unique identifier
      for(
        ref: object,
        id: unknown
      ) {
        return <A extends Array<Placeholder<any>>>(
          template: TemplateStringsArray,
          ...placeholders: A
        ): Effect<Placeholder.Env<A>, never, Node | Wire> => {
          const memo = keyed.getOrElse(ref, keyed.set(ref, HashMap.empty()))
          const fixed = memo.get(id).getOrElse(() => {
            const portal = Portal.empty()

            return keyed.set(ref, memo.set(id, portal.fixed)).unsafeGet(id)
          })

          return fixed(type, template, placeholders)
        }
      },
      // it is possible to create one-off content out of the box via node tag
      // this might return the single created node, or a portal with all
      // nodes present at the root level and, of course, their placeholder nodes
      node: <A extends Array<Placeholder<any>>>(
        template: TemplateStringsArray,
        ...placeholders: A
      ): Effect<Placeholder.Env<A>, never, Node> =>
        Many.from(placeholders).map((values) => Interpolation(type, template, values))
          .map((interpolation) => {
            const portal = Portal.empty()
            const wireOrNode = portal.unroll(interpolation)

            return Wire.isWire(wireOrNode) ? wireOrNode.valueOf : wireOrNode.valueOf() as Node
          })
    }
  )
}

// rendering means understanding what `html` or `svg` tags returned
// and it relates a specific node to its own unique cache.
// Each time the content to render changes, the node is cleaned up
// and the new new content is appended, and if such content is a Portal
// then it's "unrolled" to resolve all its inner nodes.
export function render<A extends Element, R, E>(
  where: A,
  fa: Effect<R, E, Interpolation | Node>
) {
  return withHooks(
    fa,
    (interpolation) =>
      Effect.succeed(() => {
        const portal = PortalCache.getOrElse(where, PortalCache.set(where, Portal.empty()))
        const wire = Interpolation.isInterpolation(interpolation) ? portal.unroll(interpolation) : interpolation

        if (wire !== portal.wire) {
          portal.setWire(wire)

          return where.replaceChildren(
            Wire.isWire(wire) ?
              wire.valueOf :
              wire.valueOf() as Node
          )
        }

        return where
      })
  )
}

export const html = tag("html")
export const svg = tag("svg")

export function bootstrap<E, A>(fa: Effect<never, E, A>): Promise<A> {
  return fa.tapErrorTrace((trace) => Effect.succeed(() => console.error(trace.stackTrace))).unsafeRunPromise()
}
