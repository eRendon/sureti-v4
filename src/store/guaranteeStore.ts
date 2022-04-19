import { defineStore } from 'pinia'
import { IGuarantee, IGuaranteeStorage } from '@/interfaces/IGuarantee'
import { guaranteeRequest } from '@/api-client'
import getters from '@/storage/modules/guarantee/getters'

export const useGuaranteeSore = defineStore('guaranteeStore',{
    state: (): IGuaranteeStorage => ({
        guarantees: [{
            loan: {}
        }],
        selectedGuarantee: {
            owners: [],
            propertyTax: {
                doc_type: 'IMPUESTO PREDIAL',
                text: 'Impuesto Predial'
            },
            freedomAndTradition: {
                doc_type: 'CERTIFICADO DE LIBERTAD Y TRADICION INICIAL',
                text: 'Certificdo de libertad y tradición'
            }
        }
    }),
    actions: {
        async getGuarantees (): Promise<void> {
            const { data, success } = await guaranteeRequest.get()
            console.log(data)
            if (success) {
                this.guarantees = data
            }
            // loaderStore.actions.loadingOverlay().dismiss()
        },
        filterSelectedGuarantee (id: string): void {
            const selectedGuarantee = getters.getGuaranteesState().find((guarantee) => {
                return guarantee.guarantee_id === id
            })

            this.selectedGuarantee = selectedGuarantee!
        }
    },
    getters: {
        getGuaranteesState: (state): IGuarantee[] => state.guarantees,
        getSelectedGuarantee: (state): IGuarantee => state.selectedGuarantee!
    }
})