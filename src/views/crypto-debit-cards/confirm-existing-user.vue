<template>
    <div>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="add-card-main">
                    <div class="row">
                        <div class="col-md-4 col-lg-3 col-xl-2">
                            <div class="card-steps">
                                <div class="step-item">
                                    <span class="num-wrap">1</span>
                                    <p>Apply Card</p>
                                </div>
                                <div class="step-item">
                                    <span class="num-wrap">2</span>
                                    <p>KYC Verification</p>
                                </div>
                                <div class="step-item">
                                    <span class="num-wrap">3</span>
                                    <p>Card Activation</p>
                                </div>
                                <div class="step-item">
                                    <span class="num-wrap">
                                        <feather type="shopping-cart" class="shoppingCart" size="18">
                                        </feather>
                                    </span>
                                    <p>Card all set!</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-9 col-xl-10">
                            <div class="addCards confirm-user bg-white round-sm border mh-calc">
                                <h4 class="mb-4 pb-3 border-bottom">Confirm Existing User Details</h4>
                                <div class="userItem mb-4 py-3 d-flex align-items-center">
                                    <div class="img-wrap">
                                        <img class="img-fluid" src="/assets/website/images/userimg.png">
                                    </div>
                                    <div class="content-sec">
                                        <h5 class="medium mb-0">Joanne Anna</h5>
                                        <p class="medium mb-0">joanneanna@gmail.com</p>
                                    </div>
                                </div>
                                    <div class="card-limit-sec">
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
                                    <RouterLink class="cap_btn large_btn mt-1 fixBtn" to="/">
                                        <feather type="link-2" size="20" class="mr-2"></feather>
                                        Send KYC Link</RouterLink> 
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

  export default {
    name: "confirm-existing-user",
    
    data() {
      return {
        pageLoader: false,
      };
    },
  };
</script>