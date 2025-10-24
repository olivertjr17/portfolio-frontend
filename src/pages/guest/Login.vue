<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div
      class="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6 border border-gray-100"
    >
      <!-- Logo / Title -->
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p class="text-sm text-gray-500 mt-1">
          Sign in to access your admin dashboard
        </p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="login" class="space-y-5">
        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 3l18 18M10.477 10.477A3 3 0 0013.5 13.5m1.06-1.06A8.458 8.458 0 0112 19.5c-4.477 0-8.268-2.943-9.542-7a8.466 8.466 0 013.388-4.412m4.162-1.484A8.459 8.459 0 0112 4.5c4.477 0 8.268 2.943 9.542 7a8.46 8.46 0 01-1.249 2.31"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember Me + Forgot Password -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center space-x-2">
            <input
              v-model="form.remember"
              type="checkbox"
              class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span class="text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium"
            >Forgot password?</a
          >
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Sign In
        </button>

        <!-- Error Message -->
        <p v-if="error" class="text-sm text-red-600 text-center">
          {{ error }}
        </p>
      </form>

      <!-- Footer -->
      <div class="text-center text-sm text-gray-500">
        © {{ new Date().getFullYear() }} Your Portfolio Admin
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import axiosClient from "../../axios"

const router = useRouter()

const form = ref({
  email: "",
  password: "",
  remember: false,
})
const showPassword = ref(false)
const error = ref("")

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const login = async () => {
  error.value = ""

  if (!form.value.email || !form.value.password) {
    error.value = "Please enter your email and password."
    return
  }

  try {
    // Get CSRF cookie first
    await axiosClient.get("/sanctum/csrf-cookie")

    // Login request
    const response = await axiosClient.post("/login", {
      email: form.value.email,
      password: form.value.password,
      remember: form.value.remember,
    })

    console.log("Login success:", response.data)
    router.push({ name: "AdminDashboard" })
  } catch (err) {
    console.error("Login failed:", err)
    if (err.response?.status === 422) {
      error.value = "Invalid email or password."
    } else if (err.response?.status === 419) {
      error.value = "CSRF token mismatch. Please refresh and try again."
    } else {
      error.value = "Something went wrong. Please try again later."
    }
  }
}
</script>
