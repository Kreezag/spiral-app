<template>
  <div
    class="sentry-file"
    @click="toggleCollapse()"
  >
    <div class="sentry-file__title-wrap">
      <div class="sentry-file__title">
        {{ file.filename }}
        <span
          v-if="file.function"
          class="sentry-exception__title-info"
        >in</span>
        {{ file.function || null }}
        <span
          v-if="file.function"
          class="sentry-exception__title-info"
        >at line</span>
        {{ file.lineno }}
      </div>
      <div
        v-if="file.pre_context"
        class="sentry-file__title-icon"
      >
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          height="100%"
          width="100%"
          :class="{'rotate': isCollapsed}"
        >
          <path d="M14,11.75a.74.74,0,0,1-.53-.22L8,6.06,2.53,11.53a.75.75,0,0,1-1.06-1.06l6-6a.75.75,0,0,1,1.06,0l6,6a.75.75,0,0,1,0,1.06A.74.74,0,0,1,14,11.75Z" />
        </svg>
      </div>
    </div>
    <div
      v-if="file.pre_context && !isCollapsed"
      class="sentry-file__body"
    >
      <div
        v-for="(line, i) in file.pre_context"
        :key="`pre_context-${i}`"
        class="sentry-file__row"
      >
        <div class="sentry-file__row-number">
          {{ file.lineno - (file.pre_context.length - i) }}.
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <pre
          class="sentry-file__row-text"
          v-html="line"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>

      <div class="sentry-file__row sentry-file__row--red">
        <div class="w-12">
          {{ file.lineno }}.
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <pre v-html="file.context_line" />
      </div>
      <div
        v-for="(line, i) in file.post_context"
        :key="`post_context-${i}`"
        class="sentry-file__row"
      >
        <div class="sentry-file__row-number">
          {{ file.lineno + i + 1 }}.
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <pre
          class="sentry-file__row-text"
          v-html="line"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
      <div
        v-if="file.vars"
        class="event-table"
      >
        <div
          v-for="(v, k) in file.vars"
          :key="k"
          class="event-table__row"
        >
          <div class="event-table__cell-name">
            {{ k }}
          </div>
          <div class="event-table__cell-value">
            {{ v }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: null,
    },
    collapsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.isCollapsed = this.collapsed
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>
