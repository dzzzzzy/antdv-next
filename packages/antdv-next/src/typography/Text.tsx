import type { SlotsType } from 'vue'
import type { BlockProps, EllipsisConfig, TypographyBaseEmits, TypographySlots } from './interface'
import { omit } from 'es-toolkit'
import { computed, defineComponent } from 'vue'
import Base from './Base'

export interface TextProps extends BlockProps {
  ellipsis?: boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>
}

const Text = defineComponent<
  TextProps,
  TypographyBaseEmits,
  string,
  SlotsType<TypographySlots>
>({
  name: 'ATypographyText',
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
    const mergedEllipsis = computed(() => {
      const ellipsis = props.ellipsis
      if (ellipsis && typeof ellipsis === 'object') {
        return omit(ellipsis as EllipsisConfig, ['expandable', 'rows'])
      }
      return ellipsis
    })

    const listeners = {
      'onClick': (e: MouseEvent) => emit('click', e),
      'onCopy': (e?: MouseEvent) => emit('copy', e as any),
      'onExpand': (expanded: boolean, e: MouseEvent) => emit('expand', expanded, e),
      'onEditStart': () => emit('edit:start'),
      'onEditChange': (val: string) => emit('edit:change', val),
      'onEditCancel': () => emit('edit:cancel'),
      'onEditEnd': () => emit('edit:end'),
      'onUpdate:expanded': (val: boolean) => emit('update:expanded', val),
      'onUpdate:editing': (val: boolean) => emit('update:editing', val),
    }

    return () => {
      const restAttrs = omit(attrs as any, [
        'onClick',
        'onCopy',
        'onExpand',
        'onEditStart',
        'onEditChange',
        'onEditCancel',
        'onEditEnd',
        'onUpdate:expanded',
        'onUpdate:editing',
      ])
      return (
        <Base
          {...(restAttrs as any)}
          {...props}
          ellipsis={mergedEllipsis.value as any}
          component="span"
          v-slots={slots}
          {...listeners}
        />
      )
    }
  },
})

export default Text
