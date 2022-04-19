import { investmentRequest } from '@/api-client'
import { investmentStore, loaderStore } from '@/storage'
import { IGuaranteeInInvestment } from '@/interfaces/IInvestment'


const actions = {
    async getInvestments (): Promise<void> {
        const { data, success } = await investmentRequest.investment()
        if (success) {
            investmentStore.mutations.setInvestments(data)
        }
        loaderStore.actions.loadingOverlay().dismiss()
    },
    async getGuaranteesInInvestments (): Promise<void> {
        const { data, success } = await investmentRequest.getGuaranteesInInvestments()

        if (success) {
            investmentStore.mutations.setGuarantees(data.sort((guaranteeA, guaranteeB, ) => {
                return filterDateGuarantees(guaranteeA, guaranteeB)
            }))
        }
    }
}

const filterDateGuarantees = (guaranteeBefore: IGuaranteeInInvestment, guaranteeAfter: IGuaranteeInInvestment): number => {
    let investmentA = false
    let last_interest_paymentA = ''
    let last_interest_paymentB = ''
    guaranteeBefore.investments?.map((investment) => {
        if (investment.state === 'disbursed investment') {
            investmentA = true
        }
        return investment
    })

    let investmentB = false
    guaranteeAfter.investments?.map((investment) => {
        if (investment.state === 'disbursed investment') {
            investmentB = true
        }
        return investment
    })

    if (investmentA && (Number(guaranteeBefore.last_interest_payment?.amount) > 0)) {
        last_interest_paymentA = guaranteeBefore.last_interest_payment?.creation_date_utc!
    } else if (investmentA && (Number(guaranteeBefore.last_capital_payment?.amount) > 0)) {
        last_interest_paymentA = guaranteeBefore.last_capital_payment?.creation_date_utc!
    }

    if (investmentB && guaranteeAfter.last_interest_payment?.proof_date) {
        last_interest_paymentB = guaranteeAfter.last_interest_payment.creation_date_utc
    } else if (investmentB && guaranteeAfter.last_capital_payment?.proof_date) {
        last_interest_paymentB = guaranteeAfter.last_capital_payment.creation_date_utc
    }

    console.log('a', new Date(last_interest_paymentA).getTime())
    console.log('b', new Date(last_interest_paymentB).getTime())

    if ( new Date(last_interest_paymentA).getTime() > 0 || new Date(last_interest_paymentB).getTime() > 0) {
        return new Date(last_interest_paymentB).getTime() - new Date(last_interest_paymentA).getTime()
    }
    return 0
    //return new Date(investmentB?.creation_date_utc!).getTime() - new Date(investmentA?.creation_date_utc!).getTime()
}

export default actions
