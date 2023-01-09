import {humanFileSize, formatDuration} from "@/Utils/converters"

const labelsStrigifier = function (labels) {
  return Object.entries(labels).map(([label, value]) => {
    return `${label}="${value}"`
  }).join(' ')
}

const formatValue = function (value, metric) {
  switch (metric) {
    case 'p_mu':
    case 'p_pmu':
    case 'p_cpu':
    case 'p_wt':
      return `${value}%`
    case 'mu':
    case 'd_mu':
    case 'pmu':
    case 'd_pmu':
      return humanFileSize(value)
    case 'cpu':
    case 'd_cpu':
    case 'wt':
    case 'd_wt':
      return formatDuration(value)
  }

  return value
}

export const addSlashes = function (str) {
  return str.replace(/\\/g, '\\\\');
}

const generateNode = function (edge, metric) {
  let parent = addSlashes(edge.caller || '')
  let func = addSlashes(edge.callee || '')

  let label = formatValue(edge.cost[metric.field], metric.label)
  if (edge.cost.ct > 1) {
    label += ` - ${edge.cost.ct}x`
  }

  let labels = {
    label: label,
  }

  return `    "${parent}" -> "${func}" [ ${labelsStrigifier(labels)} ]\n`
}

export class DigraphBuilder {
  constructor(edges) {
    this.edges = edges
  }

  build(metric = "cpu", threshold = 1) {
    let digram = `
digraph xhprof {
    splines=true;
    overlap=false;
    node [ shape="box" style="rounded" fontname="Arial" margin=0.3 ]
    edge [ fontname="Arial" ]
`

    let metricProps = {field: 'p_cpu', label: 'p_cpu'}
    switch (metric) {
      case 'pmu':
        metricProps = {field: 'p_pmu', label: 'p_pmu'}
        break;
      case 'mu':
        metricProps = {field: 'p_mu', label: 'p_mu'}
    }

    let types = {
      pmu: {
        node: {
          class: 'pmu',
        },
        edge: {
          // fontcolor: '#891d1d',
          color: '#ED96AC',
        },
        nodes: []
      },

      default: {
        node: {
          class: 'default',
        },
        edge: {
          color: '#999999',
        },
        nodes: []
      },
    }

    Object.values(this.edges).forEach((edge) => {
      if (!edge.caller || edge.caller.length === 0) {
        return
      }

      if (edge.cost.p_pmu > 10) {
        types.pmu.nodes.push([edge, metricProps])
      } else if (edge.cost[metricProps.field] >= threshold) {
        types.default.nodes.push([edge, metricProps])
      }
    })

    Object.values(types).forEach((config) => {
      digram += `    node [ ${labelsStrigifier(config.node)} ]\n`
      digram += `    edge [ ${labelsStrigifier(config.edge)} ]\n`

      for (let [node, metric] of config.nodes) {
        digram += generateNode(node, metric)
      }
    })

    return `${digram} }`
  }
}
