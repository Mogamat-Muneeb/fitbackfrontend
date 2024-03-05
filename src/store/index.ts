// import { createStore } from "vuex";

// const baseURL = "http://localhost:9000";

// export default createStore({
//   state: {
//     currentUser:
//       JSON.parse(localStorage.getItem("currentUser") as string) || null,
//     accessToken: localStorage.getItem("accessToken") || null,
//   },
//   getters: {
//     getCurrentUser: (state) => state.currentUser,
//   },
//   mutations: {
//     setCurrentUser(state, user) {
//       state.currentUser = user;
//       localStorage.setItem("currentUser", JSON.stringify(user));
//     },
//     setAccessToken(state, token) {
//       state.accessToken = token;
//       localStorage.setItem("accessToken", token);
//     },
//     clearCurrentUser(state) {
//       state.currentUser = null;
//       localStorage.removeItem("currentUser");
//       localStorage.removeItem("accessToken");
//     },
//   },
//   actions: {
//     // async login({ commit }, userData) {
//     //   try {
//     //     const response = await fetch(`${baseURL}/auth/login`, {
//     //       method: "POST",
//     //       body: JSON.stringify(userData),
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //     });
//     //     const data = await response.json();
//     //     if (response.ok) {
//     //       commit("setCurrentUser", data);
//     //       commit("setAccessToken", data.accessToken);
//     //     } else {
//     //       throw new Error(data.message || "Login failed");
//     //     }
//     //   } catch (error) {
//     //     console.error("Login error:", error);
//     //     throw error;
//     //   }
//     // },

//     async login({ commit }, userData) {
//       try {
//         const response = await fetch(`${baseURL}/auth/login`, {
//           method: "POST",
//           body: JSON.stringify(userData),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();
//         console.log("Response data:", data); // Log the response data
//         if (response.ok) {
//           commit("setCurrentUser", data);
//           commit("setAccessToken", data.accessToken);
//         } else {
//           throw new Error(data.message || "Login failed");
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//       }
//     },
//     async register({ commit }, userData) {
//       try {
//         const response = await fetch(`${baseURL}/auth/register`, {
//           method: "POST",
//           body: JSON.stringify(userData),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           commit("setCurrentUser", data);
//           commit("setAccessToken", data.accessToken);
//         } else {
//           throw new Error(data.message || "Registration failed");
//         }
//       } catch (error) {
//         console.error("Registration error:", error);
//         throw error;
//       }
//     },
//     async logout({ commit }) {
//       commit("clearCurrentUser");
//     },
//     async refreshAccessToken({ commit, state }) {
//       try {
//         const response = await fetch(`${baseURL}/auth/refresh-token`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${state.accessToken}`,
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           commit("setAccessToken", data.accessToken);
//         } else {
//           throw new Error(data.message || "Token refresh failed");
//         }
//       } catch (error) {
//         console.error("Token refresh error:", error);
//         throw error;
//       }
//     },
//   },
//   modules: {},
// });

import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const baseURL = "http://localhost:9000";

// Initialize vuex-persist
const vuexLocalStorage = new VuexPersist({
  key: "my-app", // The key to store the state in local storage
  storage: window.localStorage, // Use local storage as storage medium
});

export default createStore({
  state: {
    currentUser: null,
    accessToken: null,
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
      state.accessToken = null;
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
        console.log("Response data:", data); // Log the response data
        if (response.ok) {
          commit("setCurrentUser", data);
          commit("setAccessToken", data.accessToken);
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
          commit("setAccessToken", data.accessToken);
        } else {
          throw new Error(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    async logout({ commit }) {
      commit("clearCurrentUser");
    },
    async refreshAccessToken({ commit, state }) {
      try {
        const response = await fetch(`${baseURL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          commit("setAccessToken", data.accessToken);
        } else {
          throw new Error(data.message || "Token refresh failed");
        }
      } catch (error) {
        console.error("Token refresh error:", error);
        throw error;
      }
    },
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin], // Add vuex-persist as a Vuex plugin
});
