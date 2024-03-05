<template>
  <div class="register">
    <h1>Register Page</h1>
    <form @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Register</button>
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

const register = async () => {
  try {
    await store.dispatch("register", {
      email: email.value,
      password: password.value,
    });
    router.push({ name: "home" }); // Redirect to home after successful registration
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>
