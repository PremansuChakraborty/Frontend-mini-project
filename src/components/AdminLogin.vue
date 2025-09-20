<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../stores/authStore'
const router = useRouter()

const email = ref('')
const password = ref('')
const adminStore=useAdminStore();



const login = () => {
  if (!email.value || !password.value) {
    alert('Please enter email and password')
    return
  }

  if (adminStore.login(email.value,password.value)) {
    alert('Login successful!')
    router.push('/')
  } else {
    alert('Invalid email or password')
  }
}
</script>

<template>
    
  <div v-show="!adminStore.isLoggedIn" class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="password" placeholder="Enter your password" required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
  <div v-if="adminStore.isLoggedIn" class="logout-wrapper">
    <button @click="adminStore.logout">Logout</button>
  </div>
</template>

<style scoped>
.login-container,
.logout-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;    
  min-height: 80vh;        
  padding: 25px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  max-width: 400px;       
  width: 90%;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border 0.2s;
}

input:focus {
  border-color: #1d4ed8;
  outline: none;
}

button {
  padding: 12px 16px;
  width: 100%;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #1e40af;
}

.logout-wrapper button {
  width: auto;      
  padding: 12px 24px;
}

/* Tablet */
@media (max-width: 768px) {
  .login-container,
  .logout-wrapper {
    padding: 20px;
  }
  h2 {
    font-size: 1.3rem;
  }
  input {
    padding: 9px;
    font-size: 0.95rem;
  }
  button {
    padding: 10px;
    font-size: 0.95rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .login-container,
  .logout-wrapper {
    padding: 15px;
    min-height: 70vh;
  }
  h2 {
    font-size: 1.2rem;
  }
  input {
    padding: 8px;
    font-size: 0.9rem;
  }
  button {
    padding: 8px;
    font-size: 0.9rem;
  }
}
</style>
