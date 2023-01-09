<template>
  <Event
    :event="event"
    class="event--monolog"
  >
    <div class="event-monolog__wrap">
      <CodeSnippet
        class="event-monolog__snippet break-words"
        :code="event.text"
      />
      <template v-if="hasPayloads">
        <CodeSnippet
          language="json"
          class="event-monolog__payloads"
          :code="event.payloads"
        />
      </template>
      <template v-if="hasFields">
        <CodeSnippet
          v-for="field in fields"
          :key="field.title"
          :title="field.title"
          :code="field.value"
        />
      </template>
    </div>
  </Event>
</template>

<script>
import CodeSnippet from "@/Components/UI/CodeSnippet"
import Event from "../Event"

export default {
  components: {Event, CodeSnippet},
  props: {
    event: {
      type: Object,
      default: null,
    }
  },
  computed: {
    fields() {
      return this.event.fields
    },
    hasPayloads() {
      return this.event.payloads.constructor === Object &&
        Object.keys(this.event.payloads).length > 0
    },
    hasFields() {
      return this.fields.length > 0
    }
  },
}
</script>

<style lang="scss">
.event-monolog {
  &__wrap {
    @apply text-xs break-all;
  }

  &__snippet {
    @apply border-b-0 mt-0 text-white mt-0;
  }

  &__payloads {
    @apply border-b-0;
  }
}
</style>
