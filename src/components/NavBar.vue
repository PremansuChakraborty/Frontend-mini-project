<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="brand" @click="$router.push('/')">Paymet Manager</div>
      <ul class="nav-links">
        <li><router-link to="/">Reports</router-link></li>
        <li><router-link to="/user">Users</router-link></li>
        <li><router-link to="/payment">Payments</router-link></li>
        <li><router-link to="/admin-login">{{store.isLoggedIn? "Logout" :"Login" }}</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>

<style scoped>
.navbar {
  background-color: #1d4ed8;
  color: white;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  position: relative;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.brand {
  font-weight: bold;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  cursor: pointer;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 15px;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-links li a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Hamburger for mobile */
.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.menu-toggle div {
  width: 25px;
  height: 3px;
  background-color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    width: 100%;
    display: none; /* hidden by default */
    margin-top: 10px;
  }

  .nav-links.active {
    display: flex;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
