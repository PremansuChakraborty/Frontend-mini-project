<script setup>
import { ref } from 'vue'
import Payment from './components/Payment.vue'
import User from './components/User.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <NavBar/>
  </div>
  <router-view/>
</template>

<style scoped>
/* Navbar Styles */
.navbar {
  background-color: #1d4ed8;
  color: white;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* allows wrapping on small screens */
  gap: 10px;
}

.brand {
  font-weight: bold;
  font-size: clamp(16px, 4vw, 20px); /* responsive font size */
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 15px;
  flex-wrap: wrap; /* wrap links on small screens */
}

.nav-links li {
  font-weight: 500;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
  font-size: clamp(12px, 3vw, 16px); /* responsive font size */
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    width: 100%;
    justify-content: flex-start;
    gap: 8px;
  }

  .nav-links a {
    padding: 6px 8px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 8px 12px;
  }

  .brand {
    font-size: 1rem;
  }

  .nav-links {
    gap: 6px;
  }

  .nav-links a {
    padding: 5px 6px;
  }
}

/* Main Content */
.main-content {
  padding: 20px;
}
</style>
