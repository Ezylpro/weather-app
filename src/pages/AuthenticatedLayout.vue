<template>
  <div class="min-h-full">
    <div class="bg-blue-600 pb-32">
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center flex-row">
            <h1 class="text-3xl font-bold tracking-tight text-white">Weather App</h1>

            <div class="flex justify-between items-center flex-row space-x-2">
              <search-city/>
              <router-link
                  to="/logout"
                  :class="['flex justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-600']"
              >
                Logout
              </router-link>
            </div>
          </div>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <router-view/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import SearchCity from "../components/SearchCity.vue";

export default {
  name: "AuthenticatedLayout",
  components: {SearchCity},
  computed: {
    ...mapGetters(["accessToken"]),
  },

  beforeMount() {
    // if the User is not logged, we redirect now
    if (this.accessToken === null) {
      this.$router.push("/login");
    }
  },
};
</script>
