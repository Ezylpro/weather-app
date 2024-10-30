<template>
  Logging you out
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Logout",
  mounted() {
    this.logout();
  },
  methods: {
    async logout() {
      this.$store.commit('logout', null);
      this.$router.replace("/login");
    }
  }
})
</script>