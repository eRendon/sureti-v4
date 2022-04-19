import state from './state'
import { IProfile } from '@/interfaces/IUser'

const mutations = {
  setStateProfile(profile: IProfile): void {
    localStorage.setItem('profile', JSON.stringify(profile))
    state.profile = profile
  },
  setStateBrowser (stateBrowser: 'inversiones' | 'prestamos' | ''): void {
    localStorage.setItem('stateBrowser', stateBrowser)
    state.isBrowsing = stateBrowser
  },
  setStateGetMovements (payload: boolean): void {
    state.toGetMovements = payload
  }
}

export default mutations
