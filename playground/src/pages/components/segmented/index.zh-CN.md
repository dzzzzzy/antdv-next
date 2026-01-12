---
category: Components
group: 数据展示
title: Segmented
subtitle: 分段控制器
description: 用于展示多个选项并允许用户选择其中单个选项。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XJR2TbS1aaQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-9tSSoO_MkIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

<DocHeading></DocHeading>

## 何时使用 {#when-to-use}

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化

## 示例 {#examples}

<demo-group>
  <demo src="./demo/basic.vue">基本</demo>
  <demo src="./demo/vertical.vue">垂直方向</demo>
  <demo src="./demo/block.vue">block 分段选择器</demo>
  <demo src="./demo/shape.vue">胶囊形状</demo>
  <demo src="./demo/custom.vue">自定义渲染</demo>
  <demo src="./demo/dynamic.vue">动态数据</demo>
  <demo src="./demo/disabled.vue">不可用</demo>
  <demo src="./demo/size.vue">三种大小</demo>
  <demo src="./demo/with-icon.vue">设置图标</demo>
  <demo src="./demo/icon-only.vue">只设置图标</demo>
  <demo src="./demo/with-name.vue">配合name使用</demo>
</demo-group>

## API

### 属性 {#property}

通用属性参考：[通用属性](/docs/vue/common-props)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| options | 数据化配置选项内容 | SegmentedOptions | [] | - |
| rootClass | - | string | - | - |
| block | 将宽度调整为父元素宽度的选项 | boolean | false | - |
| size | 控件尺寸 | SizeType | `middle` | - |
| vertical | 排列方向，与 `orientation` 同时存在，以 `orientation` 优先 | boolean | `false` | 5.21.0 |
| orientation | 排列方向 | Orientation | `horizontal` | - |
| classes | 用于自定义 Segmented 组件内部各语义化结构的 class，支持对象或函数 | SegmentedClassNamesType | - | - |
| styles | 用于自定义 Segmented 组件内部各语义化结构的行内 style，支持对象或函数 | SegmentedStylesType | - | - |
| shape | 形状 | 'default' \| 'round' | `default` | 5.24.0 |
| iconRender | - | (option: SegmentedLabeledOption) =&gt; any | - | - |
| labelRender | - | (option: SegmentedLabeledOption) =&gt; any | - | - |

### 事件 {#events}

| 事件 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| change | 选项变化时的回调函数 | (value: RcSegmentedValue) =&gt; void | - |
| update:value | - | (value: RcSegmentedValue) =&gt; void | - |

### 插槽 {#slots}

| 插槽 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| iconRender | - | (option: SegmentedLabeledOption) =&gt; any | - |
| labelRender | - | (option: SegmentedLabeledOption) =&gt; any | - |
