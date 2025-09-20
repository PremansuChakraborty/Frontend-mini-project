<script setup>
import { ref, onMounted } from 'vue'
import paymentData from '../data/payment.json'
import userData from '../data/user.json'

const stats = ref([])

onMounted(() => {

  const totalUsers = userData.length


  const totalPayments = paymentData.length
  const completedPayments = paymentData.filter(p => p.status === 'Completed').length
  const pendingPayments = paymentData.filter(p => p.status === 'Pending').length
  const failedPayments = paymentData.filter(p => p.status === 'Failed').length

  const completedPct = totalPayments ? ((completedPayments / totalPayments) * 100).toFixed(1) : 0
  const pendingPct = totalPayments ? ((pendingPayments / totalPayments) * 100).toFixed(1) : 0
  const failedPct = totalPayments ? ((failedPayments / totalPayments) * 100).toFixed(1) : 0

  stats.value = [
    { title: 'Total Users', value: totalUsers, color: '#1d4ed8', percentage: null },
    { title: 'Completed Payments', value: completedPayments, color: '#16a34a', percentage: completedPct },
    { title: 'Pending Payments', value: pendingPayments, color: '#f59e0b', percentage: pendingPct },
    { title: 'Failed Payments', value: failedPayments, color: '#dc2626', percentage: failedPct },
  ]
})
</script>

<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>

    <div class="stats-cards">
      <div class="card" v-for="(stat, index) in stats" :key="index" :style="{ borderTopColor: stat.color }">
        <h3>{{ stat.title }}</h3>
        <p>{{ stat.value }} <span v-if="stat.percentage">({{ stat.percentage }}%)</span></p>
      </div>
    </div>

    <div class="welcome">
      <h3>Welcome to the Admin Dashboard</h3>
      <p>Manage users, payments, and system settings from here.</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1000px;
  width: 95%;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
}

.stats-cards {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.card {
  flex: 1 1 200px;
  min-width: 200px;
  max-width: 250px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  border-top: 5px solid #1d4ed8;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
}

.card p {
  font-size: 20px;
  font-weight: bold;
  color: #111;
}

.card span {
  font-size: 14px;
  color: #666;
  font-weight: normal;
  margin-left: 4px;
}

.welcome {
  text-align: center;
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
}

.welcome h3 {
  margin-bottom: 10px;
  color: #1d4ed8;
}

.welcome p {
  color: #555;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stats-cards {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
    max-width: none;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.5rem;
  }

  .card p {
    font-size: 18px;
  }

  .card h3 {
    font-size: 14px;
  }
}
</style>
