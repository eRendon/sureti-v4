import mutations from './mutations'
import { IProfile } from '@/interfaces/IUser'
import getters from './getters'
import router from '../../../router'
import { userRequest } from '@/api-client'
import { guaranteeStore, loaderStore, modalStore, userStorage, userTypeStore } from '../../index'
import { IAlert } from '@/interfaces/IAlert'
import profile from '@/views/dashboard/profile/profile'
import { useAuthStore } from '@/store/authStore'

const actions = {

  stateProfile(profile: IProfile): void {
    mutations.setStateProfile(profile)
  },
  async validateUserType(): Promise<void> {
    const authStore = useAuthStore()
    const profile = getters.getStateProfile()
    authStore.$patch({
      auth: {
        isLoggedIn: true
      }
    })
    if (!profile.user_type) {
      console.log('si hay user tipe')
      await router.push({
        name: 'OnBoarding'
      })
      loaderStore.actions.loadingOverlay().dismiss()
      return
    }
    const stateBrowser = userStorage.getters.getStateBrowser()
    // await guaranteeStore.actions.getGuarantees()
    console.log('validateUserType', stateBrowser)
    console.log('validateUserType', profile)
    if (profile.user_type === 'investor' && !stateBrowser) {
      console.log('investor', stateBrowser)
      userStorage.mutations.setStateBrowser('inversiones')
    } else if ((profile.user_type === 'client' || profile.user_type === 'client_investor') && !stateBrowser){
      console.log('client', stateBrowser)
      userStorage.mutations.setStateBrowser('prestamos')
    }
    await this.validateSchemaUserType(profile)
    // profile.user_type === 'client' ? await userTypeStore.actions.loadFlowClient() : await userTypeStore.actions.loadFlowInvestment()
    if (router.options.history.state.back === '/login' || router.currentRoute.value.name === 'Login') {
      await router.push({
        name: 'Dashboard'
      })
    }
    // loaderStore.actions.loadingOverlay().dismiss()
  },

  async validateSchemaUserType (profile: IProfile) {
    const stateBrowser = userStorage.getters.getStateBrowser()
    if (profile.user_type?.includes('client') && stateBrowser === 'prestamos') {
      await userTypeStore.actions.loadFlowClient()
      return
    } else if (profile.user_type?.includes('investor') && stateBrowser === 'inversiones') {
      await userTypeStore.actions.loadFlowInvestment()
      return
    }
    loaderStore.actions.loadingOverlay().dismiss()
  },

  async getProfile(): Promise<void> {
    const authStore = useAuthStore()
    const { user_id } = authStore.getStateAuth
    const { success, data, status } = await userRequest.getProfile(user_id!)
    if (status === 404) {
      const alert: IAlert = {
        text: 'Su sesión ha caducado',
        show: true
      }
      modalStore.actions.alert(alert)
      await authStore.logOut()
      return
    }
    if (success) {
      mutations.setStateProfile(data)
      await this.validateUserType()
    }
  }
}

export default actions
