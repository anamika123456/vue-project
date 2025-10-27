<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="d-flex justify-content-end">
      <a href="javascript:void(0);" class="cap_btn large_btn d-inline-flex align-items-center mb-0" data-toggle="modal" data-target="#device-manager-add-ip-address" @click="addModal = { 'mode': 'add', 'id': '' }" v-if="getWebhookData.length == 0">
        <feather type="plus" size="20px"></feather>
        <span class="pl-2 pl-lg-3">Add Webhook</span>
      </a>
      <a href="javascript:void(0);" class="cap_btn large_btn d-inline-flex align-items-center mb-0" data-toggle="modal" data-target="#device-manager-add-ip-address" @click="addModal = { 'mode': 'update', 'id': getWebhookData[0].id } ; webhook_label = getWebhookData[0].webhook_label ; webhook_url = getWebhookData[0].webhook_url" v-else>
        <feather type="edit" size="20px"></feather>
        <span class="pl-2 pl-lg-3">Update Webhook</span>
      </a>
    </div>
    <div class="table-responsive mt-4 mt-lg-5">
      <table class="table table-bordered border round-sm tablecustomWidth">
        <thead class="lightregentbluebg">
          <tr>
            <th>Label</th>
            <th>URL</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody v-if="getWebhookData.length > 0 && !pageLoader">
          <tr v-for="(list, index) in getWebhookData" >
            <td>{{ list.webhook_label }}</td>
            <td>
              <a href="javascript:void(0);" class="d-block themecolor">{{ list.webhook_url}}</a>
            </td>
            <td>{{ momentFunc(list.created, "DD-MM-YYYY, h:mm:ss a") }}</td>
          </tr>
        </tbody>
        <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'3'" :listLength="getWebhookData.length" v-else></table-loader>
      </table>
    </div>

    <!-- <div class="modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address" aria-hidden="true" v-if="Object.keys(addModal).length > 0">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <Form @submit="update()" ref="regform">
            <div class="modal-header border-0 d-block text-right">
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-0">
              <div class="mb-4">
                <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                <h6 class="themecolor mt-4 mb-0 text-center"> Google Authentication Code </h6>
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
            <div class="modal-footer justify-content-center pt-0 border-0">
              <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Save" data-toggle="modal" :class="pageLoader ? 'disabled' : ''" data-target="#fa-update-keys" />
            </div>
          </Form>
        </div>
      </div>
    </div> -->

    <div class="modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address" aria-hidden="true" v-if="Object.keys(addModal).length > 0">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <loader v-if="pageLoader" />
          <Form  @submit="(addModal.mode == 'add') ? submit() : update()"  ref="regform">
          <div class="modal-header border-0 pb-0">
            <div class="modal-title">
              <h4 class="mb-0">Add Webhook</h4>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="addModal = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="form-group">
                  <label class="labeltext semibold">Webhook Label</label>
                  <Field type="text" class="form-control" id="" name="webhook_label" placeholder="Enter your webhook label" v-model="webhook_label" rules="required" />
                  <ErrorMessage name="webhook_label" class="text-danger" />
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="form-group">
                  <label class="labeltext semibold">Webhook Url</label>
                  <Field type="text" class="form-control" id="" name="webhook_url" placeholder="Enter your webhook url" v-model="webhook_url" rules="required" />
                  <ErrorMessage name="webhook_url" class="text-danger" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center pt-4 border-0">
            <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Save Address"  :class="pageLoader ? 'disabled' : ''" data-toggle="modal" data-target="#device-manager-ip-successful"  />
          </div>
           </Form>
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
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        addModal: {},
        otp: "",
        webhook_label: "",
        webhook_url: ""
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
            parameter: this
          },
        };
        this._runGetWebHook(json);
      },
      submit() {
        const _that = this;
        let json = {
          globalParams: {
            webhook_label: _that.webhook_label,
            webhook_url: _that.webhook_url,
          },
          localParams: {
            parameter: _that
          },
        };
        _that._runAddWebHook(json);
      },
      updateData(){

      },
      update() {
        const _that = this;
        let json = {
          globalParams: {
            "id": this.addModal.id,
            webhook_label: _that.webhook_label,
            webhook_url: _that.webhook_url,
          },
          localParams: {
            parameter: _that
          },
        };
        _that._runUpdateWebHook(json);
      },
      reset() {
        this.addModal = {};
        this.webhook_label = "";
        this.webhook_url = "";
        this.listing();
      },
    },
    created() {
      this.listing();
    },
  };
</script>