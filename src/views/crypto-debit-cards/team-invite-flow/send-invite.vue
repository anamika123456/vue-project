<template>
    <div>
        <loader v-if="pageLoader"></loader>
        <div class="addCards bg-white round-sm border mh-calc">
            <h4 class="mb-4 pb-3 border-bottom d-flex align-items-center">
                <a class="mr-2 d-flex align-items-center" @click="$parent.innerDivOfTeamCard = 1"><img  src="/assets/website/images/theme-back-arrow.svg"> </a>
                Send Invite
            </h4>
            <form class="">
                <div class="mw-870">
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="labeltext">First Name <span class="red">*</span></label>
                                <input type="text" placeholder="Enter your first name" class="form-control"  v-model="fname">
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="labeltext">Last Name <span class="red">*</span></label>
                                <input type="text" placeholder="Enter your last name" class="form-control"  v-model="lname">
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="labeltext">Email Address <span class="red">*</span></label>
                                <input type="text" placeholder="Enter your email address" class="form-control"  v-model="email">
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
                                
                                <h6 class="mb-1">Outbound:</h6>
                                <ul class="bullet-type">
                                    <li class="mb-2 textcolor">1 Outbound transaction
                                    </li>
                                    <li class="mb-2 textcolor">€10,000 per month</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="limit-card round-sm border lightgrayBG">
                                <h5 class="mb-3">Required Documents</h5>
                                <p class="mb-4"><span class="themecolor medium h6">Proof of Identity (POI):</span> a document valid for travel within the EEA (for EEA citizens – national identity card or passport; for non-EEA citizens – passport).</p>
                                <p class="mb-1"><span class="themecolor medium h6">Proof of Address:</span> In the case of non-EEA citizens residing in the EEA, a second Proof of Identity (POI2): a valid residence permit issued by an EEA Contracting State. In certain limited cases, we can accept an identity card issued by an EEA Contracting State as POI2. In some cases, we may also require a Proof of Address (POA) document in Tier 1 to approve KYC.  Acceptable documents include:</p>
                                <ul class="bullet-type mb-0">
                                <li class="mb-2 textcolor pb-1">Bank Statement</li>
                                <li class="mb-2 textcolor pb-1">Certificate of Residence</li>
                                <li class="mb-2 textcolor pb-1">Credit Card Statement</li>
                                <li class="mb-2 textcolor pb-1">Rental Agreement</li>
                                <li class="mb-0 textcolor pb-0">Utility Bill (e.g., water, electricity, gas)</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#" class="cap_btn large_btn mt-1 fixBtn" @click="sendInvites()">Send Invite</a> 
            </form>
        </div>

        <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" v-if="popup">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-body text-center">
                    <img width="70" class="img-fluid mb-3" src="/assets/website/images/greencheck.svg">
                    <h5 class="text-center medium d-block lh-normal mb-0">Invite sent Successfully</h5>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <RouterLink :to="{path : 'settings', query:{settingTab: 'Account', accountTab:2}}" class="cap_btn large_btn mb-0 m-auto">Check Status</RouterLink>
                </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { RouterLink } from 'vue-router';
import settingsMixins from "@/plugins/settings";
  export default {
    name: "send-invite",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        fname : '',
        lname : '',
        email : '',
        role : 'TC',
        message : '',
        popup : false
      };
    },
    methods:{
        sendInvites(){
            const _that = this
            let input_json = {
                'globalParams': {
                    "first_name": _that.fname ,

                    "last_name": _that.lname ,
                    "email": _that.email ,
                    "role" : _that.role ,
                    "custom_msg": '' ,
                    "type": "user"
                },
                'localParams': {
                  "parameter": _that, 'page' : 'team_card_send_invite'
                }
            }
            _that._runSendInvites(input_json)
        },
    }
  };
</script>