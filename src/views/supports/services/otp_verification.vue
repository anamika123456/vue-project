<template>
  <div class="justify-content-center text-center">
    <Form @submit="submit()" ref="regform" class="mt-4">
      <loader v-if="pageLoader"></loader> hhhh
      <alert-notification v-if="notification_msg != ''" />
      <div class="mainTitle secondaryBG headerSupport text-center section_title mt-4 mb-3">
        <h5 class="mb-2">OTP Verification</h5>
        <p class="mb-0"> A One Time Pin has been sent to your {{ title_parent == "88" ? "registered phone number" : "email" }}. </p>
      </div>
      <div class="CustomBlockWidth inMiddle-area whitebox p-4 mb-4">
        <img class="otp mb-3" src="/assets/website/images/otp.svg" alt="one time password" />
        <div class="form-group field-wrapper">
          <label for="username" class="labeltext"> Verfication Codejjjj</label>
          <Field type="text" class="form-control" id="" name="otp" rules="required|min:6|numeric" v-model="otp" style="display: none" />
          <ErrorMessage name="otp" class="text-danger text-center" />
        </div>
        <div class="clearfix"></div>
        <div class="validatebtn mb-3">
          <input type="submit" class="px-3 cap_btn large_btnl" value="Validate" :class="pageLoader ? 'disabled' : ''" />
          <div class="text-center mt-2 forBack" v-if="ticketRequestFrom == 'profileOtp'">
            <a class="underline" href="#" @click="$parent.trans_id = ''">back</a>
          </div>
        </div>
        <div class="text-center">
          <a href="#" class="underline" :class="pageLoader ? 'disabled' : ''" v-on:click="resendOtp()" v-if="parseInt(module) == 1"> Haven't received an otp in your registered number? Resend</a>
          <a href="#" class="underline" :class="pageLoader ? 'disabled' : ''" v-on:click="resendOtp()" v-else> Haven't received an email in your inbox or spam folder? Resend</a>
        </div>
        <div class="text-center mt-4" v-if="ticketRequestFrom != 'profileOtp'">
          <a class="mx-auto red d-inline-flex align-items-center justify-content-center" href="#" @click="$parent.backTick()">
            <feather class="mr-2" size="17px" type="skip-back"></feather>Back to support home
          </a>
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
  import {
    supportMixins
  } from "@/plugins/support";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    mixins: [supportMixins],
    data() {
      return {
        otp: "",
        data_msz: "",
        submitted: false,
        notification_msg: "",
        notification_type: "",
        pageLoader: false,
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    props: ["transaction_id", "module", "data", "ticketRequestFrom", "accountId", "title_parent", ],
    methods: {
      resendOtp() {
        if (this.pageLoader) {
          return;
        }
        let input_json = {
          globalParams: {
            trans_id: this.transaction_id.toString(),
          },
          localParams: {
            parameter: this
          },
        };
        this._runTicketResendOtp(input_json);
      },
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        _that.submitted = true;
        _that.data_msz = _that.data;
        let input_json = {
          globalParams: {
            otp: _that.otp.toString(),
            trans_id: _that.transaction_id.toString(),
          },
          localParams: {
            parameter: _that,
            module: _that.module,
            data: _that.data_msz,
            ticketRequestFrom: _that.ticketRequestFrom,
            accountId: _that.accountId,
            title: _that.title_parent,
          },
        };
        _that._runTicketCheckOtp(input_json);
      },
    },
  };
</script>