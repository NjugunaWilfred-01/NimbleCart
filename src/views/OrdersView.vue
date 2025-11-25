<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <main class="w-full p-4 sm:p-6 md:p-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">Orders</h2>
        <p class="text-text-light-secondary dark:text-text-dark-secondary mt-1">Manage all your customer orders.</p>
      </div>
      <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div class="relative w-full md:w-80">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">search</span>
            <input class="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent" id="search" placeholder="Search orders..." type="text"/>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div class="relative w-full sm:w-48">
              <select class="w-full appearance-none pl-4 pr-10 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary pointer-events-none">expand_more</span>
            </div>
            <input class="w-full sm:w-48 pl-4 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Date Range" type="date"/>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="text-sm text-text-light-secondary dark:text-text-dark-secondary">
              <tr>
                <th class="p-4 font-semibold">Order ID</th>
                <th class="p-4 font-semibold">Customer</th>
                <th class="p-4 font-semibold">Date</th>
                <th class="p-4 font-semibold text-right">Total</th>
                <th class="p-4 font-semibold text-center">Status</th>
                <th class="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-light dark:divide-border-dark text-text-light-primary dark:text-text-dark-primary">
              <tr>
                <td class="p-4 font-medium text-primary dark:text-blue-300">#85623</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <img alt="Customer avatar" class="w-8 h-8 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsT_x8FPHtUL-xpGRqHyk1KQLoEcPYaIQuNhlLRQiS7az2h69dV1DtXlYG55miNoL_IO6RUKq3AWJLE_KE4GhaBhPXF09x2KAdHrnFr6MGeCzSoLyMUKQQFe9TBwChieV9aGW4H4UORbYgTpK2UGlvqSX2j-4xbd5pTRGx_RaK35ikOfX_9IZfkU3KGWwacUADT2TCirLP7wkzjWvQu0_Wqar5_yedXo0V_j3oOLr3iiIZ-P6kNqlT2NsBSfAP10neIlm-gAhhdff0"/>
                    <div>
                      <div class="font-medium">Liam Johnson</div>
                      <div class="text-xs text-text-light-secondary dark:text-text-dark-secondary">liam@example.com</div>
                    </div>
                  </div>
                </td>
                <td class="p-4">Aug 12, 2023</td>
                <td class="p-4 text-right font-medium">$128.50</td>
                <td class="p-4 text-center">
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Delivered</span>
                </td>
                <td class="p-4 text-right">
                  <button class="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"><span class="material-symbols-outlined">visibility</span></button>
                </td>
              </tr>
              <tr>
                <td class="p-4 font-medium text-primary dark:text-blue-300">#85622</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <img alt="Customer avatar" class="w-8 h-8 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7ytT_Y1sYdKRMNHtOQom390zpR_8DPxXjlC1SI-t_XblhIAQOmWS3JrZViRa2WGkYRJfG7_hE4gcPXnBrl1JsF5H9Wpnr0WahcVqfqK-8V3X6Ypl19NZLHHGiAWryVSlU_ZZeNWPJ3VFK8Wh4dVaie8OOaWZ_EVjbQ9Cf2djPkWzPoU9YmDuNDsXvmPbm-Yj4j5c7kUDGMqs6evyneancs3mT1NmhGFC0dI1qo6iUhp6qOT_dHC8aQtAWYf9DYQdudnK-g-OXN8Li"/>
                    <div>
                      <div class="font-medium">Olivia Smith</div>
                      <div class="text-xs text-text-light-secondary dark:text-text-dark-secondary">olivia@example.com</div>
                    </div>
                  </div>
                </td>
                <td class="p-4">Aug 11, 2023</td>
                <td class="p-4 text-right font-medium">$75.00</td>
                <td class="p-4 text-center">
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Shipped</span>
                </td>
                <td class="p-4 text-right">
                  <button class="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"><span class="material-symbols-outlined">visibility</span></button>
                </td>
              </tr>
              <tr>
                <td class="p-4 font-medium text-primary dark:text-blue-300">#85621</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <img alt="Customer avatar" class="w-8 h-8 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD65dcRY-xl32K-3CdJNeEFoeAgzgFJ-wEwKJpgFz-KrQza9L2uRCnoAcUW4WF5OMEz2rM35feZKfG2Rnk1NoJlttvZs6AdmTsAzpPT-4nc98dRXZgu5Onb4YJgzbSFJdlRwIsArlgx4nI4LNsmCjf_VGxAcikLCHjkYS6HcRccDsFIOvL6ZrH172araYIcarnjCbwNBjkCU4GApUUrY2qWH5yhfzcQ8rix0dn7g629M3IgZ86gM20cpMGNCLwvJJcdZQyJ3tWF1a6G"/>
                    <div>
                      <div class="font-medium">Noah Williams</div>
                      <div class="text-xs text-text-light-secondary dark:text-text-dark-secondary">noah@example.com</div>
                    </div>
                  </div>
                </td>
                <td class="p-4">Aug 11, 2023</td>
                <td class="p-4 text-right font-medium">$250.00</td>
                <td class="p-4 text-center">
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Pending</span>
                </td>
                <td class="p-4 text-right">
                  <button class="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"><span class="material-symbols-outlined">visibility</span></button>
                </td>
              </tr>
              <tr>
                <td class="p-4 font-medium text-primary dark:text-blue-300">#85620</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <img alt="Customer avatar" class="w-8 h-8 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoaO6SKGhQPLCFz3ewuz8qgxXN2IPmOj9Mcw7zZxBVHgGbTmQleRTjMKfsY-j5GCVWmSOxudYFtkWk0LSiTmIF21c5jW2jOveNgF0WiIOsx4MkCsyztOEONafT2QVXvK4kwRH-mJYdmwC1aO9RPzSQd-kxHvXZViIHM7JdaC5HcgYzRyyWgO_JLINm7mXcuiCQlHpWD4FKAM0wL7bfZ5lLCkPEfUlUzZM7avkXRrOZoQCTcTN955vzZSJMrGm6yTa2ZFmspipYFtPh"/>
                    <div>
                      <div class="font-medium">Emma Brown</div>
                      <div class="text-xs text-text-light-secondary dark:text-text-dark-secondary">emma@example.com</div>
                    </div>
                  </div>
                </td>
                <td class="p-4">Aug 10, 2023</td>
                <td class="p-4 text-right font-medium">$45.30</td>
                <td class="p-4 text-center">
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">Cancelled</span>
                </td>
                <td class="p-4 text-right">
                  <button class="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"><span class="material-symbols-outlined">visibility</span></button>
                </td>
              </tr>
              <tr>
                <td class="p-4 font-medium text-primary dark:text-blue-300">#85619</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <img alt="Customer avatar" class="w-8 h-8 rounded-full object-cover bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXQqjkj4kGvYtuEZu1x0gIhqpF-QY-Kc1rXcuKx_UsU8an3kakuFc8AmgkprZxP1kHAKeTv_HL3t0CB3ayfVc5CAcEJyFlUA7eDxATza04-VOWJmFnqb9AIt5K0bJnqG-Blh6RN3oFkPqiUya8Gap2JqQwf8ZYYlcvQW2t-ru8iVbqY1uYAQ02u4MAjQ-ifJtSg7axrnFPAiejcFugyPsE8i9nMEPe6Wy-MPSrXCxOqOcsa0yuSNVCYCmn3vbXodanZuiBdaQWT4df"/>
                    <div>
                      <div class="font-medium">James Jones</div>
                      <div class="text-xs text-text-light-secondary dark:text-text-dark-secondary">james@example.com</div>
                    </div>
                  </div>
                </td>
                <td class="p-4">Aug 9, 2023</td>
                <td class="p-4 text-right font-medium">$500.99</td>
                <td class="p-4 text-center">
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Delivered</span>
                </td>
                <td class="p-4 text-right">
                  <button class="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"><span class="material-symbols-outlined">visibility</span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-between items-center mt-6">
          <span class="text-sm text-text-light-secondary dark:text-text-dark-secondary">Showing 1 to 5 of 20 results</span>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 border border-border-light dark:border-border-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50" disabled="">Previous</button>
            <button class="px-3 py-1 border border-border-light dark:border-border-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Orders page component
</script>
