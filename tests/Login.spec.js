import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Login from '../src/components/AdminLogin.vue'
import { useAdminStore } from '../src/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

// Dummy component for router
const DummyHome = { template: '<div>Home</div>' }

describe('Login.vue', () => {
  let pinia, adminStore, router

  beforeEach(() => {
    // Setup Pinia
    pinia = createPinia()
    setActivePinia(pinia)
    adminStore = useAdminStore()
    adminStore.login = vi.fn((email, password) => email === 'admin@gmail.com' && password === 'Admin1234')
    adminStore.logout = vi.fn()
    adminStore.isLoggedIn = false

    // Setup Router
    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: DummyHome }],
    })

    // Mock alert
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('renders login form when not logged in', () => {
    const wrapper = mount(Login, { global: { plugins: [pinia, router] } })
    expect(wrapper.text()).toContain('Login')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('calls adminStore.login with correct credentials', async () => {
    const wrapper = mount(Login, { global: { plugins: [pinia, router] } })

    await wrapper.find('input[type="email"]').setValue('admin@gmail.com')
    await wrapper.find('input[type="password"]').setValue('Admin1234')
    await wrapper.find('form').trigger('submit.prevent')

    expect(adminStore.login).toHaveBeenCalledWith('admin@gmail.com', 'Admin1234')
  })

  it('shows logout button when logged in', () => {
    adminStore.isLoggedIn = true
    const wrapper = mount(Login, { global: { plugins: [pinia, router] } })

    const logoutButton = wrapper.find('.logout-wrapper button')
    expect(logoutButton.exists()).toBe(true)
    expect(logoutButton.text()).toBe('Logout')
  })

  it('calls logout on clicking logout button', async () => {
    adminStore.isLoggedIn = true
    const wrapper = mount(Login, { global: { plugins: [pinia, router] } })

    const logoutButton = wrapper.find('.logout-wrapper button')
    await logoutButton.trigger('click')
    expect(adminStore.logout).toHaveBeenCalled()
  })
})