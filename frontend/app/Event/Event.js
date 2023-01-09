import moment from "moment"

export class Event {
  labels = []
  color = 'gray'
  app = 'unknown'
  collapsed = false
  disabled = false

  constructor(event, id, timestamp) {
    this.event = event
    this.date = moment.unix(timestamp)
    this.id = id
  }

  /**
   * @returns {Object}
   */
  get route() {
    return {
      index: '/',
      show: `/${this.app}/${this.id}`,
      json: `/api/event/${this.id}`,
    }
  }

  /**
   * @returns {Object}
   */
  origin() {
    return {}
  }

  /**
   * @returns {String|null}
   */
  get serverName() {
    return null
  }

  disable() {
    this.disabled = true
  }

  setCollapsed(state) {
    this.collapsed = state
  }

  get type() {
    return 'Event'
  }

  get uuid() {
    return this.id
  }

  get payloads() {
    return []
  }


  isType(type) {
    return this.type === type
  }

  content() {
    return null
  }

  merge() {

  }
}
