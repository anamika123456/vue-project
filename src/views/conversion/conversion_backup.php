<template>
   <div class="mid_scroll_content pageDpst p-0 conversionsPage">
      <loader v-if="pageLoader"></loader>
      <div class="modal" tabindex="-1" id="convert-confirmation" role="dialog" aria-labelledby="convert-confirmation" aria-hidden="true" v-show="[2].includes(parseInt(step))">
         <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
               <div class="modal-header border-0 d-flex justify-content-between align-items-center">
                  <div class="modal-title">
                     <h3 class="semibold mb-0">Convert</h3>
                  </div>
                  <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="closeStep()">
                     <feather type="x" size="24px"></feather>
                  </a>
               </div>
               <div class="modal-body pt-0 pb-2">
                  <div class="d-flex justify-content-center align-items-center">
                     <img :src="
                        '/assets/website/images/crypto_logos/' +
                        send.currency.toLowerCase() +
                        '.png'
                        " alt="Coin" class="d-block conversionConfirmIcon" width="80" height="80" v-if="send != '' && checkImage(send.currency)" />
                     <feather type="arrow-right" size="20px" class="px-3"></feather>
                     <img :src="
                        '/assets/website/images/crypto_logos/' +
                        recive.toLowerCase() +
                        '.png'
                        " alt="Coin" class="d-block conversionConfirmIcon" width="80" height="80" v-if="recive != '' && checkImage(recive)" />
                  </div>
                  <div class="d-flex justify-content-center pt-4">
                     <h6 class="textcolor semibold mb-0">You spend</h6>
                     <h6 class="semibold mb-0 ml-1">
                        {{ free_Margin }} {{ send.currency }}
                     </h6>
                  </div>
                  <div class="text-center pt-5" v-if="get_depth.A && freeMargin">
                     <h3 class="textcolor medium mb-2">You receive</h3>
                     <h2 class="medium mb-0" v-if="recive">
                        {{ numberFormat(totalReceive) }} {{ recive }}
                     </h2>
                  </div>
                  <div class="pt-4">
                     <div class="d-block d-sm-flex justify-content-between border-bottom pb-3 pt-3" v-if="get_depth.A && freeMargin">
                        <h6 class="medium mb-0">Conversion Rate</h6>
                        <h6 class="medium mb-0"> 1{{ send.currency }} = {{ numberFormat(get_depth.A) }} {{ recive }}
                        </h6>
                     </div>
                     <div class="d-block d-sm-flex justify-content-between border-bottom pb-3 pt-3" v-if="get_depth.A && freeMargin">
                        <h6 class="medium mb-0">Conversion Fees</h6>
                        <h6 class="medium mb-0" v-if="tradePair">
                           {{ numberFormat(getCommission) }} {{ spliting(tradePair, 1) }}
                        </h6>
                     </div>
                  </div>
                  <div class="c_checkbox mt-4">
                     <label class="customCheckbox mb-0">I have read and I accept the <a href="javascript:void(0);" style="text-decoration: underline" class="themecolor" target="_blank">Terms Of Use</a> and <a href="javascript:void(0);" style="text-decoration: underline" class="themecolor" target="_blank">Privacy Policy</a>
                     <input type="checkbox" class="form-control" />
                     <span class="checkmark"></span>
                     </label>
                  </div>
               </div>
               <div class="modal-footer border-0">
                  <div class="d-flex justify-content-center align-items-center w-100">
                     <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-toggle="modal" data-target="#successful-limit-order" :class="orderPlacedSuccess ? 'disabled' : ''" @click="submitFunc('2')">Confirm</a>
                     <div class="d-flex convertClock text-center ml-3 align-items-center justify-content-center">
                        <p class="mb-0 pt-2 themecolor medium">59</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="modal double-modal" tabindex="-1" id="successful-limit-order" role="dialog" aria-labelledby="successful-limit-order" aria-hidden="true" v-show="[3, 4].includes(parseInt(step))">
         <div class="modal-dialog modal-dialog-centered modal-lg" role="document" v-if="parseInt(step) == 3">
            <div class="modal-content">
               <div class="modal-body pb-0">
                  <h3 class="text-center medium d-block lh-normal mb-0"> your order has expired </h3>
               </div>
               <div class="modal-footer border-0">
                  <div class="d-flex justify-content-center w-100">
                     <a href="javascript:void(0);" class="cap_btn large_btn mb-0" @click.prevent="step = '1'">Replace Order</a>
                  </div>
               </div>
            </div>
         </div>
         <div class="modal-dialog modal-dialog-centered modal-lg" role="document" v-if="parseInt(step) == 4">
            <div class="modal-content">
               <div class="modal-body pb-0">
                  <h3 class="text-center medium d-block lh-normal mb-0"> Market Order has been placed successfully </h3>
               </div>
               <div class="modal-footer border-0">
                  <div class="d-flex justify-content-center w-100">
                     <router-link to="/transaction-history" class="cap_btn large_btn mb-0">Go To Transaction Page</router-link>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="d-block d-md-flex justify-content-between blueGradient align-items-center">
         <div class="d-block d-md-flex">
            <div class="conversionsTopSearch">
               <div class="round-lg inputField d-flex justify-content-between align-items-center bg-white position-relative">
                  <div class="pr-2" v-if="Object.keys(send).length > 0 && send.currency != undefined">
                     <img :src="'/assets/website/images/crypto_logos/' +send.currency.toLowerCase() +'.png'" alt="Coin" class="d-block iconOne position-absolute" width="37" height="37" />
                     <img :src="'/assets/website/images/crypto_logos/' +recive.toLowerCase() +'.png'" alt="Coin" class="d-block iconTwo position-absolute" width="37" height="37" />
                  </div>
                  <h6 class="mb-0 pl-2">{{send.currency}}/{{recive}}</h6>
                  <!-- <input type="text" class="form-control border-0 pl-2 pr-0 py-0 themecolor semibold" :placeholder="send.currency+'/'+recive" disabled /> -->
                  <!-- <a href="javascript:void(0);" class="d-block pt-1" data-toggle="modal" data-target="#currency-pair"><feather type="search" size="26px" class="textcolor"></feather></a> -->
               </div>
            </div>
            <div class="d-block d-md-flex conversionsTopMainBox">
               <div class="conversionsTopBox">
                  <h6 class="text-white mb-0">Current Price</h6>
                  <h6 class="text-white mb-0 conversionsValue" v-if="get_depth.A && freeMargin">{{ numberFormat(get_depth.A) }} {{ recive }}</h6>
                  <h6 class="text-white mb-0" v-else>-</h6>
               </div>
               <div class="conversionsTopBox">
                  <h6 class="text-white mb-0">24h Change</h6>
                  <h6 class="mb-0 conversionsValue white" :class="[ { green: formatfloat(instruments[tradePair].CB) > 0 },{ conversionsRedColor: formatfloat(instruments[tradePair].CB) < 0 } ]" v-if="instruments[tradePair]">{{ numberFormat( formatfloat(parseFloat(instruments[tradePair].CB)) ) }}% </h6>
                  <h6 class="text-white mb-0" v-else>-</h6>
               </div>
               <div class="conversionsTopBox">
                  <h6 class="text-white mb-0">24h High/ Low</h6>
                  <div class="d-block d-md-flex align-items-center pt-1" v-if="instruments[tradePair]">
                     <p class="text-white mb-0 f-15 lh-normal">{{ numberFormat(formatfloat(instruments[tradePair].HIGH)) }} {{ recive }} </p>
                     <div class="progress customProgress conversionsProgress" v-if="get_depth.A && freeMargin && instruments[tradePair]">
                        <div class="progress-bar redBG" :style="{ width: marketpercent()+'%'}"></div>
                     </div>
                     <!-- <div class="customRangeSlider"><input type="range" min="1" max="100" value="20" class="customRange" id="customRange" /></div> -->
                     <p class="text-white mb-0 f-15 lh-normal">{{ numberFormat(formatfloat(instruments[tradePair].LOW)) }} {{ send.currency }}</p>
                  </div>
                  <div class="d-block d-md-flex align-items-center" v-else>-</div>
               </div>
            </div>
         </div>
         <!-- <a href="javascript:void(0);" class="d-inline-block round-sm border conversionsActivityBtn" data-toggle="modal" data-target="#chart-activity"><feather type="activity" size="24px" class="text-white d-block"></feather></a> -->
      </div>
      <div class="pageContent border-0">
         <!-- <div id="tabs" class="d-flex text-center mb-0 walletTab"><ul class="d-flex align-items-center justify-content-center round-sm borderbg p-1 m-0"><li><a class="semibold round-sm py-1 px-3 d-block" href="javascript:void(0)" :class="[{'active':tab == 1}]" @click.prevent="tab = 1">Market</a></li><li><a class="semibold round-sm py-1 px-3 d-block" href="javascript:void(0)" :class="[{'active':tab == 2}]" @click.prevent="tab = 2">Limit</a></li></ul></div> -->
         <div class="bg-white border round-sm p-3 p-md-4 p-xl-5" v-if="tab == 1">
            <div class="row justify-content-center">
               <div class="col-12 col-xl-9 col-xxl-8 col-xxxl-6">
                  <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4">
                     <div class="conversionsText pb-2 pb-md-4 mb-0 mb-md-2">
                        <p class="themecolor medium mb-0">Convert From</p>
                     </div>
                     <div class="conversionsInput">
                        <div class="d-flex border round-sm lightgrayBG">
                           <div class="inputField inputHeight d-flex align-items-center">
                              <input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="" v-model="free_Margin" name="Margin" />
                           </div>
                           <div class="selectField border-left d-flex align-items-center">
                              <div class="selectmenu position-relative destinationdrop round-sm w-100">
                                 <a href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between border-0 py-0 inputHeight" v-if="send.currency" @click.prevent=" showSend = !showSend; showReceive = false;">
                                    <div class="d-flex align-items-center">
                                       <img :src="'/assets/website/images/crypto_logos/' +send.currency.toLowerCase() +'.png'" alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" v-if="send != '' && checkImage(send.currency)" />
                                       <div class="pl-1 pl-sm-3" v-else-if="send != ''">
                                          <p class="medium themecolor mb-0 text-left lh-normal">
                                             {{ send.currency.charAt(0) }}
                                          </p>
                                       </div>
                                       <p class="medium themecolor mb-0 text-left pl-2 lh-normal">
                                          {{ send.currency }}
                                       </p>
                                    </div>
                                    <feather type="chevron-down" size="20px"></feather>
                                 </a>
                                 <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: showSend }">
                                    <li v-for="(value, key) in marginSearch(margin_list)" @click.prevent=" ChangeSendData(value, key); searchSend = ''; showSend = false;" v-show=" value.currency != 'TRXUSDT' && value.currency != 'TRXUSDC' && parseFloat(value.amount) > 0  ">
                                       <a href="javascript:void(0)" class="px-1 px-sm-3" v-if="value.currency">
                                          <div class="d-flex align-items-center">
                                             <img :src=" '/assets/website/images/crypto_logos/' + value.currency.toLowerCase() + '.png'" @error="handleImgErr($event)" v-if="checkImage(value.currency)" alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" />
                                             <span class="firstName" v-else>{{ value.currency.charAt(0)
                                             }}</span>
                                             <div class="pl-1 pl-sm-2" v-if="$env_var.restricted_currencies.hasOwnProperty(  value.currency)">
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ $env_var.restricted_currencies[ value.currency ].currency_name }}
                                                </p>
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ value.currency }}
                                                </p>
                                             </div>
                                             <div class="pl-1 pl-sm-2" v-else>
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ value.currency }}
                                                </p>
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ getCurrName(value.currency) }}
                                                </p>
                                             </div>
                                          </div>
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div class="conversionsPercent d-flex justify-content-between pt-3">
                           <p class="textcolor medium mb-0 lh-normal conversionsBalance mt-3 mt-sm-0">(Balance: <span class="green">{{ numberFormat(freeMargin) }} {{ send.currency }}</span>) </p>
                           <ul class="mb-0 d-flex justify-content-start justify-content-sm-end">
                              <li>
                                 <a href="javascript:void(0);" :class="percentage == '25' ? 'active' : ''" @click="setPercentage(25)">25%</a>
                              </li>
                              <li>
                                 <a href="javascript:void(0);" :class="percentage == '50' ? 'active' : ''" @click="setPercentage(50)">50%</a>
                              </li>
                              <li>
                                 <a href="javascript:void(0);" :class="percentage == '75' ? 'active' : ''" @click="setPercentage(75)">75%</a>
                              </li>
                              <li>
                                 <a href="javascript:void(0);" :class="percentage == '100' ? 'active' : ''" @click="setPercentage(100)">100%</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 pb-0 pb-md-2">
                     <div class="position-relative">
                        <div class="d-flex align-items-center conversionsText pb-2 pb-md-0">
                           <div class="d-flex align-items-center">
                              <p class="themecolor medium mb-0">Market Order Price</p>
                              <a href="javascript:void(0);" class="d-block ml-2">
                                 <feather size="16px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor d-block " title="A Market Order is a Buy/Sell order at the market's current best available price. Market orders are optimal when the primary goal is to execute the trade immediately."></feather>
                              </a>
                           </div>
                        </div>
                     </div>
                     <div class="d-flex border round-sm lightgrayBG conversionsInput">
                        <div class="inputHeight w-100 d-flex align-items-center" v-if="get_depth.A && freeMargin">
                           <!-- <input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="29,406.20 USDT" /> -->
                           <span class="px-3 textcolor medium">1 {{ send.currency }} ≈ {{ numberFormat(get_depth.A) }} {{ recive }}</span>
                        </div>
                     </div>
                  </div>
                  <div class="d-block d-md-flex justify-content-center conversionsRow mb-4">
                     <div class="conversionsText pt-0 pt-md-3 pb-2 pb-md-0">
                        <p class="themecolor medium mb-0">Convert To</p>
                     </div>
                     <div class="conversionsInput">
                        <div class="d-flex mb-2 border round-sm lightgrayBG">
                           <div class="inputField inputHeight d-flex align-items-center">
                              <!-- <input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="1,670.16" /> -->
                              <div class="cursiveright cur_value pr-2" v-if="get_depth && freeMargin">
                                 <div class="d-flex align-items-center">
                                    <div class="cur_type">
                                       <span v-if="get_depth.A" contentEditable="false" class="px-3 textcolor medium">{{ numberFormat( floatingValue(get_depth.A * free_Margin, recive) ) }}</span>
                                       <span v-else contentEditable="false" class="px-3 textcolor medium">0</span>
                                    </div>
                                    <p class="cur_result" v-if="recive == ''"> Please Select Currency </p>
                                 </div>
                              </div>
                              <div class="text-right cur_value pr-2" v-else>
                                 <div class="cur_type">
                                    <span contentEditable="false" v-if="get_depth">{{ numberFormat(get_depth.A * free_Margin) }}</span>
                                    <p class="cur_result" v-if="recive == ''"> Please Select Currency </p>
                                    <p class="cur_result" v-else> Please Select Another Currency </p>
                                 </div>
                              </div>
                           </div>
                           <div class="selectField border-left">
                              <div class="selectmenu position-relative destinationdrop round-sm">
                                 <div @click.prevent="showReceive = !showReceive; showSend = false;">
                                    <a href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between border-0 py-0 inputHeight" v-if="recive">
                                       <div class="d-flex align-items-center">
                                          <img :src="
                                             '/assets/website/images/crypto_logos/' +
                                             recive.toLowerCase() +
                                             '.png'
                                             " alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" @error="handleImgErr($event)" v-if="recive != '' && checkImage(recive)" />
                                          <div class="pl-1 pl-sm-3" v-else-if="send != ''">
                                             <p class="medium themecolor mb-0 text-left">
                                                {{ recive.charAt(0) }}
                                             </p>
                                          </div>
                                          <p class="medium themecolor mb-0 text-left pl-2">
                                             {{ recive }}
                                          </p>
                                       </div>
                                       <feather type="chevron-down" size="20px"></feather>
                                    </a>
                                 </div>
                                 <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: showReceive }">
                                    <li v-for="value in uniqueCurrencyList( send, searchRecive)" @click.prevent=" recive = value; searchRecive = ''; showReceive = false;" :class="value == recive ? 'active' : ''" v-show=" send.currency != value && value != 'TRXUSDT' && value != 'TRXUSDC'">
                                       <a href="javascript:void(0)" class="px-3" v-if="value">
                                          <div class="d-flex align-items-center">
                                             <img :src="'/assets/website/images/crypto_logos/' +value.toLowerCase() +'.png'" alt="Coin" class="d-block destinationdropImg h-auto" width="38" height="38" @error="handleImgErr($event)" v-if="checkImage(value)" />
                                             <span class="firstName" v-else>{{ value.charAt(0)
                                             }}</span>
                                             <div class="pl-1 pl-sm-2" v-if="  $env_var.restricted_currencies.hasOwnProperty( value )  ">
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ $env_var.restricted_currencies[value].currency_name }}
                                                </p>
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ value }}
                                                </p>
                                             </div>
                                             <div class="pl-1 pl-sm-2" v-else>
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ value }}
                                                </p>
                                                <p class="medium themecolor mb-0 text-left lh-normal">
                                                   {{ getCurrName(value) }}
                                                </p>
                                             </div>
                                          </div>
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="d-block d-md-flex justify-content-center align-items-center conversionsRow">
                     <div class="conversionsText d-none d-md-block">&nbsp;</div>
                     <div class="conversionsInput">
                        <a href="javascript:void(0);" class="cap_btn large_btn mb-0" data-toggle="modal" data-target="#convert-confirmation" @submit.prevent="submitFunc('1')" :class="[{ disabled: !parseFloat(get_depth.A) }]">Submit</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <!-- <div class="mt-4 bg-white border round-sm px-3 py-3 py-md-5" v-if="tab == 2"><div class="text-center"><ul class="defaultTab d-inline-flex justify-content-center align-items-center"><li><a href="javascript:void(0);" class="links" :class="[{'active':limitTab == 1}]" @click.prevent="limitTab = 1">Buy</a></li><li><a href="javascript:void(0);" class="links" :class="[{'active':limitTab == 2}]" @click.prevent="limitTab = 2">Sell</a></li></ul></div><div v-if="limitTab == 1"><div class="row justify-content-center"><div class="pt-2 pt-md-4 col-12 col-xl-10 col-xxl-8"><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 mb-sm-5"><div class="conversionsText pt-3 pb-3 pb-md-0"><p class="themecolor medium mb-0">Trading Pair</p></div><div class="d-flex border round-sm lightgrayBG conversionsInput"><div class="py-1 w-100"><div class="selectmenu position-relative destinationdrop round-sm"><a @click.prevent="destinationwallet ^= true" href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between border-0 px-1 px-sm-3 py-1"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-2"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div><feather type="chevron-down"></feather></a><ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{'show':destinationwallet}"><li><a href="javascript:void(0)" class="px-1 px-sm-3"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-3"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div></a></li><li><a href="javascript:void(0)" class="px-1 px-sm-3"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-3"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div></a></li><li><a href="javascript:void(0)" class="px-1 px-sm-3"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-3"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div></a></li></ul></div></div></div></div><div class="d-block d-md-flex justify-content-center conversionsRow mb-4 mb-sm-5"><div class="conversionsText pt-0 pt-md-3 pb-3 pb-md-0"><p class="themecolor medium mb-0">To Buy</p></div><div class="conversionsInput"><div class="d-block d-sm-flex justify-content-between align-items-center mb-2 py-1 border round-sm lightgrayBG currentBalance"><input type="text" class="form-control border-0 px-3 lightgrayBG" value="0.056 BTC" /><p class="mb-0 text-left text-sm-right pr-0 pr-sm-3 pl-3 pl-sm-0 pb-2 pb-sm-0">(Current Balance: 1.04356764 BTC)</p></div><div class="conversionsPercent d-block d-sm-flex justify-content-between"><p class="textcolor medium mb-0 f-14">(Available Balance: <span class="green">4,998.92534 USDT</span>)</p><ul class="mb-0 d-flex justify-content-start justify-content-sm-end"><li><a href="javascript:void(0);" class="active">25%</a></li><li><a href="javascript:void(0);">50%</a></li><li><a href="javascript:void(0);">75%</a></li><li><a href="javascript:void(0);">100%</a></li></ul></div></div></div><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 mb-sm-5"><div class="position-relative"><div class="d-flex align-items-center conversionsText pb-3 pb-md-0"><div class="d-flex align-items-center"><p class="themecolor medium mb-0">Limit Order Price</p><a href="javascript:void(0);" class="d-block ml-1"><feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor d-block" title="A Limit Order is a Buy/Sell order with a restriction on the maximum price to be paid (with a buy limit) or the minimum price to be received (with a sell limit). If the order is filled, it will only be at the specified limit price or better. However, there is no assurance of execution. A limit order may be appropriate when you think you can buy at a price lower than—or sell at a price higher than—the current quote."></feather></a></div></div></div><div class="d-flex border round-sm py-1 lightgrayBG conversionsInput"><div class="inputField"><input type="text" class="form-control border-0 px-3 lightgrayBG" value="29,406.20 USDT" /></div></div></div><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 mb-sm-5"><div class="position-relative"><div class="d-flex align-items-center conversionsText pb-3 pb-md-0"><p class="themecolor medium mb-0">Time in Force</p></div></div><div class="d-flex border round-sm py-1 lightgrayBG conversionsInput"><div class="inputField"><input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="Up to 24 hours" /></div></div></div><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-0 mb-sm-3"><div class="conversionsText d-none d-md-block">&nbsp;</div><div class="conversionsInput"><a href="javascript:void(0);" class="cap_btn large_btn" data-toggle="modal" data-target="#convert-confirmation">Submit</a></div></div></div></div></div><div v-if="limitTab == 2"><div class="row justify-content-center"><div class="pt-2 pt-md-4 col-12 col-xl-10 col-xxl-8"><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 mb-sm-5"><div class="conversionsText pt-3 pb-3 pb-md-0"><p class="themecolor medium mb-0">Trading Pair</p></div><div class="d-flex border round-sm lightgrayBG conversionsInput"><div class="py-1 w-100"><div class="selectmenu position-relative destinationdrop round-sm"><a @click.prevent="destinationwallet ^= true" href="javascript:void(0)" class="btn d-flex align-items-center justify-content-between border-0 px-1 px-sm-3 py-1"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-2"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div><feather type="chevron-down"></feather></a><ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{'show':destinationwallet}"><li><a href="javascript:void(0)" class="px-1 px-sm-3"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-3"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div></a></li><li><a href="javascript:void(0)" class="px-1 px-sm-3"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-3"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div></a></li><li><a href="javascript:void(0)" class="px-1 px-sm-3"><div class="d-flex align-items-center"><img src="/assets/website/images/bitcoin_tether_icon.svg" alt="Coin" class="d-block destinationdropImg" width="48" height="42" /><div class="pl-1 pl-sm-3"><p class="medium themecolor mb-0 text-left">BTC/USDT</p></div></div></a></li></ul></div></div></div></div><div class="d-block d-md-flex justify-content-center conversionsRow mb-4 mb-sm-5"><div class="conversionsText pt-0 pt-md-3 pb-3 pb-md-0"><p class="themecolor medium mb-0">To Sell</p></div><div class="conversionsInput"><div class="d-block d-sm-flex justify-content-between align-items-center mb-2 py-1 border round-sm lightgrayBG currentBalance"><input type="text" class="form-control border-0 px-3 lightgrayBG" value="0.056 BTC" /><p class="mb-0 text-left text-sm-right pr-0 pr-sm-3 pl-3 pl-sm-0 pb-2 pb-sm-0">(Current Balance: 4,998.92534 BTC)</p></div><div class="conversionsPercent d-block d-sm-flex justify-content-between"><p class="textcolor medium mb-0 f-14">(Available Balance: <span class="green">1.04356764 BTC</span>)</p><ul class="mb-0 d-flex justify-content-start justify-content-sm-end"><li><a href="javascript:void(0);" class="active">25%</a></li><li><a href="javascript:void(0);">50%</a></li><li><a href="javascript:void(0);">75%</a></li><li><a href="javascript:void(0);">100%</a></li></ul></div></div></div><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 mb-sm-5"><div class="position-relative"><div class="d-flex align-items-center conversionsText pb-3 pb-md-0"><div class="d-flex align-items-center"><p class="themecolor medium mb-0">Limit Order Price</p><a href="javascript:void(0);" class="d-block ml-1"><feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor d-block" title="A Limit Order is a Buy/Sell order with a restriction on the maximum price to be paid (with a buy limit) or the minimum price to be received (with a sell limit). If the order is filled, it will only be at the specified limit price or better. However, there is no assurance of execution. A limit order may be appropriate when you think you can buy at a price lower than—or sell at a price higher than—the current quote."></feather></a></div></div></div><div class="d-flex border round-sm py-1 lightgrayBG conversionsInput"><div class="inputField"><input type="text" class="form-control border-0 px-3 lightgrayBG" value="0.00004991 USDT" /></div></div></div><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-4 mb-sm-5"><div class="position-relative"><div class="d-flex align-items-center conversionsText pb-3 pb-md-0"><p class="themecolor medium mb-0">Time in Force</p></div></div><div class="d-flex border round-sm py-1 lightgrayBG conversionsInput"><div class="inputField"><input type="text" class="form-control border-0 px-3 lightgrayBG" placeholder="Up to 24 hours" /></div></div></div><div class="d-block d-md-flex justify-content-center align-items-center conversionsRow mb-0 mb-sm-3"><div class="conversionsText d-none d-md-block">&nbsp;</div><div class="conversionsInput"><a href="javascript:void(0);" class="cap_btn large_btn" data-toggle="modal" data-target="#convert-confirmation">Submit</a></div></div></div></div></div></div> -->
         <div class="d-block d-sm-flex justify-content-between align-items-center mt-5">
            <div class="d-flex align-items-center">
               <h3 class="mb-0">Recent Conversions</h3>
               <a href="javascript:void(0);" class="d-block ml-2">
                  <feather size="18px" type="info" data-toggle="tooltip" data-placement="top" data-html="true" class="textcolor d-block" title="All information about Order Rates (Requested rates, Conversion rates, and Fees) are provided in the transaction history tab on menu. Click 
                     <b>'See All Orders'</b> to discover.">
                  </feather>
               </a>
            </div>
            <router-link to="/transaction-history" class="secondarycolor seeAllLink mt-3 mt-sm-0 d-block">See All Transactions</router-link>
         </div>
         <conversion-list :fromPage="'conversion'"></conversion-list>
         <!-- <div class="mt-4 bg-white border round-sm"><div class="d-flex align-items-center justify-content-end p-4"><div class="d-flex align-items-center mr-3 position-relative"><a @click.prevent="filters ^= true" href="javascript:void(0)"><img src="/assets/website/images/filter-icon.svg" alt="Filter Icon" class="d-block" width="22" height="22" /></a><div class="dropdown_menu filter_dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{'show':filters}"><div class="d-flex justify-content-between align-items-center px-3 pb-3"><span class="f-14 medium">Filters</span><a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11">Apply</a></div><ul class="mb-0"><li class="py-2"><label class="customCheckbox mb-0 themecolor">Currency <input type="checkbox" /><span class="checkmark"></span></label></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Date <input type="checkbox" /><span class="checkmark"></span></label></li><li class="py-2 lightgrayBG"><label class="customCheckbox mb-0 themecolor">Status <input type="checkbox" /><span class="checkmark"></span></label><div class="selectmenu position-relative pt-1"><a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center px-2 py-1 bg-white"><span class="mr-2">Confirmed</span><feather type="chevron-down" class="ml-2"></feather></a><ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{'show':thisdate}"><li><a href="javascript:void(0)">Confirmed</a></li><li><a href="javascript:void(0)">Confirmed</a></li><li><a href="javascript:void(0)">Confirmed</a></li></ul></div></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Transaction ID <input type="checkbox" /><span class="checkmark"></span></label></li><li class="py-2"><label class="customCheckbox mb-0 themecolor">Hash <input type="checkbox" /><span class="checkmark"></span></label></li></ul></div></div><div class="form-group position-relative searchTable mb-0"><input type="text" placeholder="Search All Cryptos" name="legal_name" class="form-control small" /><span class="searchIco"><feather type="search" /></span></div></div><div class="table-responsive"><table class="table table-bordered tablecustomWidth"><thead><tr><th>Date/Time</th><th>Conversion ID</th><th>From</th><th>To</th><th>Amount</th><th>Status</th></tr></thead><tbody><tr><td>2022/02/10 15:30:00</td><td>365293746</td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/btc.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">BTC</h5><p class="mb-0 regular">Bitcoin</p></div></span></td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/usdt.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">BTC</h5><p class="mb-0 regular">Bitcoin</p></div></span></td><td>0.056 BTC</td><td><div class="lightyellowbg px-2 px-sm-3 py-1 py-sm-2 round-lg text-center"><span>Open</span></div></td></tr><tr><td>2022/02/10 14:08:00</td><td>365293758</td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/ltc.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">LTC</h5><p class="mb-0 regular">Litecoin</p></div></span></td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/usdt.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">USDT</h5><p class="mb-0 regular">Tether</p></div></span></td><td>10.875 LTC</td><td><div class="d-flex justify-content-center align-items-center lightredbg px-2 px-sm-3 py-1 py-sm-2 round-lg"><a href="javascript:void(0);" class="d-block"><feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="red pr-2 d-block" title="Insufficient Funds"></feather></a><span class="red">Rejected</span></div></td></tr><tr><td>2022/02/10 14:05:00</td><td>365293736</td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/usdt.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">USDT</h5><p class="mb-0 regular">Tether</p></div></span></td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/btc.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">BTC</h5><p class="mb-0 regular">Bitcoin</p></div></span></td><td>2,180.67 USDT</td><td><div class="lightgreenbg px-2 px-sm-3 py-1 py-sm-2 round-lg text-center"><span class="lightgreentext">Complete</span></div></td></tr><tr><td>2022/02/10 13:08:00</td><td>365293758</td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/ltc.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">LTC</h5><p class="mb-0 regular">Litecoin</p></div></span></td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/usdt.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">USDT</h5><p class="mb-0 regular">Tether</p></div></span></td><td>8.834 LTC</td><td><div class="lightgreenbg px-2 px-sm-3 py-1 py-sm-2 round-lg text-center"><span class="lightgreentext">Complete</span></div></td></tr><tr><td>2022/02/09 12:45:00</td><td>365293736</td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/usdt.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">USDT</h5><p class="mb-0 regular">Tether</p></div></span></td><td><span class="d-flex align-items-center"><span class="inTableIcon mr-3"><img src="/assets/website/images/crypto_logos/btc.png" /></span><div class="iqlName"><h5 class="mb-0 themecolor">BTC</h5><p class="mb-0 regular">Bitcoin</p></div></span></td><td>2,180.67 USDT</td><td><div class="lightgreenbg px-2 px-sm-3 py-1 py-sm-2 round-lg text-center"><span class="lightgreentext">Complete</span></div></td></tr></tbody></table></div></div> -->
      </div>
   </div>
</template>
<script>
   import conversionList from "./list.vue";
   import {
     Const
   } from "@/plugins/vue-provider-cache/const.mod";
   import tradingMixins from "@/plugins/trading";
   // import marketChart from "./market-chart";
   // import math from "../../../../static/website/js/math.js";
   // import commonAllMixins from '@/plugins/commonAll';
   import * as types from "@/types";
   export default {
     name: "smart-trading",
     mixins: [tradingMixins],
     data() {
       return {
         pageLoader: false,
         page: "1",
         pageLimit: "10",
         taskTab: "Price",
         charTab: "date",
         combinedData: "",
         notification_msg: "",
         notification_type: "",
         send: "",
         recive: "USD",
         margin_list: {},
         freeMargin: "",
         free_Margin: "",
         step: "1",
         searchSend: "",
         searchRecive: "",
         showSend: false,
         showReceive: false,
         percentage: 25,
         submitted: true,
         terms: false,
         timer: 0,
         downloadTimer: "",
         currentPrice: 0,
         purchasedQnt: 0,
         totalCommission: 0,
         purchasedTotal: 0,
         orderPending: {},
         tempIdRecived: {},
         orderPlacedSuccess: false,
         tradePair: "",
         errImage: [],
         statusTypeList: {
           CREATED: {
             text: "Pending",
             class: "yellow",
           },
           FILLED: {
             text: "Approved",
             class: "green",
           },
           CANCELED: {
             text: "Rejected",
             class: "red",
           },
         },
         tab: 1,
         notCryptoCurrency: ["EURO", "USD", "AUD", "GBP", "JPY"],
       };
     },
     components: {
       conversionList,
       //marketChart,
     },
     computed: {
       token() {
         try {
           return this.$store.getters[types.GET_TOKEN];
         } catch (e) {
           return "";
         }
       },
       instruments() {
         try {
           this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
           return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArrayAll();
         } catch (ex) {
           return {};
         }
       },
       get_depth() {
         try {
           // console.log('get_depth1===> ',this.$store.getters[Const.GET_PROVIDERS])
           // console.log('get_depth2===> ',this.$store.getters[Const.GET_PROVIDERS]["priceFeed"])
           // console.log('get_depth3===> ',this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache)
           // console.log('get_depth4===> ',this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArray(this))
           this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
           return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArray(this);
         } catch (ex) {
           return {};
         }
       },
       get_buy_sell() {
         try {
           this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
           return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.getCryptoCurrency(this);
           // }
         } catch (ex) {
           // console.log('OO-one [ex]', ex)
           return {};
         }
       },
       totalPrice() {
         try {
           let total = this.free_Margin * this.get_depth.A;
           return this.floatingValue(total, this.recive);
         } catch (e) {
           return 0;
           console.log("totalPrice", e);
         }
       },
       getCommission() {
         try {
           let side = 0;
           if (this.recive + "-" + this.send.currency == this.tradePair) {
             side = 1;
           }
           let total = this.free_Margin * (side || this.get_depth.A) * 0.005;
           if (this.notCryptoCurrency.includes(this.spliting(this.tradePair, 1))) {
             return parseFloat(total).toFixed(2);
           } else {
             return this.formatfloat(parseFloat(parseFloat(total).toFixed(8)));
           }
         } catch (e) {
           console.log("getCommission", e);
           return 0;
         }
       },
       totalReceive() {
         try {
           let side = 0;
           if (this.recive + "-" + this.send.currency == this.tradePair) {
             side = 1;
           }
           let total = this.free_Margin * this.get_depth.A - this.getCommission * (side ? this.get_depth.A : 1);
           if (this.notCryptoCurrency.includes(this.recive)) {
             return parseFloat(total).toFixed(2);
           } else {
             return this.formatfloat(parseFloat(parseFloat(total).toFixed(8)));
           }
         } catch (e) {
           console.log("totalReceive", e);
           return 0;
         }
       },
     },
     watch: {
       tradingAccount(value) {
         this.getCurrency(value);
       },
       send(value) {
         let amount = this.formatfloat(value.amount);
         this.freeMargin = amount;
         this.free_Margin = this.floatingValue(amount * (25 / 100), value.currency);
         this.changeReciveCurr();
       },
       margin_list(value) {
         let changedSend = true;
         if (Object.keys(this.send).length > 0) {
           for (let key in value) {
             if (key == this.send.act_account_id && value[key].amount != 0) {
               this.send = value[key];
               changedSend = false;
             }
           }
         }
         if (changedSend) {
           if (this.$route.params.sendCurrency) {
             for (let key in value) {
               if (value[key].currency.toLowerCase().includes(this.$route.params.sendCurrency.toLowerCase())) {
                 this.send = value[key];
                 this.send.act_account_id = key;
               }
             }
           } else {
             let [firstKey] = Object.keys(value);
             this.send = value[firstKey];
             this.send.act_account_id = firstKey;
           }
         }
       },
       recive(value) {
         this.subscribe();
       },
       combinedCurrency(value) {
         if (this.tradePair == "" && this.send.currency) {
           this.changeReciveCurr();
         }
       },
     },
     methods: {
       marketpercent() {
         let currenctPrice = this.get_depth.A
         let lowValue = this.formatfloat(this.instruments[this.tradePair].LOW)
         let highValue = this.formatfloat(this.instruments[this.tradePair].HIGH)
         let calculate = ((currenctPrice - lowValue) / (highValue - lowValue)) * 100
         return calculate;
       },
       getCurrency(value) {
         if (value.length > 0 && value[0].subAccounts.length > 0) {
           this._runGetMarginInfo({
             globalParams: {
               account_id: this.tradingAccount[0].account_id,
             },
             localParams: {
               parameter: this,
               page: "exchange",
             },
           });
           if (value.length > 0 && this.orderList.records.length == 0) {
             let jsonData = {
               globalParams: {
                 account_id: value[0].account_id,
                 demo_live: value[0].demo_live,
               },
               localParams: {
                 parameter: this,
               },
             };
             this._runGetOrderList1(jsonData);
           }
         }
       },
       closeStep() {
         if (parseInt(this.step) == 2) {
           this.stopTimer();
         }
         this.step = "1";
       },
       marginSearch(margin_list) {
         if (this.searchSend == "") {
           return margin_list;
         } else {
           let data = {};
           for (let key in margin_list) {
             if (margin_list[key].currency.toLowerCase().includes(this.searchSend.toLowerCase())) {
               data[key] = margin_list[key];
             }
           }
           return data;
         }
       },
       formatfloat(num) {
         if (num) {
           num = parseFloat(num);
           return num.toFixed(8);
           // try {
           //   return math.format(num, {
           //     notation: "fixed"
           //   }) || "";
           // } catch (e) {
           //   try {
           //     return num.toFixed(8);
           //   } catch (e) {
           //     return "";
           //   }
           // }
         } else {
           return 0;
         }
       },
       ChangeSendData(data, act_account_id) {
         this.send = data;
         this.send.act_account_id = act_account_id;
       },
       checkImage(val) {
         return this.errImage.includes(val) ? false : true;
       },
       weightedMean(arrValues, arrWeights) {
         var result = arrValues.map(function(value, i) {
           var weight = arrWeights[i];
           var sum = value * weight;
           return [sum, weight];
         }).reduce(function(p, c) {
             return [p[0] + c[0], p[1] + c[1]];
           },
           [0, 0]);
         return result[0] / result[1];
       },
       handleImgErr(val) {
         var fullSrc = val.target.src.split(".");
         var src = fullSrc[fullSrc.length - 2].split("/");
         var img = src[src.length - 1];
         if (!this.errImage.includes(img)) {
           this.errImage.push(img);
         }
       },
       subscribe() {
         let dataArr2 = this.send.currency + "-" + this.recive;
         let dataArr1 = this.recive + "-" + this.send.currency;
         if (this.combinedCurrency.includes(dataArr1)) {
           this.tradePair = dataArr1;
           try {
             this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].subscribe([dataArr1]);
           } catch (e) {}
           this.tradePair = dataArr1;
         } else if (this.combinedCurrency.includes(dataArr2)) {
           this.tradePair = dataArr2;
           try {
             this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].subscribe([dataArr2]);
           } catch (e) {}
           this.tradePair = dataArr2;
         } else if (this.combinedCurrency.length > 0) {
           // console.log(dataArr2, dataArr1, this.combinedCurrency);
           this.tradePair = "";
           this.displayError("no key found", "error");
         }
       },
       changeReciveCurr() {
         if (this.uniqueCurrencyList(this.send).length > 0 || this.send.currency == this.recive) {
           if (this.$route.params.receiveCurrency) {
             this.recive = this.$route.params.receiveCurrency;
             delete this.$route.params.receiveCurrency;
           } else {
             if (!this.uniqueCurrencyList(this.send).includes(this.recive) || this.send.currency == this.recive) {
               if (this.send.currency == this.uniqueCurrencyList(this.send)[0]) {
                 this.recive = this.uniqueCurrencyList(this.send)[1];
               } else {
                 this.recive = this.uniqueCurrencyList(this.send)[0];
               }
             } else {
               this.subscribe();
             }
           }
         } else {
           this.subscribe();
         }
       },
       uniqueCurrencyList(val, search) {
         if (val != "" && val.currency && this.cryptoList.length > 0) {
           try {
             var unique = [];
             for (var key in this.cryptoList) {
               let data = this.cryptoList[key].isinid;
               if (data.includes("-") && data.split("-").includes(val.currency)) {
                 unique = unique.concat(data.split("-"));
               }
             }
             unique = [...new Set(unique)].sort().filter((val) => {
               return (!["XMR", "ZEC", "DASH", "XVG", "ZEN", "XRP", "BEAM"].includes(val.toUpperCase()) && val.currency != val);
             });
             if (search && search != "") {
               return unique.filter((val) => val.toLowerCase().includes(this.searchRecive.toLowerCase()));
             }
             return unique;
           } catch (e) {
             return [];
           }
         } else {
           return [];
         }
       },
       currencyListFunc(type) {
         if (type == "send") {
           if (this.searchSend == "") {
             return this.tradingAccount[0].subAccounts;
           } else {
             return this.tradingAccount[0].subAccounts.filter((val) => val.currency.toLowerCase().includes(this.searchSend.toLowerCase()));
           }
         } else if (type == "recive") {
           if (this.searchRecive == "") {
             return this.uniqueCurrency;
           } else {
             return this.uniqueCurrency.filter((val) => val.toLowerCase().includes(this.searchRecive.toLowerCase()));
           }
         }
       },
       submitFunc(step) {
         if (!this.get_depth.A) {
           return;
         }
         const _that = this;
         _that.submitted = true;
         let side = 1;
         if (this.recive + "-" + this.send.currency == this.tradePair) {
           side = 1;
         } else if (this.send.currency + "-" + this.recive == this.tradePair) {
           side = 0;
         }
         if (_that.get_depth && step == "1") {
           _that.$validator.validate().then((valid) => {
             if (valid && parseFloat(_that.freeMargin) >= parseFloat(_that.free_Margin)) {
               _that.currentPrice = _that.floatingValue(_that.get_depth.A, _that.recive);
               _that.totalCommission = _that.getCommission;
               _that.purchasedTotal = _that.totalReceive;
               _that.step = "2";
               _that.startTimer();
             } else {
               _that.displayError("You can buy maximum sell upto" + _that.freeMargin + " " + _that.send.currency, "error");
             }
           });
         } else if (step == "2") {
           let qty = _that.free_Margin;
           const tempOrderId = new Date().getTime();
           let orderJson = {
             symbol: _that.tradePair,
             quantity: qty,
             side: side,
             stop: 0,
             limit: 0,
             trail: 0,
             lifetime: "GTC",
             commentary: "Instant Fill",
             tempOrderId: tempOrderId,
             account_id: _that.tradingAccount[0].account_id,
             localParams: _that,
           };
           _that.orderPending = Object.assign({}, orderJson);
           _that.orderPending.free_Margin = _that.free_Margin;
           _that.orderPending.from = _that.send.currency;
           _that.orderPending.to = _that.recive;
           _that.orderPending.price = _that.currentPrice;
           _that.orderPending.commision = _that.totalCommission;
           _that.orderPending.estimatedPrice = _that.purchasedTotal;
           // console.log('orderJson===',orderJson)
           _that.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders["S_PF_PF"].placeOrder(orderJson);
           _that.stopTimer();
         }
       },
       floatingValue(total, currency) {
         try {
           if (this.notCryptoCurrency.includes(currency)) {
             return parseFloat(total).toFixed(2);
           } else {
             return this.formatfloat(parseFloat(parseFloat(total).toFixed(8)));
           }
           // return this.formatPrice(total,!this.notCryptoCurrency.includes(currency))
         } catch (e) {
           return 0;
         }
       },
       callMargin() {
         let _that = this;
         setTimeout(function() {
           _that._runGetMarginInfo({
             globalParams: {
               account_id: _that.tradingAccount[0].account_id,
             },
             localParams: {
               parameter: _that,
               page: "exchange",
             },
           });
         }, 3000);
       },
       successWs() {
         this.orderPlacedSuccess = true;
         let _that = this;
         let Timer = setInterval(function() {
           let orderMessage = localStorage.getItem("orderMessage");
           if (orderMessage) {
             let data = JSON.parse(orderMessage);
             if (data.tempOrderId == _that.orderPending.tempOrderId) {
               _that.orderPlacedSuccess = false;
               // _that.displayError(data.resp_msg, "success");
               _that.tempIdRecived = data;
               _that.step = "4";
               localStorage.removeItem("orderMessage");
               // _that.callMargin()
               clearInterval(Timer);
             }
           }
         }, 500);
       },
       startTimer() {
         let timer = 15;
         this.timer = 15;
         var _that = this;
         this.downloadTimer = setInterval(() => {
           if (timer <= 0) {
             clearInterval(_that.downloadTimer);
             _that.step = "3";
           }
           timer -= 1;
           _that.timer = timer;
         }, 1000);
       },
       stopTimer() {
         // clearInterval(this.downloadTimer);
         // this.timer = 0;
       },
       failedWs() {
         this.displayError("faild to Place order", "error");
         // console.log('failed')
       },
       displayError(getMessage, type) {
         /*this.$notify({
               group: 'foo',
               type: (type && type == null)?'error':type,
               text: getMessage,
               duration: 2000,
               closeOnClick: true,
               position: "center bottom"
             });*/
         var _that = this;
         try {
           _that.notification_msg = getMessage;
           _that.notification_type = type;
           setTimeout(function() {
             _that.notification_msg = "";
             _that.notification_type = "";
           }, 5000);
         } catch (e) {}
       },
       setPercentage(val) {
         this.percentage = val;
         this.free_Margin = this.freeMargin * (val / 100); //this.floatingValue(this.freeMargin * (val / 100), this.send.currency);
       },
       priceForSelectedCurrency(from, to) {
         try {
           if (this.combinedCurrency.includes(from + "-" + to) && this.instruments[from + "-" + to]) {
             return this.instruments[from + "-" + to].A;
           } else if (this.combinedCurrency.includes(to + "-" + from) && this.instruments[to + "-" + from]) {
             return 1 / this.instruments[to + "-" + from].A;
           } else {
             return 0;
           }
         } catch (e) {
           return 0;
         }
         /*if (this.get_depth_all({ send: { currency: from }, recive: to }).B) {
                   return this.get_depth_all({ send: { currency: from }, recive: to }).B;
                 } else {
                   return 0;
                 }*/
       },
       get_depth_all(obj) {
         try {
           this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
           return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArray(obj);
         } catch (ex) {
           return {};
         }
       },
       downloadTransactions() {
         let headerCols = [],
           data = [],
           filename = "";
         filename = "exchange_transactions";
         headerCols = Object.keys(this.orderList.records[0]);
         data = this.orderList.records;
         this.csvExport(data, headerCols, filename);
       },
       csvExport(data, headers, filename) {
         let csvData = headers.join(", ").replace(/_/g, " ").toUpperCase();
         csvData += "\n";
         data.map((row) => {
           headers.map((i, index) => {
             if (index < headers.length - 1) {
               csvData += `${row[i]}, `;
             } else {
               csvData += `${row[i]}\n`;
             }
           });
         });
         var hiddenElement = document.createElement("a");
         hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvData);
         hiddenElement.target = "_blank";
         hiddenElement.download = filename;
         hiddenElement.click();
       },
     },
     created() {
       // this.pageName("EXCHANGE");
       /*if (parseInt(this.accountSelected) == 1) {
                 this.getCurrency(this.socialAccount, 0);
             } else {
                 this.getCurrency(this.tradingAccount, 0);
             }*/
       this.getCurrency(this.tradingAccount);
       this._runCryptoList({
         globalParams: {},
         localParams: {
           parameter: this,
           page: "exchange",
         },
       });
       if (this.$route.query.conversion) {
         this.searchSend = this.$route.query.conversion
         let returnData = this.marginSearch(this.margin_list)
         this.ChangeSendData(Object.values(returnData), Object.keys(returnData))
         this.showSend = false
       }
       // this.getFirstMargin()
     },
     updated() {
       // if (this.showSend) {
       //   document.getElementById("sendSearch").focus();
       // } else if (this.showReceive) {
       //   document.getElementById("reciveSearch").focus();
       // }
     },
     mounted() {
       // const _that = this;
       // $(document).on("click", function(event) {
       //   if (!$(event.target).closest(".showReceive").length) {
       //     _that.showReceive = false;
       //   }
       //   if (!$(event.target).closest(".showSend").length) {
       //     _that.showSend = false;
       //   }
       // });
     },
   };
</script>