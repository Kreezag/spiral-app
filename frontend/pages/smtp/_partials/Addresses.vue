<template>
  <div class="flex flex-col divide-y">
    <div
      v-for="user in addresses"
      :key="user.name"
      class="flex items-center space-x-2"
    >
      <span
        v-if="user.name"
        class="text-white bg-gray-800 px-2"
      >{{ user.name }}</span> <span>{{ user.email }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addresses: {
      type: Array,
      default: () => []
    }
  }
}
</script>
