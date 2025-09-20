import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../routes'

export const useAdminStore = defineStore('admin', () => {
 
  const isLoggedIn = ref(false)
  const adminEmail = ref('')
  const adminEmailValidate= ref("admin@gmail.com")
  const adminPasswordValidate=ref("Admin1234")

  const login = (email, password) => {
    if (email === adminEmailValidate.value && password === adminPasswordValidate.value) {
      isLoggedIn.value = true
      adminEmail.value = email
      return true
    }
    return false
  }

  const logout = () => {
    isLoggedIn.value = false
    adminEmail.value = ''
    router.push('/')
  }

  return { isLoggedIn, adminEmail, login, logout }
})
