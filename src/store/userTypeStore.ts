import { defineStore } from 'pinia'
import { ITypeUserStore } from '@/interfaces/ITypeUser'
import { useUserStore } from '@/store/userStore'
import { useGuaranteeSore } from '@/store/guaranteeStore'
import { useLoanStore } from '@/store/loanStore'
import { useLoaderStore } from '@/store/loaderStore'
import { useModalStore } from '@/store/modalStore'
import { IIndicator } from '@/interfaces/IIndicator'
import { useInvestmentStore } from '@/store/investmentStore'

export const useUserTypeStore = defineStore('userTypeStore', {
    state: (): ITypeUserStore => ({
        indicators: [],
        isClient: false,
        isInvestor: false
    }),
    actions: {
        async loadFlowClient (): Promise<void> {
            const userStore = useUserStore()
            const guaranteeStore = useGuaranteeSore()
            const loanStore = useLoanStore()
            const loaderStore = useLoaderStore()
            const { total_loans, total_loans_interest, total_interest_payments, total_capital_payments, total_guarantees_credit_limit } = userStore.profile!
            this.indicatorsClient(total_loans!, total_loans_interest!, total_interest_payments!, total_capital_payments!, total_guarantees_credit_limit!)
            await guaranteeStore.getGuarantees()
            await loanStore.getLoans()
            await loanStore.getProposals()
            loanStore.isToFilter = true
            loaderStore.loadingOverlay().dismiss()
        },
        async loadFlowInvestment (): Promise<void> {
            const userStore = useUserStore()
            const investmentStore = useInvestmentStore()

            const { total_investments, total_investment_interests, total_received_interest_payments, total_received_capital_payments } = userStore.profile!
            this.indicatorsInvestment(Number(total_investments),Number(total_investment_interests), Number(total_received_interest_payments), Number(total_received_capital_payments) )

            await investmentStore.getGuaranteesInInvestments()
        },
        indicatorsClient(total_loans: number, total_loans_interest: number, total_interest_payments: number, total_capital_payments: number, total_guarantees_credit_limit: number): void {
            const modalStore = useModalStore()

            const indicatorLoan: IIndicator = {
                title: 'Intereses Pendientes',
                nameLink: 'Realizar un pago',
                amount: total_loans_interest - total_interest_payments,
                nameComponent: 'Payments',
                action: (): void => {
                    if (total_loans_interest - total_interest_payments > 0) {
                        modalStore.payments = {
                            show: true,
                            isCapitalPayment: false,
                            title: 'Pago de intereses'
                        }
                    }
                }
            }

            const indicatorCapital: IIndicator = {
                title: 'Capital en deuda',
                nameLink: 'Abono a capital',
                amount: total_loans - total_capital_payments,
                nameComponent: 'Payments',
                action: (): void => {
                    if (total_loans - total_capital_payments > 0) {
                        modalStore.payments = {
                            show: true,
                            isCapitalPayment: true,
                            title: 'Abono a capital'
                        }
                    }
                }
            }

            const indicatorQuota: IIndicator = {
                title: 'Cupo disponible',
                nameLink: 'Solicitar mas fondos',
                amount: total_guarantees_credit_limit - total_loans,
                nameComponent: 'Payments',
                action: (): void => {
                    if (total_guarantees_credit_limit - total_loans > 0) {
                        modalStore.requestModal = {request: {}, show: true }
                    }
                }
            }

            const indicators: IIndicator[] = []
            indicators.push(indicatorLoan)
            indicators.push(indicatorCapital)
            indicators.push(indicatorQuota)

            this.indicators = indicators
            this.isClient = true
            this.isInvestor = false
        },
        indicatorsInvestment(total_investments: number, total_investment_interests: number, total_received_interest_payments: number, total_received_capital_payments: number) {
            const indicatorLoan: IIndicator = {
                title: 'Intereses Pagados',
                amount: total_received_interest_payments,
            }
            const indicatorCapital: IIndicator = {
                title: 'Intereses Pendientes',
                amount: total_investment_interests - total_received_interest_payments
            }
            const indicatorQuota: IIndicator = {
                title: 'Capital rentando',
                amount: total_investments - total_received_capital_payments
            }

            const indicators: IIndicator[] = []
            indicators.push(indicatorLoan)
            indicators.push(indicatorCapital)
            indicators.push(indicatorQuota)

            this.indicators = indicators
            this.isClient = false
            this.isInvestor = true
        }
    }
})