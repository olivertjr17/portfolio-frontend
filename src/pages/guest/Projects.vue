<template>
  <main class="bg-white min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Projects
        </h1>
        <p class="mt-2 text-gray-600 text-base max-w-2xl">
          A collection of my favorite projects — blending creativity, clean
          code, and problem-solving. Each project taught me something new.
        </p>
      </div>
    </header>

    <!-- Loading State -->
    <section
      v-if="loading"
      class="flex justify-center items-center h-64 text-gray-500"
    >
      Loading projects...
    </section>

    <!-- Error State -->
    <section
      v-else-if="error"
      class="flex justify-center items-center h-64 text-red-500"
    >
      {{ error }}
    </section>

    <!-- Projects Grid -->
    <section v-else class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <div class="relative h-48 bg-gray-100">
            <img
              :src="project.image_url"
              alt="Project Preview"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 text-sm mt-2 flex-1">
              {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="(tech, i) in splitTech(project.tech_stack)"
                :key="i"
                class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Links -->
            <div class="mt-4 flex gap-3">
              <a
                v-if="project.demo_link"
                :href="project.demo_link"
                target="_blank"
                class="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >Live Demo →</a
              >
              <a
                v-if="project.github_link"
                :href="project.github_link"
                target="_blank"
                class="inline-block text-sm font-medium text-gray-600 hover:text-indigo-500"
                >GitHub →</a
              >
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!projects.length"
          class="col-span-full text-center text-gray-500 py-16"
        >
          No projects found.
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axiosClient from "../../axios"

const projects = ref([])
const loading = ref(true)
const error = ref(null)

// ✅ Fetch projects from API
async function fetchProjects() {
  try {
    const response = await axiosClient.get("/api/projects/all")
    projects.value = response.data.data || response.data
  } catch (err) {
    console.error("Error fetching projects:", err)
    error.value = "Failed to load projects."
  } finally {
    loading.value = false
  }
}

// ✅ Utility: split comma-separated tech stack
function splitTech(techStack) {
  return techStack ? techStack.split(",").map((t) => t.trim()) : []
}

// ✅ Utility: resolve correct image URL
function getImageUrl(imagePath) {
  if (!imagePath) return "https://via.placeholder.com/600x400"
  if (imagePath.startsWith("http")) return imagePath
  return `/storage/${imagePath}`
}

onMounted(fetchProjects)
</script>
