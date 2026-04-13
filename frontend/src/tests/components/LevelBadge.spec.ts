import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import LevelBadge from '@/components/LevelBadge.vue'

describe('LevelBadge', () => {
  it('renders a low level badge with success styles', () => {
    const wrapper = mount(LevelBadge, {
      props: {
        level: 'low',
      },
    })

    expect(wrapper.text()).toBe('low')
    expect(wrapper.classes()).toContain('bg-success/15')
    expect(wrapper.classes()).toContain('text-success')
  })

  it('renders a medium level badge with warning styles', () => {
    const wrapper = mount(LevelBadge, {
      props: {
        level: 'medium',
      },
    })

    expect(wrapper.text()).toBe('medium')
    expect(wrapper.classes()).toContain('bg-warning/15')
    expect(wrapper.classes()).toContain('text-warning')
  })

  it('renders a high level badge with danger styles', () => {
    const wrapper = mount(LevelBadge, {
      props: {
        level: 'high',
      },
    })

    expect(wrapper.text()).toBe('high')
    expect(wrapper.classes()).toContain('bg-danger/15')
    expect(wrapper.classes()).toContain('text-danger')
  })
})
