import { definePreset } from '@unocss/core'

function generatePalette(name: string, antPrefix: string = 'ant') {
  const palette: Record<string, string> = {}
  // 基础色 (e.g. a-text-blue) -> 对应 AntD 默认的主色(通常是6)
  palette[name] = `var(--${antPrefix}-${name})`

  // 1-10 级色阶 (e.g. a-bg-blue-1)
  for (let i = 1; i <= 10; i++) {
    palette[`${name}-${i}`] = `var(--${antPrefix}-${name}-${i})`
  }
  return palette
}

const colorNames = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
]

function buildPalettes(antPrefix: string) {
  return colorNames.reduce((acc, name) => {
    return { ...acc, ...generatePalette(name, antPrefix) }
  }, {})
}

export interface AntdPresetOptions {
  /**
   * @desc 自定义 class 书写的前缀
   * @default 'a'
   * @example prefix: 'antd' -> class="antd-bg-primary"
   */
  prefix?: string
  /**
   * @desc 自定义 CSS 变量的前缀（与 ConfigProvider 的 prefixCls 对应）
   * @default 'ant'
   * @example antPrefix: 'my-app' -> var(--my-app-color-primary)
   */
  antPrefix?: string
}

export function presetAntd(options: AntdPresetOptions = {}) {
  const prefix = options.prefix || 'a'
  const antPrefix = options.antPrefix || 'ant'

  // 根据 antPrefix 动态生成调色板
  const builtPalettes = buildPalettes(antPrefix)

  return definePreset(
    () => {
      return {
        name: 'preset-antd',
        theme: {
          colors: {
            ...builtPalettes,
            //  核心品牌色 (Primary)
            'primary': `var(--${antPrefix}-color-primary)`,
            'primary-hover': `var(--${antPrefix}-color-primary-hover)`,
            'primary-active': `var(--${antPrefix}-color-primary-active)`,
            'primary-bg': `var(--${antPrefix}-color-primary-bg)`, // 极浅背景
            'primary-bg-hover': `var(--${antPrefix}-color-primary-bg-hover)`,

            // 功能辅助色 (Success, Warning, Error, Info)
            // 包含基础色、背景色(bg)、边框色(border)

            'success': `var(--${antPrefix}-color-success)`,
            'success-bg': `var(--${antPrefix}-color-success-bg)`,
            'success-border': `var(--${antPrefix}-color-success-border)`,
            'success-hover': `var(--${antPrefix}-color-success-hover)`,

            // Warning
            'warning': `var(--${antPrefix}-color-warning)`,
            'warning-bg': `var(--${antPrefix}-color-warning-bg)`,
            'warning-border': `var(--${antPrefix}-color-warning-border)`,
            'warning-hover': `var(--${antPrefix}-color-warning-hover)`,

            // Error
            'error': `var(--${antPrefix}-color-error)`,
            'error-bg': `var(--${antPrefix}-color-error-bg)`,
            'error-border': `var(--${antPrefix}-color-error-border)`,
            'error-hover': `var(--${antPrefix}-color-error-hover)`,

            // Info
            'info': `var(--${antPrefix}-color-info)`,
            'info-bg': `var(--${antPrefix}-color-info-bg)`,
            'info-border': `var(--${antPrefix}-color-info-border)`,

            // Link
            'link': `var(--${antPrefix}-color-link)`,
            'link-hover': `var(--${antPrefix}-color-link-hover)`,
            'link-active': `var(--${antPrefix}-color-link-active)`,

            // 文本色
            'text': `var(--${antPrefix}-color-text)`,
            'text-secondary': `var(--${antPrefix}-color-text-secondary)`,
            'text-tertiary': `var(--${antPrefix}-color-text-tertiary)`,
            'text-quat': `var(--${antPrefix}-color-text-quaternary)`,

            // 4. 中性色 (背景与文字 - 保持之前简化后的 Key)
            'white': `var(--${antPrefix}-color-white)`,

            // 背景 (Background)
            'base': `var(--${antPrefix}-color-bg-base)`,
            'container': `var(--${antPrefix}-color-bg-container)`, // 常用：白色卡片背景
            'layout': `var(--${antPrefix}-color-bg-layout)`, // 常用：灰色页面背景
            'elevated': `var(--${antPrefix}-color-bg-elevated)`, // 浮层背景
            'mask': `var(--${antPrefix}-color-bg-mask)`,

            // 文本 (Text)
            'main': `var(--${antPrefix}-color-text)`,
            'sec': `var(--${antPrefix}-color-text-secondary)`,
            'quat': `var(--${antPrefix}-color-text-quaternary)`,

            // 边框 (Border)
            'border': `var(--${antPrefix}-color-border)`,
            'border-sec': `var(--${antPrefix}-color-border-secondary)`,
          },
          // 间距 (Padding/Margin) 映射
          spacing: {
            // 使用 AntD 定义的变量
            xxs: `var(--${antPrefix}-padding-xxs)`, // 4px (AntD通常padding/margin共用一套大小阶梯)
            xs: `var(--${antPrefix}-padding-xs)`, // 8px
            sm: `var(--${antPrefix}-padding-sm)`, // 12px
            DEFAULT: `var(--${antPrefix}-padding)`, // 16px
            md: `var(--${antPrefix}-padding-md)`, // 20px
            lg: `var(--${antPrefix}-padding-lg)`, // 24px
            xl: `var(--${antPrefix}-padding-xl)`, // 32px
          },
          // 圆角
          borderRadius: {
            xs: `var(--${antPrefix}-border-radius-xs)`,
            sm: `var(--${antPrefix}-border-radius-sm)`,
            DEFAULT: `var(--${antPrefix}-border-radius)`,
            lg: `var(--${antPrefix}-border-radius-lg)`,
          },
          // 字体大小
          fontSize: {
            sm: `var(--${antPrefix}-font-size-sm)`,
            DEFAULT: `var(--${antPrefix}-font-size)`,
            lg: `var(--${antPrefix}-font-size-lg)`,
            xl: `var(--${antPrefix}-font-size-xl)`,
            h1: `var(--${antPrefix}-font-size-heading-1)`,
            h2: `var(--${antPrefix}-font-size-heading-2)`,
            h3: `var(--${antPrefix}-font-size-heading-3)`,
          },
          boxShadow: {
            // DEFAULT 是当用户只写 class="${prefix}-shadow" 时使用的值
            'DEFAULT': `var(--${antPrefix}-box-shadow)`,

            // 对应 class="${prefix}-shadow-sec" 或 "${prefix}-shadow-secondary"
            'sec': `var(--${antPrefix}-box-shadow-secondary)`,
            'secondary': `var(--${antPrefix}-box-shadow-secondary)`,

            // 对应 class="${prefix}-shadow-ter"
            'ter': `var(--${antPrefix}-box-shadow-tertiary)`,
            'tertiary': `var(--${antPrefix}-box-shadow-tertiary)`,

            // 常用组件阴影
            'card': `var(--${antPrefix}-box-shadow-card)`,
            'arrow': `var(--${antPrefix}-box-shadow-popover-arrow)`,

            // 方向性阴影 (抽屉等使用)
            'drawer-r': `var(--${antPrefix}-box-shadow-drawer-right)`,
            'drawer-l': `var(--${antPrefix}-box-shadow-drawer-left)`,
            'drawer-u': `var(--${antPrefix}-box-shadow-drawer-up)`,
            'drawer-d': `var(--${antPrefix}-box-shadow-drawer-down)`,
          },
        },

        // 2. 自定义规则 (基于前缀需求)
        rules: [
          // --- 颜色类 ---
          // ${prefix}-color-primary 或 ${prefix}-c-primary -> color: var(--${antPrefix}-color-primary)
          [new RegExp(`^${prefix}-(?:color|c)-(.+)$`), ([_, c], { theme }) => {
            const color = (theme.colors as any)?.[c!]
            if (color)
              return { color }
          }],

          // ${prefix}-bg-container -> background-color: var(--${antPrefix}-color-bg-container)
          [new RegExp(`^${prefix}-bg-(.+)$`), ([_, c], { theme }) => {
            const color = (theme.colors as any)?.[c!]
            if (color)
              return { 'background-color': color }
          }],

          // ${prefix}-border-primary 或 ${prefix}-b-primary -> border-color: ...
          [new RegExp(`^${prefix}-(?:border|b)-(.+)$`), ([_, c], { theme }) => {
            const color = (theme.colors as any)?.[c!]
            if (color)
              return { 'border-color': color }
          }],

          // --- 间距类 (Margin / Padding) ---
          // ${prefix}-m-sm -> margin: 12px (var)
          [new RegExp(`^${prefix}-m-(.+)$`), ([_, s], { theme }) => {
            const v = (theme.spacing as any)?.[s!]
            if (v)
              return { margin: v }
          }],
          // ${prefix}-mt-lg -> margin-top: 24px (var)
          [new RegExp(`^${prefix}-mt-(.+)$`), ([_, s], { theme }) => ({ 'margin-top': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-mb-(.+)$`), ([_, s], { theme }) => ({ 'margin-bottom': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-ml-(.+)$`), ([_, s], { theme }) => ({ 'margin-left': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-mr-(.+)$`), ([_, s], { theme }) => ({ 'margin-right': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-mx-(.+)$`), ([_, s], { theme }) => ({ 'margin-left': (theme.spacing as any)?.[s!], 'margin-right': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-my-(.+)$`), ([_, s], { theme }) => ({ 'margin-top': (theme.spacing as any)?.[s!], 'margin-bottom': (theme.spacing as any)?.[s!] })],

          // Padding 同理
          [new RegExp(`^${prefix}-p-(.+)$`), ([_, s], { theme }) => ({ padding: (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-pt-(.+)$`), ([_, s], { theme }) => ({ 'padding-top': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-pb-(.+)$`), ([_, s], { theme }) => ({ 'padding-bottom': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-pl-(.+)$`), ([_, s], { theme }) => ({ 'padding-left': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-pr-(.+)$`), ([_, s], { theme }) => ({ 'padding-right': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-px-(.+)$`), ([_, s], { theme }) => ({ 'padding-left': (theme.spacing as any)?.[s!], 'padding-right': (theme.spacing as any)?.[s!] })],
          [new RegExp(`^${prefix}-py-(.+)$`), ([_, s], { theme }) => ({ 'padding-top': (theme.spacing as any)?.[s!], 'padding-bottom': (theme.spacing as any)?.[s!] })],

          // --- 其他 ---
          // ${prefix}-text-lg -> font-size: 16px (var)
          [new RegExp(`^${prefix}-text-(.+)$`), ([_, s], { theme }) => ({ 'font-size': (theme.fontSize as any)?.[s!] })],

          // ${prefix}-rounded-sm -> border-radius: 4px (var)
          [new RegExp(`^${prefix}-rounded-(.+)$`), ([_, s], { theme }) => ({ 'border-radius': (theme.borderRadius as any)?.[s!] })],
          [
            new RegExp(`^${prefix}-shadow(?:-(.+))?$`),
            ([_, s], { theme }) => {
              // 如果 s 存在(有后缀)，用 s；如果 s 不存在(没后缀)，用 'DEFAULT'
              const key = s || 'DEFAULT'
              // 使用 as any 避免 TS7053 错误
              const v = (theme.boxShadow as any)?.[key]

              if (v)
                return { 'box-shadow': v }
            },
          ],
        ],
        autocomplete: {
          templates: [
            // 颜色类
            `${prefix}-color-$colors`,
            `${prefix}-c-$colors`,
            `${prefix}-bg-$colors`,
            `${prefix}-border-$colors`,
            `${prefix}-b-$colors`,

            // Margin 类
            `${prefix}-m-$spacing`,
            `${prefix}-mt-$spacing`,
            `${prefix}-mb-$spacing`,
            `${prefix}-ml-$spacing`,
            `${prefix}-mr-$spacing`,
            `${prefix}-mx-$spacing`,
            `${prefix}-my-$spacing`,

            // Padding 类
            `${prefix}-p-$spacing`,
            `${prefix}-pt-$spacing`,
            `${prefix}-pb-$spacing`,
            `${prefix}-pl-$spacing`,
            `${prefix}-pr-$spacing`,
            `${prefix}-px-$spacing`,
            `${prefix}-py-$spacing`,

            // 其他
            `${prefix}-text-$fontSize`,
            `${prefix}-rounded-$borderRadius`,
            `${prefix}-shadow`,
            `${prefix}-shadow-$boxShadow`,
          ],
        },
      }
    },
  )
}
