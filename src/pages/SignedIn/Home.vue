<template>
  <div class="flex justify-between items-center flex-row">

    <template v-if="cities.length > 0">
      <p>Your saved cities:</p>
      <div v-for="(city) in cities">
        <span>{{ city.name }}</span>
        <span>{{ city.temperature }}</span>
      </div>
    </template>
    <template v-else>
      <p>Looks like you don't have any saved cities</p>
    </template>

    <button
        @click="addCity"
        :class="['flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm']"
    >
      Search City
    </button>
  </div>

  <div v-for="(city) in cities">
    <span>{{ city.name }}</span>
    <span>{{ city.temperature }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from "vuex";

export default defineComponent({
  name: "Home",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["cities"]),
  },
  methods: {
    addCity() {
      this.loading = true;
      // call the API to add a city
      this.loading = false;
    },
  },
})
</script>