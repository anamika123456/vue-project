<template>
  <div class="accountSetting bg-white round-sm">
    <h4 class="mb-3 pb-3 border-bottom">Legal Entity Details</h4>
    <div class="row pt-0 pt-md-4">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Legal Name</label>
          <input type="text" placeholder="" class="form-control" v-model="legal_name" disabled />
        </div>
      </div>
      <div class="col-12 col-md-6" v-if="parseInt(get_user.lead_type) == 1">
        <div class="form-group">
          <label class="labeltext">Brand Name</label>
          <input type="text" placeholder="" class="form-control" v-model="brand_name" disabled />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Registration Number</label>
          <input type="text" placeholder="" class="form-control" v-model="registration_no" disabled />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Business Activities</label>
          <!-- <v-select class="form-control" :options="activityCategories" :reduce="country => country.id"  v-model="activity_id" label="name" placeholder="" name="activity_id" disabled></v-select> -->
          <select class="form-control" v-model="activity_id" name="activity_id" disabled>
            <option :value="list.id" v-for="list in activityCategories">
              {{ list.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Business Sub Activities</label>
          <!-- <v-select class="form-control" :options="activitySubCategories" :reduce="country => country.id"  v-model="subactivity_id" label="name" placeholder="" name="subactivity_id" disabled></v-select> -->
          <select class="form-control" v-model="subactivity_id" name="subactivity_id" disabled>
            <option :value="list.id" v-for="list in activitySubCategories">
              {{ list.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-12 col-md-6" v-if="
          parseInt(get_user.lead_type) == 1 &&
          activityIdExceptionOnFieldsShowing1.includes(activity_id.toString())
        ">
        <div class="form-group">
          <label class="labeltext">Source of Funds</label>
          <input type="text" placeholder="" class="form-control" v-model="src_of_funds" disabled />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Country of Incorporation</label>
          <!-- <v-select class="form-control" :options="Object.values(country)" :reduce="country => country.iso2"  v-model="registered_country" label="name" placeholder="" name="registered_country"  disabled></v-select> -->
          <select class="form-control" v-model="registered_country" name="registered_country" disabled>
            <option :value="list.iso2" v-for="list in Object.values(country)">
              {{ list.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Website</label>
          <input type="text" placeholder="" class="form-control" v-model="website_url" disabled />
        </div>
      </div>
      <div class="col-12" v-if="parseInt(get_user.lead_type) == 1">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label class="labeltext">Registered Corporate Address</label>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
               <label class="labeltext">Address1</label>
              <input type="text" placeholder="" class="form-control" v-model="address1" disabled />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
               <label class="labeltext">Address2</label>
              <input type="text" placeholder="" class="form-control" v-model="address2" disabled />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
               <label class="labeltext">Country</label>
              <input type="text" placeholder="" class="form-control" v-model="country1" disabled />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
               <label class="labeltext">City</label>
              <input type="text" placeholder="" class="form-control" v-model="city" disabled />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
               <label class="labeltext">State</label>
              <input type="text" placeholder="" class="form-control" v-model="state" disabled />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
               <label class="labeltext">Zip Code</label>
              <input type="text" placeholder="" class="form-control" v-model="zip_code" disabled />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6" v-if="
          parseInt(get_user.lead_type) == 1 &&
          activityIdExceptionOnFieldsShowing1.includes(activity_id.toString())
        ">
        <div class="form-group">
          <label class="labeltext">Anticipated Number of Monthly Payments Received</label>
          <input type="text" placeholder="" class="form-control" v-model="monthly_payin" disabled />
        </div>
      </div>
      <div class="col-12 col-md-6" v-if="
          parseInt(get_user.lead_type) == 1 &&
          activityIdExceptionOnFieldsShowing1.includes(activity_id.toString())
        ">
        <div class="form-group">
          <label class="labeltext">Anticipated Number of Monthly Payouts</label>
          <input type="text" placeholder="" class="form-control" v-model="monthly_payout" disabled />
        </div>
      </div>
      <div class="col-12 col-md-6" v-if="
          parseInt(get_user.lead_type) == 1 &&
          activityIdExceptionOnFieldsShowing1.includes(activity_id.toString())
        ">
        <div class="form-group">
          <label class="labeltext">Anticipated Annual Transaction Volume</label>
          <input type="text" placeholder="" class="form-control" v-model="transaction_volume" disabled />
        </div>
      </div>
    </div>
    <!--  <div
      class="d-flex align-items-center border-top pt-3 pt-md-4 mt-0 mt-md-4"
      v-if="parseInt(get_user.is_registered) == 5"
    ><p class="textcolor mb-0">
        If you want to edit your information, raise a ticket
        <router-link :to="{ name: 'help_centre', query: { ticketData: 1 }}" class="highlightlink" >here</router-link></p></div> -->
  </div>
</template>

<script>
  import settingsMixins from "@/plugins/settings";
  // const decodeUriComponent = require('decodeuricomponent');
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        accounttab: 1,
        legal_name: "",
        activity_id: "",
        subactivity_id: "",
        src_of_funds: "",
        registration_no: "",
        registered_country: "",
        address1: "",
        address2: "",
        country1: "",
        city: "",
        state: "",
        zip_code: "",
        brand_name: "",
        website_url: "",
        monthly_payin: "",
        monthly_payout: "",
        transaction_volume: "",
        activityIdExceptionOnFieldsShowing1: ["10", "11"],
      };
    },
    methods: {
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
      }
    },
    created() {
      this.website_url = this.decodeHtml(this.getUserData.profile.website_url);
      this.legal_name = this.getUserData.profile.legal_name;
      this.registration_no = this.getUserData.profile.registration_no;
      this.activity_id = this.getUserData.profile.activity_id;
      this.subactivity_id = this.getUserData.profile.subactivity_id;
      this.src_of_funds = this.getUserData.profile.src_of_funds;
      this.registered_country = this.getUserData.profile.registered_country;
      this.address1 = this.getUserData.profile.address1;
      this.address2 = this.getUserData.profile.address2;
      this.country1 = this.getUserData.profile.country;
      this.city = this.getUserData.profile.city;
      this.state = this.getUserData.profile.state;
      this.zip_code = this.getUserData.profile.zip_code;
      this.brand_name = this.getUserData.profile.brand_name;
      this.monthly_payin = this.$env_var.monthly_payin[parseInt(this.getUserData.profile.monthly_payin)];
      this.monthly_payout = this.$env_var.monthly_payout[parseInt(this.getUserData.profile.monthly_payout)];
      this.transaction_volume = this.$env_var.transaction_volume[parseInt(this.getUserData.profile.transaction_volume)];
      this.activityFunc(this.getUserData.profile.activity_id);
    },
  };
</script>