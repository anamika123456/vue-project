<template>
  <div>
    <loader v-if="pageLoader" />
    <div class="form-group">
      
        <!-- <label class="mb-2 semibold themecolor"
          >2-Factor Authentication Code</label
        > -->
        <input
          type="text"
          class="form-control"
          placeholder="Enter 2FA Code"
          v-model="otpForDeleteBank"
          name="otpForDeleteBank"
          required=""
          v-validate="{ required: true, max: 6 }"
        />
        <span
          v-if="deletePaymentReqSubmitted && errors.has('otpForDeleteBank')"
          class="text-danger"
          >{{ errors.first("otpForDeleteBank") }}</span
        >
      
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <a
        href="javascript:void(0)"
        class="cap_btn px-4 large_btn mb-0"
        data-toggle="modal"
        data-target="#withdrawalmessage"
        @click="deletePaymentMethod()"
        >Confirm</a
      >
    </div>
  </div>
</template>
<script>
import settingsMixins from "@/plugins/settings";
export default {
  name: "deposit-section",
  mixins: [settingsMixins],
  data() {
    return {
      pageLoader: false,

      otpForDeleteBank: "",
      deletePaymentReqSubmitted: false,
    };
  },
  computed: {},
  props: ["bankData", "pageNameData"],
  methods: {
    deletePaymentMethod() {
      const _that = this;
      _that.deletePaymentReqSubmitted = true;
      _that.$validator.validate().then((valid) => {
        if (valid) {
          let json = {
            globalParams: {
              bank_id: _that.bankData.id,
              benificiary_id: _that.bankData.benificiary_id,
              google_token: _that.otpForDeleteBank,
            },
            localParams: { parameter: _that, pagename: _that.pageNameData },
          };
          _that._runDeletePaymentMethod(json);
        }
      });
    },
    reset() {
      this.otpForDeleteBank = "";
      this.deletePaymentReqSubmitted = false;
    },
  },
  created() {},
};
</script>
