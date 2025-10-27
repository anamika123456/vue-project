<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="d-flex justify-content-end mb-4 mb-lg-5">
      <a href="javascript:void(0);" class="cap_btn large_btn d-inline-flex align-items-center mb-0" data-toggle="modal" data-target="#device-manager-add-ip-address" @click=" addModal = { 'mode': 'update', 'id': getApiKeyData[0].id }">
        <feather type="edit" size="20px"></feather>
        <span class="pl-2 pl-lg-3">Update API Key</span>
      </a>
    </div>
    <p v-if="getApiKeyData.length > 0" class="mb-4">Merchant ID : {{ getApiKeyData[0].merchant_id.substring(0, 5) }}****** <a href="javascript:void(0);" class="cap_btn extra_small_btn border-btn ml-1" data-toggle="modal" data-target="#device-manager-add-ip-address1" @click="addModal = { 'mode': 'merchantId', 'id': getApiKeyData[0].id }">Read More</a>
      </p>
    <div class="table-responsive">
      
      <table class="table table-bordered border round-sm tablecustomWidth">
        <thead class="lightregentbluebg">
          <tr>
            <th>Api Key</th>
            <th>Client Secret Key</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="getApiKeyData.length > 0 && !pageLoader">
          <tr v-for="(list, index) in getApiKeyData" >
            <td>
              <p v-if="list.apiKey != ''" class="themecolor">{{ list.apiKey }}</p>
              <p v-else class="themecolor">-</p>
            </td>
            <td>
              <p v-if="list.clientSecretkey != ''" class="themecolor">{{ list.clientSecretkey }}</p>
              <p v-else class="themecolor">-</p>
            </td>
            <!-- <td><p v-if="list.apiKey != ''">{{list.apiKey.slice(0, 15)}} <a href="javascript:void(0);" class="" data-toggle="modal" data-target="#device-manager-add-ip-address1" @click="showMoreModal = list.apiKey">read more</a></p><p v-else>-</p></td><td><p v-if="list.clientSecretKey != ''">{{list.clientSecretKey.slice(0, 15)}} <a href="javascript:void(0);" class=" " data-toggle="modal" data-target="#device-manager-add-ip-address1" @click="showMoreModal = list.clientSecretKey">read more</a></p><p v-else>-</p></td> -->
            <td>{{ momentFunc(list.created, "DD-MM-YYYY, h:mm:ss a") }}</td>
            <td><a href="javascript:void(0);" class="cap_btn extra_small_btn border-btn" data-toggle="modal" data-target="#device-manager-add-ip-address1" @click="addModal = { 'mode': 'keys', 'id': list.id }">Read More</a></td>
          </tr>
        </tbody>
        <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'3'" :listLength="getApiKeyData.length" v-else></table-loader>
      </table>
    </div>
    <div class="modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address" aria-hidden="true" v-if="Object.keys(addModal).length > 0"> 
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content googleAuthenticationModal">
          <Form @submit="(addModal.mode == 'update') ? submit() : listing()" ref="regform">
            <div class="modal-header border-0 d-block text-right">
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-0">
              <div class="mb-4">
                <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
              </div>
              <div class="mb-4">
                <div class="form-group">
                  <div class="position-relative">
                    <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required|min:6|numeric" />
                    <ErrorMessage name="otp" class="text-danger" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center pt-4 border-0">
              <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Submit" data-toggle="modal" :class="pageLoader ? 'disabled' : ''" data-target="#fa-update-keys" />
            </div>
          </Form>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="device-manager-add-ip-address1" role="dialog" aria-labelledby="device-manager-add-ip-address1" aria-hidden="true" v-if="showMoreModal != ''">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <loader v-if="pageLoader" />
          <div class="modal-header border-0 d-block text-right">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0" v-if="showMoreModal == 'keys'">
            <div class="form-group">
              <label class="labeltext semibold">Api Key: </label> 
                <div class="bg-white border round-sm px-3 py-2 d-flex align-items-center w-100 justify-content-between">
                  <span class="textcolor textOverflow">{{ keysData[0].apikey }}</span>
                  <a href="javascript:void(0);" class="ml-2 my-1" @click="handleCopy(keysData[0].apikey)">
                    <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block copyIcon" width="22" height="25">
                  </a>
                </div>
            </div>

            <div class="form-group mb-0">
              <label class="labeltext semibold">Client Secret Key:</label>
                <div class="bg-white border round-sm px-3 py-2 d-flex align-items-center w-100 justify-content-between">
                  <span class="textcolor textOverflow">{{ keysData[0].clientSecretkey }}</span>
                  <a href="javascript:void(0);" class="ml-2 my-1" @click="handleCopy(keysData[0].clientSecretkey)">
                    <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block copyIcon" width="22" height="25">
                  </a>
                </div>
            </div>
          </div>

          <div class="modal-body pt-0" v-if="showMoreModal == 'merchantId'">
            <div class="form-group mb-0">
              <label class="labeltext semibold">Merchant ID:</label>
                <div class="bg-white border round-sm px-3 py-2 d-flex align-items-center w-100 justify-content-between">
                  <span class="textcolor textOverflow">{{ keysData[0].merchant_id }}</span>
                  <a href="javascript:void(0);" class="ml-2 my-1" @click="handleCopy(keysData[0].merchant_id)">
                    <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block copyIcon" width="22" height="25">
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  // import addDevice from "./deviceManager/add-device";
  // import deleteDevice from "./deviceManager/delete-device";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        addModal: {},
        otp: "",
        showMoreModal: "",
        keysData : []
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    methods: {
      listing() {
        let json = {
          globalParams: {},
          localParams: {
            parameter: this, mode : ''
          },
        };
        if(Object.keys(this.addModal).length > 0 && (this.addModal.mode == 'keys' || this.addModal.mode == 'merchantId')){
          json.globalParams.id = this.addModal.id
          json.localParams.mode = this.addModal.mode
          json.globalParams.otp =  this.otp
        }
        this._runGetAPIKey(json);
      },
      submit() {
        const _that = this;
        let json = {
          globalParams: {
            "id": this.addModal.id.toString(),
            "key_type" : "3",
            "type" : "KEYS",
            "otp": _that.otp
          },
          localParams: {
            parameter: _that
          },
        };
        _that._runAddAPIKey(json);
      },
      reset() {
        this.addModal = {};
        this.otp = "";
        this.showMoreModal= ""
        this.keysData = []
      },
    },
    created() {
      this.listing();
    },
  };
</script>