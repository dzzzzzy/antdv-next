import { onMounted, ref, watch } from 'vue'

function usePrevious<T>(value: () => T): { value: T | undefined } {
  const previous = ref<T>()

  onMounted(() => {
    previous.value = value()
  })

  watch(value, (val) => {
    previous.value = val
  })

  return previous
}

export default usePrevious
