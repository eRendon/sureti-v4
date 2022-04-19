import { defineStore } from 'pinia'
import { IAction, IAlert, IModalStorage, IProposalModal, IRequestModal } from '@/interfaces/IAlert'
import { IProposal } from '@/interfaces/IProposal'
import { IPaymentModal } from '@/interfaces/IPayment'

export const useModalStore = defineStore('modalStore', {
    state: (): IModalStorage => ({
        alertData: {
            text: '',
            show: false
        },
        showProfileModal: false,
        proposalModalData: {
            show: false,
            proposal: {}
        },
        requestModal: {
            show: false,
            request: {}
        },
        payments: {
            show: false
        },
        showNewGuarantee: false
    }),
    actions: {
        alert (alertData?: IAlert): IAction {
            const present = (): void => {
                this.alertData = alertData!
            }

            const dismiss = (): void => {
                this.alertData = {
                    show: false,
                    text: ''
                }
            }

            return {
                present,
                dismiss
            }
        },
        proposalModal (proposal: IProposal, show: boolean): void {
            this.proposalModalData = {
                proposal,
                show
            }
        },
        paymentModal (statePayment: IPaymentModal): void {
           this.payments = statePayment
        }
    },
    getters: {
        getStateAlert: (state): IAlert => state.alertData,
        getStateProfileModal: (state): boolean => state.showProfileModal,
        getStateProposalModal: (state): IProposalModal => state.proposalModalData,
        getStateRequestModal: (state): IRequestModal => state.requestModal,
        getStatePaymentsModal: (state): IPaymentModal => state.payments,
        getStateNewGuarantee: (state): boolean => state.showNewGuarantee
    }
})