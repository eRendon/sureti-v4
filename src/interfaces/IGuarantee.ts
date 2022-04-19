import { IDocumentFile, IOwner } from '@/interfaces/IOwner'
import { ILoan } from '@/interfaces/ILoans'

export interface IGuarantee {
  guarantee_type?: string
  user_id?: string
  guarantee_value?: number
  real_estate_area?: number
  real_estate_property_taxes?: number
  real_estate_property_taxes_paid?: number
  guarantee_sub_type?: string
  real_estate_chip?: string
  property_real_estate_id?: string
  real_estate_city?: string
  real_estate_country?: string
  real_estate_estrato?: string
  real_estate_address?: string
  score?: string
  cdt_issuing_entity?: string
  cdt_number?: string
  cdt_title_number?: string
  cdt_constitution_date?: string
  cdt_expiration_date?: string
  ready_for_loan_date?: string
  real_estate_property_taxes_pay_date?: string
  description?: string
  guarantee_id?: string
  owners?: IOwner[],
  propertyTax?: IDocumentFile
  freedomAndTradition?: IDocumentFile
  photo?: IDocumentFile
  state?: string
  commission?: number
  creation_date?: string
  creation_date_utc?: string
  daily_interest?: string
  debt_status?: number
  doc_id?: string
  financial_fees?: number
  guarantee_credit_limit?: number
  last_daily_interest?: number
  return_investment?: number
  loan?: ILoan
}

export interface IResponseGuarantee {
  guarantee_id: string
}

export interface IGuaranteeStorage {
  guarantees: IGuarantee[]
  selectedGuarantee?: IGuarantee
}

// Colección en Fauna: Tarjetas_inversion
// Notación de la entidad: investment_card
export interface IPublicGuarantee {
  investment_card_id?: string, // auto upon creation NEW
  creation_date?: string // auto upon creation NEW
  creation_date_utc?: string // auto upon creation NEW
  guarantee_id?: string// from admin
  guarantee_value?: string // from admin
  guarantee_thumbnail?: string // from admin - Image File() blob
  state?: string // from admin (open, closed, hidden)
  balance?: string // from admin - maybe not needed
  label?: string// from admin
  real_estate_city?: string // from admin
  real_estate_province?: string// from admin
  real_estate_estrato?: string // from admin
  real_estate_type?: string // from admin
  real_estate_area?: string // from admin
  real_estate_neighborhood?: string // from admin
  return_investment?: string // from admin
  minimum_investment?: string // from admin  NEW
  amount_requested?: string // from admin  NEW
  amount_committed?: string // from admin  NEW
  number_investors?: string // from admin  NEW
  deadline?: string // from admin  NEW
  investment_requests?: IInvestmentRequests[]  // investment_requests are the only thing users can post on this entity  NEW
}

export interface IInvestmentRequests     {
  investor_id: string
  investor_phone: string // required
  investor_email: string
  request_amount: string// slider !!!!!!!
  request_date: string
  investor_tracking: string
  investor_notes: string
}
// Validate that there is only 1 request per phone number and/or id - NOT for now, can add as many as user wants
// Only 1 card per guarantee - YES, only 1
// Only phone number and request amount are required? - YES
// How to map to HubSpot
// How to handle A/B testing
// How to track UTM
// How to determine if user exists from cookies/localstorage
// How to integrate login into process

//******* ENDPOINTS FOR ADMIN *******
// POST /admin/investment_card/{guarantee_id}
// PUT /admin/investment_card/{id}
// DELETE /admin/investment_card/{id}

//******* ENDPOINTS FOR USER (available to admins as well) *******
// GET /user/investment_card (filters: id, guarantee_id, state, lower_date, higher_date)
// POST /user/investment_card/request/{investment_card_id}
// !!! No requiere autenticación !!!