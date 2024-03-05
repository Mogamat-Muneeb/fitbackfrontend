<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!currentUser" to="/login">Login</router-link> |
    <router-link v-if="!currentUser" to="/register">Register</router-link>
    <span v-else>Welcome, {{ currentUser.email }}</span>
    <button v-if="currentUser" @click="logout">Logout</button>
  </nav>
  <router-view />
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const currentUser = computed(() => store.getters.getCurrentUser);

const logout = () => {
  store.dispatch("logout");
  router.push("/login");
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
