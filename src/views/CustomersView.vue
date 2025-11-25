<template>
  <div class="flex min-h-screen w-full bg-background-light dark:bg-background-dark">
    <main class="flex-1 p-8">
      <div class="flex flex-col gap-6">
        <header class="flex flex-wrap items-center justify-between gap-4">
          <h1 class="text-slate-100 text-4xl font-black leading-tight tracking-[-0.033em]">Customers</h1>
          <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
            <span class="truncate">+ Add Customer</span>
          </button>
        </header>
        <div class="flex flex-col gap-4">
          <div class="w-full">
            <label class="flex flex-col min-w-40 h-12">
              <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div class="text-slate-400 flex border-none bg-[#232f48] items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span class="material-symbols-outlined">search</span>
                </div>
                <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-[#232f48] h-full placeholder:text-slate-400 px-4 text-base font-normal leading-normal" placeholder="Search by name, email, or customer ID..." value=""/>
              </div>
            </label>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#232f48] px-4 text-slate-100 hover:bg-[#344466]">
              <p class="text-sm font-medium leading-normal">Registration Date</p>
              <span class="material-symbols-outlined text-base">calendar_today</span>
            </button>
            <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#232f48] pl-4 pr-3 text-slate-100 hover:bg-[#344466]">
              <p class="text-sm font-medium leading-normal">Total Orders</p>
              <span class="material-symbols-outlined text-xl">expand_more</span>
            </button>
            <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 px-4 text-primary hover:bg-primary/30">
              <p class="text-sm font-medium leading-normal">Apply Filters</p>
            </button>
          </div>
        </div>
        <div class="w-full bg-[#1A1A2E] rounded-xl overflow-hidden border border-slate-800">
          <div class="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <button class="p-2 text-slate-300 rounded-lg hover:bg-[#232f48] hover:text-white">
                <span class="material-symbols-outlined">tune</span>
              </button>
              <button class="p-2 text-slate-300 rounded-lg hover:bg-[#232f48] hover:text-white">
                <span class="material-symbols-outlined">download</span>
              </button>
            </div>
            <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#232f48] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 hover:bg-[#344466]">
              <span class="truncate">Bulk Actions</span>
              <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">expand_more</span>
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-slate-300">
              <thead class="text-xs text-slate-400 uppercase bg-[#1A1A2E]">
                <tr>
                  <th class="p-4" scope="col">
                    <div class="flex items-center">
                      <input class="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary focus:ring-2" id="checkbox-all" type="checkbox"/>
                      <label class="sr-only" for="checkbox-all">checkbox</label>
                    </div>
                  </th>
                  <th class="px-6 py-3" scope="col">Customer ID</th>
                  <th class="px-6 py-3" scope="col">Name</th>
                  <th class="px-6 py-3" scope="col">Email</th>
                  <th class="px-6 py-3" scope="col">Registration Date</th>
                  <th class="px-6 py-3" scope="col">Total Orders</th>
                  <th class="px-6 py-3" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-slate-800 hover:bg-[#232f48]">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input class="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary focus:ring-2" id="checkbox-table-1" type="checkbox"/>
                      <label class="sr-only" for="checkbox-table-1">checkbox</label>
                    </div>
                  </td>
                  <td class="px-6 py-4 font-mono text-slate-400">#CUST-84321</td>
                  <th class="px-6 py-4 font-medium text-white whitespace-nowrap" scope="row">Olivia Rhye</th>
                  <td class="px-6 py-4">olivia@example.com</td>
                  <td class="px-6 py-4">2023-10-21</td>
                  <td class="px-6 py-4">12</td>
                  <td class="px-6 py-4">
                    <a class="font-medium text-primary hover:underline" href="#"><span class="material-symbols-outlined text-xl">visibility</span></a>
                  </td>
                </tr>
                <tr class="border-b border-slate-800 hover:bg-[#232f48]">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input class="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary focus:ring-2" id="checkbox-table-2" type="checkbox"/>
                      <label class="sr-only" for="checkbox-table-2">checkbox</label>
                    </div>
                  </td>
                  <td class="px-6 py-4 font-mono text-slate-400">#CUST-84320</td>
                  <th class="px-6 py-4 font-medium text-white whitespace-nowrap" scope="row">Phoenix Baker</th>
                  <td class="px-6 py-4">phoenix@example.com</td>
                  <td class="px-6 py-4">2023-10-20</td>
                  <td class="px-6 py-4">8</td>
                  <td class="px-6 py-4">
                    <a class="font-medium text-primary hover:underline" href="#"><span class="material-symbols-outlined text-xl">visibility</span></a>
                  </td>
                </tr>
                <tr class="border-b border-slate-800 hover:bg-[#232f48]">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input class="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary focus:ring-2" id="checkbox-table-3" type="checkbox"/>
                      <label class="sr-only" for="checkbox-table-3">checkbox</label>
                    </div>
                  </td>
                  <td class="px-6 py-4 font-mono text-slate-400">#CUST-84319</td>
                  <th class="px-6 py-4 font-medium text-white whitespace-nowrap" scope="row">Lana Steiner</th>
                  <td class="px-6 py-4">lana@example.com</td>
                  <td class="px-6 py-4">2023-10-19</td>
                  <td class="px-6 py-4">21</td>
                  <td class="px-6 py-4">
                    <a class="font-medium text-primary hover:underline" href="#"><span class="material-symbols-outlined text-xl">visibility</span></a>
                  </td>
                </tr>
                <tr class="border-b border-slate-800 hover:bg-[#232f48]">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input class="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary focus:ring-2" id="checkbox-table-4" type="checkbox"/>
                      <label class="sr-only" for="checkbox-table-4">checkbox</label>
                    </div>
                  </td>
                  <td class="px-6 py-4 font-mono text-slate-400">#CUST-84318</td>
                  <th class="px-6 py-4 font-medium text-white whitespace-nowrap" scope="row">Demi Wilkinson</th>
                  <td class="px-6 py-4">demi@example.com</td>
                  <td class="px-6 py-4">2023-10-15</td>
                  <td class="px-6 py-4">5</td>
                  <td class="px-6 py-4">
                    <a class="font-medium text-primary hover:underline" href="#"><span class="material-symbols-outlined text-xl">visibility</span></a>
                  </td>
                </tr>
                <tr class="hover:bg-[#232f48]">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input class="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary focus:ring-2" id="checkbox-table-5" type="checkbox"/>
                      <label class="sr-only" for="checkbox-table-5">checkbox</label>
                    </div>
                  </td>
                  <td class="px-6 py-4 font-mono text-slate-400">#CUST-84317</td>
                  <th class="px-6 py-4 font-medium text-white whitespace-nowrap" scope="row">Candice Wu</th>
                  <td class="px-6 py-4">candice@example.com</td>
                  <td class="px-6 py-4">2023-10-12</td>
                  <td class="px-6 py-4">3</td>
                  <td class="px-6 py-4">
                    <a class="font-medium text-primary hover:underline" href="#"><span class="material-symbols-outlined text-xl">visibility</span></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Table navigation" class="flex items-center justify-between p-4">
            <span class="text-sm font-normal text-slate-400">Showing <span class="font-semibold text-white">1-5</span> of <span class="font-semibold text-white">100</span></span>
            <ul class="inline-flex -space-x-px text-sm h-8">
              <li>
                <a class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-slate-400 bg-[#232f48] rounded-l-lg hover:bg-[#344466] hover:text-white" href="#">Previous</a>
              </li>
              <li>
                <a class="flex items-center justify-center px-3 h-8 leading-tight text-white bg-primary border border-primary hover:bg-primary/90" href="#">1</a>
              </li>
              <li>
                <a class="flex items-center justify-center px-3 h-8 leading-tight text-slate-400 bg-[#232f48] hover:bg-[#344466] hover:text-white" href="#">2</a>
              </li>
              <li>
                <a class="flex items-center justify-center px-3 h-8 leading-tight text-slate-400 bg-[#232f48] hover:bg-[#344466] hover:text-white" href="#">3</a>
              </li>
              <li>
                <a class="flex items-center justify-center px-3 h-8 leading-tight text-slate-400 bg-[#232f48] rounded-r-lg hover:bg-[#344466] hover:text-white" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Customers page component
</script>
