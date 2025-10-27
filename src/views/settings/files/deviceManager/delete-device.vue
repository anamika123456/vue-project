<template>
    <div class="modal-content">
      <loader v-if="pageLoader" />
      <div class="modal-header border-0">
        <h5 class="text-center mb-0 mx-auto">Delete IP Address</h5>
        <a href="javascript:void(0);" class="close text-right" data-dismiss="modal" aria-label="Close" @click="$parent.deleteIp = {}">
          <feather type="x" size="22px"></feather>
        </a>
      </div>
      <Form @submit="deleteIP()" ref="regform">
        <div class="modal-body pt-3 pb-0">
          <div class="mb-4">
            <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
            <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
          </div>
          <div class="form-group">
            <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required" />
            <ErrorMessage name="otp" class="text-danger" />
          </div>
        </div>
        <div class="modal-footer justify-content-center pt-4 border-0">
          <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Confirm Address">
        </div>
      </Form>
    </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "deposit-section",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        otp : ''
      };
    },
    components: {Form, Field, ErrorMessage  },
    computed: {},
    props:['ipData'],
    methods: {
        deleteIP(){
            const _that  = this
            let json = {
                globalParams: {
                    "id" : _that.ipData.id,
                    "status" : 0,
                    "otp" : _that.otp
                },
                localParams: { parameter: _that },
            }
            _that._runEditIPDetails(json);
        },
        reset(){
        	this.$parent.deleteIp = {}
            this.otp = ''
        }
    },
    created() {}
  };
</script>