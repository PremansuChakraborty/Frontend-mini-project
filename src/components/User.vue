<script setup>
import { ref, computed } from 'vue'
import userData from '../data/user.json'
import AddUser from './AddUser.vue'
import { useAdminStore } from '../stores/authStore'
const userCollection = ref(userData)

// Filters
const searchId = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const adminStore=useAdminStore()
// Add User
const addUser = (newUser) => {
  userCollection.value.push(newUser)
}

// Computed filtered users
const filteredUsers = computed(() => {
  return userCollection.value.filter(user => {
    const matchesId = searchId.value
      ? String(user.id).includes(searchId.value)
      : true

    const matchesRole = selectedRole.value
      ? user.role === selectedRole.value
      : true

    const matchesStatus = selectedStatus.value
      ? user.status === selectedStatus.value
      : true

    return matchesId && matchesRole && matchesStatus
  })
})

</script>

<template>
  <div class="container">
    <div class="header">
      <h1>User Management</h1>
    </div>

   
    <div class="filters">
      <input type="text" placeholder="Search by User ID" v-model="searchId" />
      <select v-model="selectedRole">
        <option value="">All Roles</option>
        <option>Admin</option>
        <option>User</option>
        <option>Manager</option>
      </select>
      <select v-model="selectedStatus">
        <option value="">All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

   
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Edit User</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <span :class="user.status === 'Active' ? 'status-active' : 'status-inactive'">
                {{ user.status }}
              </span>
            </td>
            <td class="actions">
              <button v-show="adminStore.isLoggedIn" class="btn-edit" @click="$router.push(`/edit-user/${user.id}`)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AddUser @add-user="addUser" />
</template>

<style scoped>
.container {
  max-width: 1000px;
  width: 95%;
  margin: 20px auto;
  padding: 10px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.header h1 {
  font-size: clamp(1.5rem, 2vw, 2rem);
  color: #333;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.filters input,
.filters select {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  flex: 1 1 150px;
}

.btn-edit {
  padding: 8px 16px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-edit:hover {
  background-color: #1e40af;
}

.table-container {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto; /* enable horizontal scroll on small screens */
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* ensures table has a minimum width on mobile */
}

thead {
  background-color: #f3f3f3;
}

th,
td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

.status-active {
  background-color: #dcfce7; 
  color: #166534;            
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
}

.status-inactive {
  background-color: #fee2e2; 
  color: #991b1b;            
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    flex-direction: column;
    gap: 8px;
  }

  th, td {
    font-size: 13px;
    padding: 10px 8px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.4rem;
  }

  .btn-edit {
    padding: 6px 12px;
    font-size: 13px;
  }
}
</style>
