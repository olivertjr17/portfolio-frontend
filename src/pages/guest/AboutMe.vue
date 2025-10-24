<template>
  <header class="relative bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">About Me</h1>
      <p class="mt-2 text-gray-600 text-base">
        A quick introduction about who I am, what I do, and what I’m passionate
        about.
      </p>
    </div>
  </header>

  <main>
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      <!-- Profile Section -->
      <section
        class="flex flex-col md:flex-row items-center md:items-start gap-8"
      >
        <img
          :src="imageUrl"
          alt="Profile photo"
          class="w-40 h-40 rounded-full object-cover shadow-md"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">
            Olivert S.B. Jamito Jr.
          </h2>
          <p class="text-gray-600 mt-2">
            I am doing Full-Stack Development. I enjoy crafting clean,
            efficient, and scalable web applications using modern tools like
            Vue, Laravel, and Docker.
          </p>
          <p class="text-gray-600 mt-3">
            I’m passionate about solving real-world problems through code,
            exploring AI integrations, and building tools that make work easier
            and smarter.
          </p>
        </div>
      </section>

      <!-- Skills Section -->
      <section>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Skills & Tools</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >PHP</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >Laravel</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >Vue.js</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >Angular</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >Docker</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >MySQL</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >TailwindCSS</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >AWS EC2</span
          >
          <span
            class="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >CI/CD</span
          >
        </div>
      </section>

      <!-- Journey / Experience Section -->
      <section>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">My Journey</h3>
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">2021</dt>
            <dd class="mt-1 text-sm text-gray-600 sm:col-span-2">
              Started exploring PHP and web development fundamentals.
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">2022</dt>
            <dd class="mt-1 text-sm text-gray-600 sm:col-span-2">
              Graduated from college and landed my first job, where I learned
              Laravel and Angular.
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">2023</dt>
            <dd class="mt-1 text-sm text-gray-600 sm:col-span-2">
              Continued growing in full-stack development and deepened my
              backend expertise.
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">2024</dt>
            <dd class="mt-1 text-sm text-gray-600 sm:col-span-2">
              Landed my second job as a software engineer, maintaining and
              modernizing internal systems by converting legacy applications
              into Laravel. In the same year, I joined my third company where I
              handled multiple enterprise projects built using Drupal, Laravel,
              and CodeIgniter.
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">2025</dt>
            <dd class="mt-1 text-sm text-gray-600 sm:col-span-2">
              Exploring AI-powered projects, building my personal portfolio
              website, and creating mini projects using Vue.js and Laravel.
            </dd>
          </div>
        </dl>
      </section>

      <!-- Attachments or Resume -->
      <!-- <section>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Attachments</h3>
        <ul
          role="list"
          class="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          <li class="flex items-center justify-between py-4 px-4 text-sm">
            <div class="flex w-0 flex-1 items-center">
              <PaperClipIcon
                class="size-5 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <div class="ml-4 flex min-w-0 flex-1 gap-2">
                <span class="truncate font-medium text-gray-900"
                  >Resume_Olivert_Jamito.pdf</span
                >
                <span class="shrink-0 text-gray-400">2.1 MB</span>
              </div>
            </div>
            <div class="ml-4 shrink-0">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Download
              </a>
            </div>
          </li>
        </ul>
      </section> -->
    </div>
  </main>
</template>

<script setup>
import { PaperClipIcon } from "@heroicons/vue/20/solid"
const imageUrl = import.meta.env.VITE_API_URL + "/storage/olivert.jpg"
</script>
