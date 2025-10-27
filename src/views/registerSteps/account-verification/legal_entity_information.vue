<template>
  <div class="verificationContent bg-white border round-md">
    <loader v-if="pageLoader"></loader>
    <h3 class="mb-3 mb-lg-4 semibold">Legal Entity Information</h3>
    <p class="border-bottom pb-3 pb-lg-4 mb-4 mb-lg-5"> Please fill in the fields below with your Legal Entity's information. </p>
    <Form @submit="submit()" ref="regform" class="mt-4">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Entity Name <span class="required">*</span>
            </label>
            <Field type="text" class="form-control" id="" name="legal_name" placeholder=" " v-model="legal_name" rules="required" disabled />
            <ErrorMessage name="legal_name" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6" v-if="parseInt(get_user.lead_type) == 1">
          <div class="form-group">
            <label class="labeltext">Is your business legal name same as your entity name?</label>
            <div class="personalInfo">
              <div class="d-block d-lg-flex align-items-start my-3">
                <div class="form-group mb-3 mb-lg-0 mr-0 mr-lg-3">
                  <label class="customRadioButton">Yes
                    <Field type="radio" class="form-control" id="" value="1" name="is_same_legal_name" placeholder=" " v-model="is_same_legal_name" rules="required" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="form-group mb-0">
                  <label class="customRadioButton">No, they have a different name
                    <Field type="radio" class="form-control" id="" value="0" name="is_same_legal_name" placeholder=" " v-model="is_same_legal_name" rules="required" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <ErrorMessage name="is_same_legal_name" class="text-danger" />
            </div>
            <span v-show="submitted && errors.has('is_same_legal_name')" class="text-danger">The Name is required</span>
          </div>
        </div>
        <div class="col-lg-6" v-if="parseInt(get_user.lead_type) == 1 && parseInt(is_same_legal_name) == 0">
          <div class="form-group">
            <label class="labeltext">Brand Name <span class="required">*</span>
            </label>
            <Field type="text" class="form-control" id="" name="brand_name" placeholder=" " v-model="brand_name" rules="required" />
            <ErrorMessage name="brand_name" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Activity <span class="required">*</span>
            </label>
            <select class="form-control" name="activity" v-model="activity" placeholder=" " disabled>
              <option value=""></option>
              <option :value="list.id" v-for="list in activityCategories">
                {{ list.name }}
              </option>
            </select>
            <!-- <span v-show="submitted && errors.has('activity')" class="text-danger">The Activity is required</span> -->
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Sub Activity <span class="required" >*</span>
            </label>
            <select class="form-control" name="sub_activity" v-model="sub_activity" placeholder=" " disabled>
              <option value=""></option>
              <option :value="list.id" v-for="list in activitySubCategories">
                {{ list.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Website <span class="required" v-if="parseInt(get_user.lead_type) == 1">*</span>
            </label>
            <Field type="text" class="form-control" id="" name="website" placeholder="Enter your Company Website" v-model="website"  :rules="(parseInt(get_user.lead_type) == 1) ? validateUrl : ''" />
            <ErrorMessage name="website" class="text-danger" v-if="parseInt(get_user.lead_type) == 1" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Registration Number <span class="required">*</span>
            </label>
            <Field type="text" class="form-control" id="" name="reg_no" placeholder="Enter your Registration Number" v-model="reg_no" rules="required" />
            <ErrorMessage name="reg_no" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6" v-if="parseInt(get_user.lead_type) == 1 && $env_var.activityIdExceptionOnFieldsShowing.hasOwnProperty(activity.toString())">
          <div class="form-group">
            <label class="labeltext">Source of Funds</label>
            <Field type="text" class="form-control" id="" name="src_of_funds" placeholder=" " v-model="src_of_funds" rules="required" />
            <ErrorMessage name="src_of_funds" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group" :class="registered_country != '' ? 'active' : ''">
            <label class="labeltext">Country of Incorporation <span class="required">*</span>
            </label>
            <select class="form-control" name="registered_country" v-model="registered_country" placeholder=" " disabled>
              <option :value="list.iso2" v-for="list in Object.values(country)">
                {{ list.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-lg-12" >
          <label class="labeltext">Registered Corporate Address</label>
          <div class="row mt-2">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="labeltext">Address Line 1 <span class="required">*</span>
                </label>
                <Field type="text" class="form-control" id="" name="address1" placeholder="Enter your Address Line 1" v-model="address1" rules="required" />
                <ErrorMessage name="address1" class="text-danger" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="labeltext">Address Line 2</label>
                <input type="text" class="form-control" placeholder="Enter your Address Line 2" name="address2" v-model="address2" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="labeltext">Town/ City <span class="required">*</span>
                </label>
                <Field type="text" class="form-control" id="" name="town_city" placeholder="Enter your Town/ City" v-model="town_city" rules="required" />
                <ErrorMessage name="town_city" class="text-danger" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="labeltext">State/ County/ Region <span class="required">*</span>
                </label>
                <Field type="text" class="form-control" id="" name="state" placeholder="Enter your State/ County/ Region" v-model="state" rules="required" />
                <ErrorMessage name="state" class="text-danger" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="labeltext">Country  <span class="required">*</span>
                </label>
                <Field type="text" class="form-control" id="" name="Country" placeholder="Enter your Country" v-model="Country" rules="required" />
                <ErrorMessage name="Country" class="text-danger" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="labeltext">Postcode/ Zip code <span class="required">*</span>
                </label>
                <Field type="text" class="form-control" id="" name="zip_code" placeholder="Enter your Postcode/ Zip code" v-model="zip_code" rules="required" />
                <ErrorMessage name="zip_code" class="text-danger" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6" v-if="parseInt(get_user.lead_type) == 1 && $env_var.activityIdExceptionOnFieldsShowing.hasOwnProperty(activity.toString())">
          <div class="form-group">
            <label class="labeltext">Anticipated Number of Monthly Payments Received</label>
            <select class="form-control" placeholder=" " name="payin" v-model="payin">
              <option :value="value" v-for="(key,value) in $env_var.monthly_payin"> {{ key }} </option>
            </select>
            <!-- <span v-show="submitted && errors.has('payin')" class="text-danger">The Monthly Payin is required</span> -->
          </div>
        </div>
        <div class="col-lg-6" v-if="parseInt(get_user.lead_type) == 1 && $env_var.activityIdExceptionOnFieldsShowing.hasOwnProperty(activity.toString())">
          <div class="form-group">
            <label class="labeltext">Anticipated Number of Monthly Payouts <span class="required">*</span>
            </label>
            <select class="form-control" placeholder=" " name="monthly_payout" v-model="monthly_payout">
              <option :value="value" v-for="(key,value) in $env_var.monthly_payout"> {{ key }} </option>
            </select>
            <!-- <span v-show="submitted && errors.has('monthly_payout')" class="text-danger">The Monthly Payout is required</span> -->
          </div>
        </div>
        <div class="col-lg-6" v-if="parseInt(get_user.lead_type) == 1 && $env_var.activityIdExceptionOnFieldsShowing.hasOwnProperty(activity.toString())">
          <div class="form-group">
            <label class="labeltext">Anticipated Annual Transaction Volume <span class="required">*</span>
            </label>
            <select class="form-control" placeholder=" " name="transaction_volume" v-model="transaction_volume">
              <option :value="value" v-for="(key,value) in $env_var.transaction_volume"> {{ key }} </option>
            </select>
            <!-- <span v-show="submitted && errors.has('transaction_volume')" class="text-danger">The Transaction Volume is required</span> -->
          </div>
        </div>
        <div class="col-12">
          <div class="text-right border-top mt-2 mt-lg-3 pt-4">
            <input type="submit" value="Save &amp; Continue" class="cap_btn large_btn mb-0" />
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
  import {registerStepsMixins} from "@/plugins/registerSteps";
  import {Form,Field,ErrorMessage} from "vee-validate";
  export default {
    name: "step-four",
    mixins: [registerStepsMixins],
    data() {
      return {
        submitted: false,
        pageLoader: false,
        legal_name: "",
        is_same_legal_name: '1',
        brand_name: "",
        activity: "",
        sub_activity: "",
        other_activity: "",
        website: "",
        reg_no: "",
        // business_activities : '',
        src_of_funds: "",
        registered_country: "",
        address1: "",
        address2: "",
        town_city: "",
        state: "",
        Country: "",
        zip_code: "",
        payin: "",
        monthly_payout: "",
        transaction_volume: ""
      };
    },
    components: {Form,Field,ErrorMessage},
    methods: {
      validateUrl(value) {
        // if the field is empty
        if (!value) {
          return 'This field is required';
        }
        // if the field is not a valid email
      
        // const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        var res =  value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null){
          return 'This field must be a valid url';
        }
       
        // All is good
        return true;
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
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        if (parseInt(_that.is_same_legal_name) == 1) {
          _that.brand_name = _that.legal_name;
        }
        let input_json = {
          globalParams: {
            step: "2",
            legal_name: _that.legal_name,
            brand_name: _that.brand_name,
            registered_country: _that.registered_country,
            registration_no: _that.reg_no,
            website_url: _that.website,
            activity_id: _that.activity.toString(),
            activity_label: "",
          },
          localParams: {
            parameter: _that,
          },
        };
        if (_that.$env_var.activityIdExceptionOnFieldsShowing.hasOwnProperty(_that.activity.toString())) {
          input_json.globalParams.src_of_funds = _that.src_of_funds;
          input_json.globalParams.transaction_volume = _that.transaction_volume.toString();
        }
        if (parseInt(_that.get_user.lead_type) == 1) {
          input_json.globalParams.address1 = _that.address1;
          input_json.globalParams.address2 = _that.address2;
          input_json.globalParams.city = _that.town_city;
          input_json.globalParams.state = _that.state;
          input_json.globalParams.country = _that.Country;
          input_json.globalParams.zip_code = _that.zip_code;
          input_json.globalParams.monthly_payin = _that.payin;
          input_json.globalParams.monthly_payout = _that.monthly_payout;
        }
        _that._runAddLegalEntity(input_json);
      },
    },
    created() {
      this._runGetStepInfo({
        globalParams: {},
        localParams: {
          parameter: this,
          step: 2
        },
      });
    },
  };
</script>