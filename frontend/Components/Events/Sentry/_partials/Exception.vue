<template>
  <div class="sentry-exception">
    <NuxtLink
      tag="div"
      :to="event.route.show"
      class="sentry-exception__link flex-grow"
    >
      <h3 class="sentry-exception__title">
        {{ event.payload.type }}
      </h3>
      <!-- eslint-disable vue/no-v-html -->
      <pre
        class="sentry-exception__text"
        v-html="event.payload.value"
      />
      <!-- eslint-enable vue/no-v-html -->
    </NuxtLink>
    <div
      v-if="hasFrames"
      class="sentry-exception__files w-full"
    >
      <File
        v-for="(file, i) in stacktrace"
        :key="`${file.filename}-${file.lineno}-${i}`"
        :file="file"
        :collapsed="i !== 0"
        class="sentry-exception__file"
      />
    </div>
  </div>
</template>

<script>
import File from "../_partials/File"

export default {
  components: {File},
  props: {
    event: {
      type: Object,
      default: null
    },
    frames: {
      type: Number,
      default: 5
    }
  },
  computed: {
    hasFrames() {
      return this.frames > 0
    },
    stacktrace() {
      return this.event.stacktrace.slice(0, this.frames)
    }
  }
}
</script>
