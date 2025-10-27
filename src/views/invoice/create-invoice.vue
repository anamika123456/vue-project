<template>
  <div>
    <div
      class="modal"
      tabindex="-1"
      id="addNewCustomer"
      role="dialog"
      aria-labelledby="addNewCustomer"
      aria-hidden="true"
      v-if="addNewCustomer == true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <div class="modal-title text-left">
              <h5 class="mb-2 medium">Add New Customer</h5>
              <p class="mb-0">Add new customer to your database</p>
            </div>
            <a
              href="javascript:void(0);"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="addNewCustomer = false"
            >
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body py-0">
            <div class="form-group">
              <div class="d-flex align-items-center mb-2">
                <label class="labeltext mb-0">Name</label>
              </div>
              <div class="position-relative">
                <input
                  type="text"
                  placeholder="Enter Name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="labeltext">Email Address</label>
              <div class="position-relative">
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="labeltext">Description</label>
              <div class="position-relative">
                <textarea
                  placeholder="Add any description"
                  class="form-control"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-center pt-0">
            <a
              class="cap_btn px-4 large_btn mb-0"
              href="javascript:void(0);"
              @click="deleteInvoice = true"
              >Save</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" v-if="deleteInvoice == true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="text-center medium d-block lh-normal mb-0">You have successfully add this customer</h5>
          </div>
          <div class="modal-footer border-0 pt-0">
            <a href="/create-invoice" class="cap_btn large_btn mb-0 m-auto">Create an Invoice</a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal double-modal invoiceModal"
      tabindex="-1"
      id="preview-recipient"
      role="dialog"
      aria-labelledby="preview-recipient"
      aria-hidden="true"
      v-if="previewInvoice == true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable max-1000"
        role="document"
      >
        <div class="modal-content">
          <div
            class="modal-header border-0 d-flex justify-content-between align-items-center"
          >
            <div class="modal-title">
              <h3 class="semibold mb-0">Send Invoice</h3>
            </div>
            <a
              href="javascript:void(0);"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="previewInvoice = false"
            >
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body py-0 scrollbar">
            <div class="mb-3">
              <h6 class="d-block mb-2 semibold">Send to</h6>
              <div class="border round-sm p-2">
                <input type="text" class="border-0 w-100 p-0" />
                <ul class="d-flex align-content-start flex-wrap mb-0">
                  <li
                    class="d-flex align-items-center darkgrayBG my-2 mr-2 round-lg py-1 w-auto pl-3 pr-2"
                  >
                    <p class="mb-0 text-white">farrahfadillah@gmail.com</p>
                    <a href="javascript:void(0);" class="d-block mt-1">
                      <feather
                        type="x"
                        class="ml-2 text-white"
                        size="16px"
                      ></feather>
                    </a>
                  </li>
                  <li
                    class="d-flex align-items-center darkgrayBG my-2 mr-2 round-lg py-1 w-auto pl-3 pr-2"
                  >
                    <p class="mb-0 text-white">fahtimafadillah@gmail.com</p>
                    <a href="javascript:void(0);" class="d-block mt-1">
                      <feather
                        type="x"
                        class="ml-2 text-white"
                        size="16px"
                      ></feather>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mb-3">
              <h6 class="d-block mb-2 semibold">CC</h6>
              <div class="border round-sm p-2">
                <input type="text" class="border-0 w-100 p-0" />
                <ul class="d-flex align-content-start flex-wrap mb-0">
                  <li
                    class="d-flex align-items-center darkgrayBG my-2 mr-2 round-lg py-1 w-auto pl-3 pr-2"
                  >
                    <p class="mb-0 text-white">amazarraenie@gmail.com</p>
                    <a href="javascript:void(0);" class="d-block mt-1">
                      <feather
                        type="x"
                        class="ml-2 text-white"
                        size="16px"
                      ></feather>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="form-group">
              <div class="d-flex">
                <label class="customCheckbox mb-0 themecolor"
                  >This is a recurring invoice (Monthly)
                  <input type="checkbox" value="withdrawal" checked />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <h6 class="d-block mb-2 semibold">Preview:</h6>
            <div class="border border-radius-10 px-4 py-3 mb-1">
              <div class="d-flex">
                <img
                  src="/assets/website/images/invoiceLogo.svg"
                  alt="Invoice Icon"
                  class="d-block"
                  width="45"
                  height="40"
                />
                <div class="ml-2">
                  <p class="mb-0 themecolor semibold f-14">
                    Invoice <span class="secondarycolor">#CW 0001/6/2023</span>
                  </p>
                  <p class="mb-0 f-14">Order ID: #365293746</p>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-12 col-sm-6 col-xl-3">
                  <p class="mb-0 mb-md-2 f-14">Bill From:</p>
                  <p class="mb-0 themecolor medium f-14">Jessica Corporate</p>
                  <p class="mb-0 f-14">jessicacasey@company.com</p>
                </div>
                <div class="col-12 col-sm-6 col-xl-3 mt-3 mt-xl-0">
                  <p class="mb-0 mb-md-2 f-14">Bill To:</p>
                  <p class="mb-0 themecolor medium f-14">Farah Fadillah</p>
                  <p class="mb-0 f-14">farahfadillah@gmail.com</p>
                </div>
                <div class="col-12 col-sm-6 col-xl-2 mt-3 mt-xl-0">
                  <p class="mb-0 mb-md-2 f-14">Issued On:</p>
                  <p class="mb-0 themecolor medium f-14">24 May, 2023</p>
                </div>
                <div class="col-12 col-sm-6 col-xl-4 mt-3 mt-xl-0">
                  <p class="mb-0 mb-md-2 f-14">Due On:</p>
                  <p class="mb-0 themecolor medium f-14">
                    01 June, 2023, 23:59 pm (UTC)
                  </p>
                </div>
              </div>
              <div class="border-top pt-3 mt-3">
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
                  <p class="mb-0 mb-2">Memo:</p>
                  <p class="mb-0 themecolor medium mb-3 f-14">
                    This is a recurring invoice, you will get this invoice again
                    in the coming months.
                  </p>
                </div>
                <a
                  href="javascript:void(0);"
                  class="cap_btn yellow-btn mb-0 mt-4"
                >
                  <img
                    src="/assets/website/images/bitcoin_tether_icon.svg"
                    alt="Invoice Icon"
                    class="d-block mr-2"
                    width="34"
                    height="34"
                  />
                  Pay with Crypto
                </a>
                <div
                  class="d-flex justify-content-start justify-content-sm-end align-items-center mt-2 mt-sm-0"
                >
                  <p class="mb-0 themecolor f-14">Powered by</p>
                  <img
                    src="/assets/website/images/logo.svg"
                    alt="Logo"
                    class="d-block ml-2"
                    width="116"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex justify-content-center w-100">
              <a
                href="javascript:void(0);"
                class="cap_btn large_btn border-btn mb-0"
                >Save Draft</a
              >
              <a
                href="javascript:void(0);"
                class="cap_btn large_btn mb-0 ml-3"
                data-dismiss="modal"
                aria-label="Close"
                @click="sendInvoice = true"
                >Send Invoice</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal double-modal"
      tabindex="-1"
      id="cancelInvoice"
      role="dialog"
      aria-hidden="true"
      v-if="sendInvoice == true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h3 class="text-center d-block lh-40 mb-0">
              You have successfully sent this invoice
              <span class="medium secondarycolor">#CW 0001/6/2023</span> to
              recipient <b> “abc@gmail.com”.</b> <br />
              Please check Invoice URL: <b>www.invoice.com</b>
            </h3>
          </div>
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100">
              <a href="/create-invoice" class="cap_btn large_btn mb-0"
                >View Invoice Details</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="mid_scroll_content">
      <!-- <alert-notification v-if="notification_msg != ''" /> -->
      <div class="pageContent border-0">
        <div
          class="d-block d-sm-flex justify-content-between align-items-center"
        >
          <div class="d-block">
            <a href="/invoice" class="d-flex align-items-center mb-2">
              <img
                src="/assets/website/images/leftGreyIcon.svg"
                width="25"
                height="10"
                class="d-block"
              />
              <p class="medium textcolor ml-2 mb-0">Back</p>
            </a>
            <div class="d-flex">
              <h5 class="semibold pr-2 mb-0">Invoice</h5>
              <h5 class="semibold secondarycolor mb-0">#CW 0001/6/2023</h5>
            </div>
          </div>
          <a
            href="javascript:void(0);"
            class="cap_btn secondaryBG mt-3 mt-md-0"
            @click="previewInvoice = true"
            >Preview Invoice</a
          >
        </div>
        <h6 class="mb-0 semibold pt-3">Details</h6>
        <div class="border-bottom pb-4 mb-4 mt-3">
          <div class="row mt-3">
            <div class="col-md-7 col-lg-9">
              <div class="form-group">
                <label class="labeltext">Bill From</label>
                <input
                  type="text"
                  value="Jess Corporate (jess@corporate.com)"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="labeltext">Order Number</label>
                <input
                  type="text"
                  placeholder="Input the order number"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="labeltext">Customer Name</label>
                <div class="destinationWallet d-flex border round-sm bg-white">
                  <div class="selectmenu position-relative bg-white destinationdrop round-sm w-100">
                    <a @click="customerName = !customerName" href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between border-0">
                      <p class="mb-0 themecolor medium">Select or add a new customer</p>
                      <feather type="chevron-down" class="ml-2" size="20px"></feather>
                    </a>
                    <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{ show: customerName }"
                    >
                      <li>
                        <a
                          href="javascript:void(0)"
                          class="px-2 px-xl-3 d-flex align-items-center py-3"
                          @click="addNewCustomer = true"
                        >
                          <feather
                            type="plus"
                            size="20px"
                            class="pr-3"
                          ></feather>
                          <h6 class="medium mb-0">Add New Customer</h6>
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          class="form-group mb-0 px-3"
                        >
                          <label class="customRadioButton d-flex">
                            <div class="mb-0 destinationRadio">
                              <input type="radio" name="role" checked />
                              <span class="checkmark"></span>
                            </div>
                            <div class="mb-0">
                              <h6 class="medium mb-0">Farrah Adillah</h6>
                              <p class="textcolor mb-0 pt-1">
                                farrahadillah@gmail.com
                              </p>
                            </div>
                          </label>
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          class="form-group mb-0 px-3"
                        >
                          <label class="customRadioButton d-flex">
                            <div class="mb-0 destinationRadio">
                              <input type="radio" name="role" />
                              <span class="checkmark"></span>
                            </div>
                            <div class="mb-0">
                              <h6 class="medium mb-0">Fenny Spade</h6>
                              <p class="textcolor mb-0 pt-1">
                                fennyspade@gmail.com
                              </p>
                            </div>
                          </label>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="labeltext d-flex align-items-center">
                  <p class="mb-0 themecolor">Email</p>
                  <span class="red ml-1">*</span>
                </label>
                <input
                  type="text"
                  value="Jess Corporate (jess@corporate.com)"
                  class="form-control"
                />
              </div>
              <div class="row">
                <div class="col-12 col-lg-3 col-xxl-3">
                  <div class="form-group">
                    <label class="labeltext">Due Date</label>
                    <input
                      type="date"
                      placeholder="DD-MM-YYYY"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-12 col-lg-2 col-xxl-2">
                  <div class="form-group">
                    <label class="labeltext d-flex align-items-center">
                      <h6 class="mb-0">Time</h6>
                      <a href="javascript:void(0);" class="ml-2">
                        <feather
                          type="info"
                          size="16px"
                          class="textcolor d-block"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-html="true"
                          title="To change the timezone, go to your account settings -> profile."
                        ></feather>
                      </a>
                    </label>
                    <input
                      type="text"
                      value="23:59 (UTC)"
                      class="form-control w-100 timeInput"
                    />
                  </div>
                </div>
                <div class="col-12 col-lg-2 col-xxl-2">
                  <div class="form-group">
                    <label class="labeltext">Currency</label>
                    <div class="selectmenu currenciesDrop position-relative">
                      <a @click.prevent="currencies = !currencies" href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between bg-white">
                        <p class="mb-0 themecolor medium">USD</p>
                        <feather
                          type="chevron-down"
                          class="ml-2"
                          size="20px"
                        ></feather>
                      </a>
                      <ul class="dropdown_menu" :class="{ show: currencies }">
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
                <div class="col-12 col-lg-5 col-xxl-5">
                  <div class="form-group">
                    <label class="labeltext d-none d-lg-block">&nbsp;</label>
                    <div class="d-flex mt-0 mt-lg-4">
                      <label class="customCheckbox mb-0 themecolor"
                        >This is a recurring invoice
                        <input type="checkbox" value="withdrawal" checked />
                        <span class="checkmark"></span>
                      </label>
                      <a href="javascript:void(0);" class="ml-2">
                        <feather
                          type="info"
                          size="16px"
                          class="textcolor d-block"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-html="true"
                          title="Sending an invoice to the same customer at regular intervals, containing the same invoice details and information."
                        ></feather>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-lg-7">
                  <div class="d-block d-sm-flex align-items-center">
                    <p class="themecolor medium text-nowrap mb-3 mb-sm-0">Repeats this invoice every</p>
                    <div class="d-flex">
                      <input type="text" value="1" class="form-control ml-0 mr-3 mx-sm-3 invoiceInput" />
                      <div
                        class="selectmenu currenciesDrop position-relative w-100">
                        <a @click.prevent="repeatInvoice = !repeatInvoice" href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between bg-white">
                          <p class="mb-0 themecolor medium">Monthly</p>
                          <feather
                            type="chevron-down"
                            class="ml-2"
                            size="20px"
                          ></feather>
                        </a>
                        <ul
                          class="dropdown_menu"
                          :class="{ show: repeatInvoice }"
                        >
                          <li>
                            <a href="javascript:void(0)">Monthly</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Quarterly</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Weekly</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Yearly</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-5 mt-4 mt-lg-0">
                  <div class="d-flex align-items-center">
                    <p class="themecolor medium text-nowrap mb-0 pr-3">
                      on the
                    </p>
                    <div class="selectmenu position-relative w-100">
                      <a
                        @click.prevent="monthlyInvoice = !monthlyInvoice"
                        href="javascript:void(0)"
                        class="btn d-flex align-items-center justify-content-between bg-white"
                      >
                        <p class="mb-0 themecolor medium">1st</p>
                        <feather
                          type="chevron-down"
                          class="ml-2"
                          size="20px"
                        ></feather>
                      </a>
                      <ul
                        class="dropdown_menu"
                        :class="{ show: monthlyInvoice }"
                      >
                        <li>
                          <a href="javascript:void(0)">1st</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">2nd</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">3rd</a>
                        </li>
                      </ul>
                    </div>
                    <p class="themecolor medium text-nowrap mb-0 pl-3">at</p>
                    <input
                      type="text"
                      value="12:00 (UTC)"
                      class="form-control ml-3 timeInput"
                    />
                  </div>
                </div>
              </div>
              <p class="mb-0 pt-4">
                The first invoice will be sent on the 1st Jul, 2023, 12:00 UTC
              </p>
            </div>
            <div class="col-md-5 col-lg-3 mt-3 mt-md-0">
              <div class="form-group">
                <label class="labeltext">Memo</label>
                <textarea
                  placeholder="Write your memo to your customer here.."
                  class="form-control invoiceTextarea"
                ></textarea>
              </div>
              <div class="form-group">
                <label class="labeltext">Internal Notes</label>
                <textarea
                  placeholder="This will not be appeared in the invoice"
                  class="form-control invoiceTextarea"
                ></textarea>
              </div>
              <div class="form-group">
                <label class="labeltext">Select Payment Currency</label>
                <div class="destinationWallet d-flex border round-sm bg-white">
                  <div
                    class="selectmenu position-relative bg-white destinationdrop round-sm w-100"
                  >
                    <a
                      @click="paymentCurrency = !paymentCurrency"
                      href="javascript:void(0)"
                      class="btn d-flex align-items-center justify-content-between border-0 px-1 px-sm-3 py-2"
                    >
                      <div class="d-flex align-items-center w-100">
                        <img
                          src="/assets/website/images/crypto_logos/btc.png"
                          alt="Coin"
                          class="d-block cryptoCoin"
                          width="31"
                          height="30"
                        />
                        <div class="pl-2 pl-sm-3">
                          <p class="medium themecolor mb-0 text-left">
                            Bitcoin
                          </p>
                        </div>
                      </div>
                      <feather
                        type="chevron-down"
                        class="ml-2"
                        size="20px"
                      ></feather>
                    </a>
                    <ul
                      class="dropdown_menu dropdown_menu--animated dropdown_menu-6"
                      :class="{ show: paymentCurrency }"
                    >
                      <li>
                        <a href="javascript:void(0)" class="px-2 px-xl-3">
                          <label class="customCheckbox mb-0 themecolor">
                            <div class="d-flex align-items-center">
                              <img
                                src="/assets/website/images/crypto_logos/usdc.png"
                                alt="Coin"
                                class="d-block cryptoCoin"
                                width="31"
                                height="30"
                              />
                              <p
                                class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                              >
                                USDC
                              </p>
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
                              <img
                                src="/assets/website/images/crypto_logos/usdt.png"
                                alt="Coin"
                                class="d-block cryptoCoin"
                                width="31"
                                height="30"
                              />
                              <p
                                class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                              >
                                USDT
                              </p>
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
                              <img
                                src="/assets/website/images/crypto_logos/ltc.png"
                                alt="Coin"
                                class="d-block cryptoCoin"
                                width="31"
                                height="30"
                              />
                              <p
                                class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                              >
                                Litecoin
                              </p>
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
                              <img
                                src="/assets/website/images/crypto_logos/ltc.png"
                                alt="Coin"
                                class="d-block cryptoCoin"
                                width="31"
                                height="30"
                              />
                              <p
                                class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                              >
                                Litecoin
                              </p>
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
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7 col-lg-9">
            <h6 class="mb-0 semibold">Invoice Items</h6>
            <div class="form-group pt-3">
              <label class="labeltext">Item</label>
              <div class="destinationWallet d-flex border round-sm bg-white">
                <div
                  class="selectmenu position-relative bg-white destinationdrop round-sm w-100"
                >
                  <a
                    @click="invoiceItems = !invoiceItems"
                    href="javascript:void(0)"
                    class="btn d-flex align-items-center justify-content-between border-0 px-1 px-sm-3 py-2"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="/assets/website/images/summerFan.svg"
                        alt="items"
                        class="d-block cryptoCoin"
                        width="35"
                        height="30"
                      />
                      <p class="medium themecolor mb-0 text-left pl-2 pl-sm-3">
                        Summer Fan
                      </p>
                    </div>
                    <feather
                      type="chevron-down"
                      class="ml-2"
                      size="20px"
                    ></feather>
                  </a>
                  <ul
                    class="dropdown_menu dropdown_menu--animated dropdown_menu-6"
                    :class="{ show: invoiceItems }"
                  >
                    <li>
                      <a href="javascript:void(0)" class="form-group mb-0 px-3">
                        <label class="customRadioButton d-flex">
                          <div class="mb-0 destinationRadio">
                            <input type="radio" name="role" checked />
                            <span class="checkmark"></span>
                          </div>
                          <div class="d-flex align-items-center">
                            <img
                              src="/assets/website/images/amazonEchoDot.svg"
                              alt="items"
                              class="d-block cryptoCoin"
                              width="35"
                              height="30"
                            />
                            <p
                              class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                            >
                              Amazon Echo Dot
                            </p>
                          </div>
                        </label>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="form-group mb-0 px-3">
                        <label class="customRadioButton d-flex">
                          <div class="mb-0 destinationRadio">
                            <input type="radio" name="role" />
                            <span class="checkmark"></span>
                          </div>
                          <div class="d-flex align-items-center">
                            <img
                              src="/assets/website/images/summerFan.svg"
                              alt="items"
                              class="d-block cryptoCoin"
                              width="35"
                              height="30"
                            />
                            <p
                              class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                            >
                              Summer Fan
                            </p>
                          </div>
                        </label>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="form-group mb-0 px-3">
                        <label class="customRadioButton d-flex">
                          <div class="mb-0 destinationRadio">
                            <input type="radio" name="role" />
                            <span class="checkmark"></span>
                          </div>
                          <div class="d-flex align-items-center">
                            <img
                              src="/assets/website/images/amazonEchoDot.svg"
                              alt="items"
                              class="d-block cryptoCoin"
                              width="35"
                              height="30"
                            />
                            <p
                              class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                            >
                              Amazon Echo Dot
                            </p>
                          </div>
                        </label>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="form-group mb-0 px-3">
                        <label class="customRadioButton d-flex">
                          <div class="mb-0 destinationRadio">
                            <input type="radio" name="role" />
                            <span class="checkmark"></span>
                          </div>
                          <div class="d-flex align-items-center">
                            <img
                              src="/assets/website/images/summerFan.svg"
                              alt="items"
                              class="d-block cryptoCoin"
                              width="35"
                              height="30"
                            />
                            <p
                              class="medium themecolor mb-0 text-left pl-2 pl-sm-3"
                            >
                              Summer Fan
                            </p>
                          </div>
                        </label>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-lg-6">
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label class="labeltext d-flex align-items-center"
                        >Quantity</label
                      >
                      <input
                        type="text"
                        placeholder="Enter the quantity"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label class="labeltext d-flex align-items-center"
                        >Unit Price</label
                      >
                      <input
                        type="text"
                        placeholder="In USD"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-12 col-lg-6 d-flex justify-content-end text-right"
              >
                <div class="form-group">
                  <label class="labeltext d-flex align-items-center"
                    >Amount</label
                  >
                  <p class="themecolor mb-0">$100.00</p>
                </div>
              </div>
            </div>
            <a
              href="javascript:void(0);"
              class="d-flex align-items-center mb-3 mb-md-0"
            >
              <feather type="plus" size="18px" class="secondarycolor"></feather>
              <p class="mb-0 pl-2 secondarycolor medium">Add Item</p>
            </a>
          </div>
          <div class="col-md-5 col-lg-3">
            <h6 class="themecolor textDecoration mb-0">Advanced Settings</h6>
            <div class="form-group pt-3">
              <label class="labeltext">Extra Fees</label>
              <input type="text" placeholder="In USD" class="form-control" />
            </div>
            <div class="form-group">
              <label class="labeltext">Description</label>
              <textarea
                placeholder="Enter the description"
                class="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="border-top pt-4 mt-4">
          <div class="col-md-7 col-lg-9 d-flex justify-content-end text-right">
            <div class="form-group">
              <label class="labeltext d-flex align-items-center"
                >Total Amount</label
              >
              <p class="themecolor mb-0">$109.50</p>
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
      paginationmenu: false,
      invoiceDraftAction: false,
      invoiceOverdueAction: false,
      invoicePaidAction: false,
      customerName: false,
      currencies: false,
      repeatInvoice: false,
      monthlyInvoice: false,
      paymentCurrency: false,
      invoiceItems: false,
      addNewCustomer: false,
      deleteInvoice: false,
      previewInvoice: false,
      sendInvoice: false,
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
