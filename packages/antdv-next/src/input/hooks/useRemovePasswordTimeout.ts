import type { InputRef } from '@v-c/input'
import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Clear the `value` attribute of password inputs to avoid browser autofill flashes.
 */
export default function useRemovePasswordTimeout(
  inputRef: Ref<InputRef | null | undefined>,
  triggerOnMount = false,
) {
  const timeoutIds: Array<ReturnType<typeof setTimeout>> = []

  const removePasswordTimeout = () => {
    const timer = setTimeout(() => {
      const input = inputRef.value?.input
      if (
        input
        && input.getAttribute('type') === 'password'
        && input.hasAttribute('value')
      ) {
        input.removeAttribute('value')
      }
    })
    timeoutIds.push(timer)
  }

  onMounted(() => {
    if (triggerOnMount) {
      removePasswordTimeout()
    }
  })

  onBeforeUnmount(() => {
    timeoutIds.forEach((timer) => {
      clearTimeout(timer)
    })
    timeoutIds.length = 0
  })

  return removePasswordTimeout
}
