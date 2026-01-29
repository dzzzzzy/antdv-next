import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import Alert from '..'
import rtlTest from '../../../../../tests/shared/rtlTest'
import { mount } from '../../../../../tests/utils'
import Button from '../../button'
import ConfigProvider from '../../config-provider'
import Popconfirm from '../../popconfirm'
import Tooltip from '../../tooltip'

describe('alert', () => {
  rtlTest(Alert)

  it('should show close button and could be closed', async () => {
    const onClose = vi.fn()
    const wrapper = mount(Alert, {
      props: {
        message: 'Warning Text',
        type: 'warning',
        closable: true,
        onClose,
      },
    })
    await wrapper.find('.ant-alert-close-icon').trigger('click')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('custom action', () => {
    const wrapper = mount(Alert, {
      props: {
        message: 'Success Tips',
        type: 'success',
        showIcon: true,
        closable: true,
      },
      slots: {
        action: () => <Button size="small" type="text">UNDO</Button>,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should sets data attributes on alert when pass attributes to props', () => {
    const wrapper = mount(Alert, {
      attrs: {
        'data-test': 'test-id',
        'data-id': '12345',
        'aria-describedby': 'some-label',
      },
      props: {
        message: null,
      },
    })
    const alert = wrapper.find('[role="alert"]')
    expect(alert.attributes('data-test')).toBe('test-id')
    expect(alert.attributes('data-id')).toBe('12345')
    expect(alert.attributes('aria-describedby')).toBe('some-label')
  })

  it('sets role attribute on input', () => {
    const wrapper = mount(Alert, {
      props: {
        role: 'status',
        message: null,
      },
    })
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })

  it('could be used with Tooltip', async () => {
    const wrapper = mount({
      render() {
        return (
          <Tooltip title="xxx" mouseEnterDelay={0}>
            <Alert
              message="Warning Text"
              type="warning"
            />
          </Tooltip>
        )
      },
    }, { attachTo: document.body })

    await wrapper.find('.ant-alert').trigger('mouseenter')
    expect(wrapper.find('.ant-alert').exists()).toBe(true)
  })

  it('could be used with Popconfirm', async () => {
    const wrapper = mount({
      render() {
        return (
          <Popconfirm title="xxx">
            <Alert
              message="Warning Text"
              type="warning"
            />
          </Popconfirm>
        )
      },
    }, { attachTo: document.body })
    await wrapper.find('.ant-alert').trigger('click')
    expect(wrapper.find('.ant-alert').exists()).toBe(true)
  })

  it.skip('could accept none react element icon', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'Success Tips',
        type: 'success',
        showIcon: true,
        icon: 'icon',
      },
    })
    expect(wrapper.text()).toContain('Success Tips')
    expect(wrapper.text()).toContain('icon')
  })

  it('should not render title div when no title', () => {
    const wrapper = mount(Alert, {
      props: {
        description: 'description',
      },
    })
    expect(wrapper.find('.ant-alert-title').exists()).toBe(false)
  })

  it('close button should be hidden when closeIcon setting to null or false', async () => {
    const wrapper = mount(Alert, { props: { closeIcon: null } })
    expect(wrapper.find('.ant-alert-close-icon').exists()).toBe(false)

    await wrapper.setProps({ closeIcon: false })
    expect(wrapper.find('.ant-alert-close-icon').exists()).toBe(false)

    await wrapper.setProps({ closeIcon: true })
    expect(wrapper.find('.ant-alert-close-icon').exists()).toBe(true)

    await wrapper.setProps({ closeIcon: undefined })
    expect(wrapper.find('.ant-alert-close-icon').exists()).toBe(false)
  })

  it('close button should be support aria-* by closable', async () => {
    const wrapper = mount(Alert)
    expect(wrapper.find('[aria-label]').exists()).toBe(false)

    await wrapper.setProps({ closable: { 'aria-label': 'Close' }, closeIcon: 'CloseIcon' })
    expect(wrapper.find('[aria-label="Close"]').exists()).toBe(true)
  })

  it('close button should be support custom icon by closable', async () => {
    const wrapper = mount(Alert)
    expect(wrapper.find('.ant-alert-close-icon').exists()).toBe(false)

    await wrapper.setProps({ closable: { closeIcon: 'CloseBtn' } })
    expect(wrapper.find('.ant-alert-close-icon').text()).toBe('CloseBtn')
  })

  it('should support id and ref', () => {
    const wrapper = mount(Alert, { props: { id: 'test-id' } })
    expect(wrapper.find('#test-id').exists()).toBe(true)
  })

  it.skip('should apply custom styles to Alert', () => {
    const customClassNames = {
      root: 'custom-root',
      icon: 'custom-icon',
      section: 'custom-section',
      title: 'custom-title',
      description: 'custom-description',
      actions: 'custom-actions',
      close: 'custom-close',
    }

    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      icon: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    }

    const wrapper = mount(Alert, {
      props: {
        closable: true,
        styles: customStyles,
        classes: customClassNames,
        title: 'Info Text',
        showIcon: true,
        description: 'Info Description',
        type: 'info',
        action: 'Action',
      },
    })

    expect(wrapper.find('.custom-root').classes()).toContain('ant-alert')
    expect(wrapper.find('.custom-root').classes()).toContain('custom-root')
    expect(wrapper.find('.ant-alert-icon').classes()).toContain('custom-icon')

    const rootEl = wrapper.find('.ant-alert').element as HTMLElement
    expect(rootEl.style.color).toBe('rgb(255, 0, 0)')
  })

  it('should support custom success icon', () => {
    const wrapper = mount(ConfigProvider, {
      props: {
        alert: { successIcon: 'foobar' },
      },
      slots: {
        default: () => h(Alert, { title: 'Success Tips', type: 'success', showIcon: true }),
      },
    })
    expect(wrapper.text()).toContain('foobar')
  })
})
