<template>
  <div>
    <button
        @click="openAddCityModal"
        :class="['flex justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-blue-600 shadow-sm']"
    >
      Search City
    </button>

    <modal v-if="showModal" buttonLabel="Search City" @close="clearCityModal">
      <template v-slot:content>
        <div>
          <h3 class="text-base font-semibold text-gray-900" id="modal-title">Search the weather for specific city</h3>

          <div class="mt-5">
            <label for="state" class="block text-sm font-medium text-gray-700">State</label>
            <select
                v-model="selectedState"
                id="state"
                name="state"
                :disabled="loading.states"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus-visible:ring-blue-500 focus-visible:border-blue-500 sm:text-sm rounded-md"
            >
              <template v-if="loading.states">
                <option :value="null" disabled selected>Loading...</option>
              </template>
              <template v-else>
                <option :value="null" disabled selected>Select a state</option>
                <option v-for="(state) in states" :value="state.value">{{ state.label }}</option>
              </template>
            </select>
          </div>

          <div class="mt-2">
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <select
                v-model="selectedCity"
                id="city"
                name="city"
                :disabled="loading.cities"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus-visible:ring-blue-500 focus-visible:border-blue-500 sm:text-sm rounded-md"
            >
              <template v-if="loading.cities">
                <option :value="null" disabled selected>Loading...</option>
              </template>
              <template v-else>
                <option :value="null" disabled selected>Select a city</option>
                <option v-for="(city) in cities" :value="city.value">{{ city.label }}</option>
              </template>
            </select>
          </div>

        </div>
        <template v-if="selectedState !== null && selectedCity !== null">
          <button
              @click="openCity(selectedState, selectedCity)"
              class="mt-5 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Search
          </button>
        </template>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Modal from "./Modal.vue";
import api from "@src/api";

type statesResponseType = { value: number, label: string };
type citiesResponseType = { value: number, label: string };

export default defineComponent({
  name: "SearchCity",
  components: {Modal},
  data() {
    return {
      loading: {
        states: false,
        cities: false,
      },
      showModal: false,
      states: [] as statesResponseType[],
      cities: [] as citiesResponseType[],
      selectedState: null,
      selectedCity: null,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    openAddCityModal() {
      this.toggleModal();
      if (!this.states.length) {
        this.getStates();
      }
    },
    async getStates() {
      this.loading.states = true;

      // Option 2 of fetching data
      let response = await api.getStates() as { data: statesResponseType[] };
      this.states = response.data;

      this.loading.states = false;
    },
    async getCities() {
      if (!this.selectedState) return;

      this.loading.cities = true;
      let response = await api.getCities(this.selectedState) as { data: citiesResponseType[] };
      this.cities = response.data;
      this.loading.cities = false;
    },

    clearCityModal() {
      this.showModal = false;
      this.selectedState = null;
      this.selectedCity = null;
    },

    openCity(stateId: number, cityId: number) {
      this.$router.push(`/city/${stateId}/${cityId}`);
      this.clearCityModal();
    },
  },
  watch: {
    selectedState() {
      this.getCities();
    },
  },
})
</script>