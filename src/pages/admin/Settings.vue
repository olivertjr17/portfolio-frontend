<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Settings
        </h1>
      </div>
    </header>

    <!-- Content -->
    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl shadow p-6 space-y-8">
        <!-- Tabs -->
        <div class="border-b border-gray-200 flex space-x-6">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'pb-2 font-medium',
              activeTab === 'profile'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Profile
          </button>
          <button
            @click="activeTab = 'appearance'"
            :class="[
              'pb-2 font-medium',
              activeTab === 'appearance'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Appearance
          </button>
          <button
            @click="activeTab = 'system'"
            :class="[
              'pb-2 font-medium',
              activeTab === 'system'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            System
          </button>
          <button
            @click="activeTab = 'password'"
            :class="[
              'pb-2 font-medium',
              activeTab === 'password'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Password
          </button>
        </div>

        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900">Profile Settings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="settings.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="settings.email"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                v-model="settings.bio"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </div>
          <div>
            <button
              @click="saveProfile"
              class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        <!-- Appearance Tab -->
        <div v-if="activeTab === 'appearance'" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900">Appearance</h2>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Theme:</span>
            <button
              @click="theme = 'light'"
              :class="theme === 'light' ? activeThemeClass : inactiveThemeClass"
            >
              Light
            </button>
            <button
              @click="theme = 'dark'"
              :class="theme === 'dark' ? activeThemeClass : inactiveThemeClass"
            >
              Dark
            </button>
          </div>
        </div>

        <!-- System Tab -->
        <div v-if="activeTab === 'system'" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900">System Options</h2>
          <div>
            <button
              @click="openModal = true"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
        <!-- Password Tab -->
        <div v-if="activeTab === 'password'" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900">Change Password</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700"
                >Current Password</label
              >
              <input
                v-model="passwordForm.current_password"
                type="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >New Password</label
              >
              <input
                v-model="passwordForm.password"
                type="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Confirm Password</label
              >
              <input
                v-model="passwordForm.password_confirmation"
                type="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <button
              @click="updatePassword"
              class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <TransitionRoot as="template" :show="openModal">
      <Dialog as="div" class="relative z-10" @close="openModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 flex items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium text-gray-900 mb-4"
              >
                Confirm Reset
              </DialogTitle>
              <p class="text-sm text-gray-500 mb-6">
                This will reset all settings to default. Are you sure you want
                to proceed?
              </p>
              <div class="flex justify-center space-x-4">
                <button
                  @click="resetSettings"
                  class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Yes, Reset
                </button>
                <button
                  @click="openModal = false"
                  class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from "vue"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import axiosClient from "../../axios"

const passwordForm = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
})

const updatePassword = async () => {
  try {
    await axiosClient.post("/user/password", passwordForm.value)
    alert("Password updated successfully!")
    passwordForm.value = {
      current_password: "",
      password: "",
      password_confirmation: "",
    }
  } catch (error) {
    if (error.response?.status === 422) {
      const errors = error.response.data.errors
      const firstError = Object.values(errors)[0][0]
      alert(`Error: ${firstError}`)
    } else {
      alert("An unexpected error occurred.")
    }
  }
}

const activeTab = ref("profile")
const openModal = ref(false)
const theme = ref("light")

const settings = ref({
  name: "Olivert Jamito",
  email: "olivert@example.com",
  bio: "Full Stack Developer passionate about Vue, Laravel, and Docker deployments.",
})

const saveProfile = () => {
  alert("Profile saved successfully!")
}

const resetSettings = () => {
  openModal.value = false
  settings.value = { name: "", email: "", bio: "" }
  theme.value = "light"
  alert("Settings reset to default.")
}

const activeThemeClass =
  "px-3 py-1 bg-indigo-600 text-white rounded-md shadow-sm"
const inactiveThemeClass =
  "px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
</script>
