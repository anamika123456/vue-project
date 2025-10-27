<template>
  <div>
    <div class="modal double-modal" tabindex="-1" id="invoiceRemoveMessage" role="dialog" aria-hidden="true" v-if="invoiceRemoveMessage == true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body pb-0">
            <h3 class="text-center medium d-block lh-normal mb-0">You have successfully cancel this limit order</h3>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex justify-content-center w-100">
              <a href="/invoice" class="cap_btn large_btn mb-0" data-dismiss="modal" @click="cancelInvoice = false">Back to Invoices</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" v-if="cancelInvoice == true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h3 class="text-center medium d-block lh-normal mb-0">Are you sure to delete this invoice?</h3>
          </div>
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100 pb-2">
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-toggle="modal" data-target="#invoiceRemoveMessage" @click="invoiceRemoveMessage = true">Yes</a>
              <a href="javascript:void(0);" class="cap_btn large_btn border-btn mb-0 ml-3" @click="cancelInvoice = false">No</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal triple-modal" tabindex="-1" id="payment-currency-order" role="dialog" aria-labelledby="payment-currency-order" aria-hidden="true" v-if="paymentCurrencyOrder == true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-end">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="paymentCurrencyOrder = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <a href="/invoice" class="d-flex align-items-center mb-2">
              <img src="/assets/website/images/leftGreyIcon.svg" width="25" height="10" class="d-block" />
              <p class="medium textcolor ml-2 mb-0">Back</p>
            </a>
            <h5 class="mb-4 semibold"> Invoice <span class="secondarycolor">#365293746</span>
            </h5>
            <div class="border border-radius-10 p-4 mb-4">
              <div class="d-block d-sm-flex justify-content-between align-items-center border border-radius-10 px-3 py-2 mb-3">
                <p class="mb-0 medium themecolor">Order Items</p>
                <p class="mb-0">25.00 USD</p>
              </div>
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
                <p class="mb-3"> Send the indicated amount to the address below </p>
              </div>
              <div class="d-flex justify-content-between align-items-center border border-radius-10 px-3 mb-3">
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center border-right py-2">
                    <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                    <p class="medium themecolor mb-0 px-2">Bitcoin</p>
                  </div>
                  <p class="mb-0 px-2">0.00094692</p>
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
    <div class="modal double-modal" tabindex="-1" id="payment-currency" role="dialog" aria-labelledby="payment-currency" aria-hidden="true" v-if="paymentCurrency == true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-end">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="paymentCurrency = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body py-0 scrollbar">
            <div class="mb-3">
              <h5 class="mb-4 semibold"> Invoice <span class="secondarycolor">#365293746</span>
              </h5>
              <div class="border border-radius-10 p-4 mb-1">
                <div class="d-block d-sm-flex justify-content-between align-items-center border border-radius-10 px-3 py-2 mb-3">
                  <p class="mb-0 medium themecolor">Order Items</p>
                  <p class="mb-0">25.00 USD</p>
                </div>
                <h6 class="mb-3 semibold">Select Payment Currency</h6>
                <div class="d-block d-sm-flex justify-content-between align-items-center border border-radius-10 px-3 py-2 mb-3">
                  <div class="d-flex align-items-center">
                    <img src="/assets/website/images/crypto_logos/btc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                    <p class="medium themecolor mb-0 pl-2 pl-sm-3">Bitcoin</p>
                  </div>
                  <p class="mb-0">0.00094692 BTC</p>
                </div>
                <div class="d-block d-sm-flex justify-content-between align-items-center border border-radius-10 px-3 py-2 mb-3">
                  <div class="d-flex align-items-center">
                    <img src="/assets/website/images/crypto_logos/eth.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                    <p class="medium themecolor mb-0 pl-2 pl-sm-3">Ethereum</p>
                  </div>
                  <p class="mb-0">0.00094692 BTC</p>
                </div>
                <div class="d-block d-sm-flex justify-content-between align-items-center border border-radius-10 px-3 py-2 mb-3">
                  <div class="d-flex align-items-center">
                    <img src="/assets/website/images/crypto_logos/ltc.png" alt="Coin" class="d-block cryptoCoin" width="31" height="30" />
                    <p class="medium themecolor mb-0 pl-2 pl-sm-3">Litecoin</p>
                  </div>
                  <p class="mb-0">0.13088399 LTC</p>
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
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-dismiss="modal" aria-label="Close" @click="paymentCurrencyOrder = true">Pay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal invoiceModal" tabindex="-1" id="remind-invoice" role="dialog" aria-labelledby="remind-invoice" aria-hidden="true" v-if="remindInvoice == true">
      <div class="modal-dialog modal-dialog-centered max-1000" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex justify-content-between align-items-center">
            <div class="modal-title">
              <h3 class="semibold mb-0">Invoice Payment Reminder</h3>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="remindInvoice = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body py-0 scrollbar">
            <div class="mb-3">
              <h6 class="d-block mb-2 semibold">Invoice Details</h6>
              <div class="border round-sm px-4 py-3 mb-1">
                <div class="d-flex">
                  <img src="/assets/website/images/invoiceLogo.svg" alt="Invoice Icon" class="d-block" width="45" height="40" />
                  <div class="ml-2">
                    <p class="mb-2 themecolor semibold f-14 lh-normal">Invoice <span class="secondarycolor">#CW 0001/6/2023</span></p>
                    <p class="mb-0 f-14  lh-normal">Order ID: #365293746</p>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-12 col-sm-6 col-xl-3">
                    <p class="mb-3 f-14 lh-normal">Bill From:</p>
                    <p class="mb-2 themecolor medium f-14 lh-normal">Jessica Corporate</p>
                    <p class="mb-0 f-14 lh-normal">jessicacasey@company.com</p>
                  </div>
                  <div class="col-12 col-sm-6 col-xl-3 mt-3 mt-xl-0">
                    <p class="mb-3 f-14 lh-normal">Bill To:</p>
                    <p class="mb-2 themecolor medium f-14 lh-normal">Farah Fadillah</p>
                    <p class="mb-0 f-14 lh-normal">farahfadillah@gmail.com</p>
                  </div>
                  <div class="col-12 col-sm-6 col-xl-2 mt-3 mt-xl-0">
                    <p class="mb-3 f-14 lh-normal">Issued On:</p>
                    <p class="mb-2 themecolor medium f-14 lh-normal">24 May, 2023</p>
                  </div>
                  <div class="col-12 col-sm-6 col-xl-4 mt-3 mt-xl-0">
                    <p class="mb-3 f-14  lh-normal">Due On:</p>
                    <p class="mb-2 themecolor medium f-14 lh-normal"> 01 June, 2023, 23:59 pm (UTC) </p>
                  </div>
                </div>
                <div class="border-top pt-4 mt-4">
                  <p class="mb-0 themecolor medium pb-3 f-14">Invoice Detail</p>
                  <div class="table-responsive scrollbar">
                    <table class="table table-sm tableInvoice">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Summer Fan</td>
                          <td>$50.00</td>
                          <td>2</td>
                          <td>$100.00</td>
                        </tr>
                        <tr>
                          <td>Total Amount</td>
                          <td></td>
                          <td></td>
                          <td>$100.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="border-bottom">
                    <p class="mb-0 mb-2 lh-normal">Memo:</p>
                    <p class="mb-0 themecolor medium mb-3 f-14 lh-normal"> This is a recurring invoice, you will get this invoice again in the coming months. </p>
                  </div>
                  <a href="javascript:void(0);" class="cap_btn yellow-btn mb-0 mt-4" @click="paymentCurrency = true">
                    <img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Invoice Icon" class="d-block mr-2" width="34" height="34" /> Pay with Crypto </a>
                  <div class="d-flex justify-content-start justify-content-sm-end align-items-center mt-2 mt-sm-0">
                    <p class="mb-0 themecolor f-14 lh-normal">Powered by</p>
                    <img src="/assets/website/images/logo.svg" alt="Logo" class="d-block ml-2" width="116" height="24" />
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <h6 class="d-block mb-2 semibold">Send to</h6>
              <div class="border round-sm p-2">
                <ul class="d-flex align-content-start flex-wrap mb-0">
                  <li class="d-flex align-items-center darkgrayBG my-2 mr-2 round-lg py-1 w-auto pl-3 pr-2">
                    <p class="mb-0 text-white">farrahfadillah@gmail.com</p>
                    <a href="javascript:void(0);" class="d-block mt-1">
                      <feather type="x" class="ml-2 text-white" size="16px"></feather>
                    </a>
                  </li>
                  <li class="d-flex align-items-center darkgrayBG my-2 mr-2 round-lg py-1 w-auto pl-3 pr-2">
                    <p class="mb-0 text-white">fahtimafadillah@gmail.com</p>
                    <a href="javascript:void(0);" class="d-block mt-1">
                      <feather type="x" class="ml-2 text-white" size="16px"></feather>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mb-3">
              <h6 class="d-block mb-2 semibold">CC</h6>
              <div class="border round-sm p-2">
                <ul class="d-flex align-content-start flex-wrap mb-0">
                  <li class="d-flex align-items-center darkgrayBG my-2 mr-2 round-lg py-1 w-auto pl-3 pr-2">
                    <p class="mb-0 text-white">amazarraenie@gmail.com</p>
                    <a href="javascript:void(0);" class="d-block mt-1">
                      <feather type="x" class="ml-2 text-white" size="16px"></feather>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mb-3">
              <h6 class="d-block mb-2 semibold">Email Body:</h6>
              <textarea placeholder="Write your memo to your customer here.." class="form-control invoiceTextarea"></textarea>
            </div>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex justify-content-center w-100">
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-dismiss="modal" aria-label="Close" @click="remindInvoiceMessage = true">Send Reminder Email</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal double-modal" tabindex="-1" id="remindInvoiceMessage" role="dialog" aria-hidden="true" v-if="remindInvoiceMessage == true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 d-flex">
            <h3 class="text-center d-block lh-normal mb-0">You have successfully sent Invoice Payment Reminder to recipient <b>“abc@gmail.com”.</b>
            </h3>
            <a href="javascript:void(0);" data-dismiss="modal" aria-label="Close" @click="remindInvoiceMessage = false">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          
        </div>
      </div>
    </div>
    <section class="mid_scroll_content">
      <!-- <alert-notification v-if="notification_msg != ''" /> -->
      <div class="pageContent border-0">
        <div class="d-md-flex d-block justify-content-between align-items-center mb-4 mt-1">
          <div id="tabs" class="text-center mb-0 walletTab currencyTab">
            <ul class="d-flex align-items-center m-0">
              <li>
                <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 1 }]" @click.prevent="transactiontab = 1">All Invoices</a>
              </li>
              <li>
                <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 2 }]" @click.prevent="transactiontab = 2">Draft</a>
              </li>
              <li>
                <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 3 }]" @click.prevent="transactiontab = 3">Pending</a>
              </li>
              <li>
                <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 4 }]" @click.prevent="transactiontab = 4">Overdue</a>
              </li>
              <li>
                <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 5 }]" @click.prevent="transactiontab = 5">Paid</a>
              </li>
              <li>
                <a class="d-block" href="javascript:void(0)" :class="[{ active: transactiontab == 6 }]" @click.prevent="transactiontab = 6">Recurring</a>
              </li>
            </ul>
          </div>
          <a href="/create-invoice" class="cap_btn secondaryBG mt-3 mt-md-0">
            <feather type="plus" size="15px" class="mr-1 mr-md-2"></feather> New Invoice
          </a>
        </div>
        <div class="mt-4 bg-white border round-sm">
          <div class="d-md-flex d-block justify-content-between p-4">
            <div class="d-flex align-items-center">
              <div class="form-group position-relative includeIco searchTable mb-0">
                <input type="text" placeholder="Search Invoices" name="legal_name" class="form-control" />
                <span class="searchIco">
                  <feather type="search" />
                </span>
              </div>
              <div class="d-flex align-items-center ml-3 position-relative">
                <a @click.prevent="filters ^= true" href="javascript:void(0)">
                  <img src="/assets/website/images/filter-icon.svg" alt="Filter Icon" class="d-block" width="22" height="22" />
                </a>
                <div class="dropdown_menu filter_dropdown_menu filter_dropdown_menu_right dropdown_menu--animated dropdown_menu-6" :class="{ show: filters }">
                  <div class="d-flex justify-content-between align-items-center px-3 pb-1 pb-md-2">
                    <p class="medium themecolor mb-0">Filters</p>
                    <a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11">Apply</a>
                  </div>
                  <ul class="mb-0">
                    <li class="py-2">
                      <label class="customCheckbox mb-0 themecolor">Invoice No. <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li class="py-2">
                      <label class="customCheckbox mb-0 themecolor">Customer <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li class="py-2">
                      <label class="customCheckbox mb-0 themecolor">Amount <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li class="py-2 lightgrayBG">
                      <label class="customCheckbox mb-0 themecolor">Status <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                      <div class="selectmenu filterselectmenu position-relative pt-1">
                        <a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center bg-white rounded">
                          <span class="mr-2">Draft</span>
                          <feather type="chevron-down" class="ml-2" size="20px"></feather>
                        </a>
                        <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: thisdate }">
                          <li>
                            <a href="javascript:void(0)">Draft</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Overdue</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Paid</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="d-block d-sm-flex align-items-center pt-4 pt-md-0">
              <div class="border px-2 tableDate round-sm">
                <input type="date" class="border-0 textcolor" />
              </div>
              <div class="px-3 text-center py-2 py-sm-0">
                <p class="mb-0 themecolor medium">To</p>
              </div>
              <div class="border px-2 tableDate round-sm">
                <input type="date" class="border-0 textcolor" />
              </div>
            </div>
          </div>
          <div class="table-responsive overflow-inherit" v-if="transactiontab == 1">
            <table class="table table-bordered tablecustomWidth">
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Invoice No.</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023/05/23 15:30:00</td>
                  <td>#CW 0003/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Farrah Adillah</h5>
                    <p class="mb-0 regular">farrahadillah@gmail.com</p>
                  </td>
                  <td>$100.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightyellowbg px-3 py-2 round-lg text-center">
                      <span>Draft</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                        <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="edit" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Edit Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="trash-2" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" @click="cancelInvoice = true">Cancel Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="bell" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" data-toggle="modal" data-target="#remind-recipient" @click="remindInvoice = true">Remind Recipient</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="download" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Download Invoice</p>
                            </a>
                          </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/20 22:08:00</td>
                  <td>#CW 0002/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Fenny Spade</h5>
                    <p class="mb-0 regular">fennyspade@gmail.com</p>
                  </td>
                  <td>$150.05</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightredbg px-3 py-2 round-lg text-center">
                      <span class="red">Overdue</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="trash-2" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" @click="cancelInvoice = true">Cancel Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="bell" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" data-toggle="modal" data-target="#remind-recipient" @click="remindInvoice = true">Remind Recipient</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="download" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Download Invoice</p>
                            </a>
                          </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/19 21:45:00</td>
                  <td>#CW 0001/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Katie Chung</h5>
                    <p class="mb-0 regular">katiechung@gmail.com</p>
                  </td>
                  <td>$202.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightgreenbg px-3 py-2 round-lg text-center">
                      <span class="lightgreentext">Paid</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="download" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Download Invoice</p>
                            </a>
                          </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-responsive overflow-inherit" v-if="transactiontab == 2">
            <table class="table table-bordered tablecustomWidth">
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Invoice No.</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023/05/23 15:30:00</td>
                  <td>#CW 0003/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Farrah Adillah</h5>
                    <p class="mb-0 regular">farrahadillah@gmail.com</p>
                  </td>
                  <td>$100.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightyellowbg px-3 py-2 round-lg text-center">
                      <span>Draft</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                        <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="edit" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Edit Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="trash-2" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" @click="cancelInvoice = true">Cancel Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="bell" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" data-toggle="modal" data-target="#remind-recipient" @click="remindInvoice = true">Remind Recipient</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="download" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Download Invoice</p>
                            </a>
                          </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/20 22:08:00</td>
                  <td>#CW 0002/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Fenny Spade</h5>
                    <p class="mb-0 regular">fennyspade@gmail.com</p>
                  </td>
                  <td>$150.05</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightyellowbg px-3 py-2 round-lg text-center">
                      <span>Draft</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/19 21:45:00</td>
                  <td>#CW 0001/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Katie Chung</h5>
                    <p class="mb-0 regular">katiechung@gmail.com</p>
                  </td>
                  <td>$202.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightyellowbg px-3 py-2 round-lg text-center">
                      <span>Draft</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-responsive overflow-inherit" v-if="transactiontab == 3">
            <table class="table table-bordered tablecustomWidth">
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Invoice No.</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023/05/23 15:30:00</td>
                  <td>#CW 0003/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Farrah Adillah</h5>
                    <p class="mb-0 regular">farrahadillah@gmail.com</p>
                  </td>
                  <td>$100.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightskybluebg px-3 py-2 round-lg text-center">
                      <span class="blue">Open</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                        <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="edit" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Edit Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="trash-2" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" @click="cancelInvoice = true">Cancel Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="bell" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" data-toggle="modal" data-target="#remind-recipient" @click="remindInvoice = true">Remind Recipient</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="download" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Download Invoice</p>
                            </a>
                          </li>

                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/20 22:08:00</td>
                  <td>#CW 0002/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Fenny Spade</h5>
                    <p class="mb-0 regular">fennyspade@gmail.com</p>
                  </td>
                  <td>$150.05</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightskybluebg px-3 py-2 round-lg text-center">
                      <span class="blue">Open</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/19 21:45:00</td>
                  <td>#CW 0001/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Katie Chung</h5>
                    <p class="mb-0 regular">katiechung@gmail.com</p>
                  </td>
                  <td>$202.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightskybluebg px-3 py-2 round-lg text-center">
                      <span class="blue">Open</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-responsive overflow-inherit" v-if="transactiontab == 4">
            <table class="table table-bordered tablecustomWidth">
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Invoice No.</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023/05/23 15:30:00</td>
                  <td>#CW 0003/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Farrah Adillah</h5>
                    <p class="mb-0 regular">farrahadillah@gmail.com</p>
                  </td>
                  <td>$100.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightredbg px-3 py-2 round-lg text-center">
                      <span class="red">Overdue</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                        
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="trash-2" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" @click="cancelInvoice = true">Cancel Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="bell" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" data-toggle="modal" data-target="#remind-recipient" @click="remindInvoice = true">Remind Recipient</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="download" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Download Invoice</p>
                            </a>
                          </li>

                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/20 22:08:00</td>
                  <td>#CW 0002/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Fenny Spade</h5>
                    <p class="mb-0 regular">fennyspade@gmail.com</p>
                  </td>
                  <td>$150.05</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightredbg px-3 py-2 round-lg text-center">
                      <span class="red">Overdue</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/19 21:45:00</td>
                  <td>#CW 0001/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Katie Chung</h5>
                    <p class="mb-0 regular">katiechung@gmail.com</p>
                  </td>
                  <td>$202.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightredbg px-3 py-2 round-lg text-center">
                      <span class="red">Overdue</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-responsive overflow-inherit" v-if="transactiontab == 5">
            <table class="table table-bordered tablecustomWidth">
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Invoice No.</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023/05/23 15:30:00</td>
                  <td>#CW 0003/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Farrah Adillah</h5>
                    <p class="mb-0 regular">farrahadillah@gmail.com</p>
                  </td>
                  <td>$100.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightgreenbg px-3 py-2 round-lg text-center">
                      <span class="lightgreentext">Paid</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                        
                          
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                          
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="download" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Download Invoice</p>
                            </a>
                          </li>

                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/20 22:08:00</td>
                  <td>#CW 0002/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Fenny Spade</h5>
                    <p class="mb-0 regular">fennyspade@gmail.com</p>
                  </td>
                  <td>$150.05</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightgreenbg px-3 py-2 round-lg text-center">
                      <span class="lightgreentext">Paid</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2023/05/19 21:45:00</td>
                  <td>#CW 0001/6/2023</td>
                  <td>
                    <h5 class="mb-0 themecolor">Katie Chung</h5>
                    <p class="mb-0 regular">katiechung@gmail.com</p>
                  </td>
                  <td>$202.00</td>
                  <td>2023/06/01</td>
                  <td>
                    <div class="lightgreenbg px-3 py-2 round-lg text-center">
                      <span class="lightgreentext">Paid</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-responsive overflow-inherit" v-if="transactiontab == 6">
            <table class="table table-bordered tablecustomWidth">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Frequency</th>
                  <th>End Date</th>
                  <th>Last Sent</th>
                  <th>Next Invoice</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h5 class="mb-0 themecolor">Farrah Adillah</h5>
                    <p class="mb-0 regular">farrahadillah@gmail.com</p>
                  </td>
                  <td>$100.00</td>
                  <td>Daily</td>
                  <td>2023/12/23</td>
                  <td>2023/06/03</td>
                  <td>2023/06/04</td>
                  <td>
                    <div class="lightskybluebg px-3 py-2 round-lg text-center">
                      <span class="blue">Active</span>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown d-flex justify-content-end">
                      <a href="javascript:void(0);" class="border-0 m-0 p-0" data-toggle="dropdown">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                      <ul class="dropdown-menu tableDropMenu border bg-white">
                        <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="edit" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">Edit Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <feather type="trash-2" size="16px" class="d-block themecolor"></feather>
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal" @click="cancelInvoice = true">Cancel Invoice</p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="tableactionIcons">
                                <img src="/assets/website/images/userIcon.svg" alt="Convert" class="d-block" width="16" height="17" />
                              </div>
                              <p class="themecolor mb-0 medium ml-2 lh-normal">View Customer</p>
                            </a>
                          </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-0 themecolor">Fenny Spade</h5>
                    <p class="mb-0 regular">fennyspade@gmail.com</p>
                  </td>
                  <td>$150.05</td>
                  <td>Weekly</td>
                  <td>2023/11/25</td>
                  <td>2023/06/01</td>
                  <td>2023/06/08</td>
                  <td>
                    <div class="lightskybluebg px-3 py-2 round-lg text-center">
                      <span class="blue">Active</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-0 themecolor">Katie Chung</h5>
                    <p class="mb-0 regular">katiechung@gmail.com</p>
                  </td>
                  <td>$202.00</td>
                  <td>Monthly</td>
                  <td>2023/11/30</td>
                  <td>2023/06/01</td>
                  <td>2023/07/01</td>
                  <td>
                    <div class="lightgrayBG px-3 py-2 round-lg text-center">
                      <span class="textcolor">Inactive</span>
                    </div>
                  </td>
                  <td>
                    <div class="selectmenu tableselectmenu position-relative bg-white invoiceselectmenu">
                      <a href="javascript:void(0)" class="btn p-0 border-0 d-flex justify-content-end">
                        <feather type="more-horizontal" size="24px" class="d-block"></feather>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination d-block d-sm-flex justify-content-end p-4 border-top align-items-center">
                 <div class="d-flex align-items-center paginationPage">
                    <p class="f-14 themecolor medium mb-0">Page 1 of 20
                    </p>
                    <div class="selectDropMenu paginationDropMenu position-relative bg-white ml-2 ml-lg-3">
                       <a href="javascript:void(0)" class="btn d-flex align-items-center border-0 textcolor selectDropMenuLink" data-toggle="dropdown">
                          <span class="mr-1 f-14">10 rows per page</span>
                          <feather type="chevron-down" size="16px"></feather>
                       </a>
                       <ul class="dropdown-menu scrollbar">
                          <li @click="paginationmenu = false; $parent.pageLimit = 10; $parent.listing();">
                             <a href="javascript:void(0)" class="textcolor">10 rows per page</a>
                          </li>
                          <li @click="paginationmenu = false; $parent.pageLimit = 50; $parent.listing();">
                             <a href="javascript:void(0)" class="textcolor">50 rows per page</a>
                          </li>
                          <li @click="paginationmenu = false; $parent.pageLimit = 100; $parent.listing();">
                             <a href="javascript:void(0)" class="textcolor">100 rows per page</a>
                          </li>
                       </ul>
                    </div>
                 </div>
                 <div class="d-flex ml-0 ml-sm-3 mt-3 mt-sm-0">
                    <a href="javascript:void(0);" class="d-flex rounded paginationArrow themeBG justify-content-center align-items-center">
                       <feather type="chevron-left" size="16" class="d-block text-white"></feather>
                    </a>
                    <a href="javascript:void(0);" class="d-flex rounded paginationArrow themeBG ml-2 justify-content-center align-items-center">
                       <feather type="chevron-right" size="16" class="d-block text-white"></feather>
                    </a>
                 </div>
              </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import tradingMixins from "@/plugins/trading";
  import depositWithdrawalMixins from "@/plugins/depositWithdrawal";
  import moment from "moment";
  export default {
    name: "transaction-history",
    mixins: [tradingMixins, depositWithdrawalMixins],
    data() {
      return {
        pageLoader: false,
        transactiontab: 1,
        filters: false,
        cancelInvoice: false,
        invoiceRemoveMessage: false,
        remindInvoice: false,
        remindInvoiceMessage: false,
        paymentCurrency: false,
        moreCurrencies: false,
        paymentCurrencyOrder: false,
        thisdate: false,
      };
    },
    methods: {
      Listing() {
        let json = {
          account_id: "T730",
          act_account_id: "730",
          demo_live: "0",
          from: "2018-12-17",
          to: "2024-02-17",
          filter: {},
          sort: [],
          search: "",
          page: "1",
          perPage: 10,
        };
        this._runGetOrderList1({
          globalParams: json,
          localParams: {
            parameter: this,
          },
        });
      },
    },
    created() {
      // this.Listing();
      // this.pageName('Invoices')
    },
  };
</script>