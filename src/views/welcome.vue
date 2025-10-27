<template>
    <div class="welcomeWrap scrollVertical scrollbar">
        <div class="inner-box">
            <div class="row align-items-center">
                <div class="col-lg-5">
                    <div class="content-sec pl-lg-2 pb-5 pb-xl-5">
                        <h2 class="mb-3 bold">Your Crypto Debit Card is Ready!</h2>
                        <p class="mb-2"><span class="bold">Great news! Your Crypto Debit Virtual Card</span> option is now activated. To start using it, follow these quick steps:</p>

                        <ul class="bullet-type themecolor mb-2">
                            <li class="mb-2">Log In to your account. </li>
                            <li>Complete KYC Verification to unlock your card.</li>
                        </ul>

                        <a href="#" class="cap_btn large_btn mt-4 helpTopicsBtn mb-0 px-4"> Log In & Complete KYC Now</a>

                        <p class="my-4 textcolor">Need help? Contact us at <a class="secondarycolor" href="mailto:support@capitalwallet.com">support@capitalwallet.com</a></p>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="img-wrap">
                        <img class="img-fluid d-block" src="/assets/website/images/no-cards-img.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  <script>
   
    export default {
      name: "welcome",
      data() {
        return {
          pageLoader: false,
        };
      },
     
    };
  </script>