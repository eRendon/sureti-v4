import { AxiosService } from '@/api-client/axios'
import { ISurePromise } from '@/interfaces/ISurePromise'
import { IPublicGuarantee } from '@/interfaces/IGuarantee'
import { IFormPublicCard } from '@/interfaces/IPublicCard'

export default class InvestmentCard {
    async getCards (): Promise<ISurePromise<IPublicGuarantee[]>> {
        const axiosService:AxiosService<IPublicGuarantee[], null> = new AxiosService()
        try {
            return await axiosService.getData(null, '/user/public/investment_card')
        } catch (e) {
            throw e
        } finally {

        }
    }

    async sendPublicCardForm(form: IFormPublicCard, guarantee_id: string) {
        const axiosService = new AxiosService()

        try {
         return await axiosService.postData(form, `/user/public/investment_card/investment_request/${guarantee_id}`)
        } finally {

        }
    }
}