<template>
  <div>
    <div class="modal triple-modal" tabindex="-1" id="pos-payment-currency-qr" role="dialog" aria-labelledby="pos-payment-currency-qr" aria-hidden="true" v-if="posPaymentCurrencyQR == true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-end">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="posPaymentCurrencyQR = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <h4 class="mb-4 semibold">Reference no <span class="secondarycolor">#365293746</span>
            </h4>
            <div class="border border-radius-10 p-4">
              <div class="d-block d-sm-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
                <h6 class="semibold mb-0">Select Payment Currency</h6>
                <div class="d-flex align-items-center">
                  <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                  <p class="medium themecolor mb-0 pl-2 pl-sm-3">Bitcoin</p>
                </div>
              </div>
              <div class="mb-3 text-center">
                <p class="mb-3">Valid for 20 minutes only</p>
                <img src="/assets/website/images/paymentcurrentScan.svg" alt="Coin" class="d-block cryptoCoin mb-3 mx-auto" width="183" height="184" />
                <p class="mb-3">Send the indicated amount to the address below</p>
              </div>
              <h6 class="semibold mb-2">Bitcoin Address</h6>
              <div class="d-flex justify-content-between align-items-center border border-radius-10 px-3">
                <div class="d-flex align-items-center">
                  <p class="mb-0">3P&AqAuBiTjmN1WPUSUSsttgCphBj9eKp</p>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center border-left border-right p-2">
                    <img src="/assets/website/images/paymentcurrentScan.svg" alt="Copy" class="d-block cryptoCoin" width="30" height="30" />
                  </div>
                  <a href="javascript:void(0);" class="ml-3">
                    <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block cryptoCoin" width="22" height="25" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal double-modal" tabindex="-1" id="pos-payment-currency" role="dialog" aria-labelledby="pos-payment-currency" aria-hidden="true" v-if="posPaymentCurrency == true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-end">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="posPaymentCurrency = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body py-0 scrollbar">
            <div class="mb-3">
              <h4 class="mb-4 semibold">Reference no <span class="secondarycolor">#365293746</span>
              </h4>
              <div class="border border-radius-10 p-4 mb-1">
                <h4 class="mb-4 pb-3 border-bottom">Now Payments</h4>
                <h6 class="mb-3 semibold">Select Payment Currency</h6>
                <div class="d-block d-sm-flex align-items-center border border-radius-10 px-3 py-2 mb-3">
                  <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                  <p class="medium themecolor mb-0 pl-2 pl-sm-3">Bitcoin</p>
                </div>
                <div class="d-block d-sm-flex align-items-center border border-radius-10 px-3 py-2 mb-3">
                  <img src="/assets/website/images/crypto_logos/eth.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                  <p class="medium themecolor mb-0 pl-2 pl-sm-3">Ethereum</p>
                </div>
                <div class="d-block d-sm-flex align-items-center border border-radius-10 px-3 py-2 mb-3">
                  <img src="/assets/website/images/crypto_logos/ltc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                  <p class="medium themecolor mb-0 pl-2 pl-sm-3">Litecoin</p>
                </div>
                <div class="selectmenu currenciesDrop position-relative">
                  <a @click.prevent="moreCurrencies = !moreCurrencies" href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between bg-white">
                    <p class="mb-0 themecolor medium">More Currencies</p>
                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                  </a>
                  <ul class="dropdown_menu" :class="{ show: moreCurrencies }">
                    <li>
                      <a href="javascript:void(0)" class="medium">BTC</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="medium">ETH</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="medium">USDT</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="medium">USD</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex justify-content-center w-100">
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-dismiss="modal" aria-label="Close" @click="posPaymentCurrencyQR = true">Pay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="pos-payment" role="dialog" aria-hidden="true" v-if="posPayment == true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between border-bottom mb-4 pb-3">
            <h4 class="mb-0">Now Payments</h4>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="posPayment = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <div class="form-group">
              <label class="labeltext">Select Currency</label>
              <div class="selectDropMenu currenciesDrop position-relative">
                <a href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between selectDropMenuLink" data-toggle="dropdown">
                  <div class="d-flex align-items-center">
                    <img src="/assets/website/images/country_currency_logos/usd.svg" alt="USD" class="d-block cryptoCoin" width="31" height="30" />
                    <p class="medium themecolor mb-0 pl-2 pl-sm-3">USD</p>
                  </div>
                  <feather type="chevron-down" class="ml-2" size="20px"></feather>
                </a>
                <ul class="dropdown-menu scrollbar">
                  <li>
                    <a href="javascript:void(0)">
                      <div class="d-flex align-items-center">
                        <img src="/assets/website/images/country_currency_logos/gbp.svg" alt="GBP" class="d-block cryptoCoin" width="31" height="31" />
                        <p class="medium themecolor mb-0 pl-2 pl-sm-3">GBP</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <div class="d-flex align-items-center">
                        <img src="/assets/website/images/country_currency_logos/cad.svg" alt="CAD" class="d-block cryptoCoin" width="31" height="31" />
                        <p class="medium themecolor mb-0 pl-2 pl-sm-3">CAD</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <div class="d-flex align-items-center">
                        <img src="/assets/website/images/country_currency_logos/nzd.svg" alt="NZD" class="d-block cryptoCoin" width="31" height="31" />
                        <p class="medium themecolor mb-0 pl-2 pl-sm-3">NZD</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="form-group">
              <label class="labeltext">Enter Amount</label>
              <input type="text" placeholder="Enter Amount here..." class="form-control" />
            </div>
            <div class="posPad">
              <button class="posPadNumber" type="button">1</button>
              <button class="posPadNumber">2</button>
              <button class="posPadNumber">3</button>
              <button class="posPadNumber">4</button>
              <button class="posPadNumber">5</button>
              <button class="posPadNumber">6</button>
              <button class="posPadNumber">7</button>
              <button class="posPadNumber">8</button>
              <button class="posPadNumber">9</button>
              <button class="posPadCross">
                <feather type="x-circle" size="22px"></feather>
              </button>
              <button class="posPadBack">
                <img src="/assets/website/images/backIcon.svg" alt="Back" class="d-block cryptoCoin" width="24" height="19" />
              </button>
              <button class="posPadForward" @click="posPaymentCurrency = true">
                <feather type="arrow-right" size="22px"></feather>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="mid_scroll_content">
      <alert-notification v-if="notification_msg != ''" />
      <div class="pageContent border-0">
        <div class="bg-white border round-sm p-3 p-md-4 mb-3 mb-md-0">
          <div class="border-bottom pb-2 mb-3 pb-xl-4 mb-xl-4">
            <div class="row justify-content-between">
              <div class="col-12 col-md-6 col-xxl-6">
                <h4 class="mb-4 pb-3 border-bottom">Create your Point Of Sale Terminal</h4>
                <div class="form-group">
                  <label class="labeltext">Api Key</label>
                  <input type="text" placeholder="262587F-VN1M4ME-P179QRN-QJ9TVBG" class="form-control" />
                </div>
                <div class="form-group">
                  <label class="labeltext">Select Payment Currency</label>
                  <div class="destinationWallet d-flex border round-sm bg-white">
                    <div class="selectmenu position-relative bg-white destinationdrop round-sm w-100">
                      <a @click="paymentCurrency = !paymentCurrency" href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between border-0 px-1 px-sm-3 py-2">
                        <div class="d-flex align-items-center w-100">
                          <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                          <div class="pl-2 pl-sm-3">
                            <p class="medium themecolor mb-0 text-left">Bitcoin</p>
                          </div>
                        </div>
                        <feather type="chevron-down" class="ml-2" size="20px"></feather>
                      </a>
                      <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: paymentCurrency }">
                        <li>
                          <a href="javascript:void(0)" class="px-2 px-xl-3">
                            <label class="customCheckbox mb-0 themecolor">
                              <div class="d-flex align-items-center">
                                <img src="/assets/website/images/crypto_logos/usdc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                                <p class="medium themecolor mb-0 text-left pl-2 pl-sm-3">USDC</p>
                              </div>
                              <input type="checkbox" value="withdrawal" checked />
                              <span class="checkmark mt-1"></span>
                            </label>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" class="px-2 px-xl-3">
                            <label class="customCheckbox mb-0 themecolor">
                              <div class="d-flex align-items-center">
                                <img src="/assets/website/images/crypto_logos/usdt.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                                <p class="medium themecolor mb-0 text-left pl-2 pl-sm-3">USDT</p>
                              </div>
                              <input type="checkbox" value="withdrawal" checked />
                              <span class="checkmark mt-1"></span>
                            </label>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" class="px-2 px-xl-3">
                            <label class="customCheckbox mb-0 themecolor">
                              <div class="d-flex align-items-center">
                                <img src="/assets/website/images/crypto_logos/ltc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                                <p class="medium themecolor mb-0 text-left pl-2 pl-sm-3">Litecoin</p>
                              </div>
                              <input type="checkbox" value="withdrawal" />
                              <span class="checkmark mt-1"></span>
                            </label>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" class="px-2 px-xl-3">
                            <label class="customCheckbox mb-0 themecolor">
                              <div class="d-flex align-items-center">
                                <img src="/assets/website/images/crypto_logos/ltc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                                <p class="medium themecolor mb-0 text-left pl-2 pl-sm-3">Litecoin</p>
                              </div>
                              <input type="checkbox" value="withdrawal" />
                              <span class="checkmark mt-1"></span>
                            </label>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="labeltext">Capitalwallet.com/pos-link/</label>
                  <div class="bg-white border round-sm px-3 py-2 d-flex align-items-center w-100 justify-content-between inputHeight">
                    <span class="textcolor textOverflow">262587F-VN1M4ME-P179QRN-QJ9TVBG</span>
                    <a href="javascript:void(0);" class="ml-2 my-1">
                      <img src="/assets/website/images/copyIcon.svg" alt="Copy" class="d-block copyIcon" width="22" height="25" />
                    </a>
                  </div>
                </div>
                <a href="javascript:void(0);" class="cap_btn large_btn mb-0">Copy link POS Terminal</a>
              </div>
              <div class="col-12 col-md-6 col-xxl-5 mt-4 mt-md-0">
                <h4 class="mb-4 pb-3 border-bottom">POS solutions for on-the-go Business</h4>
                <p class="themecolor semibold">How to Receive Cryptocurrency Payments Offline:</p>
                <ul class="listStyle">
                  <li>
                    <p>Launch the provided link on your smartphone.</p>
                  </li>
                  <li>
                    <p>Input the desired payment value.</p>
                  </li>
                  <li>
                    <p>The customer employs their crypto wallet to scan the QR code.</p>
                  </li>
                  <li>
                    <p>The customer initiates the fund transfer.</p>
                  </li>
                  <li>
                    <p>Upon successful receipt, a confirmation symbol will appear.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-dismiss="modal" aria-label="Close" @click="posPayment = true">Quick POS</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pageLoader: false,
        currencies: false,
        notification_msg: "",
        notification_type: "",
        type: "2",
        page: "1",
        searchOrderNumber: "",
        pageLimit: "10",
        search: "",
        tab: 1,
        paymentCurrency: false,
        posPayment: false,
        selectCurrency: false,
        posPaymentCurrency: false,
        moreCurrencies: false,
        posPaymentCurrencyQR: false,
      };
    },
    created() {},
  };
</script>