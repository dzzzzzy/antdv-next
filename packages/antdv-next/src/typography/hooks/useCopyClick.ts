import { onBeforeUnmount, shallowRef, unref } from 'vue'
import copy from '../../_util/copy'
import toList from '../../_util/toList'

function useCopyClick({
  copyConfig,
  getText,
}: {
  copyConfig: any
  getText?: () => any
}) {
  const copied = shallowRef(false)

  const copyLoading = shallowRef(false)

  const copyIdRef = shallowRef<ReturnType<typeof setTimeout> | null>(null)

  const cleanCopyId = () => {
    if (copyIdRef.value) {
      clearTimeout(copyIdRef.value)
      copyIdRef.value = null
    }
  }

  const getClipboardText = async () => {
    const config = unref(copyConfig)
    if (typeof config?.text === 'function') {
      return config.text()
    }
    if (config?.text !== undefined) {
      return config.text
    }
    const origin = getText?.()
    const textList = toList(origin, true).map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return String(item)
      }
      return ''
    })
    return textList.join('')
  }

  onBeforeUnmount(cleanCopyId)

  const onClick = async (e?: MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    copyLoading.value = true
    try {
      const text = await getClipboardText()
      const config = unref(copyConfig)
      const copyOptions: { format?: 'text/plain' | 'text/html' } = {}
      if (config?.format) {
        copyOptions.format = config.format
      }
      await copy(text == null ? '' : String(text), copyOptions)
      copyLoading.value = false

      copied.value = true

      // Trigger tips update
      cleanCopyId()
      copyIdRef.value = setTimeout(() => {
        copied.value = false
      }, 3000)

      unref(copyConfig)?.onCopy?.(e)
    }
    catch (error) {
      copyLoading.value = false
      throw error
    }
  }

  return {
    copied,
    copyLoading,
    onClick,
  }
}

export default useCopyClick
