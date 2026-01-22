import { describe, expect, it } from 'vitest'
import { mergeLangData } from '../scripts/web-types/merge'
import { parseMarkdownContent } from '../scripts/web-types/parser'

describe('web-types parser', () => {
  it('parses a simple API using the formatted title', () => {
    const content = `---
title: Button
description: Button desc
---

## API

### Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| type | Button type | string | - | - |

### Events

| Event | Description | Type | Version |
| --- | --- | --- | --- |
| click | Click event | (e: MouseEvent) => void | - |

### Slots

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| default | Content | () => any | - |
`

    const result = parseMarkdownContent(content, 'button.md')
    expect(result).not.toBeNull()
    expect(result?.components).toHaveLength(1)

    const component = result?.components[0]
    expect(component?.tagName).toBe('a-button')
    expect(component?.componentName).toBe('Button')
    expect(component?.attributes.map(attr => attr.name)).toEqual(['type'])
    expect(component?.events.map(event => event.name)).toEqual(['click'])
    expect(component?.slots.map(slot => slot.name)).toEqual(['default'])
  })

  it('parses grouped API sections as separate components', () => {
    const content = `---
title: Form
description: Form desc
---

## API

### Form

### Props {#form-props}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| layout | Layout | string | - | - |

### FormItem {#form-item}

#### Props {#form-item-props}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| name | Field name | string | - | - |
`

    const result = parseMarkdownContent(content, 'form.md')
    expect(result).not.toBeNull()
    expect(result?.components).toHaveLength(2)

    const tags = result?.components.map(component => component.tagName)
    expect(tags).toEqual(['a-form', 'a-form-item'])

    const formComponent = result?.components.find(component => component.tagName === 'a-form')
    const formItemComponent = result?.components.find(component => component.tagName === 'a-form-item')
    expect(formComponent?.attributes.map(attr => attr.name)).toEqual(['layout'])
    expect(formItemComponent?.attributes.map(attr => attr.name)).toEqual(['name'])
  })

  it('ignores non-section tables inside simple API blocks', () => {
    const content = `---
title: Select
---

## API

### Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| showSearch | Whether to show search | boolean | false | - |

### showSearch {#showsearch}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoClearSearchValue | Auto clear search value | boolean | true | - |
`

    const result = parseMarkdownContent(content, 'select.md')
    expect(result).not.toBeNull()

    const attributes = result?.components?.[0]?.attributes?.map?.(attr => attr.name)
    expect(attributes).toEqual(['show-search'])
  })
})

describe('web-types merge', () => {
  it('merges zh/en descriptions and prefers english types', () => {
    const merged = mergeLangData(
      [{ name: 'size', description: 'Zh size', type: 'SizeType' }],
      [{ name: 'size', description: 'Size', type: '"small" | "large"' }],
    )

    expect(merged).toHaveLength(1)
    expect(merged?.[0]?.description).toBe('(ZH) Zh size\n\n(EN) Size')
    expect(merged?.[0]?.type).toBe('"small" | "large"')
  })
})
