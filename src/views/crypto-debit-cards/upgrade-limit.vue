<template>
    <div>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="add-card-main">
                    <div class="row">
                       
                        <div class="col-md-8 col-lg-9 col-xl-10">
                            <div class="addCards upgradeLimit bg-white round-sm border mh-calc">
                                <h4 class="mb-4 pb-3 border-bottom">Card Limit Reached</h4>
                                    <div class="top-sec d-flex mb-5 pt-3">
                                        <h5 class="textcolor mb-0 medium">You have exceeded the card limit, upgrade to Tier 2 to continue using your crypto debit card.</h5>

                                        <div class="progresssec">
                                            <div class="progress">
                                                <div class="progress-bar" :class="(marketpercent() == 100) ? 'greencolor' : (marketpercent() < 50 ? 'redcolor' : 'yellowcolor')" role="progressbar"  :style="{ width: marketpercent()+'%'}"></div>
                                            </div>
                                            <p class="medium text-right mt-3 mb-0">€{{$route.query.availableBalance}} {{$route.query.limitCurrency}} Remaining</p>
                                        </div>
                                    </div>
                                    <div class="card-limit-sec">
                                        <h4 class="mb-4">Upgrade to Tier 2:</h4>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="limit-card round-sm border lightgrayBG">
                                                    <h5 class="mb-3">Details</h5>
                                                    <p class="mb-4"><span class="themecolor medium h6">Inbound:</span> N/A</p>

                                                    <p class="mb-4"><span class="themecolor medium h6">Outbound:</span> No limits for outbound transactions 
                                                    </p>
                                                    
                                                    <p class="mb-1"><b class="bold">2</b> Card payments</p>
                                                    <ul class="bullet-type pl-19">
                                                        <li class="mb-2 textcolor">€15,000 per month</li>
                                                        <li class="mb-2 textcolor">€10,000 per day</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="limit-card round-sm border lightgrayBG">
                                                    <h5 class="mb-3">Required Documents</h5>
                                                    <p class="mb-4"><span class="themecolor medium h6">Proof of Address (POA ):</span> document (if not provided in Tier 1): either a utility bill (such as for electricity, gas, water, or landline) or an account statement (such as from a payment institution or a bank). Mobile bills are not accepted. The document must be in the End User’s name and match the address provided by the End User. The document must not be older than three (3) months. </p>
                                                    <p class="mb-0"><span class="themecolor medium h6">Source of funds:</span> information and document(s).</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <RouterLink class="cap_btn large_btn mt-1 fixBtn"   :to="{path : 'kyc-verification', query:{cardId: $route.query.cardId}}">
                                        <feather type="link-2" size="20" class="mr-2"></feather>
                                        Start KYC</RouterLink> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-body text-center">
                <img width="70" class="img-fluid mb-3" src="/assets/website/images/greencheck.svg">
                <h5 class="text-center medium d-block lh-normal mb-0">KYC Link sent Successfully</h5>
            </div>
            <div class="modal-footer border-0 pt-0">
                <RouterLink to="/card-activation" class="cap_btn large_btn mb-0 m-auto">Check Status</RouterLink>
            </div>
            </div>
        </div>
        </div> -->
    </div>

</template>
<script>
    import { RouterLink } from 'vue-router';
    import { cardsMixins } from "@/plugins/cards";
    import moment from "moment";
    export default {
        name: "card-dashboard",
        mixins: [cardsMixins],
        data() {
          return {
            pageLoader: false
          };
        },
        methods: {
            marketpercent() {
                let availableBalance =  this.$route.query.availableBalance; 
                let lowValue = 0
                let highValue = this.$route.query.totalBalance
                let calculate = ((availableBalance - lowValue) / (highValue - lowValue)) * 100
                // console.log(availableBalance,'=====', highValue , '====',calculate )
                return calculate;
            }
        }
    }
</script>