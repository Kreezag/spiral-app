<template>
  <div
    :id="event.id"
    ref="event"
    class="event"
    :class="{'collapsed': event.collapsed, 'open': !event.collapsed}"
  >
    <div class="event__sidebar sidebar">
      <div class="event__labels">
        <JsonChip :href="event.route.json" />
        <Label :color="event.color">
          {{ date }}
        </Label>
        <!--        <Label :color="event.color">-->
        <!--          {{ event.app }}-->
        <!--        </Label>-->
        <template v-if="hasLabels">
          <Label
            v-for="label in labels"
            :key="label"
            :color="event.color"
          >
            {{ label }}
          </Label>
        </template>
      </div>
      <div
        v-if="!isScreenshot"
        class="sidebar__container"
      >
        <ImageExport
          v-if="exportableEl"
          :name="`${event.app}-${event.id}`"
          :el="exportableEl"
        />
        <button
          class="button button__collapse"
          :class="color"
          @click="toggle"
        >
          <PlusIcon v-if="event.collapsed" />
          <MinusIcon v-else />
        </button>
        <button
          class="button button__delete"
          @click="deleteEvent"
        >
          <TimesIcon />
        </button>
      </div>
    </div>
    <div
      ref="event_body"
      class="event__body"
    >
      <slot />
    </div>
    <div
      v-if="hasOrigin || hasServerName"
      class="event__origin"
    >
      <div class="event__origin-tags">
        <span
          v-for="(value, tag) in normalizedOrigin"
          :key="value"
        >
          <strong>{{ tag }}: </strong>{{ value }}
        </span>
      </div>
      <Host
        v-if="hasServerName"
        :name="event.serverName"
        class="event__origin-host"
      />
    </div>
  </div>
</template>

<script>
import Label from "@/Components/UI/Label"
import PlusIcon from "@/Components/UI/Icons/PlusIcon"
import MinusIcon from "@/Components/UI/Icons/MinusIcon"
import TimesIcon from "@/Components/UI/Icons/TimesIcon"
import JsonChip from "@/Components/UI/JsonChip"
import ImageExport from "@/Components/UI/ImageExport"
import Host from "@/Components/UI/Host"

export default {
  components: {
    MinusIcon, PlusIcon, TimesIcon, Label, JsonChip, ImageExport, Host
  },
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      open: true,
      exportableEl: null
    }
  },
  computed: {
    isScreenshot() {
      return this.$store.getters['theme/isScreenshot']
    },
    date() {
      return this.event.date.format('HH:mm:ss')
    },
    color() {
      const color = this.event.color

      switch (color) {
        case 'gray':
          return 'bg-gray-400 ring-gray-300';
      }

      return `bg-${color}-600 ring-${color}-300`
    },
    labels() {
      return this.event.labels
    },
    hasLabels() {
      return this.labels.length > 0
    },
    hasOrigin() {
      return this.event.origin && Object.entries(this.event.origin).length > 0
    },
    hasServerName() {
      return this.event.serverName !== null
    },
    normalizedOrigin() {
      return this.hasOrigin && Object.values(this.event.origin).filter(Boolean).length;
    }
  },
  mounted() {
    this.exportableEl = this.$refs.event
  },
  methods: {
    toggle() {
      this.$store.commit('events/toggleCollapsedState', this.event)
    },
    deleteEvent() {
      this.$store.dispatch('events/delete', this.event)
    }
  }
}
</script>

