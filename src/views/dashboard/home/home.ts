import { computed, DefineComponent, defineComponent, onMounted, shallowRef, triggerRef } from 'vue'
import Movements from '../../../components/List/Movements/Movements.vue'
import GuaranteeList from '../../../components/List/Guarantee/Guarantee.vue'
import Indicator from '@/components/DashBoard/Indicator/Indicator.vue'
import { IIndicator } from '@/interfaces/IIndicator'
import { guaranteeStore, loansStore, userStorage, userTypeStore } from '@/storage'
import RequestModal from '@/components/Modals/RequestLoan/RequestLoan.vue'
import Investment from '@/components/List/Investment/Investment.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Movements,
    GuaranteeList,
    Indicator,
    RequestModal
  },
  setup () {

    const stateBrowser = computed(() => userStorage.getters.getStateBrowser())

    const component = shallowRef<{ isComponent: DefineComponent<any, any, any>}>({
      isComponent: stateBrowser.value === 'prestamos' ? GuaranteeList : Investment
    })

    const indicators = computed<IIndicator[]>(() => userTypeStore.getters.getIndicators())

    const onSelectComponent = (id: string): void => {
      if (id === 'Movements') {
        component.value.isComponent = Movements
      } else {
        component.value.isComponent = stateBrowser.value === 'prestamos' ? GuaranteeList : Investment
      }
      triggerRef(component)
    }

    const guarantees = computed(() => guaranteeStore.getters.getGuaranteesState())

    const isNewUser = computed<boolean>(() => {
      if (guarantees.value.length === 1 ) {
        return !guarantees.value[0].owners;
      }
      return false
    })

    onMounted(() => {
      loansStore.mutations.setStateAcceptedProposal({})
      loansStore.mutations.setStateActiveRequest({})
      loansStore.mutations.setStateActiveLoan({})
      loansStore.mutations.setStateInactiveProposals([])
      loansStore.mutations.setStateInactiveRequests([])
      loansStore.mutations.setStateCreatedProposal({})
      guaranteeStore.mutations.setSelectedGuarantee({})
    })

    return {
      component,
      indicators,
      isNewUser,
      stateBrowser,
      onSelectComponent
    }
  }
})
