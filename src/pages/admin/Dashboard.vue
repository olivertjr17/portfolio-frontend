<template>
  <div>
    <!-- Header -->
    <header class="relative bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>

    <!-- Main -->
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        <!-- Welcome Section -->
        <section
          class="bg-indigo-50 border border-indigo-100 p-6 rounded-xl shadow-sm"
        >
          <h2 class="text-xl font-semibold text-indigo-800">
            Welcome back, Admin 👋
          </h2>
          <p class="mt-2 text-gray-600">
            Here’s a quick overview of your portfolio’s performance and content
            status.
          </p>
        </section>

        <!-- Summary Cards -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="card in stats"
            :key="card.title"
            class="bg-white p-6 rounded-xl shadow border border-gray-100"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-500">
                  {{ card.title }}
                </h3>
                <p class="mt-1 text-2xl font-semibold text-gray-900">
                  {{ card.value }}
                </p>
              </div>
              <div class="p-3 rounded-full" :class="card.iconBg">
                <component :is="card.icon" class="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </section>

        <!-- Recent Activity -->
        <section class="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul role="list" class="divide-y divide-gray-100">
            <li
              v-for="(activity, index) in recentActivities"
              :key="index"
              class="py-4 flex items-start"
            >
              <div
                class="h-10 w-10 rounded-full flex items-center justify-center"
                :class="activity.iconBg"
              >
                <component
                  :is="activity.icon"
                  class="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm text-gray-800 font-medium">
                  {{ activity.title }}
                </p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  BriefcaseIcon,
  FolderIcon,
  UserIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/vue/24/solid"

const stats = [
  {
    title: "Total Projects",
    value: "12",
    icon: FolderIcon,
    iconBg: "bg-indigo-500",
  },
  {
    title: "Experiences",
    value: "5",
    icon: BriefcaseIcon,
    iconBg: "bg-emerald-500",
  },
  {
    title: "Profile Views (Week)",
    value: "238",
    icon: UserIcon,
    iconBg: "bg-blue-500",
  },
  {
    title: "Pending Updates",
    value: "2",
    icon: Cog6ToothIcon,
    iconBg: "bg-orange-500",
  },
]

const recentActivities = [
  {
    title: "Added new project: Portfolio Website",
    time: "2 hours ago",
    icon: FolderIcon,
    iconBg: "bg-indigo-500",
  },
  {
    title: "Updated experience: Fundline Systems Developer",
    time: "1 day ago",
    icon: BriefcaseIcon,
    iconBg: "bg-emerald-500",
  },
  {
    title: "Profile information updated",
    time: "3 days ago",
    icon: UserIcon,
    iconBg: "bg-blue-500",
  },
  {
    title: "Uploaded new resume",
    time: "5 days ago",
    icon: ArrowUpTrayIcon,
    iconBg: "bg-purple-500",
  },
]
</script>
