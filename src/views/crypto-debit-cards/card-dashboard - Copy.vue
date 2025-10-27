<template>
    <div>
        <loader v-if="pageLoader"></loader>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="card-dashboard">{{varChange}}
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
                                        <li v-for="list in getCards.cards">
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
                                        <img class="d-block w-100 img-fluid" src="/assets/website/images/slidercard-front.png" alt="card image">
                                    </div>
                                    <div class="content-sec">
                                     
                                        <div class="balance-sec d-flex flex-column-reverse flex-sm-row align-items-start justify-content-between">
                                            <div class="left-sec pt-1">
                                                <div class="imageToggle pb-3">
                                                    <input type="checkbox">
                                                </div>
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1">AVAILABLE BALANCE</p>
                                                <h2 class="green bold mb-3 pb-2"> {{card_account_details.availableBalance.hFiatEquivalentBalance || ''}} {{card_account_details.availableBalance.fiatCurrency}}</h2>
                                                <!-- <h4 class=" bold mb-5">({{card_account_details.availableBalance.hAmount}} {{card_account_details.currency}})</h4> -->
                                                 <a href="javascript:void(0)" class="f-14 text-underline p-0 secondarycolor">Show Card Details</a>
                                            </div>
                                            <RouterLink to="/manage-card" class="cap_btn border-btn-secondary extra_small_btn f-14 text-nowrap">Wallet Balances</RouterLink>
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
                                                    <RouterLink class="d-flex" :to="{path : 'manage-card', query:{cardId:$route.query.cardId}}"><feather class="ml-3 secondary" type="edit-2" size="18" /></RouterLink>
                                                </h5>
                                            </div> 

                                            <div class="infoitem">
                                                <p class="bold text-uppercase mb-2 pb-1 lh-1">3DS Password</p>
                                                <h5 class="textblack medium mb-0 d-flex align-items-center"><sub>******</sub> <a class="d-flex" href="javascript:void(0)"><feather class="ml-3 secondary" type="edit-2" size="18" /></a></h5>
                                            </div> 
                                        </div>
                                    </div>
                               </div>

                               <div class="transHistory">
                                    <div class="headSec d-block d-sm-flex align-items-center justify-content-between flex-wrap pt-5 mt-2">
                                        <h4 class="mb-0 pb-4">Transaction History</h4>
                                        <div class="d-block d-sm-flex align-items-center pb-4">
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
                                                <input type="text" placeholder="Search..." class="form-control"/>
                                                <span class="searchIco">
                                                    <feather type="search" />
                                                </span>
                                            </div>

                                            <div class="d-flex align-items-center position-relative">
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
                                            </div>

                                            <button class="btn downoadBtn icnBtn">
                                                <img src="/assets/website/images/download-icon.svg" alt="Download Icon" class="d-block" width="22" height="22" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="tab-content" id="myTabContent">
                                        <!-- <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab" v-if="Object.keys(getCardTransactions).length > 0 && getCardTransactions.records.length > 0 && !pageLoader">
                                            <div class="itemsWrap scrollbar" v-if="tab == 'all'">
                                                <div class="transItem" v-for="(val, index) in getCardTransactions.records">
                                                    <div class="left-sec">
                                                        <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                                        <h5 class="mb-1">{{val.amount}} {{val.currency}}</h5>
                                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>{{(val.txType.includes("_") ? val.txType.replace("_", " ") : val.txType)}}</span></p>
                                                    </div>
                                                    
                                                    <div class="right-sec d-flex align-items-center badges">
                                                        <p class="mb-0" v-if="val.created_at != null">{{momentFunc(val.timestamp,"YYYY/MM/dd","")}}</p>
                                                        <p class="mb-0" v-else>0000/00/00</p>
                                                        <!-- <p class="mb-0" >{{val.memo != null ? val.memo : '-'}}</p> -->
                                                        <!-- <span class="round-lg border-0 badge-item yellow">Pending</span>
                                                        <span class="round-lg border-0 badge-item red"><feather type="info" size="18"/> Failed</span> -->
                                                        <span class="round-lg border-0 badge-item green">Complete</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="itemsWrap scrollbar" v-if="tab == 'credit'">
                                                <div class="transItem" v-for="(val, index) in getCardTransactions.records" v-show="val.transType == 'credit'">
                                                    <div class="left-sec">
                                                        <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                                        <h5 class="mb-1">{{val.amount}} {{val.currency}}</h5>
                                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>{{(val.txType.includes("_") ? val.txType.replace("_", " ") : val.txType)}}</span></p>
                                                    </div>
                                                    
                                                    <div class="right-sec d-flex align-items-center badges">
                                                        <p class="mb-0" v-if="val.created_at != null">{{momentFunc(val.timestamp,"YYYY/MM/dd","")}}</p>
                                                        <p class="mb-0" v-else>0000/00/00</p>
                                                        <p class="mb-0" >{{val.memo != null ? val.memo : '-'}}</p>
                                                        <!-- <span class="round-lg border-0 badge-item yellow">Pending</span>
                                                        <span class="round-lg border-0 badge-item red"><feather type="info" size="18"/> Failed</span> -->
                                                        <span class="round-lg border-0 badge-item green">Complete</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="itemsWrap scrollbar" v-if="tab == 'debit'">
                                                <div class="transItem" v-for="(val, index) in getCardTransactions.records" v-show="val.transType == 'debit'">
                                                    <div class="left-sec">
                                                        <img class="arrow-img" src="/assets/website/images/green-down.svg"/>
                                                        <h5 class="mb-1">{{val.amount}} {{val.currency}}</h5>
                                                        <p class="f-13 mb-0 d-flex align-items-center">€005.00 EUR <span>{{(val.txType.includes("_") ? val.txType.replace("_", " ") : val.txType)}}</span></p>
                                                    </div>
                                                    
                                                    <div class="right-sec d-flex align-items-center badges">
                                                        <p class="mb-0" v-if="val.created_at != null">{{momentFunc(val.timestamp,"YYYY/MM/dd","")}}</p>
                                                        <p class="mb-0" v-else>0000/00/00</p>
                                                        <p class="mb-0" >{{val.memo != null ? val.memo : '-'}}</p>
                                                        <!-- <span class="round-lg border-0 badge-item yellow">Pending</span>
                                                        <span class="round-lg border-0 badge-item red"><feather type="info" size="18"/> Failed</span> -->
                                                        <span class="round-lg border-0 badge-item green">Complete</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div >
                                            no records
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
                                    <div class="btns-sec d-flex align-items-center justify-content-between">
                                        <RouterLink class="cap_btn border-btn-secondary round-sm d-flex align-items-center justify-content-center" :to="{path : 'card-withdraw', query:{cardId:$route.query.cardId}}">
                                            <svg class="mr-2" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1M21 5V1M21 1H17M21 1L16 6" stroke="#7D7BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Withdraw
                                        </RouterLink>  
                                        <RouterLink class="cap_btn secondaryBG large_btn round-sm d-flex align-items-center justify-content-center mb-0"  :to="{path : 'card-top-up', query:{cardId:$route.query.cardId}}">
                                            <svg class="mr-2" width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M27.2203 13.1897C26.7917 13.1897 26.441 13.5403 26.441 13.969V20.024C26.441 22.2449 24.633 24.0528 22.4121 24.0528H5.58744C3.36649 24.0528 1.55856 22.2449 1.55856 20.024V7.91394C1.55856 5.693 3.36649 3.88507 5.58744 3.88507H13.9998C14.4284 3.88507 14.779 3.53439 14.779 3.10579C14.779 2.67718 14.4284 2.32651 13.9998 2.32651H5.58744C2.50539 2.32651 0 4.83189 0 7.91394V20.024C0 23.106 2.50539 25.6114 5.58744 25.6114H22.4121C25.4942 25.6114 27.9995 23.106 27.9995 20.024V13.969C27.9995 13.5403 27.6489 13.1897 27.2203 13.1897Z" fill="white"/>
                                                <path d="M19.405 6.35017L22.2572 9.20233V1.16795C22.2572 0.739348 22.6079 0.388672 23.0365 0.388672C23.4651 0.388672 23.8157 0.739348 23.8157 1.16795V9.20233L26.6679 6.35017C26.8199 6.19821 27.0186 6.12028 27.2173 6.12028C27.416 6.12028 27.6147 6.19821 27.7667 6.35017C28.0706 6.65409 28.0706 7.14893 27.7667 7.45285L23.5897 11.6337C23.5547 11.6688 23.5118 11.7038 23.469 11.7311C23.4495 11.7428 23.4261 11.7545 23.4066 11.7662C23.3832 11.7779 23.3599 11.7934 23.3326 11.8051C23.3053 11.8168 23.278 11.8207 23.2508 11.8285C23.2274 11.8363 23.2079 11.8441 23.1845 11.848C23.0832 11.8675 22.978 11.8675 22.8806 11.848C22.8572 11.8441 22.8377 11.8363 22.8144 11.8285C22.7871 11.8207 22.7598 11.8129 22.7364 11.8051C22.7092 11.7934 22.6858 11.7817 22.6624 11.7662C22.6429 11.7545 22.6195 11.7467 22.6001 11.7311C22.5572 11.7038 22.5182 11.6688 22.4793 11.6337L18.3023 7.45285C17.9984 7.14893 17.9984 6.65409 18.3023 6.35017C18.6062 6.04625 19.1011 6.04625 19.405 6.35017Z" fill="white"/>
                                                <path d="M14.0002 19.5341C14.4288 19.5341 14.7795 19.1834 14.7795 18.7548V14.7493H18.785C19.2136 14.7493 19.5643 14.3986 19.5643 13.97C19.5643 13.5414 19.2136 13.1907 18.785 13.1907H14.7795V9.18522C14.7795 8.75662 14.4288 8.40594 14.0002 8.40594C13.5716 8.40594 13.2209 8.75662 13.2209 9.18522V13.1907H9.21542C8.78682 13.1907 8.43614 13.5414 8.43614 13.97C8.43614 14.3986 8.78682 14.7493 9.21542 14.7493H13.2209V18.7548C13.2209 19.1834 13.5716 19.5341 14.0002 19.5341Z" fill="white"/>
                                                </svg>
                                            Top up Card
                                        </RouterLink>
                                    </div>

                                    <div class="headsec d-flex align-items-center justify-content-between flex-wrap mt-4 pt-2">
                                        <h4 class="mb-0">Payments</h4>  
                                        <div class="position-relative dropdown selectDropMenu historyselectmenu miniTimeSelect">
                                            <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                                                <p class="mb-0">6 Months</p>
                                                <feather type="chevron-down" class="ml-2" size="20px"></feather>
                                            </a>
                                            <ul class="dropdown-menu scrollbar">
                                                <li><a href="javascript:void(0)" class="lh-normal"><p class="mb-0">6 Months</p></a></li>
                                                <li><a href="javascript:void(0)" class="lh-normal"><p class="themecolor mb-0">6 Months</p></a></li>
                                                <li><a href="javascript:void(0)" class="lh-normal"><p class="mb-0">6 Months</p></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="chart-wrap text-center mt-5">
                                        <img class="img-fluid d-block mx-auto" src="/assets/website/images/payments-chart.png">
                                    </div>
                                </div>

                                <div class="bg-white border round-sm cryptoCards position-relative limit-card">
                                    <div class="headsec d-flex align-items-center justify-content-between flex-wrap">
                                        <h4 class="mb-0 headingLabel">Card Limit <span>Tier-1</span></h4>  
                                        <div class="position-relative dropdown selectDropMenu historyselectmenu miniTimeSelect">
                                            <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                                                <p class="mb-0">{{limit.charAt(0).toUpperCase() + limit.slice(1)}}</p>
                                                <feather type="chevron-down" class="ml-2" size="20px"></feather>
                                            </a>
                                            <ul class="dropdown-menu scrollbar">
                                                <li @click="limitFunc('daily')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="limit == 'daily' ? 'themecolor' : ''">Daily</p></a></li>
                                                <li @click="limitFunc('weekly')"><a href="javascript:void(0)" class="lh-normal"><p class=" mb-0" :class="limit == 'weekly' ? 'themecolor' : ''">Weekly</p></a></li>
                                                <li @click="limitFunc('monthly')"><a href="javascript:void(0)" class="lh-normal"><p class="mb-0" :class="limit == 'monthly' ? 'themecolor' : ''">Monthly</p></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <ul class="nav nav-tabs cardsTab mb-0 mini mt-3 pt-0" id="myTab" role="tablist">
                                        <li class="nav-item" @click="limitTransType = 'in'; limit = 'daily'; limitFunc('daily')">
                                            <a class="nav-link " :class="limitTransType == 'in' ? 'active' : ''" id="payin-tab" data-toggle="tab" href="#payin" role="tab" aria-controls="payin" aria-selected="true">Pay-In</a>
                                        </li>
                                        <li class="nav-item" @click="limitTransType = 'out'; limit = 'daily'; limitFunc('daily')">
                                            <a class="nav-link" :class="limitTransType == 'out' ? 'active' : ''" id="payin-tab" data-toggle="tab" href="#payin" role="tab" aria-controls="payin" aria-selected="false">Pay-Out</a>
                                        </li>
                                    </ul>

                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="payin" role="tabpanel" aria-labelledby="payin-tab">
                                            <div class="progress mt-4">
                                                <div class="progress-bar yellowcolor" role="progressbar"  :style="{ width: marketpercent()+'%'}" ></div>
                                            </div>
                                            <p class="medium my-3 pb-3">€{{availableBalance}} {{limitCurrency}} Remaining</p>
                                        </div>
                                        <!-- <div class="tab-pane fade" id="payout" role="tabpanel" aria-labelledby="payout-tab">
                                            <div class="progress mt-4">
                                                <div class="progress-bar yellowcolor" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p class="medium my-3 pb-3">€3218 EUR Remaining</p>
                                        </div> -->
                                    </div>
                                    <div class="text-right">
                                        <RouterLink class="semibold themecolor text-underline" to="/upgrade-limit">Upgrade Limit</RouterLink>
                                    </div>
                                </div>

                                <div class="bg-white border round-sm cryptoCards position-relative limit-card">
                                    <h4 class="mb-0">Manage Card</h4> 
                                    <div class="d-flex align-items-center justify-content-between my-4">
                                        <h5 class="mr-3 medium textcolor mb-0">Block/Unblock</h5>
                                        <label class="toggleSwitch"><input type="checkbox" name="freeze" value="true" v-model="freeze" @change="freezePopup = '1'"><span class="slider round"></span></label>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
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
                <div class="modal-body pt-0">
                    <div class="mb-4">
                    <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                    <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="Enter 2FA Code" class="form-control" name="otp"  v-model="otp" />
                    </div>
                    
                </div>
                <div class="modal-footer justify-content-center pt-4 border-0">
                    <a class="cap_btn blue px-4 large_btn mb-0" href="javascript:void(0);" @click="verifyQrCode()">Submit</a>
                </div>
                </div>
            </div>
        </div>

        <!-- Change Password modal -->
        <!-- <div class="modal" tabindex="-1" id="change-password" role="dialog" aria-labelledby="change-password" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0 d-block text-right pb-0 lh-1">
                        <a href="javascript:void(0);" class="close d-inline-flex p-0" data-dismiss="modal" aria-label="Close">
                        <feather type="x" size="22px"></feather>
                        </a>
                    </div>
                    <div class="modal-body pt-0">
                        <h3 class="themecolor mb-4 pb-2">Change Password</h3>
                        <form class="w-100">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">New Password</label> 
                                        <input type="text" placeholder="randompass" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Confirm Password</label>
                                        <input type="text" placeholder="newpass" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-4">
                                        <label class="labeltext">Confirm 2FA</label>
                                        <input type="text" placeholder="1234" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-2 text-center">
                                <button class="cap_btn blue px-4 large_btn mb-2" type="sybmit">Submit</button>
                            </div>
                        </form>
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
            filters: false,
            thisdate: false,
            pageLoader: false,
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
            cardIds : ''
          };
        },
        computed:{
            varChange(){
                if(parseInt(this.$route.query.cardId) != parseInt(this.cardIds)) {
                    this.cardIds = this.$route.query.cardId
                    this.cardTransactions('');
                    this.cardDetails('');
                } 
            }
        },
        methods: {
            marketpercent() {
                let availableBalance =  this.availableBalance; 
                let lowValue = 0
                let highValue = this.totalBalance
                let calculate = ((availableBalance - lowValue) / (highValue - lowValue)) * 100
                // console.log(availableBalance,'=====', highValue , '====',calculate )
                return calculate;
            },
            limitFunc(getLimit){
                this.limit = getLimit
                if(this.limitTransType == 'in'){
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
                    if(this.limit == 'daily'){
                        this.availableBalance = this.getCardDetails.limits.dailyWithdrawalAvailable
                        this.totalBalance  = this.getCardDetails.limits.dailyWithdrawal
                    }else if(this.limit == 'weekly'){
                        this.availableBalance = this.getCardDetails.limits.weeklyWithdrawalAvailable 
                        this.totalBalance = this.getCardDetails.limits.weeklyWithdrawal
                    }else if(this.limit == 'monthly'){
                        this.availableBalance =  this.getCardDetails.limits.monthlyWithdrawalAvailable
                        this.totalBalance = this.getCardDetails.limits.monthlyWithdrawal
                    }
                }
                this.marketpercent()
            },
            cardTransactions(getcardId) {
                let input_json = {
                    'globalParams': {
                        "cardId": this.$route.query.cardId
                    },
                    'localParams': { "parameter": this }
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
                this.freeze= false
                this.burn= false
                this.freezePopup= ''
                this.otp= ''
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
            userDetailFunc(){
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
            }
        },
        created() {
            if(this.$route.query.cardId){
                this.cardIds = this.$route.query.cardId
                this.cardTransactions('');
                this.cardDetails('');
            }
        },
    };
 </script>