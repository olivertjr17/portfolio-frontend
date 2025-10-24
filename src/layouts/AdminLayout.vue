<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="{ name: item.componentName }"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  exact-active-class="bg-gray-900 text-white"
                >
                  {{ item.name }}
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <MenuButton
                  class="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>

                  <UserCircleIcon
                    class="h-6 w-6 text-gray-300 hover:text-white transition"
                    aria-hidden="true"
                  />
                  <div class="ml-3">
                    <div class="text-base font-medium text-white">
                      {{ user.name }}
                    </div>
                    <div class="text-sm font-medium text-gray-400">
                      {{ user.email }}
                    </div>
                  </div>
                </MenuButton>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <button
                        v-if="item.action"
                        @click="item.action()"
                        type="button"
                        :class="[
                          active ? 'bg-gray-100 outline-hidden' : '',
                          'block w-full text-left px-4 py-2 text-sm text-gray-700',
                        ]"
                      >
                        {{ item.name }}
                      </button>

                      <a
                        v-else
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100 outline-hidden' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                      >
                        {{ item.name }}
                      </a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :to="{ name: item.componentName }"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            exact-active-class="bg-gray-900 text-white"
            >{{ item.name }}
          </RouterLink>
        </div>
        <div class="border-t border-white/10 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="shrink-0">
              <UserCircleIcon
                class="h-6 w-6 text-gray-300 hover:text-white transition"
                aria-hidden="true"
              />
            </div>
            <div class="ml-3">
              <div class="text-base/5 font-medium text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-gray-400">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <template v-for="(item, index) in userNavigation" :key="index">
              <!-- Normal navigation links -->
              <RouterLink
                v-if="item && !item.action && item.to"
                :to="{ name: item.name }"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
              >
                {{ item.name }}
              </RouterLink>

              <!-- Logout or other action buttons -->
              <button
                v-else-if="item && item.action"
                @click="item.action()"
                class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
              >
                {{ item.name }}
              </button>
            </template>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <RouterView />
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue"
import { Bars3Icon, UserCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { RouterLink } from "vue-router"
import axiosClient from "../axios"
import { router } from "../router"
import useUserStore from "../store/user"
import { computed } from "vue"

const userStore = useUserStore()

const user = computed(() => userStore.user)

const navigation = [
  { name: "Dashboard", componentName: "AdminDashboard" },
  { name: "Projects", componentName: "AdminProjects" },
  // { name: "Experience", componentName: "AdminExperience" },
  { name: "Settings", componentName: "AdminSettings" },
]
const logout = async () => {
  try {
    await axiosClient.post("/logout")
    router.push({ name: "GuestLogin" })
  } catch (error) {
    console.error("Logout failed:", error)
  }
}
const userNavigation = [{ name: "Sign out", action: logout }]
</script>
