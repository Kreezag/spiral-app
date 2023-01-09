<template>
  <div
    v-if="hasLabels"
    class="events-page__filters"
  >
    <span
      v-for="label in labels"
      :key="label"
      class="label item"
      :class="{'active': selectedLabels.includes(label)}"
      @click="toggleFilter(label)"
    >
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    labels() {
      return this.$store.getters['events/availableLabels']
    },
    selectedLabels() {
      return this.$store.getters['events/selectedLabels']
    },
    hasLabels() {
      return this.labels.length > 0
    }
  },
  methods: {
    toggleFilter(label) {
      console.log(label)
      this.$store.commit('events/selectLabel', label)
    }
  }
}
</script>

<style lang="scss">
.events-page__filters {
  @apply flex flex-row flex-wrap gap-2 items-center justify-center;

  > item {
    @apply cursor-pointer;
  }
}
</style>
