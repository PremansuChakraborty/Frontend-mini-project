<script setup>
import { ref, computed } from "vue"
import paymentData from "../data/payment.json"
import AddPayment from "./AddPayment.vue"
import { useStore } from "vuex"

const store = useStore()
const payments = ref(paymentData)

const searchText = ref("")
const selectedStatus = ref("")
const selectedDate = ref("")

const statusColors = {
  Completed: "status-completed",
  Pending: "status-pending",
  Failed: "status-failed",
}

const filteredPayments = computed(() => {
  return payments.value.filter(p => {
    const matchesText =
      p.user.toLowerCase().includes(searchText.value.toLowerCase()) ||
      String(p.id).includes(searchText.value)

    const matchesStatus = selectedStatus.value
      ? p.status === selectedStatus.value
      : true

    const matchesDate = selectedDate.value
      ? p.date === selectedDate.value
      : true

    return matchesText && matchesStatus && matchesDate
  })
})

const addPayment = (payment) => {
  payments.value.push(payment)
}

const isLoggedIn = computed(() => store.getters.isLoggedIn)
const adminEmail = computed(() => store.getters.adminEmail)
</script>


<template>
     <div class="container">
    <div class="header">
      <h1>Payments</h1>
    </div>

    

    <div class="filters">
      <input
        type="text"
        placeholder="Search by User or ID"
        v-model="searchText"
      />
      <select v-model="selectedStatus">
        <option value="">All Status</option>
        <option>Completed</option>
        <option>Pending</option>
        <option>Failed</option>
      </select>
      <input type="date" v-model="selectedDate" />
    </div>


    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredPayments" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.user }}</td>
            <td>₹{{ p.amount.toLocaleString() }}</td>
            <td><span :class="statusColors[p.status]">{{ p.status }}</span></td>
            <td>{{ p.date }}</td>
            <td class="actions">
              <button v-show="isLoggedIn" class="btn-edit" @click="$router.push(`/edit-payment/${p.id}`)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AddPayment @add-payment="addPayment" />

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
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.header h1 {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: #333;
}

.btn-add {
  padding: 8px 16px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-add:hover {
  background-color: #1e40af;
}


.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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


.table-container {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto; 
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; 
}

thead {
  background-color: #f3f3f3;
}

th,
td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 0.9rem;
}

tbody tr:hover {
  background-color: #f9f9f9;
}


.status-completed {
  background-color: #dcfce7;
  color: #166534;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 13px;
}

.status-pending {
  background-color: #fef3c7;
  color: #78350f;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 13px;
}

.status-failed {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 13px;
}


.actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  text-decoration: underline;
}

.btn-view {
  color: #1d4ed8;
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

.actions .btn-edit {
  padding: 8px 16px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.actions .btn-edit:hover {
  background-color: #1e40af;
}


.actions button:hover {
  opacity: 0.8;
}


@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-add {
    width: 100%;
  }

  .filters {
    flex-direction: column;
  }
}
</style>
