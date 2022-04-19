import { defineStore } from 'pinia'
import { IProfile, IUserStore } from '@/interfaces/IUser'
import { useAuthStore } from '@/store/authStore'
import router from '@/router'
import { useLoaderStore } from '@/store/loaderStore'
import { userRequest } from '@/api-client'
import { IAlert } from '@/interfaces/IAlert'
import { useModalStore } from '@/store/modalStore'
import { useUserTypeStore } from '@/store/userTypeStore'

export const useUserStore = defineStore('userStore', {
    state: (): IUserStore => ({
        profile: {},
        isBrowsing: '',
        toGetMovements: false
    }),
    actions:  {
        setProfile (profile: IProfile, show: boolean): void {
            localStorage.setItem('profile', JSON.stringify(profile))
            this.profile = profile
        },
        async validateUserType (): Promise<void> {
            const authStore = useAuthStore()
            const loaderStore = useLoaderStore()
            authStore.$patch({
                auth: {
                    isLoggedIn: true
                }
            })
            if (!this.profile!.user_type) {
                await router.push({
                    name: 'OnBoarding'
                })
                loaderStore.loadingOverlay().dismiss()
            }
            if (this.profile!.user_type === 'investor' && !this.isBrowsing) {
                this.isBrowsing = 'inversiones'
                localStorage.setItem('stateBrowser', this.isBrowsing)
            } else if ((this.profile!.user_type === 'client' || this.profile!.user_type === 'client_investor') && !this.isBrowsing) {
                this.isBrowsing = 'prestamos'
                localStorage.setItem('stateBrowser', this.isBrowsing)
            }

            await this.validateSchemaUserType(this.profile!)

            if (router.options.history.state.back === '/login' || router.currentRoute.value.name === 'Login') {
                await router.push({
                    name: 'Dashboard'
                })
            }
        },
        async validateSchemaUserType(profile: IProfile): Promise<void> {
            const loaderStore = useLoaderStore()
            const usertypeStore = useUserTypeStore()
            if (profile.user_type?.includes('client') && this.isBrowsing === 'prestamos') {
                await usertypeStore.loadFlowClient()
                return
            } else if (profile.user_type?.includes('investor') && this.isBrowsing === 'inversiones') {
                await usertypeStore.loadFlowInvestment()
                return
            }
            loaderStore.loadingOverlay().dismiss()
        },
        async getProfile (): Promise<void> {
            const authStore = useAuthStore()
            const modalStore = useModalStore()
            const { user_id } = authStore.getStateAuth
            const { data, status, success } = await userRequest.getProfile(user_id!)

            if (status === 404) {
                const alert: IAlert = {
                    text: 'Su sesión ha caducado',
                    show: true
                }
                modalStore.alert(alert)
                await authStore.logOut()
                return
            }
            if (success) {
                localStorage.setItem('profile', JSON.stringify(data))
                this.profile = data
                await this.validateUserType()
            }
        }
    },
    getters: {
        getStateProfile: (state): IProfile => state.profile!,
        getStateBrowser: (state): string => state.isBrowsing,
        getStateToGetMovements: (state): boolean => state.toGetMovements
    }
})