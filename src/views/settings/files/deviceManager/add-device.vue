<template>
    <div class="modal-content">
      <loader v-if="pageLoader" class="position-absolute" />
        <div class="modal-header border-0">
          <h5 class="text-center mb-0 mx-auto">Add New IP Address</h5>
          <a href="javascript:void(0);" class="close text-right" data-dismiss="modal" aria-label="Close" @click="$parent.addIP = false">
            <feather type="x" size="22px"></feather>
          </a>
        </div>
        <Form @submit="saveIpFunc()" ref="regform">
          <div class="modal-body pt-0">
            
            <div class="form-group mb-2">
                  <Field type="hidden" class="form-control ipInput" name="fullIp"  v-model="fullIp" />
                  <label class="labeltext semibold">IP Address</label>
                  <div class="d-flex align-items-end">
                    <Field type="text" class="form-control ipInput" name="ip1"  v-model="ip1" rules="required" />
                    <span class="px-2">.</span>
                    <Field type="text" class="form-control ipInput" name="ip2"  v-model="ip2" rules="required" />
                    <span class="px-2">.</span>
                    <Field type="text" class="form-control ipInput" name="ip3"  v-model="ip3" rules="required" />
                    <span class="px-2">.</span>
                    <Field type="text" class="form-control ipInput" name="ip4"  v-model="ip4" rules="required" />
                  </div>
                  <!-- <ErrorMessage name="fullIp" class="text-danger" /> -->
                </div>
                
                  <div class="form-group mb-0 mt-4 pt-2" v-if="trans_id != ''">
                      <label class="labeltext semibold">Google Authentication Code</label>
                      <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required|min:6|numeric" />
                      <ErrorMessage name="otp" class="text-danger" />
                    </div>
               
          </div>
          <div class="modal-footer justify-content-center pt-4 border-0">
            <input type="submit" class="cap_btn px-4 large_btn mb-0"  value="Save Address">
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
        ip1: '',
        ip2: '',
        ip3: '',
        ip4: '',
        fullIp: '',
        otp: '',
        trans_id : ''
      };
    },
    components: {Form, Field, ErrorMessage  },
    methods: {
        saveIpFunc(){
            const _that  = this
            _that.fullIp = _that.ip1+'.'+_that.ip2+'.'+_that.ip3+'.'+_that.ip4
              let json = {
                  globalParams: {
                      "ip_address" : _that.fullIp
                  },
                  localParams: { parameter: _that },
              }
              if(_that.trans_id != ''){
                  json.globalParams["otp"] =  _that.otp
                  json.globalParams["trans_id"] =  _that.trans_id
              }
              _that._runAddIPDetails(json);
        },
        reset(){
            this.ip1 = ''
            this.ip2 = ''
            this.ip3 = ''
            this.ip4 = ''
            this.fullIp = ''
            this.otp = ''
            this.trans_id  = '' 
            this.$parent.addIP = false
            this.$parent.listing()
        }
    },
    created() {}
  };
</script>