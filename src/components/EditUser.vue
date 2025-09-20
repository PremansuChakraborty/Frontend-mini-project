<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import userData from '../data/user.json'

const route = useRoute()
const router = useRouter()

const userId = Number(route.params.userId)


const user = ref(null)

onMounted(() => {
  const foundUser = userData.find(u => u.id === userId)
  if (foundUser) {
    user.value = { ...foundUser } 
  } else {
    alert('User not found!')
    router.push('/user') 
  }
})


const saveUser = () => {
  if (!user.value.name || !user.value.email || !user.value.role) {
    alert('Please fill all required fields')
    return
  }


  const index = userData.findIndex(u => u.id === userId)
  if (index !== -1) {
    userData[index] = { ...user.value } 
    alert('User updated successfully!')
    router.push('/user') 
  }
}
</script>

<template>
  <div class="form-container" v-if="user">
    <h2>Edit User</h2>
    <form @submit.prevent="saveUser">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="user.name" type="text" required />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="user.email" type="email" required />
      </div>

      <div class="form-group">
        <label>Role:</label>
        <input v-model="user.role" type="text" required />
      </div>

      <div class="form-group">
        <label>Status:</label>
        <select v-model="user.status">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 90%;           /* adapts to screen size */
  max-width: 500px;     /* doesn't exceed 500px */
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: clamp(1.2rem, 2vw, 1.5rem); /* scales with screen size */
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

input,
select {
  width: 100%;
  padding: clamp(8px, 1.5vw, 10px); /* responsive padding */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  outline: none;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  border-color: #1d4ed8;
}

button {
  width: 100%;
  padding: clamp(8px, 1.5vw, 10px);
  background-color: #1d4ed8;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1e40af;
}
</style>
