<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>
      <div class="flex min-h-full justify-center text-center items-center p-0">
        <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-sm p-6">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Modal",
})
</script>