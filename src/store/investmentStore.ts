import { defineStore } from 'pinia'
import { IInvestmentStore } from '@/interfaces/IInvestment'
import { investmentRequest } from '@/api-client'

export const useInvestmentStore = defineStore('investmentStore' ,{
    state: (): IInvestmentStore => ({
        investments: [],
        guarantees: [],
        selectedGuarantee: {}
    }),
    actions: {
        async getInvestments (): Promise<void> {
            const { data, success } = await investmentRequest.investment()
            if (success) {
                this.investments = data
            }
        },
        async getGuaranteesInInvestments (): Promise<void> {
            const { data, success } = await investmentRequest.getGuaranteesInInvestments()
            if (success) {
                this.guarantees = data
            }
        }
    }
})