<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import paymentData from '../data/payment.json'

const route = useRoute()
const router = useRouter()


const paymentId = route.params.paymentId


const payment = ref(null)

onMounted(() => {
  const foundPayment = paymentData.find(p => p.id === paymentId)
  if (foundPayment) {
    payment.value = { ...foundPayment } 
  } else {
    alert('Payment not found!')
    router.push('/payment') 
  }
})


const savePayment = () => {
  if (!payment.value.user || !payment.value.amount || !payment.value.date) {
    alert('Please fill all required fields')
    return
  }

  
  const index = paymentData.findIndex(p => p.id === paymentId)
  if (index !== -1) {
    paymentData[index] = { ...payment.value } 
    alert('Payment updated successfully!')
    router.push('/payment') 
  }
}
</script>

<template>
  <div class="form-container" v-if="payment">
    <h2>Edit Payment</h2>
    <form @submit.prevent="savePayment">
      <div class="form-group">
        <label>User:</label>
        <input type="text" v-model="payment.user" required />
      </div>

      <div class="form-group">
        <label>Amount:</label>
        <input type="number" v-model="payment.amount" required />
      </div>

      <div class="form-group">
        <label>Status:</label>
        <select v-model="payment.status">
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      <div class="form-group">
        <label>Date:</label>
        <input type="date" v-model="payment.date" required />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 90%;
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
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
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input,
select {
  width: 100%;
  padding: clamp(8px, 1.5vw, 10px); /* responsive padding */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: clamp(0.9rem, 1.2vw, 1rem); /* responsive font */
  outline: none;
  transition: border 0.2s;
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
