<template>
  <Event
    :event="event"
    class="event--sentry"
  >
    <Exception
      :event="event"
      class="event-sentry__exception"
    />
  </Event>
</template>

<script>
import Event from "../Event"
import Exception from "./_partials/Exception"

export default {
  components: {Event, Exception},
  props: {
    event: {
      type: Object,
      default: null
    }
  }
}
</script>
