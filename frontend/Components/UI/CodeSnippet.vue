<template>
  <div class="code-snippet">
    <!-- eslint-disable vue/no-v-html -->
    <pre
      :language="language"
      v-html="highlightCode"
    />
    <!-- eslint-enable vue/no-v-html -->
    <button
      type="button"
      class="code-snippet__btn-copy"
      :class="{'active': copied}"
      @click="doCopy"
    >
      <CopyIcon />
      copy
    </button>
  </div>
</template>

<script>
import {copyText} from 'vue3-clipboard'
import CopyIcon from "./Icons/CopyIcon"

const hljs = require('highlight.js')

export default {
  components: {CopyIcon},
  props: {
    code: {
      type: String,
      default: '',
      required: true
    },
    language: {
      type: String,
      default: () => 'plaintext'
    }
  },
  data() {
    return {
      copied: false
    }
  },
  computed: {
    strignifiedCode() {
      if (typeof this.code === 'string') {
        return this.code
      }

      return JSON.stringify(this.code, null, 2)
    },
    highlightCode() {
      return hljs.highlight(this.strignifiedCode, {language: this.language}).value
    }
  },
  methods: {
    doCopy() {
      this.copied = true
      setTimeout(() => this.copied = false, 100)

      copyText(this.strignifiedCode, undefined, () => {
      })
    }
  }
}
</script>

<style lang="scss">
.code-snippet {
  @apply relative bg-gray-200 dark:bg-gray-800 p-3;

  &__btn-copy {
    @apply flex rounded-full items-center gap-x-1 absolute top-2 right-2 px-2 bg-white dark:bg-gray-900 border text-gray-600 transition-all text-xs font-bold border-gray-600;

    &:hover {
      @apply border-gray-200 text-white ;
    }

    &.active {
      @apply transform scale-110 bg-green-500 hover:bg-green-500;
    }

    > svg {
      @apply w-2 h-2;
    }
  }

  & + & {
    @apply border-t border-gray-600;
  }
}
</style>
