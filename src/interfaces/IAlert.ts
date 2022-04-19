import { IProposal } from '@/interfaces/IProposal'
import { IRequest } from '@/interfaces/IRequest'
import { IPaymentModal } from '@/interfaces/IPayment'

export interface IAlert {
  text: string
  show: boolean
}

export interface IProposalModal {
  proposal: IProposal
  show: boolean
}

export interface IRequestModal {
  request: IRequest
  show: boolean
}

export interface IModalStorage {
  alertData: IAlert,
  showProfileModal: boolean
  proposalModalData: IProposalModal
  requestModal: IRequestModal
  payments: IPaymentModal
  showNewGuarantee: boolean
}

export interface IAction {
  dismiss: () => void
  present: () => void
}
