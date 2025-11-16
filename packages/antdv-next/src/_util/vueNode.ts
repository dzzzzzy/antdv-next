import type { VNodeChild } from 'vue'
import type { AnyObject, VueNode } from './type.ts'
import { isFragment } from '@v-c/util/dist/Children/isFragment'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { cloneVNode, Fragment, h, isVNode } from 'vue'

export {
  isFragment,
}

type RenderProps = AnyObject | ((originProps: AnyObject) => AnyObject | undefined)

export function replaceElement(element: VNodeChild, replacement: VNodeChild, props?: RenderProps) {
  if (!isVNode(element)) {
    return replacement
  }
  return cloneVNode(element, typeof props === 'function' ? props(element.props || {}) : props)
}

export function cloneElement(element: VNodeChild, props?: RenderProps) {
  return replaceElement(element, element, props)
}

export function getVNode(node: VueNode) {
  if (typeof node === 'function') {
    return node?.()
  }
  return node
}

export function checkRenderNode(node: any) {
  if (!node) {
    return undefined
  }
  const child = Array.isArray(node) ? node : [node]
  const pureChild = filterEmpty(child)
  if (pureChild.length > 0) {
    if (pureChild.length === 1) {
      return pureChild[0]
    }
    else {
      return h(Fragment, null, pureChild)
    }
  }

  return undefined
}
