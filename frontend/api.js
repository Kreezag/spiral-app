const showEvent = ({$axios}) => async (uuid) => $axios.$get(`api/event/${uuid}`)
  .then((response) => response)

const showEvents =  ({$axios}) => async () => $axios.$get('/api/events')
  .then((response) => response.data)

const clearEvents = ({$ws}) => async (type) => $ws.rpc(`delete:api/events`, {type})

const deleteEvent = ({$ws}) => async (uuid) => $ws.rpc(`delete:api/event/${uuid}`)

export default {
  showEvent,
  showEvents,
  clearEvents,
  deleteEvent
}
