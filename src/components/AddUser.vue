<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const role = ref('')
const status = ref('Active')

const emit = defineEmits(['add-user'])

const addUser = () => {
  if (name.value && email.value && role.value) {
    const newUser = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      role: role.value,
      status: status.value
    }
    emit('add-user', newUser)


    name.value = ''
    email.value = ''
    role.value = ''
    status.value = 'Active'
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Add User</h2>
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="name" type="text" required />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Role:</label>
        <input v-model="role" type="text" required />
      </div>
      <div class="form-group">
        <label>Status:</label>
        <select v-model="status">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <button class="btn-add" type="submit">Add User</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  width: 90%; /* Ensure responsiveness */
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
  box-sizing: border-box;
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.3rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
}

input, select {
  padding: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border 0.2s;
}

input:focus, select:focus {
  border-color: rgb(0, 13, 254);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1e40af;
}

/* Tablet devices */
@media (max-width: 768px) {
  .form-container {
    padding: 18px;
  }

  h2 {
    font-size: 1.2rem;
  }

  input, select {
    padding: 9px;
    font-size: 0.9rem;
  }

  button {
    padding: 10px;
    font-size: 0.95rem;
  }
}

/* Mobile devices */
@media (max-width: 480px) {
  .form-container {
    padding: 15px;
  }

  h2 {
    font-size: 1.1rem;
  }

  input, select {
    padding: 8px;
    font-size: 0.85rem;
  }

  button {
    padding: 8px;
    font-size: 0.9rem;
  }
}
</style>
