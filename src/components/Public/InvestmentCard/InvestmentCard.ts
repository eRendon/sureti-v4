import { defineComponent, getCurrentInstance } from "vue"
import { IPublicGuarantee } from "@/interfaces/IGuarantee"
import { formatAmount, formatCurrency } from '@/plugins/filters'


export default defineComponent({
  name: "PublicGuarantee",
  props: {
    publicGuarantee: {
      type: Object as () => IPublicGuarantee,
      default: () => ({}),
      required: true,
    },
  },
  setup(_,{ emit }) {
    const onInterestedUser = (): void => {
      emit('onInterestedUser')
    }

    return {
      onInterestedUser,
      formatAmount,
      formatCurrency,
    }
  },
  methods: {
    barFilled() {
      const amountRequested = parseInt(this.publicGuarantee.amount_requested!);
      const amountCommitted = parseInt(this.publicGuarantee.amount_committed!);
      return (amountCommitted / amountRequested) * 100;
    },

    
  },
});
