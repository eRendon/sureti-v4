<template>
  <div class="su_user_form">
    <div v-if="!isFinalStep">
      <h2 class="su_form_heading su_purple su_wgt_regurlar">
        Cuanto deaseas invertir?
      </h2>
      <div class="su_amount_slider_box su_flex_col">
        <p class="su_amount_selected su_wgt_bold">
          {{ formatCurrency(intentionToInvest) }}
        </p>
        <input
          v-model="intentionToInvest"
          type="range"
          class="su_amount_slider"
          :min="min"
          :max="max"
          step="5000000"
        />
      </div>
      <!-- <p>{{ minimum }}</p> -->
      <div class="su_amount_results">
        <div class="su_amount_interest su_flex">
          <p>Interes Mensual</p>
          <div class="su_purple su_wgt_bold">
            <h3>
              {{ publicGuarantee.return_investment }}
              <span class="su_purple_60 su_wgt_light">%</span>
            </h3>
          </div>
        </div>
        <div class="su_amount_interest su_flex">
          <p>Estimado Anual</p>
          <div class="su_purple su_wgt_bold">
            <h3>
              {{ formatCurrency(annualEstimated) }}
            </h3>
          </div>
        </div>
      </div>
      <Form @submit="onNextStep" :validation-schema="useFormSchema" v-slot="{ errors }">
        <div class="su_user_info">
          <div class="su_input_with_icon">
            <img
                src="@/assets/img/icons/su_icon_telephone.svg"
                alt="telephone icon"
            />
            <Field
                type="text"
                id="su_mobile"
                name="investor_phone"
                placeholder="Numero de Celular"
            />
            <span class="text-red-500 text-xs">{{ errors.investor_phone }}</span>
          </div>
          <div class="su_input_with_icon">
            <img src="@/assets/img/icons/su_icon_email.svg" alt="email icon" />
            <Field type="email" id="su_email" name="investor_email" placeholder="Email" />
          </div>
        </div>
        <div>
          <button type="submit" class="su_form_button su_yellow_gradient">
            Quiero continuar
          </button>
        </div>
      </Form>
    </div>
    <div v-else class="su_user_form_msg">
      <h2>¡Muchas gracias!</h2>
      <p class="su_purple_80_bg">En menos de 12 horas estaremos dando respuesta</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPublicGuarantee } from "@/interfaces/IGuarantee";
import { computed, ref, toRefs } from "vue";
import { formatCurrency } from "@/plugins/filters";
import { IFormPublicCard } from '@/interfaces/IPublicCard'
import { Field, Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import { userStorage } from '@/storage'

const props = defineProps({
  publicGuarantee: {
    type: Object as () => IPublicGuarantee,
    default: () => ({}),
    required: true
  },
  max: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  interest: {
    type: Number,
    default: 0
  },
  isFinalStep: {
    type: Boolean,
    default: false
  }
})

const { interest } = toRefs(props)

const intentionToInvest = ref(props.min)

const annualEstimated = computed(() => {
  return (intentionToInvest?.value * (Number(interest?.value) / 100)) * 12
})

const emits = defineEmits(['onSubmitForm'])

const onNextStep = (useForm: IFormPublicCard): void => {
  const { user_id } = userStorage.getters.getStateProfile()
  useForm.request_date = new Date().toISOString()
  useForm.request_amount = intentionToInvest.value!.toFixed()
  useForm.investor_persona = 'persona_2'
  useForm.investor_id = user_id || ''
  useForm.investor_tracking = ''
  useForm.investor_notes = ''
  useForm.investor_email ? useForm.investor_email = useForm.investor_email : useForm.investor_email = `+57${useForm.investor_phone}@crm.sureti.co`
  console.log(useForm)
  emits('onSubmitForm', useForm)
};

const useFormSchema:IFormPublicCard = {
  investor_email: '',
  investor_id: '',
  investor_notes: '',
  investor_persona: '',
  investor_phone: 'required|max:13',
  investor_tracking: '',
  request_amount: '',
  request_date: ''
}

</script>

<style scoped lang="scss">
.su_form_heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  @include for-phone-only {
    font-size: 1rem;
  }
}

.su_amount_slider_box {
  padding: 24px 16px 32px 16px;
  background-color: $su-purple-80;
  border-radius: 5px;
  @include for-phone-only {
    padding: 20px 12px 24px 12px;
  }

  .su_amount_selected {
    margin: 0 0 1rem;
    font-family: "Montserrat", "Roboto", Arial, sans-serif;
    font-size: 1.125em;
    color: #fff;
  }

  .su_amount_slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 2px;
    border-radius: 1px;
    background-color: $su_purple_40;
  }

  .su_amount_slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 25px;
    border: 3px solid $su-purple-80;
    background: $su-yellow-100; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .su_amount_slider::-moz-range-thumb {
    appearance: none;
    width: 24px; /* Set a specific slider handle width */
    height: 24px; /* Slider handle height */
    border-radius: 25px;
    border: 3px solid $su-purple-80;
    background: $su-yellow-100; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
}

.su_amount_results {
  margin: 1.5rem 0 1.5rem 0;

  &:first-child {
    margin-bottom: 0.5rem;
  }
  .su_amount_interest {
    justify-content: space-between;
    align-items: center;

    &:first-child {
      margin-bottom: 12px;
    }

    p {
      font-size: 1rem;
      color: $su-purple-100;
      margin: 0;
    }

    h3 {
      font-family: "Roboto", "Montserrat", Arial, sans-serif;
      font-size: 1.125em;
      color: $su-purple-100;
    }
  }
}

.su_user_info {
  .su_input_with_icon {
    display: flex;
    margin-bottom: 1rem;
    padding: 12px 12px;
    border: 1px solid $su-purple-100;
    border-radius: 5px;
    input {
      border: none;
      margin-left: 10px;
      &::placeholder {
        font-weight: 300;
        font-size: 1em;
        color: $su_purple_60;
      }
    }
  }
}

.su_form_button {
  width: 100%;
  position: relative;
  margin-top: 0.5rem;
  padding: 16px 12px;
  text-align: left;
  border: none;
  font-family: "Roboto", "Montserrat", Arial, sans-serif;
  color: $su_purple_100;
  font-size: 1rem;
  font-weight: 700;

  &::after {
    content: "";
    background-repeat: no-repeat;
    position: absolute;
    background-image: url(@/assets/img/icons/su_icon_next_puple.svg);
    background-size: contain;
    width: 14px;
    height: 16px;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }

  
}
.su_user_form_msg {
    padding: 1rem 0;
    border-radius: 5px;
    color: #fff !important;
    h2 {
      color: $su-purple-120;
      font-weight: 400;
    }
    
    p {
      padding: 1rem;
      font-size: 1rem;
      border-radius: 5px;
      color: #fff;
    }
}
</style>
