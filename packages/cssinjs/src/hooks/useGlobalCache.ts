import type { Ref } from 'vue'
import type { KeyType } from '../Cache'
import { computed, nextTick, watch, watchEffect } from 'vue'
import { pathKey } from '../Cache'
import { useStyleContext } from '../StyleContext'

export type ExtractStyle<CacheValue> = (
  cache: CacheValue,
  effectStyles: Record<string, boolean>,
  options?: {
    plain?: boolean
    autoPrefix?: boolean
  },
) => [order: number, styleId: string, style: string] | null
// @ts-expect-error // FIXME:
const isDev = process.env.NODE_ENV !== 'production'
const effectMap = new Map<string, boolean>()

/**
 * Global cache for CSS-in-JS styles
 *
 * This hook manages a reference-counted cache to ensure styles are properly
 * created, shared, and cleaned up across component instances.
 *
 * Key differences from React version:
 * - No useInsertionEffect needed - Vue's watchEffect handles timing naturally
 * - No StrictMode double-mounting issues - Vue doesn't double-mount
 * - HMR handling is simpler - can rely on Vue's reactivity system
 * - No need for cleanup register pattern - onBeforeUnmount is sufficient
 */
export function useGlobalCache<CacheType>(
  prefix: Ref<string>,
  keyPath: Ref<KeyType[]>,
  cacheFn: () => CacheType,
  onCacheRemove?: (cache: CacheType, fromHMR: boolean) => void,
  // Add additional effect trigger
  onCacheEffect?: (cachedValue: CacheType) => void,
): Ref<CacheType> {
  const styleContext = useStyleContext()
  const fullPath = computed(() => [prefix.value, ...keyPath.value])
  const fullPathStr = computed(() => pathKey(fullPath.value))

  type UpdaterArgs = [times: number, cache: CacheType]

  const buildCache = (updater?: (data: UpdaterArgs) => UpdaterArgs) => {
    const globalCache = styleContext.value.cache
    globalCache.opUpdate(fullPathStr.value, (prevCache) => {
      const [times = 0, cache] = prevCache || [undefined, undefined]
      const mergedCache = cache || cacheFn()
      const data: UpdaterArgs = [times, mergedCache]

      return updater ? updater(data) : data
    })
  }

  const getCacheEntity = () => styleContext.value.cache.opGet(fullPathStr.value)

  const cacheContent = computed(() => {
    let entity = styleContext.value.cache.opGet(fullPathStr.value)

    if (isDev && !entity) {
      buildCache()
      entity = getCacheEntity()
    }

    return entity![1]!
  })

  // Initial cache creation - watch for keyPath changes
  watch(
    fullPathStr,
    async (_, _1, onCleanup) => {
      await nextTick()
      // Build or retrieve cache
      buildCache(([times, cache]) => [times + 1, cache])
      if (!effectMap.has(fullPathStr.value)) {
        onCacheEffect?.(cacheContent.value)
        effectMap.set(fullPathStr.value, true)
        // 微任务清理混存，可以认为是单次 batch render 中只触发一次 effect
        Promise.resolve().then(() => {
          effectMap.delete(fullPathStr.value)
        })
      }
      const globalCache = styleContext.value.cache

      // Cleanup on unmount or when fullPathStr changes
      onCleanup(() => {
        globalCache.opUpdate(fullPathStr.value, (prevCache) => {
          // if (!prevCache)
          //   return null
          const [times = 0, cache] = prevCache || []
          const nextCount = times - 1

          if (nextCount === 0) {
          // Last reference, remove cache
            onCacheRemove?.(cache, false)
            effectMap.delete(fullPathStr.value)
            return null
          }

          return [times - 1, cache]
        })
      })
    },
    {
      immediate: true,
    },
  )

  // Trigger effect callback when cache is ready
  if (onCacheEffect) {
    watchEffect(() => {
      onCacheEffect(cacheContent.value)
    })
  }

  return cacheContent
}
