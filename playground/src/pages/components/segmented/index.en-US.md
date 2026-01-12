---
category: Components
group: Data Display
title: Segmented
description: Display multiple options and allow users to select a single option.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XJR2TbS1aaQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-9tSSoO_MkIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

<DocHeading></DocHeading>

## When To Use {#when-to-use}

- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

## Examples {#examples}

<demo-group>

<demo-group>
  <demo src="./demo/basic.vue">Basic</demo>
  <demo src="./demo/vertical.vue">Vertical Direction</demo>
  <demo src="./demo/block.vue">Block Segmented</demo>
  <demo src="./demo/shape.vue">Round shape</demo>
  <demo src="./demo/custom.vue">Custom Render</demo>
  <demo src="./demo/dynamic.vue">Dynamic</demo>
  <demo src="./demo/disabled.vue">Disabled</demo>
  <demo src="./demo/size.vue">Three sizes of Segmented</demo>
  <demo src="./demo/with-icon.vue">With Icon</demo>
  <demo src="./demo/icon-only.vue">With Icon only</demo>
  <demo src="./demo/with-name.vue">With name</demo>
</demo-group>

## API

### Property {#property}

Common props ref：[Common props](/docs/vue/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| options | Set children optional | SegmentedOptions | [] | - |
| rootClass | - | string | - | - |
| block | Option to fit width to its parent\'s width | boolean | false | - |
| size | The size of the Segmented. | SizeType | `middle` | - |
| vertical | Orientation，Simultaneously existing with `orientation`, `orientation` takes priority | boolean | `false` | 5.21.0 |
| orientation | Orientation | Orientation | `horizontal` | - |
| classes | Customize class for each semantic structure inside the Segmented component. Supports object or function. | SegmentedClassNamesType | - | - |
| styles | Customize inline style for each semantic structure inside the Segmented component. Supports object or function. | SegmentedStylesType | - | - |
| shape | shape of Segmented | 'default' \| 'round' | `default` | 5.24.0 |
| iconRender | - | (option: SegmentedLabeledOption) =&gt; any | - | - |
| labelRender | - | (option: SegmentedLabeledOption) =&gt; any | - | - |

### Events {#events}

| Event | Description | Type | Version |
| --- | --- | --- | --- |
| change | The callback function that is triggered when the state changes | (value: RcSegmentedValue) =&gt; void | - |
| update:value | - | (value: RcSegmentedValue) =&gt; void | - |

### Slots {#slots}

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| iconRender | - | (option: SegmentedLabeledOption) =&gt; any | - |
| labelRender | - | (option: SegmentedLabeledOption) =&gt; any | - |
