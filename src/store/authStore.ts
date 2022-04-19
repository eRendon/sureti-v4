import { defineStore } from 'pinia'
import { IAuthStorage, ILoginResponse } from '@/interfaces/IAuth'
import { loaderStore, userStorage } from '@/storage'
import { ILoadingDots } from '@/interfaces/ILoader'
import { apiClient } from '@/api-client/axios/config'
import { authRequest } from '@/api-client'
import router from '@/router'

/**
 * ToDo Module Auth
 */

export const useAuthStore = defineStore('authStore', {
    state: (): IAuthStorage => ({
        isNewUser: true,
        auth: {
            isLoggedIn: false
        }
    }),
    actions: {

        /**
         * @param auth
         * @type ILoginResponse
         * @return void
         * Set the auth state and localStore to persist data
         */

        stateAuth(auth: ILoginResponse): void {
            localStorage.setItem('auth', JSON.stringify(auth))
            this.auth = auth
        },

        /**
         ToDo Init Data Sureti
         * When refresh page. This get the state browser (name tab navigation), auth user and get profile user and set authorization
         * bearer token to headers axios
         * @return void
         */
        async init(): Promise<void> {
            const stateBrowser = localStorage.getItem('stateBrowser')
            if(stateBrowser) {
                userStorage.mutations.setStateBrowser(stateBrowser as "inversiones" | "prestamos")
            }
            const auth = localStorage.getItem('auth')
            console.log(auth)
            if (auth) {
                this.auth.isLoggedIn = true
                const profile = localStorage.getItem('profile')
                if (profile) {
                    userStorage.mutations.setStateProfile(JSON.parse(profile))
                }
                const loadingState = loaderStore.getters.getOverlayModal()
                if (!loadingState.spinnerDots) {
                    const stateDots: ILoadingDots = {
                        spinnerDots: true
                    }
                    loaderStore.actions.loadingOverlay(stateDots).present()
                }
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(auth).token}`
                this.auth = JSON.parse(auth)
                await userStorage.actions.getProfile()
            }
        },

        /**
         ToDo LogOut user
         * log out function user, and clear all data in localStore
         * @return Promise<void>
         */

        async logOut(): Promise<void> {
            const stateDots: ILoadingDots = {
                spinnerDots: true
            }
            loaderStore.actions.loadingOverlay(stateDots).present()
            const { success } = await authRequest.logOut()
            const stateAuth: ILoginResponse = {
                redirect_to: '',
                token: '',
                user_id: '',
                tl_token: 0,
                isLoggedIn: false
            }
            if (success) {
                apiClient.defaults.headers.common['Authorization'] = ''
                this.auth.isLoggedIn = false
                this.auth = stateAuth
                localStorage.clear()
                loaderStore.actions.loadingOverlay().dismiss()
                await router.push({
                    name: 'Login'
                })
            }
            loaderStore.actions.loadingOverlay().dismiss()
        }
    },
    getters: {
        getStateAuth: (state): ILoginResponse => state.auth,
        getStateIsNewUser: (state): boolean => !userStorage.getters.getStateProfile().user_type
    }
})