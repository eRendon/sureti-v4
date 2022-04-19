import { IGuaranteeInInvestment, IInvestment } from '@/interfaces/IInvestment'
import state from '@/storage/modules/investment/state'

const mutations = {
    setInvestments (investments: IInvestment[]): void {
        state.investments = investments
    },
    setGuarantees (guarantees: IGuaranteeInInvestment[]): void {
        state.guarantees = guarantees.sort((a, b) => {
            if (a.last_interest_payment?.creation_date_utc) {
                return new Date(a.last_interest_payment.creation_date_utc).getTime() - new Date(b.last_interest_payment!.creation_date_utc!).getTime()
            }
            return 0
        })
    },
    setSelectedGuarantee(guarantee: IGuaranteeInInvestment) {
        state.selectedGuarantee = guarantee
    }
}

export default mutations
