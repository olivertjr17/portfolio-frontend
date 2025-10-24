<template>
  <div>
    <!-- Header -->
    <header class="relative bg-white shadow-sm">
      <div
        class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center"
      >
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Projects
        </h1>
        <button
          @click="openModal('add')"
          class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          + New Project
        </button>
      </div>
    </header>

    <!-- Main -->
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <!-- Table -->
        <div
          class="overflow-x-auto bg-white rounded-lg shadow border border-gray-100"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Title
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Description
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Tech Stack
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Featured
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="(project, index) in projects"
                :key="project.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ project.title }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                  {{ project.description }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ project.tech_stack }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <span
                    :class="
                      project.is_featured
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    "
                    class="px-2 inline-flex text-xs font-semibold rounded-full"
                  >
                    {{ project.is_featured ? "Yes" : "No" }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <button
                    @click="openModal('edit', project)"
                    class="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteProject(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!projects.length">
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No projects found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination.total > pagination.per_page"
          class="mt-4 flex justify-center space-x-2"
        >
          <button
            @click="fetchProjects(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          <span class="px-3 py-1 text-sm text-gray-600">
            Page {{ pagination.current_page }} of {{ pagination.last_page }}
          </span>

          <button
            @click="fetchProjects(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50"
      >
        <div
          class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 space-y-4"
        >
          <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">
            {{ modalMode === "add" ? "Add Project" : "Edit Project" }}
          </h2>

          <form
            @submit.prevent="createOrUpdateProject"
            enctype="multipart/form-data"
          >
            <div class="space-y-4">
              <!-- Title -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Title</label
                >
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Description</label
                >
                <textarea
                  v-model="form.description"
                  rows="3"
                  class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>

              <!-- Tech Stack -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Tech Stack</label
                >
                <input
                  v-model="form.tech_stack"
                  type="text"
                  placeholder="e.g., Vue, Tailwind, Laravel"
                  class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <!-- Demo Link -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Demo Link</label
                >
                <input
                  v-model="form.demo_link"
                  type="url"
                  placeholder="https://example.com/demo"
                  class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <!-- GitHub Link -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >GitHub Link</label
                >
                <input
                  v-model="form.github_link"
                  type="url"
                  placeholder="https://github.com/username/project"
                  class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Project Image</label
                >
                <input
                  @change="handleFileUpload"
                  type="file"
                  accept="image/*"
                  class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div v-if="form.image_preview" class="mt-2">
                  <img
                    :src="form.image_preview"
                    alt="Preview"
                    class="h-32 w-auto rounded-md border"
                  />
                </div>
              </div>

              <!-- Featured -->
              <div class="flex items-center space-x-2">
                <input
                  v-model="form.is_featured"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label class="text-sm font-medium text-gray-700"
                  >Feature this project</label
                >
              </div>
            </div>

            <!-- Buttons -->
            <div class="mt-6 flex justify-end space-x-3 border-t pt-4">
              <button
                type="button"
                @click="closeModal"
                class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                {{ modalMode === "add" ? "Add Project" : "Save Changes" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axiosClient from "../../axios"

const projects = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 5,
})

async function fetchProjects(page = 1) {
  try {
    const response = await axiosClient.get(`/api/projects?page=${page}`)
    projects.value = response.data.data
    pagination.value = {
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      total: response.data.total,
      per_page: response.data.per_page,
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error)
  }
}

onMounted(() => fetchProjects())

const showModal = ref(false)
const modalMode = ref("add")
const editIndex = ref(null)
const form = ref({
  title: "",
  description: "",
  tech_stack: "",
  demo_link: "",
  github_link: "",
  image: null,
  image_preview: null,
  is_featured: false,
})

function openModal(mode, project = null) {
  modalMode.value = mode
  if (mode === "edit" && project) {
    editIndex.value = projects.value.indexOf(project)
    form.value = {
      ...project,
      image: null,
      image_preview: project.image_url ?? null,
      is_featured: Boolean(project.is_featured),
    }
  } else {
    form.value = {
      title: "",
      description: "",
      tech_stack: "",
      demo_link: "",
      github_link: "",
      image: null,
      image_preview: null,
      is_featured: false,
    }
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    if (form.value.image_preview) {
      URL.revokeObjectURL(form.value.image_preview)
    }
    form.value.image = file
    form.value.image_preview = URL.createObjectURL(file)
  }
}

async function createOrUpdateProject() {
  try {
    const formData = new FormData()
    for (const key in form.value) {
      if (form.value[key] !== null) {
        formData.append(key, form.value[key])
      }
    }

    if (modalMode.value === "add") {
      await axiosClient.post("/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    } else if (modalMode.value === "edit" && editIndex.value !== null) {
      const id = projects.value[editIndex.value].id
      await axiosClient.post(`/api/projects/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    }

    closeModal()
    fetchProjects(pagination.value.current_page)
  } catch (error) {
    console.error("Error saving project:", error)
    alert("Failed to save project. Please try again.")
  }
}

async function deleteProject(index) {
  if (confirm("Are you sure you want to delete this project?")) {
    const id = projects.value[index].id
    try {
      await axiosClient.delete(`/api/projects/${id}`)
      fetchProjects(pagination.value.current_page)
    } catch (error) {
      console.error("Failed to delete project:", error)
      alert("Failed to delete project.")
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
