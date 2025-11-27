import type { SlotsType } from 'vue'
import type { BlockProps, TypographyBaseEmits, TypographySlots } from './interface'
import { omit } from 'es-toolkit'
import { computed, defineComponent } from 'vue'
import { devUseWarning, isDev } from '../_util/warning'
import Base from './Base'

export interface LinkProps extends BlockProps {
  ellipsis?: boolean
  href?: string
  target?: string
  rel?: string
}

const Link = defineComponent<
  LinkProps,
  TypographyBaseEmits,
  string,
  SlotsType<TypographySlots>
>({
  name: 'ATypographyLink',
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
    if (isDev) {
      const warning = devUseWarning('Typography.Link')
      warning(typeof props.ellipsis !== 'object', 'usage', '`ellipsis` only supports boolean value.')
    }

    const mergedProps = computed(() => {
      const rel = props.rel === undefined && (props.target || (attrs as any).target) === '_blank'
        ? 'noopener noreferrer'
        : props.rel

      return {
        ...props,
        rel,
      }
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

    const restAttrs = computed(() => omit(attrs as any, [
      'onClick',
      'onCopy',
      'onExpand',
      'onEditStart',
      'onEditChange',
      'onEditCancel',
      'onEditEnd',
      'onUpdate:expanded',
      'onUpdate:editing',
    ]))

    return () => (
      <Base
        {...(restAttrs.value as any)}
        {...mergedProps.value}
        ellipsis={!!props.ellipsis}
        component="a"
        v-slots={slots}
        {...listeners}
      />
    )
  },
})

export default Link
