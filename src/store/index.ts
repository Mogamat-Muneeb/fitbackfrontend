import { createStore } from "vuex";

const baseURL = "http://localhost:9000";

export default createStore({
  state: {
    currentUser: null,
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    async login({ commit }, userData) {
      try {
        const response = await fetch(`${baseURL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          commit("setCurrentUser", data);
        } else {
          throw new Error(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await fetch(`${baseURL}/auth/register`, {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          commit("setCurrentUser", data);
        } else {
          throw new Error(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("setCurrentUser", null);
    },
  },
  modules: {},
});
