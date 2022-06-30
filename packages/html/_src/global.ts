/**
 * Ensure types are in scope
 */
import "@effect/core"
import "@tsplus/stdlib/collections/mutable/Array"

/**
 * @tsplus global
 */
import { identity, Lazy, LazyArg } from "@tsplus/stdlib/data/Function"
/**
 * @tsplus global
 */
import { Maybe } from "@tsplus/stdlib/data/Maybe"
/**
 * @tsplus global
 */
import { Hash } from "@tsplus/stdlib/structure/Hash"
/**
 * @tsplus global
 */
import { Equals } from "@tsplus/stdlib/structure/Equals"
/**
 * @tsplus global
 */
import { HashMap } from "@tsplus/stdlib/collections/HashMap"
/**
 * @tsplus global
 */
import { Tuple } from "@tsplus/stdlib/data/Tuple"
/**
 * @tsplus global
 */
import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"
/**
 * @tsplus global
 */
import { Chunk } from "@tsplus/stdlib/collections/Chunk"
/**
 * @tsplus global
 */
import { Ref } from "@effect/core/io/Ref"
/**
 * @tsplus global
 */
import { SubscriptionRef } from "@effect/core/stream/SubscriptionRef"
/**
 * @tsplus global
 */
import { Fiber } from "@effect/core/io/Fiber"
/**
 * @tsplus global
 */
import { FiberRef } from "@effect/core/io/FiberRef"
/**
 * @tsplus global
 */
import { Stream } from "@effect/core/stream/Stream"
/**
 * @tsplus global
 */
import { Effect } from "@effect/core/io/Effect"
/**
 * @tsplus global
 */
import { Tag } from "@tsplus/stdlib/service/Tag"
/**
 * @tsplus global
 */
import { Env } from "@tsplus/stdlib/service/Env"
/**
 * @tsplus global
 */
import { WeakCache } from "@effect/html/io/WeakCache"
/**
 * @tsplus global
 */
import { ComponentCache } from "@effect/html/io/ComponentCache"
/**
 * @tsplus global
 */
import { TemplateCache } from "@effect/html/io/TemplateCache"
/**
 * @tsplus global
 */
import { Component } from "@effect/html/data/Component"
/**
 * @tsplus global
 */
import { Hole } from "@effect/html/data/Hole"
/**
 * @tsplus global
 */
import { ElementRef } from "@effect/html/data/ElementRef"
/**
 * @tsplus global
 */
import { Collection } from "@effect/html/data/Collection"
/**
 * @tsplus global
 */
import { Many } from "@effect/html/data/Many"
/**
 * @tsplus global
 */
import { Placeholder } from "@effect/html/data/Placeholder"
/**
 * @tsplus global
 */
import { Entry } from "@effect/html/data/Entry"
/**
 * @tsplus global
 */
import { Template } from "@effect/html/data/Template"
/**
 * @tsplus global
 */
import { Wire } from "@effect/html/data/Wire"
/**
 * @tsplus global
 */
import { afterRender, withHooks } from "@effect/html/io/Hooks"
