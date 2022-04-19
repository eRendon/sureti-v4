<template>
  <s-header></s-header>
  <div>
    <main role="main" id="sureti-content">
      <router-view></router-view>
    </main>
    <loading-overlay></loading-overlay>
    <alert></alert>
    <payments-modal></payments-modal>
    <RequestModal></RequestModal>
  </div>
</template>

<script lang="ts">
import Header from '../components/Layouts/Header/Header.vue'
import RequestModal from '@/components/Modals/RequestLoan/RequestLoan.vue'

import { computed, defineComponent, onMounted } from 'vue'
import { userStorage, userTypeStore } from '../storage'
import { useAuthStore } from '@/store/authStore'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    'SHeader': Header,
    RequestModal
  },
  setup () {
    const authStore = useAuthStore()
    const profile = computed(() => userStorage.getters.getStateProfile())

    const auth = computed(() => authStore.getStateAuth)

    onMounted(async () => {
      if (profile.value.user_type === 'client') {
        await userTypeStore.actions.loadFlowClient()
      } else if (profile.value.user_type === 'investor') {
        await userTypeStore.actions.loadFlowInvestment()
      }
    })

    return {
      auth
    }
  }
})
</script>

<style scoped>
#sureti-content {
  padding:20px;
  max-width: 1160px;
  margin:0 auto;
}
@media all and (min-width:768px){
  #sureti-content {
  padding:35px 25px;
  max-width: 1160px;
  margin:0 auto;
}
}
</style>
