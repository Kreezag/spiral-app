<script>
import Event from "@/Components/Events/Sentry/Event"
import EventsPage from "@/mixins/EventsPage"

export default {
  components: {Event},
  extends: EventsPage,
  data() {
    return {
      title: 'Sentry events',
      type: 'sentry',
    }
  },
  head() {
    return {
      title: `Sentry [${this.events.length}] | Buggregator`
    }
  },
}
</script>
