import type { Ref } from 'vue'
import type { Variant } from '../../config-provider/context'
import { computed } from 'vue'
import { useConfig, Variants } from '../../config-provider/context'
import { useVariantContext } from '../context.tsx'

type VariantComponent = 'input' | 'textArea' | 'inputSearch' | 'otp'

export default function useVariant(
  component: VariantComponent,
  variant?: Ref<Variant | undefined>,
  legacyBordered?: Ref<boolean | undefined> | boolean,
) {
  const config = useConfig()
  const formVariant = useVariantContext()

  const mergedVariant = computed<Variant>(() => {
    if (typeof variant?.value !== 'undefined') {
      return variant.value
    }

    const borderedValue = typeof legacyBordered === 'object' ? legacyBordered.value : legacyBordered

    if (borderedValue === false) {
      return 'borderless'
    }

    const componentConfigVariant = (config.value as any)?.[component]?.variant
    const globalVariant = config.value?.variant

    return formVariant.value ?? componentConfigVariant ?? globalVariant ?? 'outlined'
  })

  const enableVariantCls = computed(() => Variants.includes(mergedVariant.value))

  return [mergedVariant, enableVariantCls] as const
}
