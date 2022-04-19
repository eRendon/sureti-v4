<template>
  <div class="guarantee-summary-indicators-box flex su_flex_jc_sb">
    <!------Ultimo pago------>
    <div class="su_last_payment su_flex_col flex-col-6">
      <h3>Último pago:</h3>
      <div class="su_last_payment_info su_flex_col">
        <p><span>{{ label }}</span> - {{ lasPayment?.proof_date }}</p>
        <h4 class="su_last_payment_info_amount">{{ formatCurrency(lasPayment?.amount) }}</h4>
      </div>
    </div>
    <!-------Indicador de color con dias Pendientes-------->
    <div :class="[pendingCss]" class="su_debt_status su_flex_col flex-col-3">
      <p class="su_wgt_bold">{{ daysPending }} días</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { ILastPayment } from '@/interfaces/IInvestment'
import { pendingBalanceClass } from '@/utils/pendingBalance'
import { formatCurrency } from '@/plugins/filters'

const props = defineProps({
  lasPayment: {
    type: Object as PropType<ILastPayment>,
    default: () => ({})
  },
  balance: {
    type: [String, Number],
    default: '0'
  },
  pendingInterest: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: 'Intereses'
  }
})

const daysPending = computed<number | string>(() => {
  const dailyInterest = (Number(props.balance) * 0.013) / 30
  if (Infinity === ((props.pendingInterest) / dailyInterest) || -Infinity === ((props.pendingInterest) / dailyInterest) || isNaN((Number(props.pendingInterest) / dailyInterest))) {
    return 0
  } else {
    return Number((props.pendingInterest) / dailyInterest).toFixed(0)
  }
  // return isNaN((Number(props.pendingInterest) / dailyInterest)) ? 0 : (Number(props.pendingInterest) / dailyInterest).toFixed(0) // Dias que debe la persona
})

const pendingCss = computed<string>(() => {
  return pendingBalanceClass(Number(props.balance), props.pendingInterest)
})
</script>

<style lang="scss"> // Clases que vienen del componente padre
#app .sureti_guarantee_container.single .su_last_payment {
  flex-direction: column;
}

</style>

<style scoped lang="scss">
.su_last_payment {
  align-items: flex-start;
  width: 100%;
  margin-left: 1rem;
  @include for-tablet-portrait-up {
    margin-left: 2rem;
  }
  @media only screen and (min-width: 1020px) {
    flex-direction: row;
  }

  h3 {
    margin-bottom: 4px;
    font-size: 0.875em;
    font-family: "Roboto", "Montserrat", Arial, sans-serif;
    @media only screen and (min-width: 450px) {
      font-size: 1.125em;
    }
      @media only screen and (min-width: 1020px) {
    margin-right: 3rem;
  }

  }
  h4 {
    @media only screen and (min-width: 450px) {
      font-size: 0.875em;
    }
    @include for-tablet-portrait-up {
      font-size: 1.125rem;
    }
  }
  p {
    position: relative;
    margin: 0;
    font-size: 12px;
    margin-bottom: 3px;
    text-align: left;
    @media only screen and (min-width: 450px) {
      font-size: 12px;
    }
    @include for-tablet-portrait-up {
      font-size: 13px;
    }

    span {
      color: $su-purple-80;
      font-size: 13px;
      border-radius: 3px;
      @media only screen and (min-width: 450px) {
        font-size: 14px;
      }
      @include for-tablet-portrait-up {
        margin-left: 1em;
      }
    }
  }

  &_info {
    align-items: flex-start;
    @media only screen and (min-width: 420px) {
      flex-direction: row;
      align-items: center;
    }
    p,
    p span {
      @media only screen and (min-width: 420px) {
        order: 2;
        margin: 0;
      }
    }
    &_amount {
      font-size: 0.875em;
      font-weight: 700;
      font-family: "Roboto", "Montserrat", Arial, sans-serif;
      color: $su_purple_80;
      @media only screen and (min-width: 420px) {
        order: 1;
        margin-right: 10px;
        &::after {
          content: "|";
          color: $su-purple-40;
          margin-left: 10px;
        }
      }
    }
  }
}

.su_vertical_divisor {
  width: 1px;
  margin-right: 1.5rem;
  height: 35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $su-purple-20;
}
.su_debt_status {
  justify-content: center;
  padding: 1rem 6px;
  margin-right: 1rem;
  border-radius: 3px;
  p {
    margin: 0;
    font-size: 1.125rem;
    line-height: normal;
    color: #fff;
    @media only screen and (min-width: 450px) {
      font-size: 1.25rem;
    }
  }

  
}

  .good-green {
  background-color: #45c742;
}
.late-yellow {
  background-color: #cfd23d;
}
.very-late-orange {
  background-color: #fc8948;
}
.urgent-red {
  background-color: #e73f3f;
}
.normal-black {
  background-color: #333333;
}
</style>
