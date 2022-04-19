import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { modalStore, userStorage } from '../../../storage'
import { useAuthStore } from '@/store/authStore'

export default defineComponent({
    name: 'Profile',
    setup() {
        const authStore = useAuthStore()
        const user = computed(() => userStorage.getters.getStateProfile())

      const isOpen = computed(() => modalStore.getters.getStateProfileModal())

      const drawer = (): void => {
          modalStore.mutations.setStateProfileModal(!isOpen)
      }

      watch(() => isOpen.value, (isOpen)=> {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
      }, { immediate: true })

        onMounted(() => {
            document.addEventListener("keydown", e => {
                if (e.keyCode == 27 && isOpen.value) modalStore.mutations.setStateProfileModal(false);
            });
        })

        const closeModalProfile = (): void => {
            modalStore.mutations.setStateProfileModal(false)
        }

        const logOut = async () => {
            await authStore.logOut()
        }

        return {
            user,
            isOpen,
            logOut,
            drawer,
            closeModalProfile
        }
    }
})
