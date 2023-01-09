<template>
  <section
    v-if="event.request"
    class="py-5 px-4 md:px-6 lg:px-8 border-b"
  >
    <h3 class="text-muted font-bold uppercase text-sm mb-5">
      request
    </h3>

    <h3 class="mb-1 text-lg font-medium">
      <strong>{{ event.request.method }}</strong> {{ event.request.url }}
    </h3>

    <Table>
      <TableRow
        v-for="(value, title) in event.request.headers"
        :key="title"
        :title="title"
      >
        {{ value[0] || value }}
      </TableRow>
    </Table>
  </section>
</template>

<script>
import Table from "@/Components/UI/Table";
import TableRow from "@/Components/UI/TableRow";

export default {
    components: {
        Table, TableRow,
    },
    props: {
      event: {
        type: Object,
        default: null
      }
    }
}
</script>
