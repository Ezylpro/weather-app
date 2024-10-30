<template>
  <template v-if="loading.main">
    <p>Loading...</p>
  </template>
  <template v-else>

    <template v-if="savedLocations.length > 0">
      <p>Your saved cities:</p>

      <div class="mt-5 space-y-5">
        <router-link
            :to="`city/${item.state.id}/${item.city.id}`"
            v-for="(item, index) in savedLocations" :key="index"
            class="bg-white border rounded-xl p-6 flex items-start justify-between"
        >
          <div class="flex items-center justify-between space-x-5">
            <div class="flex items-center space-x-2">
              <img
                  :src="getWeatherIcon(item.condition)"
                  :alt="item.condition"
                  class="w-10 h-10"
              />
            </div>
            <div class="space-y-1">
              <h2 class="text-xl font-semibold text-gray-800">{{ item.city.name }}, {{ item.state.name }}</h2>
              <div class="text-sm text-gray-600 pt-2">
                Rain Probability: {{ item.rain_probability }}%
              </div>
              <p class="text-xs text-gray-500">Updated at: {{ item.updated_at }}</p>
            </div>
          </div>

          <span class="text-lg font-bold text-gray-800">{{ item.max_temp }}° / {{ item.min_temp }}°</span>
        </router-link>

      </div>
    </template>
    <template v-else>
      <p>Looks like you don't have any saved cities</p>
    </template>
  </template>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {getWeatherIcon} from "@src/helpers";
import api from "@src/api";
import ForecastConditionEnum from "@helpers/enums/ForecastConditionEnum.ts";

type savedLocationsResponseType = {
  "state": {
    "id": number,
    "name": string
  },
  "city": {
    "id": number,
    "name": string
  },
  "updated_at": string,
  "max_temp": string,
  "min_temp": string,
  "rain_probability": string,
  "condition": ForecastConditionEnum
}

export default defineComponent({
  name: "Home",
  data() {
    return {
      loading: {
        main: false,
      },
      savedLocations: [] as savedLocationsResponseType[],
    };
  },
  mounted() {
    this.getSavedLocations();
  },
  methods: {
    getWeatherIcon,
    async getSavedLocations() {
      this.loading.main = true;

      let response = await api.getSavedLocations() as { data: savedLocationsResponseType[] };
      this.savedLocations = response.data;

      this.loading.main = false;
    },
  },
})
</script>
