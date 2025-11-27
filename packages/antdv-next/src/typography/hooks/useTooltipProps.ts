import type { TooltipProps } from '../../tooltip'
import { computed, isVNode, unref } from 'vue'

function useTooltipProps(tooltip: any, editConfigText: any, children: any) {
  return computed<TooltipProps | undefined>(() => {
    const mergedTooltip = unref(tooltip)
    const mergedEditText = unref(editConfigText)
    const mergedChildren = unref(children)

    if (mergedTooltip === true) {
      return { title: mergedEditText ?? mergedChildren }
    }
    if (isVNode(mergedTooltip)) {
      return { title: mergedTooltip }
    }
    if (typeof mergedTooltip === 'object') {
      return { title: mergedEditText ?? mergedChildren, ...(mergedTooltip as TooltipProps) }
    }
    if (mergedTooltip === undefined || mergedTooltip === null) {
      return { title: mergedTooltip as any }
    }
    return { title: mergedTooltip as any }
  })
}

export default useTooltipProps
