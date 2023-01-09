<template>
  <section class="inspector-request">
    <h3 class="text-muted font-bold uppercase text-sm mb-5">
      Request
    </h3>
    <Table class="mt-3">
      <TableRow
        v-for="(value, name) in event.process.http.request"
        :key="name"
        :title="name"
      >
        <template v-if="typeof value==='string'">
          {{ value }}
        </template>
        <template v-else-if="!Array.isArray(value)">
          <TableRow
            v-for="(v, n) in value"
            :key="n"
            :title="n"
          >
            {{ v }}
          </TableRow>
        </template>
      </TableRow>
    </Table>
  </section>
</template>

<script>
import Table from "@/Components/UI/Table"
import TableRow from "@/Components/UI/TableRow"

export default {
  components: {Table, TableRow},
  props: ['event']
}
</script>

<style lang="scss">
.inspector-request {
  @apply py-5 px-4 md:px-6 lg:px-8;
}
</style>
