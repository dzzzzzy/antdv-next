import type { ArgsProps, GlobalConfigProps, NotificationConfig, NotificationInstance } from './interface'
import { defineComponent, onMounted } from 'vue'
import { useAppConfig } from '../app/context.ts'
import { useBaseConfig } from '../config-provider/context.ts'
import { useInternalNotification } from './useNotification'

export type { ArgsProps }

const notification: GlobalNotification | null = null

const act: (callback: VoidFunction) => Promise<void> | void = (callback: VoidFunction) => callback()

interface GlobalNotification {
  fragment: DocumentFragment
  instance?: NotificationInstance | null
  sync?: VoidFunction
}

type Task
  = | {
    type: 'open'
    config: ArgsProps
  }
  | {
    type: 'destroy'
    key?: React.Key
  }

const taskQueue: Task[] = []

const defaultGlobalConfig: GlobalConfigProps = {}

function getGlobalContext() {
  const { getContainer, rtl, maxCount, top, bottom, showProgress, pauseOnHover }
    = defaultGlobalConfig
  const mergedContainer = getContainer?.() || document.body

  return {
    getContainer: () => mergedContainer,
    rtl,
    maxCount,
    top,
    bottom,
    showProgress,
    pauseOnHover,
  }
}

interface GlobalHolderRef {
  instance: NotificationInstance
  sync: () => void
}

const GlobalHolder = defineComponent<{ notificationConfig: NotificationConfig, sync: () => void }>(
  (props, { expose }) => {
    const { notificationConfig, sync } = props
    const { getPrefixCls } = useBaseConfig()
    const prefixCls = defaultGlobalConfig?.prefixCls || getPrefixCls('notification')
    const appConfig = useAppConfig()
    const [api, holder] = useInternalNotification({
      ...notificationConfig,
      prefixCls,
      ...appConfig.notification,
    })
    onMounted(() => {
      sync?.()
    })
    const instance = {
      ...api,
    }
    Object.keys(instance).forEach((method) => {
      ;(instance as any)[method as keyof NotificationInstance] = (...args: any[]) => {
        sync()
        return (api as any)[method](...args)
      }
    })
    expose({
      instance,
      sync,
    })
    return () => {
      if (typeof holder === 'function') {
        return holder?.()
      }
      return holder as any
    }
  },
)
