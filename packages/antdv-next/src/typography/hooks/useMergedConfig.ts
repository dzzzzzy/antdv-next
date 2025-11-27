import { computed, unref } from 'vue'

export default function useMergedConfig<Target>(propConfig: any, templateConfig?: Target) {
  const support = computed(() => !!unref(propConfig))

  const config = computed<Target>(() => {
    const current = unref(propConfig)
    return {
      ...templateConfig,
      ...(support.value && typeof current === 'object' ? current : null),
    } as Target
  })

  return [support, config] as const
}
