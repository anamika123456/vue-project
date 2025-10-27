<template>
  <div>
    <loader v-if="pageLoader"></loader> 
    <div class="d-flex justify-content-end mb-4 mb-lg-5" v-if="parseInt(get_user.api_status) == 0">
      <a href="javascript:void(0);" class="cap_btn large_btn d-inline-flex align-items-center mb-0" data-toggle="modal" data-target="#device-manager-add-ip-address" @click=" addModal = { 'mode': 'add', 'id': getApiKeyData[0].id }" >
        <!-- <feather type="add" size="20px"></feather>    -->
        <span class="pl-2 pl-lg-3">Create API Key  </span>
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
            <th></th>
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
            <td>{{ momentFunc(list.created, "DD-MM-YYYY, h:mm:ss a") }}</td>
            <td>
              <label  @click="addModal = { 'mode': 'keys', 'id': list.id }" v-if="parseInt(get_user.api_status) == 1"><a href="javascript:void(0);" class="cap_btn extra_small_btn border-btn"  data-toggle="modal" data-target="#device-manager-add-ip-address1">Read More</a></label>
              <label v-else>-</label>
            </td>
            <td>
              <label @click="editFuncCall(list)" v-if="parseInt(get_user.api_status) == 1"><a href="javascript:void(0);" class="d-block themecolor" data-toggle="modal" data-target="#device-manager-add-ip-address1" ><feather type="edit" size="20px"></feather></a></label>
              <label v-else>-</label>
            </td>
          </tr>
        </tbody>
        <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'3'" :listLength="getApiKeyData.length" v-else></table-loader>
      </table>
    </div>

    <div class="modal apiInformation-modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address" v-if="Object.keys(addModal).length > 0 && addModal.mode == 'add'"> 
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content googleAuthenticationModal">
          <Form @submit="createApi()" ref="regform">
            <div class="modal-header position-relative border-0 d-flex text-right">
              <h6 class="themecolor mb-0 text-center w-100">Create API Key </h6>
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-3 py-0">
             
              <div class="mt-4 pt-3 border-top">
                <h3 class="mb-2 semibold">IP Address</h3>
                <div class="row align-items-center mb-4 d-flex">
                  <div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0 mb-3">
                    <Field type="text" class="form-control" id="" name="ip" placeholder="Enter IP" v-model="ip" rules="required" />
                    <ErrorMessage name="ip" class="text-danger" />
                  </div>
                </div>
                <div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0" v-for="(value, key) in addMoreArray" v-show="addMoreArray.length > 0">
                  <div class="IP_wrap mb-3 position-relative">
                    <input type="text" class="form-control" id="" name="addMoreArray[key].ip" v-model="addMoreArray[key].ip"  placeholder="Enter IP"  />
                    <a href="javascript:void(0);" class="position-absolute">
                      <feather type="x-circle" size="20px" class="ml-2 red d-block" @click="deleteMoreFunc(key)" data-toggle="modal" data-target="#user-delete-confirmation"></feather>
                    </a>
                  </div>
                  
                </div>
                <div class="my-3" >
                  <a href="javascript:void(0);" class="addFileBtn d-inline-flex"  @click="addMoreFunc()">
                    <div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-3 extra_small_btn min-w-auto">
                      <feather type="plus" size="15px" class="mr-2"></feather>
                      <span>Add More</span>
                    </div>
                  </a>
                </div>
              </div><br>
              <div class="mb-4">
                <div class="form-group mb-0">
                  <div class="position-relative">
                    <label class="labeltext">Google Authentication Code</label>
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

    <div class="modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address" v-if="Object.keys(addModal).length > 0  && (addModal.mode == 'keys' || addModal.mode == 'merchantId')"> 
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content googleAuthenticationModal">
          <Form @submit="listing()" ref="regform">
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

    <div class="modal apiInformation-modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address"  v-if="Object.keys(addModal).length > 0  && addModal.mode == 'update'"> 
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content googleAuthenticationModal">
          <Form @submit="(selectEditMode == '1') ? confirmFunc(1, 'editFuncCall')  : confirmFunc(1, 'addIPCall') " ref="regform">
            <div class="modal-header position-relative border-0 d-flex text-right">
              <h6 class="themecolor mb-0 text-center w-100">API Information </h6>
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-3 py-0">
              <!-- <div class="mb-3">
                <h6 class="themecolor mb-0 text-center">API Information </h6>
              </div> -->
              <div class="mb-2">
                <div class="form-group mb-0">
                  <div class="position-relative">
                    <label class="labeltext">Select Option</label>
                    <select  class="form-control" id="" v-model="selectEditMode">
                      <option value="1">Update Api Key</option>
                      <option value="2">Update IP Address</option>
                    </select>
                    <Field type="hidden" class="form-control" id="" name="selectEditMode"  v-model="selectEditMode" rules="required" />
                    <ErrorMessage name="selectEditMode" class="text-danger" />
                  </div>
                </div>
              </div>

              <div class="p-3 p-sm-4 lightredbg d-block d-sm-flex round-sm">
                <div class="pr-4">
                  <feather type="alert-triangle" size="30px" class="red d-block"></feather>
                </div>
                <p class="mb-0 red d-block pt-2 pt-sm-0 medium" v-if="selectEditMode == '1'">Updating the API key will disable the old key and activate a new one.</p>
                <p class="mb-0 red d-block pt-2 pt-sm-0 medium" v-if="selectEditMode == '2'">Updating IP address allows you to add more IPs as needed.</p>
              </div>

              <div class="mt-4 pt-3 border-top" v-if="selectEditMode == '1'">
                <h3 class="mb-2 semibold">IP Address</h3>
                <div class="row align-items-center mb-4 d-flex" v-show="addMoreArray.length > 0">
                  <div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0 mb-3">
                    <Field type="text" class="form-control" id="" name="ip" placeholder="Enter IP" v-model="ip" rules="required" />
                    <ErrorMessage name="ip" class="text-danger" />
                  </div>
                  <div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0" v-for="(value, key) in addMoreArray">
                    <div class="IP_wrap mb-3 position-relative">
                      <input type="text" class="form-control" id="" name="addMoreArray[key].ip" v-model="addMoreArray[key].ip"  placeholder="Enter IP"  />
                      <a href="javascript:void(0);" class="position-absolute">
                        <feather type="x-circle" size="20px" class="ml-2 red d-block" @click="deleteMoreFunc(key)" data-toggle="modal" data-target="#user-delete-confirmation"></feather>
                      </a>
                    </div>
                  </div>
                  <!-- <div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right">
                    <p class="mb-0">
                      <p class="d-inline-flex align-items-center mb-0">
                        <a href="javascript:void(0);">
                          <feather type="x-circle" size="20px" class="ml-2 red d-block" @click="deleteMoreFunc(key)" data-toggle="modal" data-target="#user-delete-confirmation"></feather>
                        </a>
                      </p>
                    </p>
                  </div> -->
                </div>
                <div class="my-3" >
                  <a href="javascript:void(0);" class="addFileBtn d-inline-flex"  @click="addMoreFunc()">
                    <div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-3 extra_small_btn min-w-auto">
                      <feather type="plus" size="15px" class="mr-2"></feather>
                      <span>Add More</span>
                    </div>
                  </a>
                </div>
              </div>

              <div class="mt-4 pt-3 border-top" v-if="selectEditMode == '2'">
                <h3 class="mb-2 semibold">IP Address</h3> 
                <p>Whitelist the IP addresses from where you need to access the API keys</p>
                <div class="row align-items-center mb-3" v-show="addMoreArray1.length > 0">
                  <div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0" v-for="(value, key) in addMoreArray1">
                    <div class="IP_wrap position-relative mb-3">
                      <input type="text" class="form-control" id="" name="addMoreArray1[key].ip" v-model="addMoreArray1[key].ip"  placeholder="Enter IP"  />
                      <a href="javascript:void(0);" class="position-absolute">
                        <feather type="x-circle" size="20px" class="ml-2 red d-block" @click="deleteMoreFunc(key, '2')" data-toggle="modal" data-target="#user-delete-confirmation" v-if="key != 0"></feather>
                      </a>
                    </div>
                  </div>
                  <!-- <div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right">
                    <p class="mb-0">
                      <p class="d-inline-flex align-items-center mb-0">
                        <a href="javascript:void(0);">
                          <feather type="x-circle" size="20px" class="ml-2 red d-block" @click="deleteMoreFunc(key, '2')" data-toggle="modal" data-target="#user-delete-confirmation" v-if="key != 0"></feather>
                        </a>
                      </p>
                    </p>
                  </div> -->
                </div>
                <div class="my-3" >
                  <a href="javascript:void(0);" class="addFileBtn d-inline-flex"  @click="addMoreFunc('2')">
                    <div class="d-flex cap_btn border-btn pl-2 pr-3 extra_small_btn px-lg-3 min-w-auto">
                      <feather type="plus" size="15px" class="mr-2"></feather>
                      <span>Add More</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="mb-4">
                <div class="form-group mb-0">
                  <div class="position-relative">
                    <label class="labeltext">Google Authentication Code</label>
                    <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required|min:6|numeric" />
                    <ErrorMessage name="otp" class="text-danger" />
                  </div>
                </div>
              </div>
            </div> 
            <div class="modal-footer justify-content-center pt-4 border-0">
              <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Submit" data-toggle="modal" :class="pageLoader?'disabled' : ''" data-target="#fa-update-keys"   v-if="selectEditMode == '1'" />
              <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Submit" data-toggle="modal" :class="submitFlag?'' : 'disabled'" data-target="#fa-update-keys"   v-if="selectEditMode == '2'" />
            </div>
          </Form>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="device-manager-add-ip-address1" role="dialog" aria-labelledby="device-manager-add-ip-address1"  v-if="showMoreModal != ''">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <loader v-if="pageLoader" />
          <div class="modal-header border-0 d-block text-right">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0" >
            <div class="form-group" v-if="showMoreModal == 'keys'">
              <label class="labeltext semibold">Api Key: </label> 
                <div class="bg-white border round-sm px-3 py-2 d-flex align-items-center w-100 justify-content-between">
                  <span class="textcolor textOverflow">{{ keysData[0].apikey }}</span>
                  <a href="javascript:void(0);" class="ml-2 my-1" @click="handleCopy(keysData[0].apikey)">
                    <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block copyIcon" width="22" height="25">
                  </a>
                </div>
            </div>

            <div class="form-group mb-0" v-if="showMoreModal == 'keys'">
              <label class="labeltext semibold">Client Secret Key:</label>
                <div class="bg-white border round-sm px-3 py-2 d-flex align-items-center w-100 justify-content-between">
                  <span class="textcolor textOverflow">{{ keysData[0].clientSecretkey }}</span>
                  <a href="javascript:void(0);" class="ml-2 my-1" @click="handleCopy(keysData[0].clientSecretkey)">
                    <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block copyIcon" width="22" height="25">
                  </a>
                </div>
            </div>

            <div class="form-group mb-0" v-if="showMoreModal == 'merchantId'">
              <label class="labeltext semibold">Merchant ID:</label>
                <div class="bg-white border round-sm px-3 py-2 d-flex align-items-center w-100 justify-content-between">
                  <span class="textcolor textOverflow">{{ keysData[0].merchant_id }}</span>
                  <a href="javascript:void(0);" class="ml-2 my-1" @click="handleCopy(keysData[0].merchant_id)">
                    <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block copyIcon" width="22" height="25">
                  </a>
                </div>
            </div>
            <br>
            <div class="form-group mt-10 pt-10" >
              <div class="table-responsive">
                <table class="table table-bordered border round-sm tablecustomWidth">
                  <thead class="lightregentbluebg">
                    <tr>
                      <th>IP Address</th>
                      <!-- <th>Action</th> -->
                    </tr>
                  </thead>
                  <tbody v-if="allowed_ips.length > 0 && !pageLoader">
                    <tr v-for="(list, index) in allowed_ips" >
                      <td>
                        <p class="themecolor">{{ list }} </p>
                      </td>
                      <!-- <td>
                        <label ><a href="javascript:void(0);" class="d-block themecolor" data-toggle="modal" data-target="#device-manager-add-ip-address1" ><feather type="delete" size="20px"></feather></a></label>
                      </td> -->
                    </tr>
                  </tbody>
                  <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'3'" :listLength="allowed_ips.length" v-else></table-loader>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="modal double-modal" tabindex="-1" id="withdrawal-message" role="dialog" aria-labelledby="withdrawal-message" aria-hidden="true" v-if="confirm == 1">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content pb-0">
          <div class="modal-body">
            <h3 class="text-center mt-4 mb-0 medium d-block lh-normal" v-if="selectEditMode == '2'"> API Access will be restricted to the newly added IP addresses only. Ensure that the listed IPs are correct before proceeding. </h3>
            <h3 class="text-center mt-4 mb-0 medium d-block lh-normal" v-if="selectEditMode == '1'"> Updating the API keys will deactivate the exsisting keys. The new keys must be updated in your integrated applications immediately to continue the services. </h3>
            <h3 class="text-center mt-4 mb-0 medium d-block lh-normal"> Are you sure you want to proceed? </h3>
          </div>
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100">
              <button @click="confirmFunc(2,'')" class="cap_btn large_btn border-0 mb-0" data-dismiss="modal" aria-label="Close">Confirm</button>
              <a href="javascript:void(0);" @click="confirmFunc(0,'')" class="cap_btn large_btn border-btn ml-2 ml-md-3 mb-0" data-dismiss="modal" aria-label="Close">cancel</a>
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
        ip: "",
        otp: "",
        showMoreModal: "",
        confirm : 0,
        getFuncName : '',
        keysData : [],

        selectEditMode: '2',
        allowed_ips: [],

        addMoreArray: [],
        addMoreArray1: [],
        submitFlag : false
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    watch: {
      selectEditMode(value) { 
        if(parseInt(value) == 2){
          this.submitFlag = false
        }
      },
      addMoreArray1: {
          handler: function(newValue) {  
            if(this.getApiKeyData[0].allowed_ips && this.getApiKeyData[0].allowed_ips !=''){
              let allowed_ips = [], compareArray = [];
              if(this.getApiKeyData[0].allowed_ips.includes(",")){
                allowed_ips = this.getApiKeyData[0].allowed_ips.split(",") ;
              }else{
                allowed_ips.push(this.getApiKeyData[0].allowed_ips);
              }
              for(let i=0 ; i<=allowed_ips.length-1 ; i++){
                let json = {'ip' : allowed_ips[i]} ;
                compareArray.push(json) ; 
                if(i==allowed_ips.length-1){
                  // console.log('addMoreArray1',this.addMoreArray1)
                  // console.log('compareArray',compareArray)
                  this.submitFlag = JSON.stringify(compareArray) == JSON.stringify(this.addMoreArray1) ?  false :  true  ;
                }
              }
            }else{
              this.submitFlag = true
            }
          },
          deep: true
      }
    },
    methods: {
      editFuncCall(getData){
        this.addModal = { 'mode': 'update', 'data': getData }
        this.addMoreArray = [] ; 

        if(getData.allowed_ips && getData.allowed_ips !=''){
          let allowed_ips = [];
          if(getData.allowed_ips.includes(",")){
            allowed_ips = getData.allowed_ips.split(",") ;
          }else{
            allowed_ips.push(getData.allowed_ips);
          }
          for (let i = 0; i <= allowed_ips.length - 1; i++) {
            let json = {'ip' : allowed_ips[i]} ;
            this.addMoreArray1.push(json)
          }
        }
      },
      addMoreFunc(getData) {
        let json = { ip: "" };
        if(getData != undefined){
          this.addMoreArray1.push(json);
        }else{
          this.addMoreArray.push(json);
        }
      },
      deleteMoreFunc(getIndex,getData) {
        if(getData != undefined){
          this.addMoreArray1.splice(getIndex, 1);
        }else{
          this.addMoreArray.splice(getIndex, 1);
        }
      },
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
      confirmFunc(getConfirmData,getFuncName){
        this.confirm = getConfirmData
        console.log(this.confirm,this.getFuncName)
        if(getFuncName != ''){
          this.getFuncName = getFuncName
        }
        if(this.confirm == 2 && this.getFuncName == 'editFuncCall'){
          this.editFunc()
        }else if(this.confirm == 2 && this.getFuncName == 'addIPCall'){
          this.addIP()
        }

      },
      addIP() {
          if (this.addMoreArray1.length > 0) {
            const uniqueElements = new Set();
            const duplicates = [];
            this.addMoreArray1.forEach(item => {
              if (uniqueElements.has(item.ip)) {
                duplicates.push(item.ip);
              } else {
                uniqueElements.add(item.ip);
              }
            });

            if(duplicates.length == 0){
              let ip = '';
              for (let i = 0; i <= this.addMoreArray1.length - 1; i++) {
                if(this.addMoreArray1[i].ip.trim() != ''){
                  ip = ip + ',' +this.addMoreArray1[i].ip
                }
                if (i == this.addMoreArray1.length - 1) {
                  if(ip != ''){
                    let index = ip.indexOf(',');
                    let result = ip.substring(0, index) + ip.substring(index + 1);
                    let json = {
                      globalParams: {
                        "allowed_ips": result,
                        "otp": this.otp
                      },
                      localParams: {
                        parameter: this
                      },
                    };
                    this._runAddAPIKey(json);
                  }else{
                    this.$notify({
                      text: "Please add ip",
                      duration: 10000,
                      pauseOnHover: true,
                      type: "error",
                    });
                  }
                }
              }
            }else{
              this.$notify({
                text: "Please remove duplicate ip",
                duration: 10000,
                pauseOnHover: true,
                type: "error",
              });
            }
          }
      },
      editFunc() {
        let ipArray = [] ;
        ipArray.push({'ip': this.ip}) ;
        ipArray = ipArray.concat(this.addMoreArray);
        let ip = '';
        for (let i = 0; i <= ipArray.length - 1; i++) {
          if(ipArray[i].ip.trim() != ''){
            ip = ip + ',' +ipArray[i].ip
          }
          if (i == ipArray.length - 1) {
            let index = ip.indexOf(',');
            let result = ip.substring(0, index) + ip.substring(index + 1);
            let json = {
              globalParams: {
                "id": this.addModal.data.id.toString(),
                "key_type" : "3",
                "type" : "KEYS",
                "allowed_ips": result,
                "otp": this.otp
              },
              localParams: {  parameter: this, mode: 'updateApiKey' },
            };
            this._runUpdateAPIKey(json);
          }
        }
      },
      createApi() {
        let ipArray = [] ;
        ipArray.push({'ip': this.ip}) ;
        ipArray = ipArray.concat(this.addMoreArray);
        let ip = '';
        for (let i = 0; i <= ipArray.length - 1; i++) {
          if(ipArray[i].ip.trim() != ''){
            ip = ip + ',' +ipArray[i].ip
          }
          if (i == ipArray.length - 1) {
            let index = ip.indexOf(',');
            let result = ip.substring(0, index) + ip.substring(index + 1);
            let json = {
              globalParams: {
                "id": this.addModal.id.toString(),
                "key_type" : "3",
                "type" : "KEYS",
                "allowed_ips": result,
                "otp": this.otp
              },
              localParams: {  parameter: this, mode: 'createApiKey' },
            };
            this._runUpdateAPIKey(json);
          }
        }
      },
      reset() {
        this.confirm = 0
        this.getFuncName = ''
        this.addModal = {};
        this.otp = "";
        this.ip = "";
        this.showMoreModal= ""
        this.keysData = []
        this.selectEditMode = '2'
        this.allowed_ips = []
        this.addMoreArray = []
        this.addMoreArray1 = []
      },
    },
    created() {
      this.listing();
    },
  };
</script>