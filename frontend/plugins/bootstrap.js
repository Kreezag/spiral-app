import SfdumpFunc from '../Utils/dumper'

export default function ({store}) {
  window.Sfdump = SfdumpFunc(window.document)

  store.dispatch('theme/detect')
}
