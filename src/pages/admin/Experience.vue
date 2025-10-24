<template>
  <div>
    <!-- Header -->
    <header class="relative bg-white shadow-sm">
      <div
        class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center"
      >
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Experience
        </h1>
        <button
          @click="openModal('add')"
          class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          + Add Experience
        </button>
      </div>
    </header>

    <!-- Main -->
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div
          class="overflow-x-auto bg-white rounded-lg shadow border border-gray-100"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="(exp, index) in experiences"
                :key="index"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ exp.position }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ exp.company }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ exp.start }} - {{ exp.end }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                  {{ exp.description }}
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <button
                    @click="openModal('edit', exp)"
                    class="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteExperience(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!experiences.length">
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No experiences added yet.
                </td>
              </tr>
            </tbody>
          </table>
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
            {{ modalMode === "add" ? "Add Experience" : "Edit Experience" }}
          </h2>

          <form @submit.prevent="saveExperience">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Position</label
                >
                <input
                  v-model="form.position"
                  type="text"
                  required
                  class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Company</label
                >
                <input
                  v-model="form.company"
                  type="text"
                  required
                  class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Start Date</label
                  >
                  <input
                    v-model="form.start"
                    type="text"
                    placeholder="e.g., Jan 2021"
                    required
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >End Date</label
                  >
                  <input
                    v-model="form.end"
                    type="text"
                    placeholder="e.g., Dec 2023 or Present"
                    required
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

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
            </div>

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
                {{ modalMode === "add" ? "Add Experience" : "Save Changes" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue"

const experiences = ref([
  {
    position: "Software Developer",
    company: "Fundline Philippines",
    start: "Jan 2023",
    end: "Present",
    description:
      "Developed and maintained internal systems using PHP and Laravel.",
  },
  {
    position: "Freelance Web Developer",
    company: "Self-Employed",
    start: "Jun 2021",
    end: "Dec 2022",
    description: "Built responsive websites and web apps for small businesses.",
  },
])

const showModal = ref(false)
const modalMode = ref("add")
const editIndex = ref(null)
const form = ref({
  position: "",
  company: "",
  start: "",
  end: "",
  description: "",
})

function openModal(mode, exp = null) {
  modalMode.value = mode
  if (mode === "edit" && exp) {
    editIndex.value = experiences.value.indexOf(exp)
    form.value = { ...exp }
  } else {
    form.value = {
      position: "",
      company: "",
      start: "",
      end: "",
      description: "",
    }
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveExperience() {
  if (modalMode.value === "add") {
    experiences.value.push({ ...form.value })
  } else if (modalMode.value === "edit" && editIndex.value !== null) {
    experiences.value[editIndex.value] = { ...form.value }
  }
  closeModal()
}

function deleteExperience(index) {
  if (confirm("Are you sure you want to delete this experience?")) {
    experiences.value.splice(index, 1)
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
