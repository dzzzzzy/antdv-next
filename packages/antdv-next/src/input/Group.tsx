import type { SlotsType } from 'vue'
import type { EmptyEmit } from '../_util/type.ts'
import type { ComponentBaseProps } from '../config-provider/context'
import type { SizeType } from '../config-provider/SizeContext.tsx'
import { clsx } from '@v-c/util'
import { computed, defineComponent } from 'vue'
import { getAttrStyleAndClass } from '../_util/hooks'
import { devUseWarning, isDev } from '../_util/warning'
import { useComponentBaseConfig } from '../config-provider/context'
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls'
import { useFormItemInputContext, useFormItemInputContextProvider } from '../form/context.tsx'
import { SpaceCompact } from '../space'
import useStyle, { useSharedStyle } from './style'

export interface InputGroupProps extends ComponentBaseProps {
  size?: SizeType
}

const InputGroup = defineComponent<
  InputGroupProps,
  EmptyEmit,
  string,
  SlotsType<{ default?: () => any }>
>(
  (props, { slots, attrs }) => {
    if (isDev) {
      const warning = devUseWarning('Input.Group')
      warning.deprecated(false, 'Input.Group', 'Space.Compact')
    }

    const { getPrefixCls, direction } = useComponentBaseConfig('input', props)
    const prefixCls = computed(() => getPrefixCls('input-group', props.prefixCls))
    const rootCls = useCSSVarCls(prefixCls)
    const [hashId, cssVarCls] = useSharedStyle(prefixCls, computed(() => props.rootClass))
    useStyle(prefixCls, rootCls)

    const formItemContext = useFormItemInputContext()
    const groupFormContext = computed(() => ({
      ...formItemContext.value,
      isFormItemInput: false,
    }))
    useFormItemInputContextProvider(groupFormContext)

    const { style, restAttrs } = getAttrStyleAndClass(attrs)

    const cls = clsx(
      prefixCls.value,
      cssVarCls.value,
      hashId.value,
      {
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [`${prefixCls.value}-lg`]: props.size === 'large',
        [`${prefixCls.value}-sm`]: props.size === 'small',
        [`${prefixCls.value}-compact`]: true,
      },
      props.rootClass,
      (attrs as any).class,
    )

    return (
      <SpaceCompact
        {...restAttrs}
        class={cls}
        style={style}
        size={props.size}
      >
        {slots.default?.()}
      </SpaceCompact>
    ) as any
  },
  {
    name: 'AInputGroup',
    inheritAttrs: false,
  },
)

export default InputGroup
