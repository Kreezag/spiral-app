<template>
  <div
    class="call-information__wrapper"
    :style="wrapperStyles"
  >
    <h4>{{ edge.name }}</h4>
    <Cards
      v-if="edge.cost"
      :cost="edge.cost"
    />
  </div>
</template>

<script>
import Cards from "@/Components/Events/Profiler/_partials/Cards"

export default {
  components: {Cards},
  props: {
    edge: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 170
    }
  },
  data () {
    const calcPosition = () => {
      let positionX = this.edge.position.x;
      let positionY = this.edge.position.y;

      if ((this.width + this.edge.position.x) > window.innerWidth - 80) {
        const deltaX = (this.width + this.edge.position.x) - window.innerWidth + 100
        positionX -= deltaX;
      }

      if (this.height + this.edge.position.y > window.innerHeight) {
        positionY = this.edge.position.y - this.height;
      }

      return {
        top: (positionY + 10) + 'px',
        left: `${positionX}px`,
        width: this.width + 'px'
      }
    };

    this.wrapperStyles = calcPosition();
  }
}
</script>

<style lang="scss">
.call-information__wrapper {
  @apply bg-gray-800 absolute border border-gray-300 dark:border-gray-600;
  z-index: 9999;

  > h4 {
    @apply px-4 pt-4 pb-0 font-bold truncate;
  }
}
</style>
