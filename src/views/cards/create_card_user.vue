<template>
  <div  class="mt-4" >
    <loader v-if="pageLoader"></loader>
    <div  class="verificationContent bg-white border round-md">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">First Name <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="fname" placeholder=" " v-model="fname"   />
            <ErrorMessage name="fname" class="text-danger" />
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Last Name <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="lname" placeholder=" " v-model="lname"   />
            <ErrorMessage name="lname" class="text-danger" />
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Email <span class="required">*</span>
            </label>
            <input type="email" class="form-control" id="" name="email" placeholder=" " v-model="email"   />
            <ErrorMessage name="email" class="text-danger" />
          </div>
        </div>

        <div class="col-lg-6">
          <label class="labeltext">Currency <span class="required">*</span></label>
          <input type="hidden" name="currency" v-model="currency"  />
          <v-select class="form-control" v-model="currency" :options="currencyCat" :reduce="currencyCat => currencyCat"  placeholder=""></v-select>
          <ErrorMessage name="currency" class="text-danger" />
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Phone Number <span class="required">*</span>
            </label>
            <input type="text" class="form-control" id="" name="phno" placeholder=" " v-model="phno"   />
            <ErrorMessage name="phno" class="text-danger" />
          </div>
        </div>

        <div class="col-12">
          <div class="text-right border-top mt-2 mt-lg-3 pt-4">
            <input type="button" value="Save &amp; Continue" class="cap_btn large_btn mb-0" @click="createCarduserFunc()"   />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,
        currencyCat: ["BTC", "USDT", "USDC", "EUR", "ETH"],
        fname : '',
        lname : '',
        email : '',
        currency : '',
        phno : '',
      };
    },
    methods: {
      getAllCardUsersFunc(userId,getStep){
        let input_json = {
          'globalParams': {
            "userId": userId
          },
          'localParams': { "parameter": this, "steps": getStep }
        }
        this._runGetCardUserById(input_json)
      },
      createCarduserFunc(){
        let input_json = {
          'globalParams': {
            "user_id": this.get_user.id.toString(),
            "firstName":this.fname,
            "lastName": this.lname,
            "email": this.email,
            "countryCode": "+44",
            "number": this.phno.toString(),
            "currency": this.currency
          },
          'localParams': {
            "parameter": this, "steps" : 1
          }
        }
        this._runCreateCardUser(input_json)
      }
    },
    created(){
      if(this.$route.query.userId){
        this.getAllCardUsersFunc(this.$route.query.userId,1)
      }
    }
  };
</script>