import { defineStore } from 'pinia'
import { IActionSpinner, ILoader, ILoadingDots } from '@/interfaces/ILoader'

export const useLoaderStore = defineStore('loaderStore',{
    state: (): ILoader => ({
        dots: {
            spinnerDots: false,
            text: ''
        },
        overlay: {
            spinnerDots: false,
            text: ''
        }
    }),
    actions: {
        loadingOverlay(stateDost?: ILoadingDots): IActionSpinner {
            const present = (): void => {
                this.overlay = stateDost!
            }

            const dismiss = (): void => {
                const state: ILoadingDots = {
                    spinnerDots: false,
                    text: ''
                }
                setTimeout(() => {
                    this.overlay = state
                }, 1000)
            }

            return {
                present,
                dismiss
            }
        }
    }
})