<template>

  <template v-if="error !== ''">
    <error-toast :error="error" class="mb-5"/>
  </template>

  <div class="flex justify-between items-center flex-row">
    <router-link
        to="/"
        :class="['flex justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-sm hover:bg-gray-200']"
    >
      ← Back
    </router-link>

    <p>
      {{ loading.main ? 'Loading...' : details.city }}
    </p>

    <button
        @click="isSaved ? removeFromFavorites() : addToFavorites()"
        :disabled="loading.main"
        :class="{
            'flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700': true,
            'opacity-50': loading.main
        }"
    >
      {{ isSaved ? 'Remove from saved locations' : 'Add to saved locations' }}
    </button>
  </div>
  <div class="mt-5 space-y-5">
    <template v-if="loading.main">
      <p>Loading...</p>
    </template>
    <template v-else>
      <div
          v-for="(item, index) in details.forecasts"
          :key="index"
          class="bg-white border rounded-xl p-6 flex items-start justify-between"
      >
        <div class="flex items-center space-x-5">
          <div class="flex items-center space-x-2">
            <img
                :src="getWeatherIcon(item.condition)"
                :alt="item.condition"
                class="w-10 h-10"
            />
          </div>
          <div class="space-y-1">
            <h2 class="text-xl font-semibold text-gray-800">{{ item.date }}</h2>
            <div class="text-sm text-gray-600 pt-2">
              Rain Probability: {{ item.rain_probability }}%
            </div>
            <div class="text-sm text-gray-600">
              Humidity: {{ item.humidity }}%
            </div>
            <div class="text-sm text-gray-600">
              Cloudiness: {{ item.cloudiness }}%
            </div>
            <p class="text-xs text-gray-500">Updated at: {{ item.updated_at }}</p>
          </div>
        </div>

        <span class="text-lg font-bold text-gray-800">
        {{ item.max_temp }}° / {{ item.min_temp }}°
      </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Modal from "@components/Modal.vue";
import api from "@src/api";
import ForecastConditionEnum from "@helpers/enums/ForecastConditionEnum.ts";
import {getWeatherIcon} from "@src/helpers";
import ErrorToast from "@components/ErrorToast.vue";

type detailsResponseType = {
  "city": string,
  "state": string,
  "is_saved": boolean,
  "forecasts": [
    {
      "updated_at": string,
      "date": string,
      "max_temp": number,
      "min_temp": number,
      "humidity": number,
      "cloudiness": number,
      "rain_probability": number,
      "condition": ForecastConditionEnum
    }
  ]
};

export default defineComponent({
  name: "City",
  components: {ErrorToast, Modal},
  data() {
    return {
      loading: {
        main: false,
      },
      error: '',
      stateId: this.$route.params.stateId as string,
      cityId: this.$route.params.cityId as string,
      details: {} as detailsResponseType,
      isSaved: false,
    };
  },
  mounted() {
    this.getLocationDetails();
  },
  methods: {
    getWeatherIcon,
    async getLocationDetails() {
      this.loading.main = true;
      let response = await api.getLocationDetails(this.stateId, this.cityId) as { data: detailsResponseType };
      this.details = response.data;
      this.isSaved = this.details.is_saved;
      this.loading.main = false;
    },
    async addToFavorites() {
      this.loading.main = true;
      let response = await api.addToSavedLocations(this.stateId, this.cityId) as { message?: string };

      if (response.message) {
        this.loading.main = false;
        this.error = response.message;
        return;
      }

      this.isSaved = true;
      this.loading.main = false;
    },
    async removeFromFavorites() {
      this.loading.main = true;
      await api.removeFromSavedLocations(this.stateId, this.cityId);
      this.isSaved = false;
      this.loading.main = false;
    },
  },
  watch: {
    $route() {
      this.stateId = this.$route.params.stateId as string;
      this.cityId = this.$route.params.cityId as string;
      this.getLocationDetails();
    },
  },
})
</script>