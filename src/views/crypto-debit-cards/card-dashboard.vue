<template>
    <div>
        <loader v-if="pageLoader"></loader>
        <div class="mid_scroll_content"> 
            <div class="pageContent border-0">
                <div class="card-dashboard " :class="burn ? 'cancelled' : ''">{{varChange}}
                    <div class="row">
                        <div class="col-lg-8 col-xl-7 col-xxl-8 col-xxxl-9" >
                            <div class="bg-white border round-sm cryptoCards position-relative mh-calc">
                               <div class="head-sec d-flex align-items-center justify-content-between flex-wrap mb-4 pb-1">
                                 <RouterLink class="d-flex align-items-center f-14 textcolor medium lh-1" to="/crypto-debit-cards">
                                    <img class="img-fluid mr-2" src="/assets/website/images/text-back.svg">
                                    Back
                                 </RouterLink>

                                  <div class="position-relative dropdown selectDropMenu historyselectmenu accountselectmenu" v-if="Object.keys(getCards).length > 0 && getCards.cards.length > 0">
                                    <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                                        <p class="mb-0 themecolor"> {{getCardDetails.name}}  **{{ getCardDetails.maskedCardNumber.substr(getCardDetails.maskedCardNumber.length - 4)}}</p>
                                        <feather type="chevron-down" class="ml-2" size="24px"></feather>
                                    </a>
                                    <ul class="dropdown-menu scrollbar" >
                                        <li v-for="list in getCards.cards" v-show="list.status.toLowerCase() !== 'closed'">
                                            <RouterLink class="lh-normal" type="button" :to="{path : 'card-dashboard', query:{cardId: list.id}}">
                                            <!-- <a href="javascript:void(0)" class="lh-normal" @click="cardTransactions(list.id) ; cardDetails(list.id)"> -->
                                                <p class="mb-0">{{list.name}} - {{ momentFunc(list.expiryData,"MM/YYYY","")}} - **{{ list.maskedCardNumber.substr(list.maskedCardNumber.length - 4)}}</p>
                                            </RouterLink>
                                        </li>
                                        <!-- <li><a href="javascript:void(0)" class="lh-normal"><p class="mb-0 themecolor medium">Kate Spade - 2/16 - **6583</p></a></li>
                                        <li><a href="javascript:void(0)" class="lh-normal"><p class="mb-0">Drake Lamar - 5/19 - **6583</p></a></li>
                                        <li><a href="javascript:void(0)" class="lh-normal"><p class="mb-0">Benny Blanco - 1/24 - **9857</p></a></li> -->
                                    </ul>
                                </div> 
                               </div>

                               <div class="cardSec" v-if="Object.keys(getCardDetails).length > 0 && Object.keys(card_account_details).length > 0">
                                    <div class="img-wrap align-self-center">
                                        <card-detail :card_account_details="cardImageJson" :page="'card-dashboard'" />
                                        <!-- <img class="d-block w-100 img-fluid" src="/assets/website/images/slidercard-front.png" alt="card image"> -->
                                    </div>
                                    <div class="content-sec">
                                     
                                        <div class="balance-sec d-flex flex-column-reverse flex-sm-row align-items-start justify-content-between">
                                            <div class="left-sec pt-1">
                                                <div class="imageToggle pb-3" v-if="card_account_details.currency.toLowerCase() !== 'eur'" :class="(currencyToggle) ? card_account_details.availableBalance.fiatCurrency.toLowerCase() : card_account_details.currency.toLowerCase()">
                                                    <input type="checkbox" v-model="currencyToggle" >
                                                </div>
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1">AVAILABLE BALANCE</p>
                                                <h2 class="green bold mb-3 pb-2" v-if="currencyToggle"> {{card_account_details.availableBalance.hFiatEquivalentBalance || ''}} {{card_account_details.availableBalance.fiatCurrency}}</h2>
                                                <h2 class="green bold mb-3 pb-2" v-else>{{card_account_details.availableBalance.hAmount}} {{card_account_details.currency}}</h2>
                                                 <!-- <a href="javascript:void(0)" class="f-14 text-underline p-0 secondarycolor">Show Card Details</a> -->
                                            </div>
                                            <RouterLink :to="{path : 'manage-card', query:{cardId:$route.query.cardId}}" class="cap_btn border-btn-secondary extra_small_btn f-14 text-nowrap">Wallet Balances</RouterLink>
                                        </div>
                                        <div class="infoSec mt-3">
                                            <div class="infoitem">
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1">CARDHOLDER NAME</p>
                                                <h5 class="textblack medium mb-0">{{getCardDetails.name}}</h5>
                                            </div> 
                                            <!-- <div class="infoitem">
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1">CARD NUMBER</p>
                                                <h5 class="textblack medium mb-0">**** {{getCardDetails.maskedCardNumber.substr(getCardDetails.maskedCardNumber.length - 4)}}</h5>
                                            </div> 
                                            <div class="infoitem">
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1">EXPIRY DATE</p>
                                                <h5 class="textblack medium mb-0"> {{ momentFunc(getCardDetails.expiryData,"MM/YYYY","") }}</h5>
                                            </div>  -->
                                            <div class="infoitem">
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1 d-flex align-items-center">LINKED WALLET <feather class="ml-1" type="info" size="12" /></p>
                                                <h5 class="textblack medium mb-0 d-flex align-items-center">
                                                    <img class="img-fluid mr-1" width="28" :src="'/assets/website/images/crypto_logos/'+getCardDetails.linkedAccountCurrency.toLowerCase() +'.png'" alt="">
                                                    {{getCardDetails.linkedAccountCurrency}}
                                                    <a href="#" class="d-flex" v-if="!cardPermission() && !burn" @click="conditionFuncOnFreeze({path : 'manage-card', query:{cardId:$route.query.cardId}}, 'linkedCard')"><feather class="ml-3 secondary" type="edit-2" size="18" /></a>
                                                </h5>
                                            </div> 

                                            <div class="infoitem">
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1">3DS Password</p>
                                                <h5 class="textblack medium mb-0 d-flex align-items-center"><sub>******</sub> <a class="d-flex" href="javascript:void(0)"   @click="conditionFuncOnFreeze({path : 'manage-card', query:{cardId:$route.query.cardId}}, '3dPass')" v-if="!burn"><feather class="ml-3 secondary" type="edit-2" size="18" /></a></h5>
                                            </div> 
                                        </div>
                                    </div>
                               </div>

                               <div class="transHistory">
                                    <div class="headSec d-block d-sm-flex align-items-center justify-content-between flex-wrap pt-5 mt-2">
                                        <h4 class="mb-0 pb-4">Transaction History</h4>
                                        <div class="d-block d-sm-flex align-items-center pb-4">
                                            <div class="border px-2 tableDate round-sm">
                                            <input type="date" class="border-0 textcolor" v-model="from" />
                                            </div>
                                            <div class="px-3 text-center py-2 py-sm-0">
                                            <p class="mb-0 themecolor medium">To</p>
                                            </div>
                                            <div class="border px-2 tableDate round-sm">
                                            <input type="date" class="border-0 textcolor" v-model="to" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="subHeadSec d-flex align-items-center justify-content-between flex-wrap mb-4">
                                        <ul class="nav nav-tabs cardsTab mb-0 " id="myTab" role="tablist">
                                            <li class="nav-item" @click="tab = 'all'">
                                              <a class="nav-link " :class="tab == 'all' ? 'active' : ''" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
                                            </li>
                                            <li class="nav-item" @click="tab = 'credit'">
                                              <a class="nav-link" :class="tab == 'credit' ? 'active' : ''" id="ins-tab" data-toggle="tab" href="#ins" role="tab" aria-controls="ins" aria-selected="false">Pay-ins</a>
                                            </li>
                                            <li class="nav-item" @click="tab = 'debit'">
                                              <a class="nav-link" :class="tab == 'debit' ? 'active' : ''" id="outs-tab" data-toggle="tab" href="#outs" role="tab" aria-controls="outs" aria-selected="false">Pay-outs</a>
                                            </li>
                                        </ul>

                                        <div class="filtersSec d-flex align-items-center">
                                            <div class="form-group position-relative searchTable mb-0">
                                                <input type="text" placeholder="Search..." class="form-control" v-model="search"/>
                                                <span class="searchIco" @click.prevent="searchFunc()">
                                                    <feather type="search" />
                                                </span>
                                            </div>

                                            <!-- <div class="d-flex align-items-center position-relative">
                                                <a class="icnBtn" @click.prevent="filters ^= true" href="javascript:void(0)">
                                                    <img src="/assets/website/images/filterIcn.svg" alt="Filter Icon" class="d-block" width="22" height="22" />
                                                </a>
                                                <div class="dropdown_menu filter_dropdown_menu dropdown_menu--animated" :class="{ show: filters }">
                                                    <div class="d-flex justify-content-between align-items-center px-3 pb-1 pb-md-2">
                                                    <p class="medium themecolor mb-0">Filters</p>
                                                    <div>
                                                    <a href="javascript:void(0);" class="redBG round-lg text-white px-3 f-11 mr-1 py-1"  >Cancel</a>
                                                    <a href="javascript:void(0);" class="secondaryBG round-lg text-white px-3 f-11 py-1" >Apply</a>
                                                    </div>
                                                    </div> 
                                                    <ul class="mb-0">
                                                    <li class="py-2 lightgrayBG">
                                                        <label class="customCheckbox mb-0 themecolor">Status <input type="checkbox"/>
                                                        <span class="checkmark"></span>
                                                        </label>
                                                        <div class="selectmenu filterselectmenu position-relative pt-1">
                                                        <a @click.prevent="thisdate ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center bg-white rounded">
                                                            <span class="mr-2" >Pending</span>
                                                            <feather type="chevron-down" class="ml-2" size="20px"></feather>
                                                        </a>
                                                        <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 scrollbar" :class="{ show: thisdate }">
                                                            <li><a href="javascript:void(0)">Status One</a></li>
                                                            <li><a href="javascript:void(0)">Status two</a></li>
                                                            <li><a href="javascript:void(0)">Status three</a></li>
                                                        </ul>
                                                        </div>
                                                    </li>
                                                    </ul>
                                                </div>
                                            </div> -->

                                            <button class="btn downoadBtn icnBtn" @click="downloadTransactions(getCardTransactions, 'Transactions')" v-if="!transLoader && Object.keys(getCardTransactions).length > 0 && getCardTransactions.records.length > 0">
                                                <img src="/assets/website/images/download-icon.svg" alt="Download Icon" class="d-block" width="22" height="22" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                                            <div class="itemsWrap scrollbar d-flex align-items-center justify-content-center" v-if="transLoader">
                                                <div id="loading" class=""></div>
                                            </div>
                                            <div v-else-if="!transLoader && Object.keys(getCardTransactions).length > 0 && getCardTransactions.records.length > 0">
                                                <div class="itemsWrap scrollbar" >
                                                    <div class="transItemWrap" v-for="(val, index) in getCardTransactions.records" :class="parseInt(cardDetailFlag) == parseInt(index) ? 'active' : ''" v-show="(tab == 'all') ? val.transType : (val.transType == tab)">
                                                        <div class="transItem">
                                                            <div class="left-sec">
                                                                <img class="arrow-img" src="/assets/website/images/red-up.svg" v-if="val.transType == 'debit'"/>
                                                                <img class="arrow-img" src="/assets/website/images/green-down.svg" v-else/>
                                                                <h5 class="mb-1">{{val.amount}} {{val.currency}}</h5>
                                                                <p class="f-13 mb-0 d-flex align-items-center" >
                                                                    <label v-if="val.currency.toLowerCase() !== 'eur'">{{val.eurAmount}} EUR </label>
                                                                    <span v-if="val.txType ==  'ON_CHAIN_DEPOSIT_CONFIRMED'">Crypto Deposit</span>
                                                                    <span v-else-if="val.txType ==  'SEPA_PAYIN_COMPLETED'">Fiat Deposit</span>
                                                                    <span v-else-if="val.txType ==  'CARD_AUTHORIZATION'">Card Transaction</span>
                                                                    <span v-else-if="val.txType ==  'CARD_AUTHORIZATION_DECLINED'">Transaction Declined</span>
                                                                    <span v-else-if="val.txType ==  'CARD_AUTHORIZATION_REVERSAL'">Refund Transaction</span>
                                                                    <span v-else>{{(val.txType.includes("_") ? val.txType.replaceAll("_", " ") : val.txType)}}</span>
                                                                </p>
                                                            </div>
                                                            
                                                            <div class="right-sec d-flex align-items-center badges">
                                                                <p class="mb-0" v-if="val.timestamp != null">{{momentFunc(val.timestamp,"YYYY/MM/DD","")}}</p>
                                                                <p class="mb-0" v-else>0000/00/00</p>
                                                                <!-- <p class="mb-0" >{{val.memo != null ? val.memo : '-'}}</p> -->
                                                                <!-- <span class="round-lg border-0 badge-item yellow">Pending</span>
                                                                <span class="round-lg border-0 badge-item red"><feather type="info" size="18"/> Failed</span> -->
                                                               
                                                                <span class="round-lg border-0 badge-item " :class="transactionStatusColor[parseInt(val.status)]" v-if="val.status !== null">{{transactionStatus[parseInt(val.status)]}}</span>
                                                                <span class="round-lg border-0 badge-item " v-else>-</span>
                                                                <!-- transactionStatusColor : {0: 'yellow', 1: 'green', 2: 'red', 3: 'red'} -->
                                                                <feather type="chevron-down" class="downArrow" size="20px" @click="cardDetailFlagFunc(index)" ></feather>
                                                            </div>
                                                        </div> 
                                                        <div class="itemBody" >
                                                            <div class="body-inner">
                                                                <div class="row" v-if="val.txType ==  'ON_CHAIN_DEPOSIT_CONFIRMED'">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Id</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.trans_id.substring(0, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.trans_id,'data has been copied')"></feather></p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Pay In</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">- </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Hash</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.txHash.substring(0, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.txHash,'data has been copied')"></feather></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div class="row" v-else-if="val.txType ==  'CARD_AUTHORIZATION'">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Number</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.trans_id.substring(0, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.trans_id,'data has been copied')"></feather></p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Comment</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" data-toggle="tooltip" data-placement="bottom" :title="val.memo" data-html="true">{{val.memo.substring(0, 12)}}... <feather type="copy" size="16px" @click="handleCopy(val.memo,'data has been copied')"></feather></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Name</p> 
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantName">{{val.merchantName}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantName,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Id</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantId">{{val.merchantId}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantId,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div class="row" v-else-if="val.txType ==  'APPLICATION_FEE'">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Number</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.trans_id.substring(0, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.trans_id,'data has been copied')"></feather></p>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Comment</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" data-toggle="tooltip" data-placement="bottom" :title="val.memo" data-html="true">{{val.memo.substring(0, 12)}}... <feather type="copy" size="16px" @click="handleCopy(val.memo,'data has been copied')"></feather></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="row" v-else-if="val.txType ==  'SEPA_PAYIN_COMPLETED'">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Sender Name</p> 
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.bankingSenderName">{{val.bankingSenderName}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.bankingSenderName,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Fee</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" >-</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Sender IBAN</p> 
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.bankingSenderIban">{{val.bankingSenderIban}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.bankingSenderIban,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="row" v-else-if="val.txType ==  'CARD_AUTHORIZATION_DECLINED'">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Card</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.cardId.substring(0, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.cardId,'data has been copied')"></feather></p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Reason</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" data-toggle="tooltip" data-placement="bottom" :title="val.memo" data-html="true">{{val.memo.substring(0, 12)}}... </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Id </p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.trans_id.substring(0, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.trans_id,'data has been copied')"></feather></p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Merchant Name</p> 
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantName">{{val.merchantName}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantName,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div class="row" v-else-if="val.txType ==  'CARD_AUTHORIZATION_REVERSAL'">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Id </p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.relatedCardTransactionId ? val.relatedCardTransactionId.substring(0, 12) : '-'}} <feather type="copy" size="16px" @click="handleCopy(val.relatedCardTransactionId,'data has been copied')"></feather></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">From</p> 
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantName">{{val.merchantName}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantName,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div class="row" v-else>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Number</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.trans_id.substring(0, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.trans_id,'data has been copied')"></feather></p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Comment</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" data-toggle="tooltip" data-placement="bottom" :title="val.memo" data-html="true">{{val.memo.substring(0, 12)}}... </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Confirmation Method</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">- </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Name</p> 
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantName">{{val.merchantName}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantName,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Id</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantId">{{val.merchantId}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantId,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    

                                                    
                                               
                                                    <!-- <div class="transItemWrap" v-for="(val, index) in getCardTransactions.records" :class="parseInt(cardDetailFlag) == parseInt(index) ? 'active' : ''" v-show="tab == 'credit' && val.transType == 'credit'">
                                                        <div class="transItem">
                                                            <div class="left-sec">
                                                                <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                                                <h5 class="mb-1">{{val.amount}} {{val.currency}}</h5>
                                                               <p class="f-13 mb-0 d-flex align-items-center" ><label v-if="val.currency.toLowerCase() !== 'eur'">{{val.eurAmount}} EUR </label><span>{{(val.txType.includes("_") ? val.txType.replace("_", " ") : val.txType)}}</span></p>
                                                            </div>
                                                            
                                                            <div class="right-sec d-flex align-items-center badges">
                                                                <p class="mb-0" v-if="val.timestamp != null">{{momentFunc(val.timestamp,"YYYY/MM/DD","")}}</p>
                                                                <p class="mb-0" v-else>0000/00/00</p>
                                                                 <p class="mb-0" >{{val.memo != null ? val.memo : '-'}}</p> 
                                                                <span class="round-lg border-0 badge-item yellow">Pending</span>
                                                                <span class="round-lg border-0 badge-item red"><feather type="info" size="18"/> Failed</span>
                                                                <span class="round-lg border-0 badge-item green">Complete</span>
                                                                <feather type="chevron-down" class="downArrow" size="20px" @click="cardDetailFlagFunc(index)" ></feather>
                                                            </div>
                                                        </div> 
                                                        <div class="itemBody" >
                                                            <div class="body-inner">
                                                                <div class="row">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Number</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.trans_id.substring(1, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.trans_id,'data has been copied')"></feather></p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Comment</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" data-toggle="tooltip" data-placement="bottom" :title="val.memo" data-html="true">{{val.memo.substring(1, 12)}}... </p>
                                                                            </div>
                                                                             <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Amount</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">$64 <feather type="copy" size="16px"></feather></p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Merchant Transanction Currency</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">EURO</p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Linked Account Id</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">USERNAME <feather type="copy" size="16px"></feather></p>
                                                                            </div> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Confirmation Method</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">Password </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Name</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantName">{{val.merchantName}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantName,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Id</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantId">{{val.merchantId}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantId,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                              
                                                    <div class="transItemWrap" v-for="(val, index) in getCardTransactions.records" :class="parseInt(cardDetailFlag) == parseInt(index) ? 'active' : ''" v-show="tab == 'debit' && val.transType == 'debit'">
                                                        <div class="transItem">
                                                            <div class="left-sec">
                                                                <img class="arrow-img" src="/assets/website/images/red-up.svg"/>
                                                                <h5 class="mb-1">{{val.amount}} {{val.currency}}</h5>
                                                                <p class="f-13 mb-0 d-flex align-items-center" ><label v-if="val.currency.toLowerCase() !== 'eur'">{{val.eurAmount}} EUR </label><span>{{(val.txType.includes("_") ? val.txType.replace("_", " ") : val.txType)}}</span></p>
                                                            </div>
                                                            
                                                            <div class="right-sec d-flex align-items-center badges">
                                                                <p class="mb-0" v-if="val.timestamp != null">{{momentFunc(val.timestamp,"YYYY/MM/DD","")}}</p>
                                                                <p class="mb-0" v-else>0000/00/00</p>
                                                               
                                                                <span class="round-lg border-0 badge-item green">Complete</span>
                                                                <feather type="chevron-down" class="downArrow" size="20px" @click="cardDetailFlagFunc(index)" ></feather>
                                                            </div>
                                                        </div> 
                                                        <div class="itemBody" >
                                                            <div class="body-inner">
                                                                <div class="row">
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Transaction Number</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">{{val.trans_id.substring(1, 12)}} <feather type="copy" size="16px" @click="handleCopy(val.trans_id,'data has been copied')"></feather></p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Comment</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" data-toggle="tooltip" data-placement="bottom" :title="val.memo" data-html="true">{{val.memo.substring(1, 12)}}... </p>
                                                                            </div>
                                                                           
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 col-xxl-6">
                                                                        <div class="inner-sec">
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Confirmation Method</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13">Password </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Name</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantName">{{val.merchantName}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantName,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            <div class="detailsRow">
                                                                                <p class="f-13 semibold themecolor mb-0">Recipient Id</p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-if="val.merchantId">{{val.merchantId}} <feather type="copy" size="16px" @click.prevent="handleCopy(val.merchantId,'data has been copied')"></feather></p>
                                                                                <p class="valueText mb-0 textcolor text-right f-13" v-else>- </p>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> -->
                                                </div>
                                                <pagination :totalRecords="getCardTransactions.totalRecords" :limit="'10'" :pageNo="page" v-if=" 'totalRecords' in getCardTransactions && getCardTransactions.totalRecords > 10 "></pagination>
                                            </div>
                                            <div class="itemsWrap scrollbar" v-else>
                                                <div class="noDataWrap" >
                                                    <img class="img-fluid" src="/assets/website/images/no-data.png" alt="Icon">
                                                    <p>No Records</p>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        <!-- <div class="tab-pane fade" id="ins" role="tabpanel" aria-labelledby="ins-tab">
                                            <div class="itemsWrap scrollbar">
                                                <div class="transItem">
                                                    <div class="left-sec">
                                                        <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                                        <h5 class="mb-1">€156.01 EUR</h5>
                                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>Top-Up Card</span></p>
                                                    </div>
                                                    <div class="right-sec d-flex align-items-center badges">
                                                        <p class="mb-0">2022/02/10</p>
                                                        <span class="round-lg border-0 badge-item yellow">Pending</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="outs" role="tabpanel" aria-labelledby="outs-tab">
                                            <div class="itemsWrap scrollbar">
                                                <div class="transItem">
                                                    <div class="left-sec">
                                                        <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                                        <h5 class="mb-1">€156.01 EUR</h5>
                                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>Top-Up Card</span></p>
                                                    </div>
                                                    <div class="right-sec d-flex align-items-center badges">
                                                        <p class="mb-0">2022/02/10</p>
                                                        <span class="round-lg border-0 badge-item yellow">Pending</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                               </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-xl-5 col-xxl-4 col-xxxl-3">
                            <div class="right-sec">
                                <div class="bg-white border round-sm cryptoCards position-relative payments-card">
                                    <div class="btns-sec d-flex align-items-center justify-content-between" v-if="!cardPermission()">
                                        <RouterLink class="cap_btn border-btn-secondary round-sm d-flex align-items-center justify-content-center" :to="{path : 'card-withdraw', query:{cardId:$route.query.cardId}}">
                                            <svg class="mr-2" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1M21 5V1M21 1H17M21 1L16 6" stroke="#7D7BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Withdraw
                                        </RouterLink>  
                                        <a href="#" class="cap_btn secondaryBG large_btn round-sm d-flex align-items-center justify-content-center mb-0"   @click="conditionFuncOnFreeze({path : 'card-top-up', query:{cardId:$route.query.cardId}}, 'topUpCard')" :class="burn ? 'disabled' : ''" >
                                            <svg class="mr-2" width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M27.2203 13.1897C26.7917 13.1897 26.441 13.5403 26.441 13.969V20.024C26.441 22.2449 24.633 24.0528 22.4121 24.0528H5.58744C3.36649 24.0528 1.55856 22.2449 1.55856 20.024V7.91394C1.55856 5.693 3.36649 3.88507 5.58744 3.88507H13.9998C14.4284 3.88507 14.779 3.53439 14.779 3.10579C14.779 2.67718 14.4284 2.32651 13.9998 2.32651H5.58744C2.50539 2.32651 0 4.83189 0 7.91394V20.024C0 23.106 2.50539 25.6114 5.58744 25.6114H22.4121C25.4942 25.6114 27.9995 23.106 27.9995 20.024V13.969C27.9995 13.5403 27.6489 13.1897 27.2203 13.1897Z" fill="white"/>
                                                <path d="M19.405 6.35017L22.2572 9.20233V1.16795C22.2572 0.739348 22.6079 0.388672 23.0365 0.388672C23.4651 0.388672 23.8157 0.739348 23.8157 1.16795V9.20233L26.6679 6.35017C26.8199 6.19821 27.0186 6.12028 27.2173 6.12028C27.416 6.12028 27.6147 6.19821 27.7667 6.35017C28.0706 6.65409 28.0706 7.14893 27.7667 7.45285L23.5897 11.6337C23.5547 11.6688 23.5118 11.7038 23.469 11.7311C23.4495 11.7428 23.4261 11.7545 23.4066 11.7662C23.3832 11.7779 23.3599 11.7934 23.3326 11.8051C23.3053 11.8168 23.278 11.8207 23.2508 11.8285C23.2274 11.8363 23.2079 11.8441 23.1845 11.848C23.0832 11.8675 22.978 11.8675 22.8806 11.848C22.8572 11.8441 22.8377 11.8363 22.8144 11.8285C22.7871 11.8207 22.7598 11.8129 22.7364 11.8051C22.7092 11.7934 22.6858 11.7817 22.6624 11.7662C22.6429 11.7545 22.6195 11.7467 22.6001 11.7311C22.5572 11.7038 22.5182 11.6688 22.4793 11.6337L18.3023 7.45285C17.9984 7.14893 17.9984 6.65409 18.3023 6.35017C18.6062 6.04625 19.1011 6.04625 19.405 6.35017Z" fill="white"/>
                                                <path d="M14.0002 19.5341C14.4288 19.5341 14.7795 19.1834 14.7795 18.7548V14.7493H18.785C19.2136 14.7493 19.5643 14.3986 19.5643 13.97C19.5643 13.5414 19.2136 13.1907 18.785 13.1907H14.7795V9.18522C14.7795 8.75662 14.4288 8.40594 14.0002 8.40594C13.5716 8.40594 13.2209 8.75662 13.2209 9.18522V13.1907H9.21542C8.78682 13.1907 8.43614 13.5414 8.43614 13.97C8.43614 14.3986 8.78682 14.7493 9.21542 14.7493H13.2209V18.7548C13.2209 19.1834 13.5716 19.5341 14.0002 19.5341Z" fill="white"/>
                                                </svg>
                                            Top up Card
                                        </a>
                                    </div>


                                    <div>
                                        <div class="headsec d-flex align-items-center justify-content-between flex-wrap mt-4 pt-2">
                                            <h4 class="mb-0">Payments</h4>  
                                            <div class="position-relative dropdown selectDropMenu historyselectmenu miniTimeSelect">
                                                <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                                                    <p class="mb-0">{{time_frame.charAt(0).toUpperCase() + time_frame.slice(1)}}</p>
                                                    <feather type="chevron-down" class="ml-2" size="20px"></feather>
                                                </a>
                                                <ul class="dropdown-menu scrollbar">
                                                    <li @click="time_frameFunc('daily')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="time_frame == 'daily' ? 'themecolor' : ''">Daily</p></a></li>
                                                    <li @click="time_frameFunc('weekly')"><a href="javascript:void(0)" class="lh-normal"><p class=" mb-0" :class="time_frame == 'weekly' ? 'themecolor' : ''">Weekly</p></a></li>
                                                    <li @click="time_frameFunc('monthly')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="time_frame == 'monthly' ? 'themecolor' : ''">Monthly</p></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- <loader class="position-absolute w-100" v-show="pageLoader"></loader> -->
                                        <div class="itemsWrap scrollbar d-flex align-items-center justify-content-center mt-5" style="width: 100%; height: 207px" v-if="chartLoader">
                                            <div id="loading" class=""></div>
                                        </div>
                                        <div class="chart-wrap text-center mt-5" v-show="!chartLoader && getChartData.length > 0">
                                            <div class="d-flex align-items-center justify-content-between position-relative" id="chartdiv2" style="width: 100%; height: 207px" ></div>
                                        </div>
                                        <div class="itemsWrap  mt-5" style="width: 100%; height: 207px" v-if="!chartLoader && getChartData.length == 0">
                                            <div class="noDataWrap" >
                                                <img class="img-fluid" src="/assets/website/images/no-data.png" alt="Icon">
                                                <p>No Records</p>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>

                                <div class="bg-white border round-sm cryptoCards position-relative limit-card">
                                    <div class="headsec d-flex align-items-center justify-content-between flex-wrap">
                                        <h4 class="mb-0 headingLabel">Card Limit <span v-if="parseInt(card_users_by_id.current_tier) >1">Tier-2</span><span v-else>Tier-1</span></h4>  
                                        <div class="position-relative dropdown selectDropMenu historyselectmenu miniTimeSelect" v-if="limitTransType == 'out'">
                                            <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                                                <p class="mb-0">{{limit.charAt(0).toUpperCase() + limit.slice(1)}}</p>
                                                <feather type="chevron-down" class="ml-2" size="20px"></feather>
                                            </a>
                                            <ul class="dropdown-menu scrollbar" >
                                                <li @click="limitFunc('daily')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="limit == 'daily' ? 'themecolor' : ''">Daily</p></a></li>
                                                <li @click="limitFunc('weekly')"><a href="javascript:void(0)" class="lh-normal"><p class=" mb-0" :class="limit == 'weekly' ? 'themecolor' : ''">Weekly</p></a></li>
                                                <li @click="limitFunc('monthly')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="limit == 'monthly' ? 'themecolor' : ''">Monthly</p></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <ul class="nav nav-tabs cardsTab mb-0 mini mt-3 pt-0" id="myTab" role="tablist">
                                       <!--  <li class="nav-item" @click="limitTransType = 'in'; limit = 'daily'; limitFunc('daily')">
                                            <a class="nav-link " :class="limitTransType == 'in' ? 'active' : ''" id="payin-tab" data-toggle="tab" href="#payin" role="tab" aria-controls="payin" aria-selected="true">Withdrawal</a>
                                        </li> -->
                                        <li class="nav-item" @click="limitTransType = 'in'; limit = 'daily'; limitFunc('daily')">
                                            <a class="nav-link " :class="limitTransType == 'in' ? 'active' : ''" id="payin-tab" data-toggle="tab" href="#payin" role="tab" aria-controls="payin" aria-selected="true">Pay-In</a>
                                        </li>
                                        <li class="nav-item" @click="limitTransType = 'out'; limit = 'daily'; limitFunc('daily')">
                                            <a class="nav-link" :class="limitTransType == 'out' ? 'active' : ''" id="payin-tab" data-toggle="tab" href="#payin" role="tab" aria-controls="payin" aria-selected="false">Pay-Out</a>
                                        </li>
                                    </ul>

                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="payin" role="tabpanel" aria-labelledby="payin-tab">
                                            <div class="progress mt-4" v-if="limitTransType == 'in'">
                                                <div class="progress-bar "  :class="(marketpercent() > 70) ? 'redcolor ' : (marketpercent() < 70 && marketpercent() > 50 ? ' yellowcolor' : 'greencolor')" role="progressbar"  :style="{ width: marketpercent()+'%'}" ></div>
                                            </div>
                                            <div class="progress mt-4" v-else>
                                                <div class="progress-bar "  :class="(marketpercent() == 100) ? 'greencolor' : (marketpercent() < 50 ? 'redcolor' : 'yellowcolor')" role="progressbar"  :style="{ width: marketpercent()+'%'}" ></div>
                                            </div>
                                            
                                            <p class="medium my-3 pb-3" v-if="parseInt(card_users_by_id.current_tier) == 1 && limitTransType == 'in'">€{{(parseFloat(totalBalance) - parseFloat(availableBalance))/100}}  {{limitCurrency}} Remaining </p>
                                            <p class="medium my-3 pb-3" v-else-if="parseInt(card_users_by_id.current_tier) > 1 && limitTransType == 'in'">Unlimited {{limitCurrency}} Remaining </p>
                                             <p class="medium my-3 pb-3" v-else>€{{availableBalance}} {{limitCurrency}} Remaining </p>
                                        </div>
                                        <!-- <div class="tab-pane fade" id="payout" role="tabpanel" aria-labelledby="payout-tab">
                                            <div class="progress mt-4">
                                                <div class="progress-bar yellowcolor" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p class="medium my-3 pb-3">€3218 EUR Remaining</p>
                                        </div> -->
                                    </div>
                                    <div class="text-right" v-if="parseInt(card_users_by_id.current_tier) == 1">
                                        <RouterLink class="semibold themecolor text-underline" :class="burn ? 'disabled' : ''"   :to="{path : 'upgrade-limit', query:{availableBalance: availableBalance, limitCurrency:limitCurrency, totalBalance: totalBalance, cardId: $route.query.cardId}}">Upgrade Limit</RouterLink>
                                    </div>
                                </div>

                                <div class="bg-white border round-sm cryptoCards position-relative manage-card">
                                    <h4 class="mb-0">Manage Card</h4> 
                                    <div class="d-flex align-items-center justify-content-between my-4">
                                        <h5 class="mr-3 medium textcolor mb-0">Block/Unblock</h5>
                                        <label class="toggleSwitch"><input type="checkbox" name="freeze" value="true" v-model="freeze" @change="freezePopup = '1'"><span class="slider round"></span></label>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between" v-if="!cardPermission() && !burn">
                                        <h5 class="mr-3 medium textcolor mb-0">Burn Card</h5>
                                        <label class="toggleSwitch"><input type="checkbox" name="burn" value="false" v-model="burn" @change="freezePopup = '2'"><span class="slider round"></span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="fa-password-two" role="dialog" aria-labelledby="fa-password-two" aria-hidden="true" v-if="freezePopup != ''">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content googleAuthenticationModal">
                <div class="modal-header border-0 d-block text-right">
                    <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                    <feather type="x" size="22px"></feather>
                    </a>
                </div>
                <Form @submit="verifyQrCode()" ref="regform">
                    <div class="modal-body pt-0">
                        <div class="mb-4">
                        <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                        <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
                        </div>
                        <div class="form-group">
                            <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required" />
                            <ErrorMessage name="otp" class="text-danger" />
                        </div>
                        
                    </div>
                
                    <div class="modal-footer justify-content-center pt-4 border-0">
                        <input type="submit" class="cap_btn blue px-4 large_btn mb-0" value="Submit"> 
                    </div>
                </Form>
                </div>
            </div>
        </div>

        <!-- Change Password modal -->
        <div class="modal" tabindex="-1" id="change-password" role="dialog" aria-labelledby="change-password" aria-hidden="true" v-if="editPasswordPopup == 1">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0 d-block text-right pb-0 lh-1">
                        <a href="javascript:void(0);" class="close d-inline-flex p-0" data-dismiss="modal" aria-label="Close" @click="reset()">
                        <feather type="x" size="22px"></feather>
                        </a>
                    </div>
                    <div class="modal-body pt-0">
                        <h3 class="themecolor mb-4 pb-2">Change Password</h3>
                        <!-- <form class="w-100"> -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">New Password</label> 
                                        <input type="text" placeholder="randompass" class="form-control" name="password"  v-model="password">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Confirm Password</label>
                                        <input type="text" placeholder="newpass" class="form-control" name="confirmPassword"  v-model="confirmPassword">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Confirm 2FA</label>
                                        <input type="text" placeholder="1234" class="form-control" name="password2fa"  v-model="password2fa">
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-2 text-center">
                                <button class="cap_btn blue px-4 large_btn mb-2"  @click="editPasswordFunc()">Submit</button>
                            </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- change Password modal seccessfully  -->
        <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" v-if="editPasswordPopup == 2">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <div class="img-wrap mt-4">
                            <img width="65" height="65" class="img-fluid" src="/assets/website/images/checkIcon.svg" alt="check icon">
                        </div>
                        <h3 class="text-center medium d-block lh-normal mb-4 pb-2 mt-4">Password changed successfully</h3>
                        <button class="cap_btn large_btn mb-4 mx-auto" @click="reset()">Okay</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" v-if="freezeConditions">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <div class="img-wrap mt-4">
                            <img width="65" height="65" class="img-fluid" src="/assets/website/images/sessionOut.svg" alt="check icon">
                        </div>
                        <h3 class="text-center medium d-block lh-normal mb-4 pb-2 mt-4">This action cannot be performed as the card is blocked.</h3>
                        <button class="cap_btn large_btn mb-4 mx-auto" @click="freezeConditions = false">Okay</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card Details modal -->
        <!-- <div class="modal" tabindex="-1" id="change-password" role="dialog" aria-labelledby="change-password" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0 d-block text-right pb-0 lh-1">
                        <a href="javascript:void(0);" class="close d-inline-flex p-0" data-dismiss="modal" aria-label="Close">
                        <feather type="x" size="22px"></feather>
                        </a>
                    </div>
                    <div class="modal-body pt-0">
                        <h3 class="themecolor mb-4 pb-2">Details of My Card</h3>
                        <form class="w-100">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mb-4">
                                        <label class="labeltext" value="1234-5678-9876-5432">Card Number</label>
                                        <div class="iconField">
                                            <input type="text" placeholder="1234" class="form-control" value="1234-5678-9876-5432" readonly>
                                            <feather class="copyIcon" type="copy" size="23px"></feather>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Expiration date</label> 
                                        <div class="iconField">
                                            <input type="text" placeholder="12/06" class="form-control" value="12/06" readonly>
                                            <feather class="copyIcon" type="copy" size="23px"></feather>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">CVV</label>
                                        <div class="iconField">
                                            <input type="text" placeholder="12/06" class="form-control" value="12/06" readonly>
                                            <feather class="copyIcon" type="copy" size="23px"></feather>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Address</label>
                                        <input type="text" placeholder=" 52 Kyriakou Matsi 2409 Egkomi" class="form-control" value="52 Kyriakou Matsi 2409 Egkomi" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">City</label>
                                        <input type="text" placeholder="Nicosia" class="form-control" value="Nicosia" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Country</label> 
                                        <input type="text" placeholder="Cyprus" class="form-control" value="Cyprus" readonly>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Pincode</label>
                                        <input type="text" placeholder="2003" class="form-control" value="2003" readonly>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
 
 </template>
 <script>
    // import "https://www.vault.striga.eu/web/sandbox/v1.1/client.min.js";
    // import "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
    import { RouterLink } from 'vue-router';
    import { cardsMixins } from "@/plugins/cards";
    import depositWithdrawalMixins from "@/plugins/depositWithdrawal";
    import moment from "moment";
    import cardDetail from "./card-detail.vue";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    am4core.useTheme(am4themes_animated);
    export default {
        name: "card-dashboard",
        mixins: [cardsMixins, depositWithdrawalMixins],
        data() {
          return {
            pageName: 'card-dashboard',
            cardImageJson: {},
            filters: false,
            thisdate: false,
            pageLoader: false,
            transLoader: false,
            chartLoader: false,
            getCardTransactions: {},
            getCardDetails: {},

            freeze: false,
            burn: false,
            freezePopup: '',
            otp: '',
            tab : 'all',

            limit: 'daily',
            limitTransType: 'in',
            availableBalance: 0,
            totalBalance : 0,
            limitCurrency : 'EUR',
            getCards : {},
            cardIds : '',

            currencyToggle: true,

            editPasswordPopup : '',
            password : '',
            confirmPassword : '',
            password2fa : '',
            cardDetailFlag: '-1',

            search: "",
            from: "",
            to: "",

            getChartData: [],
            time_frame: "daily" ,

            page: 1,
            freezeConditions : false,

            transactionStatus : {0: 'pending', 1: 'completed', 2: 'declined', 3: 'reversal'},
            transactionStatusColor : {0: 'yellow', 1: 'green', 2: 'red', 3: 'red'}

            // cssCurrencyToggleIcon = ['btc' ,'usdc' ,'bnb' ,'usdt' ,'eth' ,'pol']
          };
        },
         components: {Form, Field, ErrorMessage, cardDetail  },
        watch: {
          tab: function(val) {
            this.cardTransactions();
          },
          to: function(val) {
            if (this.from != "" && this.to == "") {
              this.cardTransactions();
            } else if (this.from == "" && this.to == "") {
              this.cardTransactions();
            }else if (this.from != "" && this.to != "") {
              let from = new Date(this.from);
              let to = new Date(this.to);

              if(to > from){
                this.cardTransactions();
              }else{
                this.$notify({
                  text: "Enter valid date",
                  duration: 10000,
                  pauseOnHover: true,
                  type: "error",
                });
              }
            } else {
              this.$notify({
                text: "Select from date",
                duration: 10000,
                pauseOnHover: true,
                type: "error",
              });
            }
          },
          from: function(val) {
            if (this.to != "") {
              this.cardTransactions();
            } else if (this.from == "" && this.to == "") {
              this.cardTransactions();
            }
          },
        },
        computed:{
            varChange(){
                // console.log(this.$route.query.cardId,'varchange innnnn ', this.cardIds)
                if(this.$route.query.cardId != this.cardIds) {
                    this.cardIds = this.$route.query.cardId
                    // this.cardTransactions('');
                    this.cardDetails('');
                } 
            }
        },
        methods: {
            conditionFuncOnFreeze(getPath, getModule){
                if(getModule == 'topUpCard'){
                    if(this.getCardDetails.status.toLowerCase() == 'blocked'){
                        this.freezeConditions = true
                    }else{
                        this.$router.push(getPath)
                    }
                }else if(getModule == 'linkedCard'){
                    if(this.getCardDetails.status.toLowerCase() == 'blocked'){
                        this.freezeConditions = true
                    }else{
                        this.$router.push(getPath)
                    }
                }else if(getModule == '3dPass'){
                    if(this.getCardDetails.status.toLowerCase() == 'blocked'){
                        
                        this.freezeConditions = true
                    }else{
                        this.editPasswordPopup = 1
                    }
                }
            },
            downloadTransactions(getData, getFileName) {
                let headerCols = [],
                data = [],
                download_data_send = [];
                download_data_send = getData.records;
                if (download_data_send.length > 0) {
                    for(let i=0 ;i<=download_data_send.length-1 ; i++){
                        if(download_data_send[i].txType == 'CARD_AUTHORIZATION_REVERSAL'){
                            data.push({
                                "Card Transaction Type"   :  (download_data_send[i].txType.includes("_") ? download_data_send[i].txType.replace("_", " ") : download_data_send[i].txType) ,
                                "Transaction Amount"   : download_data_send[i].amount ,
                                "Currency Used"   : download_data_send[i].currency ,

                                "Transaction Number"   : '-' , 
                                'Transaction Id' :  download_data_send[i].relatedCardTransactionId,
                                'PayIn' :  '-' ,
                                'Transaction Hash' :  download_data_send[i].txHash ,
                                'From' :  download_data_send[i].merchantName,
                                "Comment"  : '-',  
                                "Confirmation Method"  : '-' , 
                                'Recipient Name' : '-',
                                'Recipient Id' : '-',
                                'Confirmation Method' : '-',
                                "Card"   : '-' , 
                                'Reason' :  '-',
                                'Sender Name' : '-',
                                'Fee' : '-',
                                'Sender IBAN' : '-',
                                "Date & Time"  : this.momentFunc(download_data_send[i].timestamp,"YYYY/MM/DD","") ,
                            })
                        }else if(download_data_send[i].txType == 'CARD_AUTHORIZATION_DECLINED'){
                            data.push({
                                "Card Transaction Type"   :  (download_data_send[i].txType.includes("_") ? download_data_send[i].txType.replace("_", " ") : download_data_send[i].txType) ,
                                "Transaction Amount"   : download_data_send[i].amount ,
                                "Currency Used"   : download_data_send[i].currency ,

                                "Transaction Number"   : '-' , 
                                'Transaction Id' :  download_data_send[i].trans_id,
                                'PayIn' :  '-' ,
                                'Transaction Hash' :  download_data_send[i].txHash ,
                                'From' :  '-',
                                "Comment"  : '-',  
                                "Confirmation Method"  : '-' , 
                                'Recipient Name' : download_data_send[i].merchantName,
                                'Recipient Id' : '-',
                                'Confirmation Method' : '-',

                                "Card"   : download_data_send[i].cardId , 
                                'Reason' :  download_data_send[i].memo,
                                'Sender Name' : '-',
                                'Fee' : '-',
                                'Sender IBAN' : '-',
                                "Date & Time"  : this.momentFunc(download_data_send[i].timestamp,"YYYY/MM/DD","") ,
                            })
                        }else if(download_data_send[i].txType == 'SEPA_PAYIN_COMPLETED'){
                            data.push({
                                "Card Transaction Type"   :  (download_data_send[i].txType.includes("_") ? download_data_send[i].txType.replace("_", " ") : download_data_send[i].txType) ,
                                "Transaction Amount"   : download_data_send[i].amount ,
                                "Currency Used"   : download_data_send[i].currency ,

                                "Transaction Number"   : '-' , 
                                'Transaction Id' :  '-',
                                'PayIn' :  '-' ,
                                'Transaction Hash' :  download_data_send[i].txHash ,
                                'From' :  '-',
                                "Comment"  : '-',  
                                "Confirmation Method"  : '-' , 
                                'Recipient Name' : '-',
                                'Recipient Id' : '-',
                                'Confirmation Method' : '-',

                                "Card"   : '-', 
                                'Reason' :  '-',
                                'Sender Name' : download_data_send[i].merchantName,
                                'Fee' : '-',
                                'Sender IBAN' : '-',
                                "Date & Time"  : this.momentFunc(download_data_send[i].timestamp,"YYYY/MM/DD","") ,
                            })
                        }else if(download_data_send[i].txType == 'APPLICATION_FEE'){
                            data.push({
                                "Card Transaction Type"   :  (download_data_send[i].txType.includes("_") ? download_data_send[i].txType.replace("_", " ") : download_data_send[i].txType) ,
                                "Transaction Amount"   : download_data_send[i].amount ,
                                "Currency Used"   : download_data_send[i].currency ,

                                "Transaction Number"   : '-' , 
                                'Transaction Id' :  download_data_send[i].trans_id,
                                'PayIn' :  '-' ,
                                'Transaction Hash' :  download_data_send[i].txHash ,
                                'From' :  '-',
                                "Comment"  : download_data_send[i].memo,  
                                "Confirmation Method"  : '-' , 
                                'Recipient Name' : '-',
                                'Recipient Id' : '-',
                                'Confirmation Method' : '-',

                                "Card"   : '-', 
                                'Reason' :  '-',
                                'Sender Name' : '-',
                                'Fee' : '-',
                                'Sender IBAN' : '-',
                                "Date & Time"  : this.momentFunc(download_data_send[i].timestamp,"YYYY/MM/DD","") ,
                            })
                        }else if(download_data_send[i].txType == 'CARD_AUTHORIZATION'){
                            data.push({
                                "Card Transaction Type"   :  (download_data_send[i].txType.includes("_") ? download_data_send[i].txType.replace("_", " ") : download_data_send[i].txType) ,
                                "Transaction Amount"   : download_data_send[i].amount ,
                                "Currency Used"   : download_data_send[i].currency ,

                                "Transaction Number"   : download_data_send[i].trans_id , 
                                'Transaction Id' :  '-' ,
                                'PayIn' :  '-' ,
                                'Transaction Hash' :  download_data_send[i].txHash ,
                                'From' :  '-',
                                "Comment"  : download_data_send[i].memo,  
                                "Confirmation Method"  : '-' , 
                                'Recipient Name' : download_data_send[i].merchantName,
                                'Recipient Id' : download_data_send[i].merchantId,
                                'Confirmation Method' : '-',

                                "Card"   : '-', 
                                'Reason' :  '-',
                                'Sender Name' : '-',
                                'Fee' : '-',
                                'Sender IBAN' : '-',
                                "Date & Time"  : this.momentFunc(download_data_send[i].timestamp,"YYYY/MM/DD","") ,
                            })
                        }else if(download_data_send[i].txType == 'ON_CHAIN_DEPOSIT_CONFIRMED'){
                            data.push({
                                "Card Transaction Type"   :  (download_data_send[i].txType.includes("_") ? download_data_send[i].txType.replace("_", " ") : download_data_send[i].txType) ,
                                "Transaction Amount"   : download_data_send[i].amount ,
                                "Currency Used"   : download_data_send[i].currency ,

                                "Transaction Number"   : download_data_send[i].trans_id , 
                                'Transaction Id' :  '-' ,
                                'PayIn' :  '-' ,
                                'Transaction Hash' :  download_data_send[i].txHash ,
                                'From' :  '-',
                                "Comment"  : download_data_send[i].memo,  
                                "Confirmation Method"  : '-' , 
                                'Recipient Name' : download_data_send[i].merchantName,
                                'Recipient Id' : download_data_send[i].merchantId,
                                'Confirmation Method' : '-',

                                "Card"   : '-', 
                                'Reason' :  '-',
                                'Sender Name' : '-',
                                'Fee' : '-',
                                'Sender IBAN' : '-',
                                "Date & Time"  : this.momentFunc(download_data_send[i].timestamp,"YYYY/MM/DD","") ,
                            })
                        }else{
                            data.push({
                                "Card Transaction Type"   :  (download_data_send[i].txType.includes("_") ? download_data_send[i].txType.replace("_", " ") : download_data_send[i].txType) ,
                                "Transaction Amount"   : download_data_send[i].amount ,
                                "Currency Used"   : download_data_send[i].currency ,

                                "Transaction Number"   : download_data_send[i].trans_id , 
                                'Transaction Id' :  '-',
                                'PayIn' :  '-' ,
                                'Transaction Hash' :  download_data_send[i].txHash ,
                                'From' :  '-',
                                "Comment"  : download_data_send[i].memo,  
                                "Confirmation Method"  : '-' , 
                                'Recipient Name' : download_data_send[i].merchantName,
                                'Recipient Id' : download_data_send[i].merchantId,
                                'Confirmation Method' : '-',
                                "Card"   : '-' , 
                                'Reason' :  '-',
                                'Sender Name' : '-',
                                'Fee' : '-',
                                'Sender IBAN' : '-',
                                "Date & Time"  : this.momentFunc(download_data_send[i].timestamp,"YYYY/MM/DD","") ,
                            })
                        } 
                      
                      if(i==download_data_send.length-1){
                        this.csvExport(data, Object.keys(data[0]), getFileName);
                      }
                    }
                } else {
                  this.$notify({
                    text: "Record not found for applied criteria",
                    duration: 10000,
                    pauseOnHover: true,
                    type: "error",
                  });
                }
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
            searchFunc(){
                this.cardTransactions();
            },
            cardDetailFlagFunc(getIndex){
                if(this.cardDetailFlag == getIndex){
                  this.cardDetailFlag = '-1'
                }else{
                  this.cardDetailFlag = getIndex
                }
            },
            marketpercent() {
                if(this.limitTransType == 'out'){
                    let availableBalance =  this.availableBalance; 
                    let lowValue = 0
                    let highValue = this.totalBalance
                    let calculate = ((availableBalance - lowValue) / (highValue - lowValue)) * 100
                    // console.log(availableBalance,'=====', highValue , '====',calculate )
                    return calculate;
                }else{
                    let total = this.totalBalance;
                    let consumed =  this.availableBalance; 
                    let calculate = ( consumed/total ) * 100
                    return calculate;
                }
            },

            limitFunc(getLimit){
                this.limit = getLimit
                //tier1
                // console.log('this.card_users_by_id.current_tier',this.card_users_by_id)
                if(parseInt(this.card_users_by_id.current_tier) == 1){
                    if(this.limitTransType == 'out'){
                        if(this.limit == 'daily'){
                            this.availableBalance = this.getCardDetails.limits.dailyPurchaseAvailable
                            this.totalBalance  = this.getCardDetails.limits.dailyPurchase
                        }else if(this.limit == 'weekly'){
                            this.availableBalance = this.getCardDetails.limits.weeklyPurchaseAvailable 
                            this.totalBalance = this.getCardDetails.limits.weeklyPurchase
                        }else if(this.limit == 'monthly'){
                            this.availableBalance =  this.getCardDetails.limits.monthlyPurchaseAvailable
                            this.totalBalance = this.getCardDetails.limits.monthlyPurchase
                        }
                    }else{
                        //no filter coming in payin 
                        this.availableBalance = this.card_users_by_id.tier1.inboundLimitConsumed.va
                        this.totalBalance  = this.card_users_by_id.tier1.inboundLimitAllowed.va
                    }
                    this.marketpercent()
                }else{
                    if(this.limitTransType == 'out'){
                        if(this.limit == 'daily'){
                            this.availableBalance = this.getCardDetails.limits.dailyPurchaseAvailable
                            this.totalBalance  = this.getCardDetails.limits.dailyPurchase
                        }else if(this.limit == 'weekly'){
                            this.availableBalance = this.getCardDetails.limits.weeklyPurchaseAvailable 
                            this.totalBalance = this.getCardDetails.limits.weeklyPurchase
                        }else if(this.limit == 'monthly'){
                            this.availableBalance =  this.getCardDetails.limits.monthlyPurchaseAvailable
                            this.totalBalance = this.getCardDetails.limits.monthlyPurchase
                        }
                    }else{
                        //no filter coming in payin 
                        this.availableBalance = 100
                        this.totalBalance  = 100
                    }
                    this.marketpercent()
                }
                
            },
            // limitFuncOld(getLimit){
            //     this.limit = getLimit
            //     if(this.limitTransType == 'out'){
            //         if(this.limit == 'daily'){
            //             this.availableBalance = this.getCardDetails.limits.dailyPurchaseAvailable
            //             this.totalBalance  = this.getCardDetails.limits.dailyPurchase
            //         }else if(this.limit == 'weekly'){
            //             this.availableBalance = this.getCardDetails.limits.weeklyPurchaseAvailable 
            //             this.totalBalance = this.getCardDetails.limits.weeklyPurchase
            //         }else if(this.limit == 'monthly'){
            //             this.availableBalance =  this.getCardDetails.limits.monthlyPurchaseAvailable
            //             this.totalBalance = this.getCardDetails.limits.monthlyPurchase
            //         }
            //     }else{
            //         if(this.limit == 'daily'){
            //             this.availableBalance = this.getCardDetails.limits.dailyWithdrawalAvailable
            //             this.totalBalance  = this.getCardDetails.limits.dailyWithdrawal
            //         }else if(this.limit == 'weekly'){
            //             this.availableBalance = this.getCardDetails.limits.weeklyWithdrawalAvailable 
            //             this.totalBalance = this.getCardDetails.limits.weeklyWithdrawal
            //         }else if(this.limit == 'monthly'){
            //             this.availableBalance =  this.getCardDetails.limits.monthlyWithdrawalAvailable
            //             this.totalBalance = this.getCardDetails.limits.monthlyWithdrawal
            //         }
            //     }
            //     this.marketpercent()
            // },
            time_frameFunc(getLimit){
                this.time_frame = getLimit
                this.getChartDataFunc()
            },
            getDateOfIsoWeek(week, year) {
                week = parseFloat(week);
                year = parseFloat(year);
              
                if (week < 1 || week > 53) {
                  throw new RangeError("ISO 8601 weeks are numbered from 1 to 53");
                } else if (!Number.isInteger(week)) {
                  throw new TypeError("Week must be an integer");
                } else if (!Number.isInteger(year)) {
                  throw new TypeError("Year must be an integer");
                }
              
                const simple = new Date(year, 0, 1 + (week - 1) * 7);
                const dayOfWeek = simple.getDay();
                const isoWeekStart = simple;

                // Get the Monday past, and add a week if the day was
                // Friday, Saturday or Sunday.
              
                isoWeekStart.setDate(simple.getDate() - dayOfWeek + 1);
                if (dayOfWeek > 4) {
                    isoWeekStart.setDate(isoWeekStart.getDate() + 7);
                }

                // The latest possible ISO week starts on December 28 of the current year.
                if (isoWeekStart.getFullYear() > year ||
                    (isoWeekStart.getFullYear() == year &&
                     isoWeekStart.getMonth() == 11 &&
                     isoWeekStart.getDate() > 28)) {
                    throw new RangeError(`${year} has no ISO week ${week}`);
                }
              
                return isoWeekStart;
            },
            createChart(dataArray) { 
              let arrayD = [];
              const _that = this;
              for(let i=0; i<= dataArray.length-1; i++){
                let json = {
                  'date': dataArray[i].date ,
                  'value': dataArray[i].totalEurAmount
                }
                if(this.time_frame == "weekly" ){
                    let getWeek = dataArray[i].date.split('-')[1] ;
                    // json.date = (getWeek.charAt(0)  === '0')? getWeek.substring(1) + 'w': getWeek + 'w';
                    let dateNew = this.getDateOfIsoWeek(dataArray[i].date.split('-')[1], dataArray[i].date.split('-')[0])
                    
                    dateNew = this.momentFunc(dateNew,"YYYY-MM-DD")
                    json.date = dateNew
                }
                if(this.time_frame == "monthly" ){
                    json.date = dataArray[i].date+'-12'
                }
                arrayD.push(json)
                if(i == dataArray.length-1){
                  // console.log('arrayD====',arrayD)
                  setTimeout(function() { 
                      _that.chartCode(arrayD)
                  }, 2000);
                  
                }
              }
            },
            chartCode(dataArray){
              var chart = am4core.create("chartdiv2", am4charts.XYChart);
              chart.paddingRight = 40;
              chart.data = dataArray;

              // Create axes
              var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
              // if(this.time_frame == "weekly" ){
              //   var dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
              //   dateAxis.dataFields.category = "date";
              // }else{
              //   var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
              // }
              

              dateAxis.renderer.minGridDistance = 60;
              dateAxis.groupData = true;
              
              if(this.time_frame == "weekly" ){
                dateAxis.title.text = "Weekly";
              }else{
                dateAxis.title.text = "Time Period";
              }


              if(this.time_frame == "monthly" ){
                dateAxis.dateFormats.setKey("day","MMM");
              }

              

              var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
              valueAxis.title.text = "Amount in (EUR)";
              // Create series
              var series = chart.series.push(new am4charts.ColumnSeries());
              series.dataFields.valueY = "value";
              // if(this.time_frame == "weekly" ){
              //   series.dataFields.categoryX = "date"
              // }else{
              //   series.dataFields.dateX = "date";
              // }
              series.dataFields.dateX = "date";
              series.tooltipText = "{value}"

              dateAxis.renderer.grid.template.disabled = true;
              dateAxis.renderer.line.strokeOpacity = 0;
              valueAxis.renderer.grid.template.disabled = true;
              valueAxis.renderer.line.strokeOpacity = 0;
              // series.name = "";
              series.tooltip.pointerOrientation = "vertical";
              chart.cursor = new am4charts.XYCursor();
              // chart.scrollbarX = new am4core.Scrollbar();
              this.chartLoader = false;
            },
            cardTransactions(getcardId) {
                let input_json = {
                    'globalParams': {
                        "userId": this.getCardDetails.userId,
                        "walletId": this.getCardDetails.parentWalletId,
                        "filter": { 
                            "status": "1",
                            "transType": this.tab, 
                            "startDate": "",
                            "endDate": ""
                        },
                        "page": parseInt(this.page),
                        "search": this.search,
                    },
                    'localParams': { "parameter": this }
                }
                if (this.from != "" && this.to != "") {
                    input_json.globalParams.filter.startDate = this.momentFunc(this.from,"YYYY-MM-DD");
                    input_json.globalParams.filter.endDate = this.momentFunc(this.to,"YYYY-MM-DD");
                }
                this._runGetCardTransactions(input_json)
            },
            cardDetails(getcardId) {
                let input_json = {
                    'globalParams': {
                        "card_id": this.$route.query.cardId
                    },
                    'localParams': { "parameter": this, 'page': 'card-dashboard' }
                }
                this._runGetCardDetails(input_json)
            },
            cardAccountDetails() {
                let input_json = {
                    'globalParams': {
                        "userId": this.getCardDetails.userId,
                        "accountId": this.getCardDetails.linkedAccountId
                    },
                    'localParams': { "parameter": this }
                }
                this._runGetAccountDetails(input_json)
            },
            verifyQrCode() {
                let input_json = {
                  globalParams: {
                    google_token: this.otp.toString(),
                    step: 1,
                  },
                  localParams: { parameter: this, 'page': (this.freezePopup == '1') ? 'creditCard' : 'burn-creditCard'},
                };
                this._runVerify2FaQrcode(input_json);
            },
            reset(){
                this.freeze= this.getCardDetails.status && this.getCardDetails.status.toLowerCase() == 'active' ? false : (this.getCardDetails.status && this.getCardDetails.status.toLowerCase() == 'blocked' ? true : '')
                this.freezeConditions = false
                this.burn=  this.getCardDetails.status && this.getCardDetails.status.toLowerCase() == 'closed' ? true : ''
                this.freezePopup= ''
                this.otp= ''
                this.editPasswordPopup = ''
                this.password = ''
                this.confirmPassword = ''
                this.password2fa = ''  
            },
            cardBlockUnBlock() {
                let input_json = {
                    'globalParams': {
                        "cardId": this.$route.query.cardId
                    },
                    'localParams': { "parameter": this }
                }
                if(this.freeze){
                   this._runGetCardBlock(input_json)
               }else{
                    this._runGetCardUnblock(input_json) 
               }
            },
            cardBurn(){
                let input_json = {
                    'globalParams': {
                        "cardId": this.$route.query.cardId
                    },
                    'localParams': { "parameter": this }
                }
                if(this.burn){
                   this._runGetCardBurn(input_json)
                }
            },
            getAllCardsofParticularUserFunc(){
                let input_json = {
                    'globalParams': {
                        "userId": this.getCardDetails.userId,
                        "limit": 10,
                        "offset": 0,
                        "orderByTimestamp": "DESC"
                    },
                    'localParams': { "parameter": this }
                }
                this._runGetCardsByUserId(input_json)
            },
            editPasswordFunc(){
                let input_json = {
                    'globalParams': {
                        "cardId": this.$route.query.cardId,
                        "threeDSecurePassword" : this.password
                    },
                    'localParams': { "parameter": this }
                }
                this._runEditPassword(input_json)
            },
            getAllCardUsersFunc(){
                let input_json = {
                  'globalParams': {
                    "userId": this.getCardDetails.userId
                  },
                  'localParams': { "parameter": this, 'page': 'card-dashboard'  }
                }
                this._runGetCardUserById(input_json)
            },
            getChartDataFunc(){ 
                let input_json = {
                    'globalParams': {
                        // "userId": "7677bb56-da85-4f13-a19f-cf4de781f30a",
                        // "accountId": "d766b2bbadd6e9aae7bf37e0d80924f0",

                        "userId": this.getCardDetails.userId,
                        // "accountId": this.getCardDetails.linkedAccountId,
                        "walletId": this.getCardDetails.parentWalletId,
                        "time_frame": this.time_frame // monthly, weekly, daily
                    },
                    'localParams': { "parameter": this }
                }
                this._runGetChartData(input_json)
            },
        },
        created() {
            if(this.$route.query.cardId){
                this.cardIds = this.$route.query.cardId
                this.cardDetails('');
            }
        },
    };
 </script>

