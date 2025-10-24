<template>
  <main class="bg-white">
    <!-- Hero Section -->
    <section class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-7xl py-24 sm:py-32">
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Hi, I’m
            <span class="text-indigo-600">Olivert S.B. Jamito Jr.</span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            A full-stack developer passionate about building scalable,
            meaningful digital solutions using
            <span class="font-semibold text-gray-900">
              PHP, Laravel, Vue.js, Tailwind CSS, and Docker </span
            >.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <RouterLink
              to="/projects"
              class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View My Work
            </RouterLink>
            <RouterLink
              to="/about-me"
              class="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
              >Learn more <span aria-hidden="true">→</span></RouterLink
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Intro / About Preview -->
    <section class="bg-gray-50 py-16">
      <div
        class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10"
      >
        <img
          :src="imageUrl"
          alt="Profile photo"
          class="w-40 h-40 rounded-full object-cover shadow-md"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">
            A Developer Who Builds With Purpose
          </h2>
          <p class="mt-3 text-gray-600 leading-7 max-w-2xl">
            I build practical and efficient web applications that solve real
            problems. I focus on writing clean, maintainable code and enjoy
            learning new technologies that push my skills and creativity
            forward.
          </p>
          <RouterLink
            to="/professional"
            class="mt-6 inline-block text-indigo-600 font-semibold hover:text-indigo-500"
          >
            See My Experience →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
          Featured Projects
        </h2>

        <!-- Loading State -->
        <div v-if="loading" class="text-center text-gray-500">
          Loading featured projects...
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>

        <!-- Projects Grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
        >
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="w-full max-w-sm bg-white rounded-lg shadow hover:shadow-lg transition p-5"
          >
            <div class="aspect-w-16 aspect-h-9 mb-4">
              <img
                :src="
                  project.image_url || 'https://via.placeholder.com/600x400'
                "
                alt="Project preview"
                class="rounded-md object-cover w-full h-48"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 text-sm mt-2 line-clamp-3">
              {{ project.description }}
            </p>
            <RouterLink
              :to="`/projects`"
              class="text-indigo-600 font-medium text-sm mt-3 inline-block hover:text-indigo-500"
            >
              Learn More →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="bg-indigo-600 py-16 text-center text-white">
      <h2 class="text-3xl font-semibold">Let’s Build Something Together</h2>
      <p class="mt-4 text-indigo-100">
        Interested in collaborating or hiring me? I’d love to connect.
      </p>
      <RouterLink
        to="/contact"
        class="mt-6 inline-block rounded-md bg-white px-5 py-3 text-indigo-600 font-semibold hover:bg-indigo-50"
      >
        Get in Touch
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axiosClient from "../../axios"

const imageUrl = import.meta.env.VITE_API_URL + "/storage/olivert.jpg"

const featuredProjects = ref([])
const loading = ref(true)
const error = ref(null)

// ✅ Fetch featured projects1
async function fetchFeaturedProjects() {
  try {
    const response = await axiosClient.get("/api/projects/all-featured")
    featuredProjects.value = response.data
  } catch (err) {
    console.error("Error fetching featured projects:", err)
    error.value = "Failed to load featured projects."
  } finally {
    loading.value = false
  }
}

onMounted(fetchFeaturedProjects)
</script>
