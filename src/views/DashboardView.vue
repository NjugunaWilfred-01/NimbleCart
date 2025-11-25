<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <main class="w-full p-4 sm:p-6 md:p-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">Dashboard</h2>
        <p class="text-text-light-secondary dark:text-text-dark-secondary mt-1">Welcome back, Admin! Here's your performance overview.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm flex items-start justify-between">
          <div>
            <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary">Total Sales</p>
            <p class="text-2xl font-bold mt-1">$23,890.50</p>
            <p class="text-xs text-green-500 flex items-center mt-2">
              <span class="material-symbols-outlined text-base mr-1">trending_up</span>
              <span>+15% from last month</span>
            </p>
          </div>
          <div class="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-300">attach_money</span>
          </div>
        </div>
        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm flex items-start justify-between">
          <div>
            <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary">New Orders</p>
            <p class="text-2xl font-bold mt-1">352</p>
            <p class="text-xs text-green-500 flex items-center mt-2">
              <span class="material-symbols-outlined text-base mr-1">trending_up</span>
              <span>+8% from last month</span>
            </p>
          </div>
          <div class="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-lg">
            <span class="material-symbols-outlined text-orange-600 dark:text-orange-300">shopping_cart</span>
          </div>
        </div>
        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm flex items-start justify-between">
          <div>
            <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary">Active Customers</p>
            <p class="text-2xl font-bold mt-1">1,250</p>
            <p class="text-xs text-red-500 flex items-center mt-2">
              <span class="material-symbols-outlined text-base mr-1">trending_down</span>
              <span>-2% from last month</span>
            </p>
          </div>
          <div class="bg-green-100 dark:bg-green-900/40 p-2 rounded-lg">
            <span class="material-symbols-outlined text-green-600 dark:text-green-300">group</span>
          </div>
        </div>
        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm flex items-start justify-between">
          <div>
            <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary">Revenue</p>
            <p class="text-2xl font-bold mt-1">$18,760.00</p>
            <p class="text-xs text-green-500 flex items-center mt-2">
              <span class="material-symbols-outlined text-base mr-1">trending_up</span>
              <span>+20% from last month</span>
            </p>
          </div>
          <div class="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg">
            <span class="material-symbols-outlined text-purple-600 dark:text-purple-300">monitoring</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 class="font-semibold text-lg mb-4">Sales Over Time</h3>
          <div class="h-80">
            <canvas id="salesChart"></canvas>
          </div>
        </div>
        <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm">
          <h3 class="font-semibold text-lg mb-4">Product Categories</h3>
          <div class="h-80 flex items-center justify-center">
            <canvas id="categoryChart"></canvas>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-semibold text-lg">Recent Orders</h3>
            <router-link to="/orders" class="text-sm text-primary dark:text-blue-300 hover:underline">View All</router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-border-light dark:border-border-dark">
                  <th class="py-3 px-2 font-semibold text-text-light-secondary dark:text-text-dark-secondary">Order ID</th>
                  <th class="py-3 px-2 font-semibold text-text-light-secondary dark:text-text-dark-secondary">Customer</th>
                  <th class="py-3 px-2 font-semibold text-text-light-secondary dark:text-text-dark-secondary text-right">Amount</th>
                  <th class="py-3 px-2 font-semibold text-text-light-secondary dark:text-text-dark-secondary text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-4 px-2 font-medium text-primary dark:text-blue-300">#85623</td>
                  <td class="py-4 px-2">Liam Johnson</td>
                  <td class="py-4 px-2 text-right font-medium">$128.50</td>
                  <td class="py-4 px-2 text-center">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Delivered</span>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-2 font-medium text-primary dark:text-blue-300">#85622</td>
                  <td class="py-4 px-2">Olivia Smith</td>
                  <td class="py-4 px-2 text-right font-medium">$75.00</td>
                  <td class="py-4 px-2 text-center">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Shipped</span>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-2 font-medium text-primary dark:text-blue-300">#85621</td>
                  <td class="py-4 px-2">Noah Williams</td>
                  <td class="py-4 px-2 text-right font-medium">$250.00</td>
                  <td class="py-4 px-2 text-center">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-2 font-medium text-primary dark:text-blue-300">#85620</td>
                  <td class="py-4 px-2">Emma Brown</td>
                  <td class="py-4 px-2 text-right font-medium">$45.30</td>
                  <td class="py-4 px-2 text-center">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">Cancelled</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="lg:col-span-2 bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm">
          <h3 class="font-semibold text-lg mb-4">Recent Customer Activity</h3>
          <ul class="space-y-4">
            <li class="flex items-center gap-4">
              <img alt="Customer avatar" class="w-10 h-10 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoaO6SKGhQPLCFz3ewuz8qgxXN2IPmOj9Mcw7zZxBVHgGbTmQleRTjMKfsY-j5GCVWmSOxudYFtkWk0LSiTmIF21c5jW2jOveNgF0WiIOsx4MkCsyztOEONafT2QVXvK4kwRH-mJYdmwC1aO9RPzSQd-kxHvXZViIHM7JdaC5HcgYzRyyWgO_JLINm7mXcuiCQlHpWD4FKAM0wL7bfZ5lLCkPEfUlUzZM7avkXRrOZoQCTcTN955vzZSJMrGm6yTa2ZFmspipYFtPh"/>
              <div class="flex-grow">
                <p class="text-sm font-medium">Emma Brown <span class="text-text-light-secondary dark:text-text-dark-secondary font-normal">placed a new order.</span></p>
                <p class="text-xs text-text-light-secondary dark:text-text-dark-secondary">2 hours ago</p>
              </div>
            </li>
            <li class="flex items-center gap-4">
              <img alt="Customer avatar" class="w-10 h-10 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXQqjkj4kGvYtuEZu1x0gIhqpF-QY-Kc1rXcuKx_UsU8an3kakuFc8AmgkprZxP1kHAKeTv_HL3t0CB3ayfVc5CAcEJyFlUA7eDxATza04-VOWJmFnqb9AIt5K0bJnqG-Blh6RN3oFkPqiUya8Gap2JqQwf8ZYYlcvQW2t-ru8iVbqY1uYAQ02u4MAjQ-ifJtSg7axrnFPAiejcFugyPsE8i9nMEPe6Wy-MPSrXCxOqOcsa0yuSNVCYCmn3vbXodanZuiBdaQWT4df"/>
              <div class="flex-grow">
                <p class="text-sm font-medium">James Jones <span class="text-text-light-secondary dark:text-text-dark-secondary font-normal">registered a new account.</span></p>
                <p class="text-xs text-text-light-secondary dark:text-text-dark-secondary">5 hours ago</p>
              </div>
            </li>
            <li class="flex items-center gap-4">
              <img alt="Customer avatar" class="w-10 h-10 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD65dcRY-xl32K-3CdJNeEFoeAgzgFJ-wEwKJpgFz-KrQza9L2uRCnoAcUW4WF5OMEz2rM35feZKfG2Rnk1NoJlttvZs6AdmTsAzpPT-4nc98dRXZgu5Onb4YJgzbSFJdlRwIsArlgx4nI4LNsmCjf_VGxAcikLCHjkYS6HcRccDsFIOvL6ZrH172araYIcarnjCbwNBjkCU4GApUUrY2qWH5yhfzcQ8rix0dn7g629M3IgZ86gM20cpMGNCLwvJJcdZQyJ3tWF1a6G"/>
              <div class="flex-grow">
                <p class="text-sm font-medium">Noah Williams <span class="text-text-light-secondary dark:text-text-dark-secondary font-normal">updated their profile.</span></p>
                <p class="text-xs text-text-light-secondary dark:text-text-dark-secondary">1 day ago</p>
              </div>
            </li>
            <li class="flex items-center gap-4">
              <img alt="Customer avatar" class="w-10 h-10 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsT_x8FPHtUL-xpGRqHyk1KQLoEcPYaIQuNhlLRQiS7az2h69dV1DtXlYG55miNoL_IO6RUKq3AWJLE_KE4GhaBhPXF09x2KAdHrnFr6MGeCzSoLyMUKQQFe9TBwChieV9aGW4H4UORbYgTpK2UGlvqSX2j-4xbd5pTRGx_RaK35ikOfX_9IZfkU3KGWwacUADT2TCirLP7wkzjWvQu0_Wqar5_yedXo0V_j3oOLr3iiIZ-P6kNqlT2NsBSfAP10neIlm-gAhhdff0"/>
              <div class="flex-grow">
                <p class="text-sm font-medium">Liam Johnson <span class="text-text-light-secondary dark:text-text-dark-secondary font-normal">left a product review.</span></p>
                <p class="text-xs text-text-light-secondary dark:text-text-dark-secondary">2 days ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const isDarkMode = document.documentElement.classList.contains('dark')
  const textColor = isDarkMode ? 'rgba(249, 250, 251, 0.8)' : 'rgba(107, 114, 128, 1)'
  const gridColor = isDarkMode ? 'rgba(55, 65, 81, 0.6)' : 'rgba(229, 231, 235, 1)'

  // Sales Chart
  const salesCtx = document.getElementById('salesChart').getContext('2d')
  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(30, 42, 120, 0.2)',
        borderColor: 'rgba(30, 42, 120, 1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: textColor },
          grid: { color: gridColor }
        },
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    }
  })

  // Category Chart
  const categoryCtx = document.getElementById('categoryChart').getContext('2d')
  new Chart(categoryCtx, {
    type: 'doughnut',
    data: {
      labels: ['Electronics', 'Clothing', 'Home Goods', 'Books'],
      datasets: [{
        label: 'Product Categories',
        data: [300, 150, 100, 50],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: isDarkMode ? '#1F2937' : '#FFFFFF',
        borderWidth: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            boxWidth: 12,
            padding: 20
          }
        }
      }
    }
  })
})
</script>
