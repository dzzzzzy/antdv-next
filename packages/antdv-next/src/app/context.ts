import type { InjectionKey } from 'vue'
import type { NotificationConfig } from '../notification/interface'
import { defineComponent, inject, provide } from 'vue'

export interface AppConfig {
  // message?: MessageConfig;
  notification?: NotificationConfig
}

const AppConfigContextKey: InjectionKey<AppConfig> = Symbol('AppConfigContext')

export const AppConfigProvider = defineComponent<AppConfig>(
  (props, { slots }) => {
    provide(AppConfigContextKey, props)
    return () => {
      return slots?.default?.()
    }
  },
)

export function useAppConfig() {
  return inject(AppConfigContextKey, {} as AppConfig)
}
