import type { VNode, VNodeChild } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

export type AnyObject = Record<PropertyKey, any>

export type EmptyObject = Record<never, never>

export type RenderNodeFn<Args extends any[] = any[]> = (...args: Args) => VNodeChild

export type VueNode<Args extends any[] = any[]> = RenderNodeFn<Args> | JSX.Element | boolean | string | number | null | undefined | VNode

export type EmitsArrToEvent<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends any[] ? (...args: T[K]) => void : T[K]
}

export type EmitsType<T extends Record<string, any>> = EmitsArrToEvent<T> & {
  [key: string]: (...args: any[]) => void
}

export interface EmptyEmit {
  [key: string]: (...args: any[]) => void
}
export type SlotsDefineType<T extends Record<string, any> = Record<string, any>> = {
  default?: () => any
} & T

export type ValidChar
  = | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z'
