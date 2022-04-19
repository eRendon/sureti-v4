import { configure, defineRule } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import es from '@vee-validate/i18n/dist/locale/es.json'
import { email, required, max } from '@vee-validate/rules'

configure({
    generateMessage: localize({
        es
    })
})

defineRule('required', required);
defineRule('email', email);
defineRule('max', max)

setLocale('es')