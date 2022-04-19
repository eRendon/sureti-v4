import { reactive } from 'vue'
import { IModalStorage} from '@/interfaces/IAlert';

const state = reactive<IModalStorage>({
  alertData: {
    text: '',
    show: false
  },
  showProfileModal: false,
  proposalModalData: {
    show: false,
    proposal: {}
  },
  requestModal: {
    show: false,
    request: {}
  },
  payments: {
    show: false
  },
  showNewGuarantee: false
})

export default state
