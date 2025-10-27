<template>
    <div class="addCards bg-white round-sm border mh-calc">
        <loader v-if="pageLoader"></loader>
        <h4 class="mb-4 pb-3 border-bottom">Verify Personal details</h4>
        <form class="">
            <!-- <div class="d-flex align-items-start justify-content-between flex-wrap select-card-type mb-4 py-3">
                <div class="d-flex align-items-start flex-wrap inner-items">
                    <div class="radio-wrap border round-sm">
                        <label class="customRadioButton d-flex">
                            <div class="mb-0 destinationRadio">
                            <input type="radio" name="role" v-model="cardType" value="own" disabled />
                            <span class="checkmark"></span>
                            </div>
                            <div class="mb-0">
                            <h6 class="medium mb-0">Own Card</h6>
                            <p class="textcolor mb-0 pt-1">
                                Seamless access to company funds for business-related expenses.
                            </p>
                            </div>
                        </label>
                    </div>
                    <div class="radio-wrap border round-sm">
                        <label class="customRadioButton d-flex">
                            <div class="mb-0 destinationRadio">
                            <input type="radio" name="role" v-model="cardType" value="team" disabled />
                            <span class="checkmark"></span>
                            </div>
                            <div class="mb-0">
                            <h6 class="medium mb-0">Team Card</h6>
                            <p class="textcolor mb-0 pt-1">
                                Seamless access to company funds for business-related expenses.
                            </p>
                            </div>
                        </label>
                    </div>
                </div>
                <RouterLink v-if="cardType == 'team'" class="cap_btn large_btn mt-1" to="/send-invite">Invite User</RouterLink> 
            </div> -->
            <div class="mw-870">
                <div class="row">
                    <div class="col-md-6 col-lg-4">
                      <div class="form-group">
                        <label class="labeltext">Date Of Birth <span class="red">*</span></label>
                        <input type="date" class="form-control datepicker"  name="dob" v-model="dob"  :max="maxDate()" @focus="dateFocus= true" @blur="dateFocus = false"  />
                      </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="labeltext">Address <span class="red">*</span></label>
                            <input type="text" placeholder="Enter your address" class="form-control" v-model="address">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="form-group">
                            <label class="labeltext">City <span class="red">*</span></label> 
                            <input type="text" placeholder="Enter your city" class="form-control" v-model="town_city">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="form-group">
                            <label class="labeltext">Country <span class="red">*</span></label>
                            <v-select class="form-control" v-model="Country" :options="Object.values(country)" :reduce="country => country.iso2" label="name"  placeholder="Enter your country"></v-select>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="form-group">
                            <label class="labeltext">Pincode <span class="red">*</span></label>
                            <input type="text" placeholder="Enter pincode" class="form-control" v-model="zip_code">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-limit-sec">
                <h4 class="mb-3 pb-1">Card Limit</h4>
                <div class="row">
                    <div class="col-md-4">
                        <div class="limit-card round-sm border lightgrayBG">
                            <h5 class="mb-3">Tier 1</h5>
                            <p class="mb-4"><span class="themecolor medium h6">Inbound:</span> Virtual Asset deposits
                                less than €15,000 in total</p>
                            
                            <h6 class="mb-1">All Outbound Transactions:</h6>
                            <ul class="bullet-type">
                                <li class="mb-2 textcolor">€10,000 per Month </li>
                                <li class="mb-2 textcolor">€10,000 per Day</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="limit-card round-sm border lightgrayBG">
                            <h5 class="mb-3">Required Documents</h5>
                            <p class="mb-4"><span class="themecolor medium h6">Proof of Identity (POI):</span> A document valid for travel within the EEA (for EEA citizens – national identity card or passport; for non-EEA citizens – passport).</p>
                            <p class="mb-1"><span class="themecolor medium h6">Proof of Address:</span> In the case of non-EEA citizens residing in the EEA, a second Proof of Identity (POI2): a valid residence permit issued by an EEA Contracting State. In certain limited cases, we can accept an identity card issued by an EEA Contracting State as POI2. In some cases, we may also require a Proof of Address (POA) document in Tier 1 to approve KYC.  Acceptable documents include:</p>
                            <ul class="bullet-type mb-0">
                                <li class="mb-2 textcolor pb-1">Bank Statement.</li>
                                <li class="mb-2 textcolor pb-1">Certificate of Residence.</li>
                                <li class="mb-2 textcolor pb-1">Credit Card Statement.</li>
                                <li class="mb-2 textcolor pb-1">Rental Agreement.</li>
                                <li class="mb-0 textcolor pb-0">Utility Bill (e.g., water, electricity, gas).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <input type="button" value="Save &amp; Continue" class="cap_btn large_btn mt-1 fixBtn" @click="updateUserAddressFunc()" />
        </form>
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

        dateFocus: false,
        dob : '',
        address : '',
        town_city : '',
        Country : '',
        zip_code : '',
        cardType: 'own',
      };
    },
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
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "dateOfBirth": {
              "month": parseInt(dob[1]),
              "day": parseInt(dob[2]),
              "year": parseInt(dob[0])
            },
            "address": {
              "addressLine1": this.address,
              "city": this.town_city,
              "country": this.Country,
              "postalCode": this.zip_code.toString()
            }
          },
          'localParams': {
            "parameter": this, "steps" : 4
          }
        }

        // let input_json = {
        //   'globalParams': {
        //     "userId": this.card_users_by_id.str_user_id,
        //     "dateOfBirth": {
        //         "month": 11,
        //         "day": 11,
        //         "year": 2001
        //     },
        //     "address": {
        //         "addressLine1": "Sepapaja 12",
        //         "city": "Tallinn",
        //         "country": "EE",
        //         "postalCode": "11412"
        //     }
        //   },
        //   'localParams': {
        //     "parameter": this, "steps" : 4
        //   }
        // }
        this._runUpdateUserCardAddress(input_json)
      },
    },
    created(){
      this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 4)
    }
  };
</script>