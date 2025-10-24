<template>
  <main class="bg-white">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Professional Background
        </h1>
        <p class="mt-2 text-gray-600 text-base">
          A quick overview of my work experience, education, and certifications.
        </p>
      </div>
    </header>

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      <!-- Work Experience -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">
          Work Experience
        </h2>
        <div class="space-y-8">
          <div
            v-for="(job, index) in experiences"
            :key="index"
            class="border-l-4 border-indigo-600 pl-6"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              {{ job.position }}
            </h3>
            <p class="text-sm text-gray-600 font-medium">
              {{ job.company }} • {{ job.period }}
            </p>
            <ul
              class="mt-3 list-disc list-inside text-gray-600 text-sm space-y-1"
            >
              <li v-for="(duty, i) in job.responsibilities" :key="i">
                {{ duty }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Education</h2>
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900">{{ edu.school }}</h3>
          <p class="text-sm text-gray-600">{{ edu.degree }} • {{ edu.year }}</p>
        </div>
      </section>

      <!-- Certifications -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">
          Certifications & Training
        </h2>
        <ul class="space-y-3">
          <li
            v-for="(cert, index) in certifications"
            :key="index"
            class="flex items-center gap-3"
          >
            <svg
              class="w-5 h-5 text-indigo-600 shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m5.618-2.016A9.953 9.953 0 0112 2.944a9.953 9.953 0 01-8.618 4.04A9.986 9.986 0 003 12c0 5.523 4.477 10 10 10s10-4.477 10-10a9.986 9.986 0 00-1.382-3.016z"
              />
            </svg>
            <span class="text-gray-700 text-sm">{{ cert.title }}</span>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script setup>
const experiences = [
  {
    position: "Software Developer",
    company: "H2 Software Consulting Services Inc.",
    period: "November 2024 – Present",
    responsibilities: [
      "Developed, delivered, and supported web applications, handling both frontend and backend development.",
      "Worked on Drupal-based and CodeIgniter projects.",
      "Collaborated with team members and external services to integrate data via APIs.",
      "Deployed and optimized applications in Linux environments using Docker and Git for streamlined version control.",
    ],
  },
  {
    position: "Software Engineer (Legacy PHP - Laravel)",
    company: "1Rotary",
    period: "May 2024 – November 2024",
    responsibilities: [
      "Contributed to migrating the company’s system from legacy PHP to Laravel, enhancing scalability, maintainability, and performance.",
      "Managed and resolved support tickets by debugging Laravel-based modules and applying effective fixes to maintain system stability.",
      "Enhanced existing modules by optimizing code and adopting conventional Laravel best practices.",
    ],
  },
  {
    position: "Web Developer (Angular + Laravel)",
    company: "Ascendens Asia Group",
    period: "August 2022 – May 2024",
    responsibilities: [
      "Designed, developed, and maintained key modules of the School Management System using Laravel and Angular.",
      "Implemented dynamic, responsive, and scalable solutions combining Laravel APIs with Angular front-end interfaces.",
      "Improved user experience and system performance by refining Laravel logic, database queries, and front-end workflows.",
    ],
  },
]

const education = [
  {
    school: "Bestlink College of the Philippines",
    degree: "Bachelor of Science in Information Technology",
    year: "2022",
  },
]

const certifications = [{ title: "Problem Solving (Basic) – HackerRank" }]
</script>
