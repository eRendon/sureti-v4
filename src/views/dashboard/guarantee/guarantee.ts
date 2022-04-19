import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { IDocumentFile, IOwner } from '@/interfaces/IOwner'
import { useRoute } from 'vue-router'
import { guaranteeStore, loaderStore, loansStore, modalStore, userStorage } from '@/storage'
import { IGuarantee } from '@/interfaces/IGuarantee'
import { fileRequest, guaranteeRequest } from '@/api-client'
import { IDocument, IFilterDocument, IGuaranteeDocument } from '@/interfaces/IFiles'
import ProposalModal from '@/components/Modals/Proposal/Proposal.vue'
import RequestModal from '@/components/Modals/RequestLoan/RequestLoan.vue'
import { IAlert } from '@/interfaces/IAlert'
import { ILoadingDots } from '@/interfaces/ILoader'
import { IPaymentModal } from '@/interfaces/IPayment'

export default defineComponent({
    name: 'GuaranteeView',
    components: {
        ProposalModal,
        RequestModal
    },
    setup (props, { emit }) {
        const requests = computed(() => loansStore.getters.getRequestByGuarantee())
        const activeRequest = computed(() => loansStore.getters.getActiveRequest())
        const createdProposal = computed(() => loansStore.getters.getCreatedProposal())
        const acceptedProposal = computed(() => loansStore.getters.getAcceptedProposal())
        const rejectedRequests = computed(() => loansStore.getters.getRejectedRequests())
        const rejectedProposals = computed(() => loansStore.getters.getRejectedProposals())
        const profile = computed(() => userStorage.getters.getStateProfile())
        const guarantee_id = ref()
        const documents = ref<IDocument[]>([])

        const navTab = ref(0); // 0 datos, 1 propietarios, 2 fotos

        const activeLoan = computed(() => loansStore.getters.getActiveLoan())

        const modelOwner = {
            owner_first_name: '',
            owner_identification_expedition_place: '',
            owner_gender: '',
            owner_identification_issue_date: new Date(),
            owner_identification_number: '',
            owner_identification_type: '',
            owner_last_name: '',
            owner_middle_name: '',
            filesProperty: [
                {
                    doc_type: 'CEDULA PROPIETARIO VISTA FRONTAL',
                    text: 'Cédula (frente)'
                },
                {
                    doc_type: 'CEDULA PROPIETARIO VISTA TRASERA',
                    text: 'Cédula (Reverso)'
                }
            ]
        }

        /**
        * Model to houseDeed files
        */

        const houseDeed = ref<IDocumentFile>({
            doc_type: 'COPIA DE ESCRITURAS',
            text: 'Escrituras'
        })

        /**
         * Model to filesPropertyFront
         */

        const filesPropertyFront = ref<IDocumentFile[]>([
            {
                doc_type: 'CEDULA PROPIETARIO VISTA FRONTAL',
                text: 'Cédula (frente)'
            },
        ])

        /**
         * Model to filesPropertyBack
         */

        const filesPropertyBack = ref<IDocumentFile[]>([
            {
                doc_type: 'CEDULA PROPIETARIO VISTA TRASERA',
                text: 'Cédula (Reverso)'
            }
        ])

        const modelPhoto = ref<IDocumentFile>({
            text: 'Documento FOTO',
            doc_type: 'FOTO'
        })

        const photos = ref<IDocumentFile[]>([modelPhoto.value])


        const guarantee = computed<IGuarantee>({
            get: () => guaranteeStore.getters.getSelectedGuarantee(),
            set: guarantee => {

                console.log('nuevo valor', guarantee)
            }
        })

        const isToFilter = computed(() => loansStore.getters.getStateToFilter())

        watch(() => isToFilter.value, (isToFilter, prevIsToFilter) => {
            filterGuaranteeData()
        })

        /** ToDo FilterGuarantee
         * Init data, filter guarantee whit id in route params to get loans, files, guarantee data.
         */

        const filterGuaranteeData = (): void => {
            guaranteeStore.actions.filterSelectedGuarantee(guarantee_id.value as string)
            loansStore.actions.filterLoan(guarantee_id.value as string)
            loansStore.actions.filterRequest(guarantee_id.value as string)
            if (!guarantee.value.owners) {
                guarantee.value.owners = owners.value
            }
            guarantee.value.owners?.map((owner) => {
                if (!owner.filesProperty) {
                    owner.filesProperty = [
                        {
                            doc_type: 'CEDULA PROPIETARIO VISTA FRONTAL',
                            text: 'Cédula (frente)'
                        },
                        {
                            doc_type: 'CEDULA PROPIETARIO VISTA TRASERA',
                            text: 'Cédula (Reverso)'
                        }
                    ]
                }
            })
            guarantee.value.propertyTax = {
                doc_type: 'IMPUESTO PREDIAL',
                text: 'Impuesto Predial'
            }
            guarantee.value.freedomAndTradition = {
                doc_type: 'CERTIFICADO DE LIBERTAD Y TRADICION INICIAL',
                text: 'Certificdo de libertad y tradición'
            }
            loaderStore.actions.loadingOverlay().dismiss()
        }


        const route = useRoute()

        const owners = ref<IOwner[]>([modelOwner])

        const addOwner = (): void => {
            guarantee.value.owners!.push({
                owner_first_name: '',
                owner_identification_expedition_place: '',
                owner_gender: '',
                owner_identification_issue_date: new Date(),
                owner_identification_number: '',
                owner_identification_type: '',
                owner_last_name: '',
                owner_middle_name: ''
            })
        }

        const deleteOwner = (index: number): void => {
            guarantee.value.owners!.splice(index, 1)
        }

        const deleteFileOwnerFront = (index: number): void => {
            filesPropertyFront.value.splice(index, 1)
        }
        const deleteFileOwnerBack = (index: number): void => {
            filesPropertyBack.value.splice(index, 1)
        }

        const addFileOwnerFront = (): void => {
            filesPropertyFront.value.push(
                {
                    doc_type: 'CEDULA PROPIETARIO VISTA FRONTAL',
                    text: 'Cédula (frente)'
                }
            )
        }

        const addFileOwnerBack = (): void => {
            filesPropertyBack.value.push(
                {
                    doc_type: 'CEDULA PROPIETARIO VISTA TRASERA',
                    text: 'Cédula (Reverso)'
                }
            )
        }

        /** ToDo OnSelectedDocument
         * Charge document into guarantee
         * @param document document send in the html iteration
         * @param file
         * @type IDocumentFile
         * @type Array<File>
         * @return void
         */

        const onSelectedDocument = (document: IDocumentFile, file: Array<File>): void => {
            document.file = file[0]
        }

        onMounted(async () => {
            loaderStore.actions.loadingOverlay({ spinnerDots: true }).present()
            const { id } = route.params
            if (id) {
                guarantee_id.value = id
                if (isToFilter.value) {
                    console.log('mounted', isToFilter)
                    filterGuaranteeData()
                }
            }
            await getDocuments()
        })

        /** ToDo GetDocuments
         * Get documents whit id user and guarantee id
         * @return Promise<void>
         */

        const getDocuments = async (): Promise<void> => {
            const filter: IFilterDocument = {
                user_id: profile.value.user_id!,
                guarantee_id: guarantee_id.value
            }
            const { data, success } = await fileRequest.getDocument(filter)
            console.log('getDocuments', data)
            if (success) {
                documents.value = data
            }
        }

        const onSelectedTax = (file: Array<File>): void => {
            guarantee.value.propertyTax!.file = file[0]
        }

        const onSelectedFreedom = (file: Array<File>): void => {
            guarantee.value.freedomAndTradition!.file = file[0]
        }

        const onSelectHouseDeed = (files: Array<File>): void => {
            houseDeed.value.file = files[0]
        }

        /** ToDo UnUpdateOwners
         * Update Owners Documents whit user id
         * @return Promise<void>
         */

        const onUpdateOwners = async (): Promise<void> => {
            const { owners } = guarantee.value
            const { user_id } = userStorage.getters.getStateProfile()
            const guaranteeUpdate: IGuarantee = {
                owners,
                user_id
            }
            const { data, success } = await guaranteeRequest.update(guarantee_id.value, guaranteeUpdate)
            console.log(data)
            if (success) {
                const alert: IAlert = {
                    show: true,
                    text: 'Sus datos han sido actualizados correctamente'
                }
                modalStore.actions.alert(alert).present()
                await guaranteeStore.actions.getGuarantees()
            }
            console.log(owners)
        }

        const uploadDocumentFiles = (files: IDocumentFile[]) => {
            console.log(files)
            files.map(async (file) => {
                if (file.file) {
                    console.log('file  solo', file)
                    await uploadDocumentFile(file)
                }
                return file
            })
        }

        /** ToDo UploadDocumentFile
         * Upload documents whit user_id whit type FormData param
         * @return Promise<void>
         * @param document
         * @type IDocumentFile
         */

        const uploadDocumentFile = async (document: IDocumentFile): Promise<void> => {
            const { user_id } = userStorage.getters.getStateProfile()
            const userDocument: IGuaranteeDocument = {}
            userDocument.file = document.file
            userDocument.user_id = user_id
            userDocument.doc_type = document.doc_type
            userDocument.file_name = document.file?.name
            userDocument.description = document.text
            userDocument.guarantee_id = guarantee_id.value
            const { data, success } = await fileRequest.sendGuaranteeDocument(userDocument)
            console.log('response upload dpocument', data)
            if (success) {

            }
        }

        const onUpdateAppraisal = async () => {
            const { user_id } = userStorage.getters.getStateProfile()
            const guaranteeUpdate: IGuarantee = {
                real_estate_area: Number(guarantee.value.real_estate_area),
                real_estate_chip: guarantee.value.real_estate_chip,
                real_estate_country: guarantee.value.real_estate_country,
                real_estate_city: guarantee.value.real_estate_city,
                real_estate_address: guarantee.value.real_estate_address,
                real_estate_estrato: guarantee.value.real_estate_estrato,
                user_id
            }
            const { data, success } = await guaranteeRequest.update(guarantee_id.value, guaranteeUpdate)
            console.log(data)
            if (success) {
                const alert: IAlert = {
                    show: true,
                    text: 'Sus datos han sido actualizados correctamente'
                }
                modalStore.actions.alert(alert).present()
            }
        }

        const onUpdateDocumentsGuarantee = async (): Promise<void> => {
            const stateDots: ILoadingDots = {
                spinnerDots: true
            }
                const { propertyTax, freedomAndTradition } = guarantee.value
                if (propertyTax?.file || freedomAndTradition?.file || filesPropertyBack.value[0].file || filesPropertyFront.value[0].file || houseDeed.value.file) {
                    loaderStore.actions.loadingOverlay(stateDots).present()
                    try {
                        if (propertyTax?.file) {
                            await uploadDocumentFile(propertyTax!)
                            propertyTax.file = undefined
                        }
                        if (freedomAndTradition?.file) {
                            await uploadDocumentFile(freedomAndTradition!)
                            freedomAndTradition.file = undefined
                        }
                        if (filesPropertyFront.value[0].file) {
                            await  uploadDocumentFiles(filesPropertyFront.value)
                            filesPropertyFront.value[0].file = undefined
                        }
                        if (filesPropertyBack.value[0].file) {
                            await  uploadDocumentFiles(filesPropertyBack.value)
                            filesPropertyBack.value[0].file = undefined
                        }

                        if(houseDeed.value.file) {
                            await uploadDocumentFile(houseDeed.value)
                            houseDeed.value.file = undefined
                        }
                        await getDocuments()

                        const alert: IAlert = {
                            show: true,
                            text: 'Sus datos han sido actualizados correctamente'
                        }
                        modalStore.actions.alert(alert).present()
                    } catch (e) {
                        const alert: IAlert = {
                            show: true,
                            text: 'Error al subir los datos'
                        }
                        modalStore.actions.alert(alert).present()
                    } finally {
                        loaderStore.actions.loadingOverlay().dismiss()
                    }
                }

        }


        const addPhoto = (): void => {
            photos.value.push({
                text: 'Documento FOTO',
                doc_type: 'FOTO'
            })
        }

        const deletePhoto = (index: number): void => {
            console.log(index)
            photos.value.splice(index, 1)
        }

        const onUpdatePhoto = (): void => {
            const stateDots: ILoadingDots = {
                spinnerDots: true
            }
            loaderStore.actions.loadingOverlay(stateDots).present()
            photos.value.map(async (photo) => {
                await uploadDocumentFile(photo)
                return photo
            })
            loaderStore.actions.loadingOverlay().dismiss()
        }

        const onSelectedPhoto = (photo: IDocumentFile, file: Array<File>): void => {
            photo.file = file[0]
        }

        const loanState = computed<string>(() => {
            let htmlToRender = ''
            switch (guarantee.value.state) {
                case 'creada':
                    htmlToRender = '<div>En espera de aprobación</div>'
                    break
                case 'en proceso de evaluación':
                    htmlToRender = '<div>En proceso de evaluación</div>'
                    break
                case 'aprobada para préstamos':
                    htmlToRender = '<div><button>Crear préstamo</button></div>'
                    break
                default:
                    htmlToRender = '<p>El esato de la solicitud no pudo ser verificado</p>'
                    break
            }
            return htmlToRender
        })


        const openFlowRequest = () => {
            console.log('openFlowRequest')
            modalStore.actions.requestModal({}, true)
        }

        const openFlowProposal = (): void => {
            modalStore.actions.proposalModal(createdProposal.value, true)
        }

        /** ToDo Filter Filter
         * Computed properties to see files guarantee
         */

        const propertyTaxDocuments = computed(() => documents.value.filter((document) => document.doc_type === 'IMPUESTO PREDIAL'))
        const freedomTraditionDocuments = computed(() => documents.value.filter((document) => document.doc_type === 'CERTIFICADO DE LIBERTAD Y TRADICION INICIAL'))
        const photoDocuments = computed(() => documents.value.filter((document) => document.doc_type === 'FOTO'))
        const propertyDocsFront = computed(() => documents.value.filter((document) => document.doc_type === 'CEDULA PROPIETARIO VISTA FRONTAL'))
        const propertyDocsBack = computed(() => documents.value.filter((document) => document.doc_type === 'CEDULA PROPIETARIO VISTA TRASERA'))
        const houseDeedDocuments = computed(() => documents.value.filter((document) => document.doc_type === 'COPIA DE ESCRITURAS'))

        const onCapitalPayment = () => {
            const paymentState: IPaymentModal = {
                show: true,
                isCapitalPayment: true,
                title: 'Abono a capital'
            }
            modalStore.actions.paymentModal(paymentState)
        }

        const onInterestPayment = () => {
            const paymentState: IPaymentModal = {
                show: true,
                isCapitalPayment: false,
                title: 'Pago de intereses'
            }
            modalStore.actions.paymentModal(paymentState)
        }

        return {
            requests,
            acceptedProposal,
            onCapitalPayment,
            onInterestPayment,
            createdProposal,
            openFlowRequest,
            openFlowProposal,
            loanState,
            onUpdateAppraisal,
            onSelectedTax,
            onSelectedFreedom,
            onSelectedDocument,
            onUpdateOwners,
            deleteOwner,
            owners,
            photos,
            addOwner,
            addPhoto,
            deletePhoto,
            onUpdatePhoto,
            onSelectedPhoto,
            onSelectHouseDeed,
            guarantee,
            activeLoan,
            activeRequest,
            rejectedRequests,
            rejectedProposals,
            navTab,
            propertyTaxDocuments,
            freedomTraditionDocuments,
            photoDocuments,
            filesPropertyFront,
            propertyDocsFront,
            propertyDocsBack,
            filesPropertyBack,
            houseDeedDocuments,
            houseDeed,
            deleteFileOwnerFront,
            addFileOwnerFront,
            deleteFileOwnerBack,
            addFileOwnerBack,
            onUpdateDocumentsGuarantee
        }
    }
})
