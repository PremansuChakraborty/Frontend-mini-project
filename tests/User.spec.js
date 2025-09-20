import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import UserManagement from '../src/components/User.vue'
import { describe, it, expect } from 'vitest'

describe('UserManagement.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('User Management')
  })

  it('filters users by ID', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })


    const input = wrapper.find('input[placeholder="Search by User ID"]')
    await input.setValue('1') 

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBeGreaterThan(0)
    rows.forEach(row => {
      expect(row.text()).toContain('1')
    })
  })
})

