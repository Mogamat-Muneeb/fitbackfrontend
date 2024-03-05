<template>
  <div class="login">
    <h1>Login Page</h1>
    <form @submit.prevent="login">
      <label for="email">email:</label>
      <input type="text" id="email" v-model="email" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const store = useStore();
const router = useRouter();

const login = async () => {
  try {
    await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });
    router.push({ name: "home" });
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
