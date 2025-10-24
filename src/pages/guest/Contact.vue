<template>
  <main class="bg-white min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Contact Me
        </h1>
        <p class="mt-2 text-gray-600 text-base max-w-2xl">
          Have a project in mind, want to collaborate, or just say hi? I’d love
          to hear from you!
        </p>
      </div>
    </header>

    <!-- Contact Section -->
    <section class="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <!-- <div class="bg-white rounded-2xl shadow-md p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            Send a Message
          </h2>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Full Name</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Email Address</label
              >
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Message</label
              >
              <textarea
                v-model="form.message"
                id="message"
                rows="5"
                required
                class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition"
            >
              {{ loading ? "Sending..." : "Send Message" }}
            </button>

            <p
              v-if="success"
              class="text-green-600 text-sm font-medium text-center mt-2"
            >
              ✅ Message sent successfully! I’ll get back to you soon.
            </p>
          </form>
        </div> -->

        <!-- Contact Info -->
        <div class="flex flex-col justify-center space-y-6">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-3">
              Let’s Connect
            </h2>
            <p class="text-gray-600">
              I’m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <span
                class="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full"
              >
                <EnvelopeIcon
                  class="h-6 w-6 text-white-100 hover:text-white transition"
                  aria-hidden="true"
                />
              </span>
              <a
                href="mailto:olivertjr17@gmail.com"
                class="text-gray-800 hover:text-indigo-600 font-medium"
                >olivertjr17@gmail.com</a
              >
            </div>

            <div class="flex items-center space-x-3">
              <span
                class="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full"
              >
                <PhoneIcon
                  class="h-6 w-6 text-white-100 hover:text-white transition"
                  aria-hidden="true"
                />
              </span>
              <a
                href="tel:+639123456789"
                class="text-gray-800 hover:text-indigo-600 font-medium"
                >+63 927 879 2464</a
              >
            </div>

            <div class="flex items-center space-x-3">
              <span
                class="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full"
              >
                <img src="/github-mark.svg" alt="GitHub logo" class="w-6 h-6" />
              </span>
              <a
                href="https://github.com/olivertjr17"
                target="_blank"
                class="text-gray-800 hover:text-indigo-600 font-medium"
                >github.com/olivertjr17</a
              >
            </div>

            <div class="flex items-center space-x-3">
              <span
                class="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full"
              >
                <img
                  src="/linkedin-svgrepo-com.svg"
                  alt="Linkedin logo"
                  class="w-6 h-6"
                />
              </span>
              <a
                href="https://www.linkedin.com/in/olivert-jamito-514a4b1b8/"
                target="_blank"
                class="text-gray-800 hover:text-indigo-600 font-medium"
                >linkedin.com/in/olivert-jamito-514a4b1b8/</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { EnvelopeIcon, LinkIcon, PhoneIcon } from "@heroicons/vue/24/outline"
import { ref } from "vue"

const form = ref({
  name: "",
  email: "",
  message: "",
})

const loading = ref(false)
const success = ref(false)

const handleSubmit = () => {
  loading.value = true
  success.value = false

  // Simulate async form submission
  setTimeout(() => {
    console.log("Form submitted:", form.value)
    loading.value = false
    success.value = true

    // Reset form
    form.value = { name: "", email: "", message: "" }
  }, 1500)
}
</script>
