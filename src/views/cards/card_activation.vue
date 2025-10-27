<template>
  <div class="mt-4" >
    <loader v-if="pageLoader"></loader>
    <div  class="verificationContent bg-white border round-md">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Currency <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="currency"  v-model="currency"   />
            <ErrorMessage name="currency" class="text-danger" />
          </div>
        </div>

        
        <QRCodeVue3 :value="card_wallets.wallets[0].accounts[currency].blockchainDepositAddress"  v-if="Object.keys(card_wallets).length > 0 && card_wallets.wallets && card_wallets.wallets.length > 0 && card_wallets.wallets[0].accounts[currency].enriched == true"/>
          <QRCodeVue3 :value="blockchainDepositAddress" v-else />

        <div class="col-12" v-if="Object.keys(card_wallets).length > 0 && card_wallets.wallets && card_wallets.wallets.length > 0 && card_wallets.wallets[0].accounts[currency].enriched == false">
          <div class="text-right border-top mt-2 mt-lg-3 pt-4">
            <input type="button" value="Save &amp; Continue" class="cap_btn large_btn mb-0" @click="getCardAddress()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  import QRCodeVue3 from "qrcode-vue3";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,
        currency: '',
        blockchainDepositAddress : ''
      };
    },
    components: {QRCodeVue3},
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
      getAllCardWalletByUser(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "startDate": "1656622800000",
            "endDate": "1656622800000",
            "page": 1
          },
          'localParams': { "parameter": this }
        }
        this._runGetAllCardWalletByUser(input_json)
      },
      getCardAddress(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "accountId": this.card_wallets.wallets[0].accounts[this.currency].accountId
          },
          'localParams': { "parameter": this }
        }
        this._runGetCardAddress(input_json)
      }
    },
    created(){
      this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 8)
      this.getAllCardWalletByUser()
    }
  };
</script>