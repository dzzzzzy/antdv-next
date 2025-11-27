import type { SlotsType } from 'vue'
import type { EmptyEmit } from '../_util/type'
import type { TypographyBaseProps, TypographySlots } from './interface'
import { classNames } from '@v-c/util'
import { defineComponent, resolveDynamicComponent, shallowRef } from 'vue'
import { getAttrStyleAndClass } from '../_util/hooks'
import { toPropsRefs } from '../_util/tools.ts'
import { useComponentBaseConfig } from '../config-provider/context'
import useStyle from './style'

export default defineComponent<
  TypographyBaseProps,
  EmptyEmit,
  string,
  SlotsType<TypographySlots>
>({
  name: 'ATypography',
  inheritAttrs: false,
  setup(props, { slots, attrs, expose }) {
    const {
      direction: contextDirection,
      prefixCls,
      style: contextStyle,
      class: contextClassName,
    } = useComponentBaseConfig('typography', props)
    const { direction: typographyDirection } = toPropsRefs(props, 'direction')
    const [hashId, cssVarCls] = useStyle(prefixCls)
    const elementRef = shallowRef<HTMLElement>()
    expose({ el: elementRef })

    return () => {
      const { rootClass } = props
      const Component = resolveDynamicComponent((props.component || 'article')) as any
      const direction = typographyDirection.value || contextDirection.value
      const { className, restAttrs, style } = getAttrStyleAndClass(attrs)
      const componentClassName = classNames(
        prefixCls.value,
        contextClassName.value,
        {
          [`${prefixCls.value}-rtl`]: direction === 'rtl',
        },
        rootClass,
        className,
        hashId.value,
        cssVarCls.value,
      )

      const mergedStyle: any = {
        ...contextStyle.value,
        ...style,
      }

      return (
        <Component
          class={componentClassName}
          style={mergedStyle}
          ref={elementRef}
          {...restAttrs}
        >
          {slots.default?.()}
        </Component>
      )
    }
  },
})
