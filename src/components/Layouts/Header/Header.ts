import { defineComponent, computed } from 'vue'
import { userTypeStore, modalStore, userStorage, guaranteeStore, loaderStore } from '../../../storage'
import Profile from '@/components/DashBoard/SidebarProfile/SidebarProfile.vue'
import { useRouter } from 'vue-router'
import { ILoadingDots } from '@/interfaces/ILoader'
import { useAuthStore } from '@/store/authStore'


export default defineComponent({
    name: 'HeaderLayout',
    components: {
        Profile
    },
    setup () {
        const authStore = useAuthStore()
        const auth = computed(() => authStore.getStateAuth);
        const isClient = computed<boolean>(() => userTypeStore.getters.getIsClient())
        const isInvestor = computed<boolean>(() => userTypeStore.getters.getIsInvestor())

        const isBrowsing = computed<string>(() => userStorage.getters.getStateBrowser())
        const router = useRouter()

        const profile = computed(() => userStorage.getters.getStateProfile())

        const onLoadInvestment = async (): Promise<void> => {
            guaranteeStore.mutations.setStateGuarantees([])
            userStorage.mutations.setStateBrowser('inversiones')
            if (profile.value.user_type?.includes('investor')) {
                await router.push({
                    name: 'Dashboard'
                })
                await userTypeStore.actions.loadFlowInvestment()
                return
            }
            await router.push({
                name: 'Investment',
                params: {
                    intention: 'dashboard',
                    isOnBoarding: 1,
                }
            })
        }

        const onLoadClient = async (): Promise<void> => {
            guaranteeStore.mutations.setStateGuarantees([])
            const loadingState = loaderStore.getters.getOverlayModal()
            if (!loadingState.spinnerDots) {
                const stateDots: ILoadingDots = {
                    spinnerDots: true
                }
                loaderStore.actions.loadingOverlay(stateDots).present()
            }
            userStorage.mutations.setStateBrowser('prestamos')
            if (profile.value.user_type?.includes('client')) {
                await router.push({
                    name: 'Dashboard'
                })
                await userTypeStore.actions.loadFlowClient()
                return
            }
            await router.push({
                name: 'Loans',
                params: {
                    intention: 'dashboard'
                }
            })
            loaderStore.actions.loadingOverlay().dismiss()
        }

        const openProfile = (): void => {
            modalStore.mutations.setStateProfileModal(true)
        }

        const logOut = async () => {
            await authStore.logOut()
        }

        return {
            onLoadClient,
            onLoadInvestment,
            openProfile,
            logOut,
            auth,
            isBrowsing,
            isClient,
            isInvestor
        }
    }
})
