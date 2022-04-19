<template>
  <div class="su_investment_opportunities_container">
    <h1 class="su_purple">Oportunidades de Inversión</h1>
      <div class="su_investment_opportunities_marketplace">
        <div v-for="guarantee in publicGuarantees">
          <guarantee
            @onInterestedUser="onInterestedUser(guarantee)"
            :publicGuarantee="guarantee"
          ></guarantee>
        </div>
      </div>
  <modal-layout @onDismissModal="onDismissModal" :showModal="showDetail">
    <FormPublicGuarantee :max="max"
                         :min="min"
                         :interest="interest"
                         :is-final-step="isFinalStep"
                         @onSubmitForm="onSubmitForm($event)"
                         :public-guarantee="selectedGuarantee"/>
  </modal-layout>
  </div>
</template>

<script setup lang="ts">
import Guarantee from "@/components/Public/InvestmentCard/InvestmentCard.vue";
import FormPublicGuarantee from '@/components/Public/Form/Form.vue'
import { computed, onMounted, ref } from 'vue'
import { IPublicGuarantee } from "@/interfaces/IGuarantee";
import { investmentCardRequest } from '@/api-client'
import { IFormPublicCard } from '@/interfaces/IPublicCard'
const showDetail = ref(false);
const isFinalStep = ref(false)

const onInterestedUser = (guarantee: IPublicGuarantee): void => {
  console.log(guarantee);
  showDetail.value = true;
  selectedGuarantee.value = guarantee;
};

const onDismissModal = (): void => {
  showDetail.value = false;
  isFinalStep.value = false
};

const max = computed<number>(() => {
  return Number(selectedGuarantee?.value?.amount_requested!) - Number(selectedGuarantee?.value?.amount_committed!)
})

const min = computed<number>(() => {
  return Number(selectedGuarantee?.value?.minimum_investment!)
})

const interest = computed<number>(() => {
  return Number(selectedGuarantee.value.return_investment)
})

const selectedGuarantee = ref<IPublicGuarantee>({})

const publicGuarantees = ref<IPublicGuarantee[]>([])

const getPublicCard = async () => {
  const { data, success } = await investmentCardRequest.getCards()
  if (success) {
    publicGuarantees.value = data
  }
  console.log('investmentCardRequest', data)
}

const onSubmitForm = async (form: IFormPublicCard) => {
  const { data, success } = await investmentCardRequest.sendPublicCardForm(form, selectedGuarantee.value.guarantee_id!)
  console.log('onSubmitForm', data)
  if (success) {
    isFinalStep.value = true
  }
}

onMounted(() => {
  getPublicCard()
})
</script>

<style lang="scss">//Global 

#app .sureti-movement-modal-body { //Overwriting General Modal Styles
  padding: 24px 32px;
}

</style>

<style scoped lang="scss">

h1 {
  font-size: 2.25em;
  margin: 0.5rem 0 2rem 0;
  @include for-phone-only {
    font-size: 1.75em;
    line-height: 32px;
  }
}
.su_investment_opportunities_marketplace {
  margin-right: -2rem;
  display: flex;
  justify-content: flex-start;
  // max-width: 1150px;
  @include for-phone-only {
    flex-wrap: wrap;
  }
  @include for-tablet-portrait-up {
    flex-wrap: wrap;
  }
  // @include for-tablet-landscape-up {
  //   flex-wrap: nowrap;
  // }
  @include for-desktop-up {
    width: 1152px;
  }
}

// .su_investment_opportunities_container {
//   width: 100%;
// }
</style>
