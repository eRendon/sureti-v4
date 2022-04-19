import { defineStore } from 'pinia'
import { ILoan, ILoansStore } from '@/interfaces/ILoans'
import { loanRequest } from '@/api-client'
import { useGuaranteeSore } from '@/store/guaranteeStore'
import { IProposal } from '@/interfaces/IProposal'
import { IRequest } from '@/interfaces/IRequest'

export const useLoanStore = defineStore('loanStore', {
    state: (): ILoansStore => ({
        loans: [{ state: ''}],
        proposals: [],
        requests: [],
        isToFilter: false
    }),
    actions: {
        async getLoans(): Promise<void> {
            const { data, success } = await loanRequest.getLoans()

            if (success && data.length > 0) {
                const guaranteeStore = useGuaranteeSore()
                guaranteeStore.guarantees = guaranteeStore.guarantees.map((guarantee) => {
                    guarantee.loan = data.find((loan) => loan.guarantee_id === guarantee.guarantee_id)
                    return guarantee
                })
                this.loans = data
            }
        },
        async getProposals (): Promise<void> {
            const { data, success } = await loanRequest.getProposals()
            if (success) {
                this.proposals = data
            }
        },
        async getRequest (): Promise<void> {
            const { data, success } = await loanRequest.requestProposal()
            if (success) {
                this.requests = data
            }
        },
        filterLoan (guaranteeId: string): void {
            const loan = this.loans!.find((loan) => {
                if (loan.guarantee_id === guaranteeId && (loan.state !== 'rechazada' && loan.state !== 'atendida')) {
                    return loan
                }
            })
            if (loan) {
                this.activeLoan = loan
            }
        },
        filterRequest (guaranteeId: string) {
            const activeRequest = this.requests!.filter((request) => {
                if (request.state !== 'rechazada' && request.state !== 'atendida') {
                    return request
                }
            }).find((request) => {
                return request.guarantee_id === guaranteeId
            })

            const inactiveRequest = this.requests!.filter((request) => (request.state === 'rechazada' || request.state === 'atendida')).filter((request) => request.guarantee_id === guaranteeId)
            const rejectedRequests = this.requests!.filter((request) => (request.state === 'rechazada'))

            if (activeRequest) {
                this.activeRequest = activeRequest
                this.inactiveRequests = inactiveRequest
                this.filterRequest(activeRequest.transaction_id!)
            }
            this.rejectedRequests = rejectedRequests
        },
        filterProposal (transactionId: string): void {
            const createProposal = this.proposals!.find((proposal) => {
                if (proposal.loan_request_id === transactionId && (proposal.state !== 'rechazada' && proposal.state !== 'atendida' && proposal.state !== 'aceptada')) {
                    return proposal
                }
            })

            const acceptedProposal = this.proposals!.find((proposal) => {
                if (proposal.loan_request_id === transactionId && (proposal.state !== 'rechazada' && proposal.state !== 'atendida' && proposal.state !== 'creada')) {
                    return proposal
                }
            })

            const inactiveProposals = this.proposals!.filter((proposal) => (proposal.state === 'rechazada' || proposal.state === 'atendida')).filter((proposal) => proposal.loan_request_id === transactionId)
            const rejectedProposal = this.proposals!.filter((proposal) => proposal.state === 'rechazada')

            if (createProposal) {
                this.createdProposal = createProposal
                this.inactiveProposals = inactiveProposals
            }

            if (acceptedProposal) {
                this.acceptedProposal = acceptedProposal
            }

            this.rejectedRequests = rejectedProposal
        }
    },
    getters: {
        getLoans: (state): ILoan[] => state.loans!,
        getActiveLoan: (state): ILoan => state.activeLoan!,
        getProposals: (state): IProposal[] => state.proposals!,
        getRequests:(state): IRequest[] => state.requests!,
        getActiveRequest: (state): IRequest => state.activeRequest!,
        getCreatedProposal: (state): IProposal => state.createdProposal!,
        getAcceptedProposal: (state): IProposal => state.acceptedProposal!,
        getRequestByGuarantee: (state): IRequest[] => state.requestByGuarantee!,
        getRejectedProposals: (state): IProposal[] | undefined => state.rejectedProposals,
        getRejectedRequests: (state): IRequest[] | undefined => state.rejectedRequests,
        getStateToFilter: (state): boolean => state.isToFilter
    }
})