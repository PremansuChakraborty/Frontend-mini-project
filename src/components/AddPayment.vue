<script setup>
import { ref } from "vue"

const user = ref("")
const amount = ref("")
const status = ref("Completed")
const date = ref("")

const emit = defineEmits(["add-payment"])

const addPayment = () => {
  if (user.value && amount.value && date.value) {
    const newPayment = {
      id: Date.now(),
      user: user.value,
      amount: parseFloat(amount.value),
      status: status.value,
      date: date.value,
    }
    emit("add-payment", newPayment)


    user.value = ""
    amount.value = ""
    status.value = "Completed"
    date.value = ""
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Add Payment</h2>
    <form @submit.prevent="addPayment">
      <div class="form-group">
        <label>User:</label>
        <input type="text" v-model="user" required />
      </div>

      <div class="form-group">
        <label>Amount:</label>
        <input type="number" v-model="amount" required />
      </div>

      <div class="form-group">
        <label>Status:</label>
        <select v-model="status">
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      <div class="form-group">
        <label>Date:</label>
        <input type="date" v-model="date" required />
      </div>

      <button type="submit">Add Payment</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 500px;
  max-width: 90%;  /* Make it responsive */
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus,
select:focus {
  border-color: #1d4ed8;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #1e40af;
}

/* Responsive adjustments for tablets and smaller screens */
@media (max-width: 768px) {
  .form-container {
    width: 90%;
    padding: 15px;
  }

  button {
    padding: 10px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .form-container {
    width: 95%;
    padding: 10px;
  }

  input,
  select {
    padding: 8px;
  }

  button {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
