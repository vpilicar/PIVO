import { DATA_SOURCE } from '../../constants'
import VarivanjeServiceMemorija from './VarivanjeServiceMemorija'
import VarivanjeServiceLocalStorage from './VarivanjeServiceLocalStorage'

let Servis

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = VarivanjeServiceMemorija
        break
    case 'localStorage':
        Servis = VarivanjeServiceLocalStorage
        break
    default:
        Servis = null
}

export default Servis
