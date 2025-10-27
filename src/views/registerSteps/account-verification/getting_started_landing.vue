<template>
  <div class="mid_scroll_content">
    <div class="pageContent border-0">
      <div class="secondaryBG p-4 round-md complete-verification">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 text-white semibold">Complete Verification</h6>
          <a href="javascript:void(0);" class="d-block ml-2">
            <feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="text-white d-block" title="Verifying your account is an essential step in complying with regulatory requirements and protecting the security of your corporate information and financial transactions. This process involves providing your legal entity’s as well as UBOs, Directors and Representative's documentation."></feather>
          </a>
        </div>
        <p class="text-white mt-3 mb-0"> Only a few steps away to start accepting crypto payments. Verify your account to start using your wallet. </p>
        <router-link class="cap_btn border-btn-secondary mt-3 mb-0" to="/verification-steps">Verify Your Account</router-link>
      </div>
      <div class="mt-4 mt-lg-5">
        <h5 class="mb-4">Resources:</h5>
        <div class="d-block d-md-flex">
          <div class="resourcesBox border round-md p-4 text-center bg-white">
            <div class="greyBgIcon d-flex align-items-center justify-content-center lightgrayBG rounded-circle m-auto">
              <img src="/assets/website/images/pricingLimits.svg" />
            </div>
            <h6 class="mt-3">Pricing and Limits</h6>
            <p class="mt-2 mb-3"> Transparent and competitive <br class="d-none d-lg-block" /> pricing plan </p>
            <a href="https://www.capitalwallet.com/dmcc/pricing" class="cap_btn border-btn medium mb-0" target="_blank">Find Out More</a>
          </div>
          <div class="resourcesBox border round-md p-4 text-center bg-white">
            <div class="greyBgIcon d-flex align-items-center justify-content-center lightgrayBG rounded-circle m-auto">
              <img src="/assets/website/images/apiDocumentation.svg" />
            </div>
            <h6 class="mt-3">API Documentation</h6>
            <p class="mt-2 mb-3"> API Integration <br class="d-none d-lg-block" /> is simple and quick </p>
            <a href="https://apidocs.capitalwallet.com/" class="cap_btn border-btn medium mb-0" target="_blank">Read More</a>
          </div>
          <div class="resourcesBox border round-md p-4 text-center bg-white">
            <div class="greyBgIcon d-flex align-items-center justify-content-center lightgrayBG rounded-circle m-auto">
              <img src="/assets/website/images/dedicatedAssistance.svg" />
            </div>
            <h6 class="mt-3">Dedicated Assistance</h6>
            <p class="mt-2 mb-3"> Talk to our team about <br class="d-none d-lg-block" /> your needs </p>
            <router-link to="/help-centre" class="cap_btn border-btn medium mb-0">Contact Us</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>