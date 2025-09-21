import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import Login from '../src/components/AdminLogin.vue'
import { createRouter, createWebHistory } from 'vue-router'

const DummyHome = { template: '<div>Home</div>' }

describe('Login.vue with Vuex', () => {
  let store, router, loginSpy, logoutSpy

  beforeEach(() => {
    loginSpy = vi.fn((ctx, { email, password }) => email === 'admin@gmail.com' && password === 'Admin1234')
    logoutSpy = vi.fn()

    store = createStore({
      state: {
        isLoggedIn: false,
        adminEmail: ''
      },
      actions: {
        login: loginSpy,
        logout: logoutSpy
      },
      getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        adminEmail: (state) => state.adminEmail
      }
    })

    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: DummyHome }]
    })

    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('renders login form when not logged in', () => {
    const wrapper = mount(Login, { global: { plugins: [store, router] } })
    expect(wrapper.text()).toContain('Login')
  })

  it('calls store.dispatch("login") with correct credentials', async () => {
    const wrapper = mount(Login, { global: { plugins: [store, router] } })

    await wrapper.find('input[type="email"]').setValue('admin@gmail.com')
    await wrapper.find('input[type="password"]').setValue('Admin1234')
    await wrapper.find('form').trigger('submit.prevent')

    expect(loginSpy).toHaveBeenCalledWith(expect.anything(), { email: 'admin@gmail.com', password: 'Admin1234' })
  })

  it('shows logout button when logged in', () => {
    store.state.isLoggedIn = true
    const wrapper = mount(Login, { global: { plugins: [store, router] } })
    const logoutButton = wrapper.find('.logout-wrapper button')
    expect(logoutButton.exists()).toBe(true)
  })

  it('calls logout on clicking logout button', async () => {
    store.state.isLoggedIn = true
    const wrapper = mount(Login, { global: { plugins: [store, router] } })
    const logoutButton = wrapper.find('.logout-wrapper button')
    await logoutButton.trigger('click')
    expect(logoutSpy).toHaveBeenCalled()
  })
})
