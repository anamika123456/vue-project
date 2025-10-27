<template>
  <div class="scrollVertical scrollbar">
    <loader v-if="pageLoader"></loader>

   <!--  <div v-if="showSection == '1'">
      <Form @submit="accountTypeFunc1()" ref="regform">
        <div class="signupContent">
          <div class="row justify-content-center">
            <div class="col-12 col-md-9 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-5">
              <img src="/assets/website/images/logo.svg" alt="Logo" class="loginLogo d-block text-center pb-0 pb-sm-4 pt-4" width="240" />
              <h2 class="text-center mb-0 mt-3 mt-sm-0">Select Your Account Type</h2>
              <div class="row mt-4 pt-2">
                <div class="col-12 col-md-6">
                  <div class="selectAccount h-100">
                    <label class="customRadioButton" :class="(accountType == '2')? 'selectAccountType' : ''">
                      <img src="/assets/website/images/corporateIcon.svg" width="46" height="41" alt="corporate" title="corporate" class="mb-3" />
                      <h4 class="mb-3 semibold">Corporate</h4>
                      <p class="mb-0">Designed for Businesses that want to accept, store, send and manage their digital currencies directly through their Capital wallet dashboard. No API Integration is required.</p>
                      <Field type="radio" class="form-control" name="accountType" value="2" v-model="accountType" rules="required" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="col-12 col-md-6 mt-4 mt-md-0">
                  <div class="selectAccount h-100">
                    <label class="customRadioButton" :class="(accountType == '1')? 'selectAccountType' : ''">
                      <img src="/assets/website/images/merchantIcon.svg" width="42" height="42" alt="Merchant" title="Merchant" class="mb-3" />
                      <h4 class="mb-3 semibold">Merchant</h4>
                      <p class="mb-0"> Designed for Businesses that want to accept cryptos from their customers, through an API integration with their systems. The integration allows businesses to process transactions more quickly and with fewer resources. </p>
                      <Field type="radio" class="form-control" name="accountType" value="1" v-model="accountType" rules="required" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="text-left">
                <ErrorMessage name="accountType" class="text-danger" />
              </div>
              <div class="submitButton addpadBottom-res text-center mt-4 mt-md-5">
                <input type="submit" class="cap_btn large_btn" value="Continue" />
                <p class="mr-3 mt-4">Already have an account? <router-link class="bold" :to="'/'">Sign In </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div> -->

    <div class="capitalLoginForm" v-if="showSection == '2'">
      <img src="/assets/website/images/logo.svg" alt="Logo" class="loginLogo d-block text-center pb-0 pb-sm-4 pt-4" width="240" />
      <h2 class="text-center mb-0 mt-3 mt-sm-0">Your Legal Entity</h2>
      <Form @submit="submit()" ref="regform" class="mt-4">
        <div class="form-group text-left">

          <!-- <label class="labeltext mt-4">Account Type</label>  
          <Field type="hidden" name="accountType" v-model="accountType" rules="required" />
          <v-select class="form-control" v-model="accountType" :options="Object.values(accountTypeList)" :reduce="accountTypeList => accountTypeList.id" label="type" placeholder="Select Account Type"></v-select> -->
          




          <label class="labeltext mt-4">Select Account Type</label>
	      <div class="position-relative selectDropMenu destinationDropMenu">
	        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
	          <div class="" v-if="accountType != ''">
	            <div class=""> <p class="medium themecolor mb-0 text-left">{{accountTypeList[accountType] }}</p>
	            </div>
	          </div>
	          <div class="" v-else>
	            <p class="medium textcolor mb-0 text-left themecolor">Select Account Type</p>
	          </div>
	          <feather type="chevron-down" class="ml-2" size="20px"></feather>
	        </a>
	        <ul class="dropdown-menu scrollbar">
	          <Field type="hidden" name="accountType" v-model="accountType" rules="required" />
	          <li v-for="(value,key) in accountTypeList"  @click.prevent="accountType = key">
	            <a href="javascript:void(0)" class="px-2 px-xl-3">
	              <div class="d-flex align-items-center">
	                <div class="pl-2 pl-sm-3" >
	                  <p class="medium themecolor mb-0 text-left">{{ value }}</p>
	                  <p class=" mb-0 text-left" v-if="key == 2">For businesses and sole traders seeking a simple way to manage digital currencies. No API needed—handle all transactions directly through the Capital Wallet dashboard.</p>
	                  <p class="mb-0 text-left" v-if="key == 1">Ideal for enterprises integrating crypto payments into their systems via API. Streamlines transactions for e-commerce, financial services, and more.</p>
	                </div>
	              </div>
	            </a>
	          </li>
	          <ErrorMessage name="accountType" class="text-danger" />
	        </ul>
	      </div>




          <label class="labeltext mt-4">Entity Name</label>
          <Field type="text" class="form-control" id="" name="en_name" placeholder="Entity Name" v-model="en_name" rules="required" />
          <ErrorMessage name="en_name" class="text-danger" />

          <div class="d-flex align-items-center mt-4 mb-2">
            <label class="labeltext mb-0">{{accountType == '1' ? 'Business' : ''}} Email Address</label>
            <a href="javascript:void(0);" class="d-block ml-2">
              <feather size="16px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor d-block" :title="'You can only create an account with  '+ (accountType == '1' ? 'a business' : 'an individual') +' email'"></feather>
            </a>
          </div>
          <Field type="email" class="form-control" id="" name="email" :placeholder="(accountType == '1' ? 'Business ' : '')+'Email Address'" v-model="email" rules="required|email" />
          <ErrorMessage name="email" class="text-danger" />

          <label class="labeltext mt-4">Country of Incorporation</label> {{countryFunc}}
          <Field type="hidden" name="residence_country" v-model="residence_country" rules="required" />
          <v-select class="form-control" v-model="residence_country" :options="Object.values(countryList)" :reduce="countryList => countryList.iso2" label="name" placeholder="Country"></v-select>
          <ErrorMessage name="residence_country" class="text-danger" />

          <label class="labeltext mt-4">Activity Sector <span class="required">*</span></label> 
          <Field type="hidden" name="activity_sector" v-model="activity_sector"   />
          <v-select class="form-control" v-model="activity_sector" :options="activityCategories" :reduce="activityCategories => activityCategories.id" label="name" placeholder="Activity"></v-select>
          <ErrorMessage name="activity_sector" class="text-danger" />

          <label class="labeltext mt-4">Sub Activity <span class="required">*</span></label>
          <Field type="hidden" name="sub_activity" v-model="sub_activity"  />
          <v-select class="form-control" v-model="sub_activity" :options="activitySubCategories" :reduce="activitySubCategories => activitySubCategories.id" label="name" placeholder="Sub Activity"></v-select>
          <ErrorMessage name="sub_activity" class="text-danger" />

          <div class="c_checkbox mt-4">
            <label class="customCheckbox mb-0"> I have read and I accept the 
              <a :href="envFile.VITE_websiteLink+envFile.VITE_termsCond" style="text-decoration: underline" target="_blank">Terms Of Use</a> and 
              <a :href="envFile.VITE_websiteLink+envFile.VITE_priPol" style="text-decoration: underline" target="_blank">Privacy Policy</a>
              <Field type="checkbox" class="form-control" id="" name="is_agree" value="1" v-model="is_agree" rules="required" />
              <ErrorMessage name="is_agree" class="text-danger" />
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="c_checkbox">
            <label class="customCheckbox mb-0"> I want to receive your news and updates
              <Field type="checkbox" class="form-control" id="" name="subscribe_for_updates" value="1" v-model="subscribe_for_updates"  />
              <!-- <ErrorMessage name="subscribe_for_updates" class="text-danger" /> -->
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="submitButton text-center mt-3 mt-md-4">
          <input type="submit" class="cap_btn large_btn" value="Signup" />
          <p class="mt-4">Already have an account? <router-link class="bold" :to="'/'">Sign In</router-link>
          </p>
        </div>
      </Form>
    </div>
    <div id="exampleModalaus" class="modal fade show" style="display: block" v-if="popup == 1">
      <div class="modal-dialog w-100 modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body text-center pb-3">
            <h6 class="text-center d-block lh-normal mb-0">We operate another entity that serves your country. To be redirected to the appropriate website, please click on the link below </h6>
          </div> 
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100">
              <a :href="(envFile.VITE_ENTITY_NAME == 'dmcc') ? envFile.VITE_AU_SITE_LINK+'/register' : envFile.VITE_DMCC_SITE_LINK+'/register' " target="_blank" class="cap_btn mb-0">Click Here</a>
              <a class="cap_btn px-4 border-btn ml-3" href="javascript:void(0);" @click="reset()">Cancel</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="exampleModalaus" class="modal fade show" style="display: block" v-if="popup == 2">
      <div class="modal-dialog w-100 modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body text-center pb-3">
            <h6 class="text-center medium d-block lh-normal mb-0">Sorry our services are not currently available in your region. </h6>
          </div>
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100">
              <a href="javascript:void(0);" class="cap_btn mb-0" @click="reset()">Okay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { registerStepsMixins } from "@/plugins/registerSteps";
  import { Const } from "@/plugins/registerSteps/provider/lib/const.cls.ts";
  import { mapActions } from "vuex";
  import * as types from "@/types";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "step-one",
    mixins: [registerStepsMixins],
    data() {
      return {
        showSection: "2",
        accountType: "1",
        accountTypeList: {'1': 'Business', '2':'Individual'},
        en_name: "",
        mobile: "",
        email: "",
        residence_country: "",
        activity_sector: "",
        sub_activity: "",
        is_agree: 0,
        subscribe_for_updates: 0,
        submitted: false,
        pageLoader: false,
        popup: 0,

        refRm: "0",
        refLink: "0",
        countryList : {}
      };
    },
    components: { Form, Field, ErrorMessage },
    watch: {
      residence_country: function(val) {
        let countrylist1 = Object.values(this.country);
        for (let i = 0; i <= countrylist1.length - 1; i++) {
          if (countrylist1[i].iso2 == val) {
            if(this.envFile.VITE_ENTITY_NAME == 'dmcc'){
              if (parseInt(countrylist1[i].entity_id) == 2) {
                this.popup = 1;
                this.residence_country = "";
              } else {
                this.popup = 0;
              }
            }else{
              if (parseInt(countrylist1[i].entity_id) == 1) {
                this.popup = 1;
                this.residence_country = "";
              } else {
                this.popup = 0;
              }
            }
          }
        }
      },
      activity_sector: function(val) {
        this.activityFunc(val);
        this.sub_activity = "";
      },
      sub_activity: function(val) {
        for (let i = 0; i <= this.activitySubCategories.length - 1; i++) {
          if (this.activitySubCategories[i].id == val) {
            if(this.envFile.VITE_ENTITY_NAME == 'dmcc'){
              if (this.activitySubCategories[i].in_global == "GLOBAL") {
                this.popup = 0;
              } else {
                this.popup = 1;
              }
            }else{
              if (this.activitySubCategories[i].in_apac == "APAC") {
                this.popup = 0;
              } else {
                this.popup = 1;
              }
            }
            
          }
        }
      },
    },
    computed:{
      countryFunc(){
        if(Object.keys(this.country).length > 0){
          let list = {}, count = 0;
          
          for(let key in this.country){
            count++
            if(parseInt(this.country[key].entity_id) != 0){
              list[key] =  this.country[key]
            }
            if(count == Object.keys(this.country).length){
              // console.log('list===',list)
              this.countryList =  list;
            }
          }
        }else{
          this.countryList =  {} ; 
        }
      }
    },
    methods: {
      accountTypeFunc1() {
        const _that = this;
        _that.showSection = "2";
        _that.submitted = false;
      },
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        if(_that.activity_sector != '' && _that.sub_activity != ''){
          let input_json = {
            globalParams: {
              account_type: _that.accountType,
              name: _that.en_name,
              email: _that.email,
              residence_country: _that.residence_country,
              activity_sector: _that.sub_activity.toString(),
              is_agree: (_that.is_agree || parseInt(_that.is_agree) == 1) ? "1" : "0",
              subscribe_for_updates: (_that.subscribe_for_updates || parseInt(_that.subscribe_for_updates) == 1) ? "1" : "0",
            },
            localParams: {
              parameter: _that
            },
          };
          if(this.refRm != '0' && this.refLink != '0'){
            input_json.globalParams.refRm =  this.refRm
            input_json.globalParams.refLink =  this.refLink
          }
          _that._runStep1(input_json);
        }
      },
      activityFunc(val) {
        this._runGetActivityCategories({
          globalParams: {
            parent_id: val
          },
          localParams: {
            parameter: this,
            activity_type: "child"
          },
        });
      },
      ...mapActions({
        _runCountryList: types.RUN_COUNTRY,
      }),
      reset() {
        this.popup = 0;
        this.sub_activity = "";
      }
    },
    created() {
      if(this.$route.query.refLink && this.$route.query.refRm){
        let refLink = window.atob(this.$route.query.refLink.toString()) ;
        let refRm = this.$route.query.refRm.toString() ;
        let join = window.btoa(refLink+"||"+refRm)
        this.refLink = (refLink != undefined)? refLink : '0' 
        this.refRm = (refRm != undefined)? refRm : '0' 
      }
      this.$router.replace({query: ""});
      localStorage.clear();
      this.$store.commit(Const.SET_STEP2, {});
      this.$store.commit(Const.SET_STEP3, {});
    },
  };
</script>