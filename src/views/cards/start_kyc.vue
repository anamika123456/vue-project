<template>
  <div class="mt-4" >
    <loader v-if="pageLoader"></loader>
    <a :href="kycLink" class="cap_btn px-4  mb-0" target="_blank">Start kyc By using this link</a>
    or 
    <a href="#" class="cap_btn px-4  mb-0" >Start kyc here</a>
  </div>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,
        kycLink: '',
        kycToken: '',
        tier:'1',
      };
    },
    methods: {
      getAllCardUsersFunc(userId,getStep){
        let input_json = {
          'globalParams': {
            "userId": userId
          },
          'localParams': { "parameter": this, "steps": getStep }
        }
        this._runGetCardUserById(input_json)
      },
      startKycFunc(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "tier": 1
          },
          'localParams': {
            "parameter": this, "steps" : 5
          }
        }
        this._runStartKyc(input_json)
      }
    },
    created(){
      this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 5)
      this.startKycFunc()
    }
  };
</script>