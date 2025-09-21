import { mount } from '@vue/test-utils'
import UserManagement from '../src/components/User.vue'
import { describe, it, expect } from 'vitest'
import { createStore } from 'vuex'

describe('UserManagement.vue with Vuex', () => {
  let store

  beforeEach(() => {
    store = createStore({
      state: {
        isLoggedIn: true,
        adminEmail: 'admin@gmail.com'
      },
      getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        adminEmail: (state) => state.adminEmail
      }
    })
  })

  it('renders the component', () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [store],
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('User Management')
  })

  it('filters users by ID', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [store],
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
