export default class {
  walked = []

  constructor(edges) {
    this.edges = edges
  }

  build() {
    this.walked = []

    let datum = {
      0: {name: '_', value: 0, children: []}
    }

    Object.values(this.edges).forEach((edge) => {
      let parent = edge.caller || null
      let func = edge.callee || null

      let value = edge.cost.cpu || 0

      if (!datum.hasOwn(func)) {
        datum[func] = {
          name: func,
          value: value,
          cost: edge.cost,
          children: []
        }
      }

      if (parent && !datum.hasOwn(parent)) {
        datum[parent] = {
          name: parent,
          value: value,
          cost: edge.cost,
          children: []
        }
      }

      let node = parent || null

      // TODO walked skips several functions (recursion detected), should be fixed
      if (!node || this.walked.includes(func)) {
        return
      }

      datum[node].children.push(datum[func])
      this.walked.push(func)
    })

    this.walked = []

    return datum['main()']
  }
}
