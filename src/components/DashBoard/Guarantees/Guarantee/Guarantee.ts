import { computed, defineComponent, getCurrentInstance } from 'vue'
import { IGuaranteeInInvestment, IIndicator, ILastPayment } from '@/interfaces/IInvestment'
import Indicators from '@/components/DashBoard/Guarantees/Indicators/Indicators.vue'
import LastPayment from '@/components/DashBoard/LastPayment/LastPayment.vue'

export default defineComponent({
    name: 'Guarantee',
    props: {
        guarantee: {
            type: Object as ()=> IGuaranteeInInvestment,
            default: () => ({})
        },
        isDetail: {
            type: Boolean,
            default: false
        }
    },
    emits: ['onSelectedGuarantee'],
    components: {
      Indicators,
      LastPayment,
    },
    setup (props, { emit }) {
        const app = getCurrentInstance();
        const filters = app?.appContext.config.globalProperties.$filters

        const onDetailGuarantee = (): void => {
            emit('onSelectedGuarantee', props.guarantee)
        }
        const debt = computed(() => {
           return props.guarantee?.investments?.reduce((newValue, investment) => {
               if (investment.state === 'disbursed investment') {
                   return Number(newValue) + Number(investment.balance!)
               }
               return 0
           }, 0)
        })

        const pending = computed(() => {
            return  props.guarantee?.investments?.reduce((nowValue, investment) => {
                if (investment.state === 'disbursed investment') {
                    return Number(nowValue) + Number(investment.total_interests_balance!)
                }
                return 0
            }, 0)
        })

        const paid = computed(() => {
            return  props.guarantee?.investments?.reduce((nowValue, investment) => {
                if (investment.state === 'disbursed investment') {
                    return Number(nowValue) + (Number(investment.total_interests_amount!) - Number(investment.total_interests_balance!) )
                }
                return 0
            }, 0)
        })

        const generated = computed(() => {
            return  props.guarantee?.investments?.reduce((nowValue,  investment) => {
                if (investment.state === 'disbursed investment') {
                    return Number(nowValue) + Number(investment.total_interests_amount!)
                }
                return 0
            }, 0)
        })

        const balance = computed(() => {
            return props.guarantee?.investments?.reduce((nowValue, investment) => {
                if (investment.state === 'disbursed investment') {
                    return Number(nowValue) + Number(investment.balance)
                }
                return 0
            }, 0)
        })

        // ESTADO
        const indicators = computed<IIndicator[]>(() => {
            return [
                {
                    body: filters.formatAmount(String(debt.value)),
                    footer: filterAmount(String(debt.value)),
                    head: 'Inversión',
                    class: 'inversion flex-col-1'
                },
                {
                    body: filters.formatAmount(String(paid.value)),
                    footer: filterAmount(String(paid.value)),
                    head: 'Pagados',
                    class: 'generados flex-col-1'
                },
                {
                    body: filters.formatAmount(String(pending.value)),
                    footer: filterAmount(String(pending.value)),
                    head: 'Pendientes',
                    class: 'pendientes flex-col-1'
                },
                
            ]
        })

        // CONDICIONES
        const conditions = computed<IIndicator[]>(() => {
            return [
                {
                    body: filters.formatAmount(String((props.guarantee?.guarantee_value ? props.guarantee?.guarantee_value : 'N/A'))),
                    footer: 'millones',
                    head: 'Avalúo',
                    class: 'avaluo flex-col-1'
                },
                {
                    body: filters.formatAmount(String(props.guarantee?.balance)),
                    footer: 'millones',
                    head: 'Préstamo',
                    class: 'p-total flex-col-1'
                },
                {
                    body: String(props.guarantee?.return_investment) + '%',
                    footer: 'mensual',
                    head: 'Retorno',
                    class: 'retorno flex-col-1'
                }
            ]
        })

        // CARACTERISTICAS
        const features = computed<IIndicator[]>(() => {
            return [
                {
                    body: String(props.guarantee?.real_estate_estrato ? props.guarantee?.real_estate_estrato : 'N/A'),
                    head: 'Estrato',
                    class: 'estrato flex-col-1'
                },
                {
                    body: String(props.guarantee?.real_estate_area ? props.guarantee?.real_estate_area.substring(0, props.guarantee?.real_estate_area.indexOf('.')) : 'N/A'),
                    head: 'Área',
                    class: 'area flex-col-1'
                },
                {
                    body: String(props.guarantee?.real_estate_type ? props.guarantee?.real_estate_type : 'N/A'),
                    head: 'Tipo',
                    class: 'use-type flex-col-1'
                }
            ]
        })

        const payment = computed<{ lastPayment?: ILastPayment, label: string}>(() => {
            if (!props.guarantee?.last_interest_payment?.creation_date_utc! || !props.guarantee?.last_capital_payment?.creation_date_utc!) {
                return {
                    lastPayment: {
                        amount: '0',
                        payment_id: '',
                        state: '',
                        creation_date_utc: '',
                        investment_id: '',
                        proof_date: ''
                    },
                    label: 'Sin pagos realizados'
                }
            }
            if (new Date(props.guarantee?.last_interest_payment?.creation_date_utc!) > new Date(props.guarantee?.last_capital_payment?.creation_date_utc!)) {
                return {
                    lastPayment: props.guarantee?.last_interest_payment!,
                    label: 'Intereses'
                }
            }
            return {
                lastPayment: props.guarantee?.last_capital_payment!,
                label: 'Capital'
            }
        })


        const filterAmount = (value: string): string => {
            let fixed = Math.floor(Number(value)).toFixed(0)
            if (fixed.length <= 4) {
                return 'pesos'
            } else if (fixed.length >= 5 && fixed.length <= 6) {
                return 'miles'
            }
            return 'millones'
        }

        return {
            indicators,
            conditions,
            features,
            onDetailGuarantee,
            debt,
            pending,
            generated,
            payment,
            balance
        }
    }
})