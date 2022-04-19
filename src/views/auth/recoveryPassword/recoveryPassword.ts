import {defineComponent, ref} from "vue";
import VerifyCode from "../../../components/Auth/VerifyCode/VerifyCode.vue";
import NewPassword from "../../../components/Auth/NewPassword/NewPassword.vue";

export default defineComponent({
  name: 'RecoveryPasswordView',
  components: {
    VerifyCode,
    NewPassword
  },
  setup () {
    const isGenerateCode = ref<number>(2)
    const buttonName = ref<string>('Solicitar código')
    const title = ref<string>('Recuperación de contraseña')
    const placeHolder = ref<string>('Email o número de celular')
    const refVerifyCode = ref()
    const setNewPassword = ref<boolean>(false)
    const body = ref<string>('Ingresa tu email o número de celular')

    /**
     ToDo GenerateCode
     * Generate code when user is recovery password, set isGenerate code = 3
     * to reset token function in VerifyCode component, this include verifySchema function
     * @return void
     */

    const onGenerateCode = (): void => {
      console.log(refVerifyCode)
      isGenerateCode.value = 3
      buttonName.value = 'Verificar'
      placeHolder.value = 'Código'
      body.value = 'Ingresa el código de verificación'
    }

    /**
     ToDo Set New password
     * validation to see component new password when code verification is generated an validated
     */

    const onResetToken = (): void => {
      setNewPassword.value = true
    }

    return {
      isGenerateCode,
      buttonName,
      title,
      placeHolder,
      refVerifyCode,
      onGenerateCode,
      onResetToken,
      setNewPassword,
      body
    }
  }
})
