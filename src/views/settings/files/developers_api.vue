<template>
  <div class="accountSetting bg-white round-sm position-relative">
    <div id="tabs" class="text-center mb-0 walletTab currencyTab">
      <ul class="d-flex align-items-center m-0">
        <li>
          <a class="d-block" href="javascript:void(0)" :class="[{ active: cryptopayouttab == 1 }]" @click.prevent="cryptopayouttab = 1">API Keys</a>
        </li>
        <li>
          <a class="d-block" href="javascript:void(0)" :class="[{ active: cryptopayouttab == 2 }]" @click.prevent="cryptopayouttab = 2">Webhooks</a>
        </li>
        <!-- <li><a class="d-block" href="javascript:void(0)" :class="[{'active':cryptopayouttab == 3}]" @click.prevent="cryptopayouttab = 3">Plugins</a></li> -->
      </ul>
    </div>
    <div v-if="cryptopayouttab == 1">
      <api-key-list></api-key-list>
    </div>
    <div v-if="cryptopayouttab == 2">
      <webhook-list></webhook-list>
    </div>
    <!--class="modal"  -->
    <div class="h-vh overlayArea" v-if="modalPopup">
      <div class="overlayAreaBox">
        <div class="content round-sm">
          <h6 class="text-center mb-0">This page will be accessible once your account is activated.</h6>
        </div>  
      </div>
    </div>
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import webhookList from "./developer_api/webhook/list.vue";
  import apiKeyList from "./developer_api/api_key/list.vue";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        cryptopayouttab: 1,
        modalPopup: false,
      };
    },
    components: {
      webhookList,
      apiKeyList
    },
    methods: {},
    created() {
      if (parseInt(this.get_user.is_registered) == 5) {
        this.modalPopup = false;
      } else {
        this.modalPopup = true;
        this.cryptopayouttab = 0;
      }
    },
  };
</script>