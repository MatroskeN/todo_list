<template>
  <ul>
    <li v-for="item in user_list" v-bind:key="item.id">
      <p>
        {{item.user_name}}
      </p>
      <p>
        Количество платежей -
        {{item.payment.length}}
      </p>
      <button @click="openModal(item.id)">
        Детали платежа
      </button>
    </li>
  </ul>

  <PaymentDetails ref="paymentDetailsComponent" :user_id="user_id" :user_list="user_list" />
</template>

<script>
  import PaymentDetails from "@/components/PaymentDetails";
  export default {
    name: 'PaymentPage',
    components: {PaymentDetails},
    data() {
      return{
        user_id: null,
        user_list: []
      }
    },
    mounted(){
      if (localStorage.user_list){
        this.user_list = JSON.parse(localStorage.getItem('user_list'))
      }
    },

    methods: {
      openModal: function (this_user_id) {
        this.user_id = this_user_id;
        this.$refs.paymentDetailsComponent.openModal();
      }
    }
  }
</script>

<style scoped lang="scss">

  li{
    display: flex;
    align-items: center;
    p{
      &:first-of-type{
        margin-right: auto;
      }
    }
    button{
      margin-left: 15px;
      cursor: pointer;
    }
  }

</style>