import {defineComponent} from "vue";
import  { Form, Field } from 'vee-validate';
import {ILogin} from '@/interfaces/IAuth';
import loginAction from '@/utils/loginAction'
import {userStorage} from "@/storage";



export default defineComponent({
  name: 'LoginView',
  components: {
    Form,
    Field,
  },
  setup () {

      /**
       * Schema validation form
       * rules Required
       */

      const schema = {
        user: 'required',
        password: 'required'
      }

      /**
       ToDo Login
       * Login user whit form view
       * @return Promise<void>
       * @type ILogin
       * @param loginForm
       */


      const onLogin = async (loginForm: ILogin): Promise<void> => {
          userStorage.mutations.setStateBrowser('')
        await loginAction(loginForm)
      }

      return {
        schema,
        onLogin
      }
  }
})
