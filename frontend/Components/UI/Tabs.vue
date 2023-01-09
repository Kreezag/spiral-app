<template>
  <div class="tabs--container">
    <div class="tabs--wrapper">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.title"
        class="tab"
        :class="{'active': tab.isActive}"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="tab--content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      tabs: []
    }
  },
  mounted() {
    this.selectTab(0)
  },
  created() {
    this.tabs = this.$children
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
  }
}
</script>

<style lang="scss">
.tabs {
  &--wrapper {
    @apply flex justify-start mt-3 border-b border-gray-600;

    .tab {
      @apply cursor-pointer p-3;

      &.active {
        @apply border-b border-b-4 font-bold;
      }

      &--content {
        @apply mt-5;
      }
    }
  }

  &--container {
    @apply flex flex-col;
  }
}
</style>
