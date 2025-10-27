<template>
  <div class="mt-4" >
    <loader v-if="pageLoader"></loader>
    <div  class="verificationContent bg-white border round-md">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Date Of Birth <span class="required">*</span>
            </label>
            <input type="date" class="form-control datepicker" id="" name="dob" v-model="dob"  :max="maxDate()" @focus="dateFocus = true" @blur="dateFocus = false"  />
            <ErrorMessage name="dob" class="text-danger" />
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Address <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="address" placeholder="Enter your address" v-model="address"   />
            <ErrorMessage name="address" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Town/ City <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="town_city" placeholder="Enter your Town/ City" v-model="town_city"  />
            <ErrorMessage name="town_city" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Country  <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="Country" placeholder="Enter your Country" v-model="Country"  />
            <ErrorMessage name="Country" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Postcode/ Zip code <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="zip_code" placeholder="Enter your Postcode/ Zip code" v-model="zip_code"  />
            <ErrorMessage name="zip_code" class="text-danger" />
          </div>
        </div>

        <div class="col-12">
          <div class="text-right border-top mt-2 mt-lg-3 pt-4">
            <input type="button" value="Save &amp; Continue" class="cap_btn large_btn mb-0" @click="updateUserAddressFunc()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  import createCardUser from "./create_card_user.vue";
  import verify_mobile_email_otp from "./verify_mobile_email_otp.vue";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,

        dateFocus: false,
        dob : '',
        address : '',
        town_city : '',
        Country : '',
        zip_code : '',
      };
    },
     components: { createCardUser, verify_mobile_email_otp },
    methods: {
      maxDate() {
        return this.momentFunc('', 'YYYY-MM-DD');
      },
      getAllCardUsersFunc(userId,getStep){
        let input_json = {
          'globalParams': {
            "userId": userId
          },
          'localParams': { "parameter": this, "steps": getStep }
        }
        this._runGetCardUserById(input_json)
      },
      updateUserAddressFunc(){
        let dob = this.dob.split('-') ;
        // let input_json = {
        //   'globalParams': {
        //     "userId": this.userId,
        //     "dateOfBirth": {
        //       "month": dob[1],
        //       "day": dob[2],
        //       "year": dob[0]
        //     },
        //     "address": {
        //       "addressLine1": this.address,
        //       "city": this.town_city,
        //       "country": this.Country,
        //       "postalCode": this.zip_code 
        //     }
        //   },
        //   'localParams': {
        //     "parameter": this
        //   }
        // }

        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "dateOfBirth": {
                "month": 11,
                "day": 11,
                "year": 2001
            },
            "address": {
                "addressLine1": "Sepapaja 12",
                "city": "Tallinn",
                "country": "EE",
                "postalCode": "11412"
            }
          },
          'localParams': {
            "parameter": this, "steps" : 4
          }
        }
        this._runUpdateUserCardAddress(input_json)
      },
    },
    created(){
      this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 4)
    }
  };
</script>