<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="modal" tabindex="-1" id="enable-new-wallet" role="dialog" aria-labelledby="enable-new-wallet" aria-hidden="true" v-if="$parent.enableTicketJsonFlag">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 pb-2">
            <div class="modal-title text-left">
              <h5 class="mb-0">Enable New Wallets</h5>
            </div>
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="
                $parent.enableTicketJsonFlag = false; enableTicketJson = {} ; otp = ''; enableTicketCoinSelect = '' ">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <Form @submit="submitTicket()" ref="regform">
            <div class="modal-body pt-0 pb-0">
              <p>Select coins to enable new wallets in your account. We will review your request and we will update you as soon as your wallets are enabled.</p>
              <div class="form-group">
                <label class="labeltext">Wallet</label>
                <Field type="hidden" class="form-control"  v-model="enableTicketCoinSelect" name="wallet" rules="required" />
                <div class="selectDropMenu destinationDropMenu">
                  <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                    <div class="d-flex align-items-center" v-if="Object.keys(enableTicketJson).length > 0">
                      <img :src="'/assets/website/images/crypto_logos/' +enableTicketJson.coin.toLowerCase() +'.png'" alt="Coin" class="d-block" width="38" height="38" />
                      <div class="pl-3">
                        <p class="medium themecolor mb-0 lh-normal text-left">{{ enableTicketJson.coin }}</p>
                        <p class="mb-0 f-14 lh-normal">
                          {{ enableTicketJson.getCurrName }}
                        </p>
                      </div>
                    </div>
                    <p class="medium themecolor mb-0" v-else>
                      Select Wallet
                    </p>
                    <feather type="chevron-down" class="ml-2"></feather>
                  </a>
                  <ul class="dropdown-menu scrollbar">
                    <input type="text" class="dropdownSearch" placeholder="Search here..." v-model="searchCurr" />
                    <li v-for="list in currencyListFunc()" v-show="currencyListFunc().length > 0">
                      <a href="javascript:void(0)" @click="setTicketRequestparameters(list.keyType,list.symbol,list.currency_name) ; tokendrop = false">
                        <div class="d-flex align-items-center">
                          <img :src="'/assets/website/images/crypto_logos/' +list.symbol.toLowerCase() +'.png'" alt="Coin" class="d-block" width="38" height="38" />
                          <div class="pl-3">
                            <p class="medium themecolor mb-0 lh-normal" >{{(list.symbol == 'TRX') ? 'TRON' :list.symbol}}</p><p class="mb-0 f-14 lh-normal" v-if="list.symbol != 'TRX'">{{list.currency_name}}</p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li v-if="currencyListFunc().length == 0" class="d-flex align-items-center justify-content-center pt-2 pb-3">
                        <feather type="alert-circle" class="mr-2 textcolor" size="18px"></feather>
                        <p class="d-block textcolor mb-0">No Data Available</p>
                    </li>
                  </ul>
                </div>
                <ErrorMessage name="wallet" class="text-danger" />
              </div>
              <div class="form-group">
                <label class="labeltext">2FA </label>
                <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required|min:6|numeric" />
                <ErrorMessage name="otp" class="text-danger" />
              </div>
              <!--  <div class="form-group"><label class="labeltext">Network </label><label class="customCheckbox"> ERC 20 <input type="checkbox" name="date" value="network" /><span class="checkmark"></span></label><label class="customCheckbox"> TRC 20 <input type="checkbox" name="date" value="network" /><span class="checkmark"></span></label></div> -->
              <!-- <div class="form-group mb-0"><label class="labeltext">Insert Capital Wallet 2FA Verification Code <span class="required">*</span></label><vie-otp-input class="partitionedInput" inputClasses="form-control text-center" :numInputs="6" separator=" " :shouldAutoFocus="true" @on-change="handleOnChange" @on-complete="handleOnComplete" /></div> -->
            </div>
            <div class="modal-footer pt-0 border-0">
              <div class="w-100">
                <a href="javascript:void(0);"  ></a>
                <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Submit Request"  :class="pageLoader ? 'disabled' : ''" d />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    
    
    <div class="mt-4 bg-white border round-sm" >
      <div class="d-block d-md-flex align-items-center justify-content-between p-4">
        <div id="tabs" class="text-center mb-0 walletTab currencyTab">
          <ul class="d-flex align-items-center m-0">
            <li>
              <a class="d-block" href="javascript:void(0)" :class="[{ active: activeWallets == 'currency' }]" @click.prevent="activeWallets = 'currency'">Crypto</a>
            </li>
            <li>
              <a class="d-block" href="javascript:void(0)" :class="[{ active: activeWallets == 'FIAT' }]" @click.prevent="activeWallets = 'FIAT'">Fiat</a>
            </li>
          </ul>
        </div>
        <div class="d-block d-sm-flex align-items-center">
          <div class="d-flex align-items-center mr-3">
            <label class="toggleSwitch">
              <input type="checkbox" v-model="hideZero" @change="page = '1'" />
              <span class="slider round"></span>
            </label>
            <p class="mb-0 ml-3">Hide Zero Balance</p>
          </div>
          <div class="form-group position-relative searchTable mb-0 mt-3 mt-sm-0">
            <input type="text" placeholder="Search Coin..." name="legal_name" class="form-control" v-model="searchCurrency" @keyup="page = '1'" />
            <span class="searchIco">
              <feather type="search" />
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="table-responsive scrollbar">
          <table class="table table-bordered tablecustomWidth no-table-fluctuated">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Balance</th>
                <th>
                  <div class="selectmenu tableselectmenu tableselectvalue position-relative bg-white">
                    <a @click.prevent="thisdates ^= true" href="javascript:void(0)" class="btn d-flex align-items-center p-0 border-0 textcolor">
                      <p class="mr-1 mb-0 lh-normal">Value (In {{changecurrencyFlag1}})</p>
                      <feather type="chevron-down" size="16px"></feather>
                    </a>
                    <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6" :class="{ show: thisdates }">
                      <li @click="changecurrencyFlag1 = 'USD' ; thisdates = false">
                        <a href="javascript:void(0)" class="textcolor medium">In USD</a>
                      </li>
                      <li @click="changecurrencyFlag1 = 'BTC' ; thisdates = false">
                        <a href="javascript:void(0)" class="textcolor medium">In BTC</a>
                      </li>
                    </ul>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="!pageLoader && walletListFunc().length > 0">
              <tr v-for="(value, index) in walletListFunc()" v-show="value.symbol  != 'TRX'">
                <td>
                  <span class="d-flex align-items-center">
                    <span class="inTableIcon mr-3">
                      <img :src="
                          '/assets/website/images/crypto_logos/' +
                          value.symbol.toLowerCase() +
                          '.png'
                        " />
                    </span>  
                    <div class="iqlName" v-if=" $env_var.restricted_currencies.hasOwnProperty(value.symbol)">
                      <h5 class="mb-0 themecolor mb-1">{{ value.symbol }} </h5>
                      <p class="mb-0 regular lh-normal">{{ $env_var.restricted_currencies[value.symbol].currency_name }}
                      </p>
                    </div>
                    <div class="iqlName" v-else>
                      <h5 class="mb-0 themecolor mb-1">{{ value.symbol }}</h5>
                      <p class="mb-0 regular lh-normal">{{ value.currency_name }}</p>
                    </div>
                  </span>
                </td>
                <td class="rb_medium">{{ numberFormat(value.amount,8,value.symbol) }}</td>
                <td>
                  <span v-if="value.symbol == 'UGOLD' && marginByCurrency[value.symbol]" class="rb_medium">{{ numberFormat(getConvertedValue( marginByCurrency[value.symbol], '' ),8, changecurrencyFlag1) }}</span> 
                  <span v-else-if="marginByCurrency[value.symbol]" class="rb_medium">{{ numberFormat(getConvertedValue( marginByCurrency[value.symbol], changecurrencyFlag1 ),8, changecurrencyFlag1) }}</span>
                  <span v-else>-</span>
                </td>
                <td> 
                  <a href="javascript:void(0)" class="cap_btn extra_small_btn border-btn" v-if="activeWallets == 'currency'" @click="userRolePermission($env_var.permissions.payments , {path : '/deposits', query:{deposit: value.symbol}})">
                    <feather type="arrow-down" size="18px" class="d-block pr-1 medium"></feather>
                    Deposit
                  </a>
                  <a href="javascript:void(0)" class="cap_btn extra_small_btn border-btn ml-3" v-if="(activeWallets == 'currency') || (activeWallets == 'FIAT' && parseInt(get_user.settings.fiat_payout) == 1)" @click="userRolePermission($env_var.permissions.payouts , {path : '/payouts', query:{withdraw: value.symbol ,tab: (value.keyType == 'FIAT') ? 2 : 1}})">
                    <feather type="arrow-up" size="18px" class="d-block pr-1 medium"></feather>
                    Withdraw 
                  </a>
                </td>
              </tr>
            </tbody>
            <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'9'" :listLength="walletListFunc().length" v-else></table-loader>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { tradingMixins } from "@/plugins/trading";
  import { depositWithdrawalMixins } from "@/plugins/depositWithdrawal";
  import { supportMixins } from "@/plugins/support";
  import {  Const } from "@/plugins/vue-provider-cache/const.mod";
  import { format } from 'mathjs'
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "Wallets",
    mixins: [tradingMixins, depositWithdrawalMixins, supportMixins],
    data() {
      return {
        pageLoader: false,
        actionIndex: -1,
        mywalletsAction : false,
        tab: 1,
        tokendrop: false,
        filters: false,
        thiscurrency: false,
        activeWallets: "currency",
        margin_list: {},
        hideZero: false,
        searchCurrency: "",
        thisdates: false,
        enableTicketJson: {},
        enableTicketCoinSelect : '',
        trans_id: "",
        otp: "",
        searchWalletToken: "",
        innerListIndex: 23,
        changecurrencyFlag : 'USD',
        changecurrencyFlag1 : 'USD',
        searchCurr : ''
      };
    },
    components: { Form, Field, ErrorMessage },
    watch: {
      hideZero(value) {
        this.walletListFunc();
      },
      searchCurrency(value) {
        this.walletListFunc();
      },
      activeWallets(value) {
        this.walletListFunc();
      },
      searchWalletToken(value) {
        this.TokenListAccToWallet();
        this.TokenListAccToWallet("-1");
      }
    },
    computed: {
      totalUsdValue() {
        try {
          let amount = 0;
          // console.log(this.margin_list)
          for (const item in this.margin_list) {
            amount += parseFloat( this.getConvertedValue(this.margin_list[item], this.changecurrencyFlag) );
          }

           // console.log('btcAmount===>',this.formatfloat(amount.toFixed(3)))
          return amount.toFixed(3);
        } catch (e) { return "N/A"; }
      },
      instruments() {
        try {
          // console.log('this.instruments-----',this.instruments)
          this.$store.getters[Const.GET_HEARTBEATS]["priceFeed"];
          return this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].iCache.asKeysValueArrayAll();
        } catch (ex) {
          return [];
        }
      },
      marginByCurrency() {
        let stored = {};
        for (const key in this.margin_list) {
          if (parseFloat(this.margin_list[key].amount) > 0) {
            stored[this.margin_list[key].currency] = this.margin_list[key];
          }
        }
        return stored;
      },
    },
    methods: {
      currencyListFunc(){
        //walletCurrencyList.payment, currencies
        let returnData = [] ;
        for(let i=0 ; i<= this.walletCurrencyList.currencies.length-1 ; i++){
          let symbol = this.walletCurrencyList.currencies[i].symbol, countInc = 0;
          if(this.walletCurrencyList.payment.length > 0){
            for(let j=0 ; j<= this.walletCurrencyList.payment.length-1 ; j++){
              if(symbol == this.walletCurrencyList.payment[j].symbol){
                countInc = 1
              }

              if(symbol == 'TRX' && (this.walletCurrencyList.payment[j].symbol == 'TRXUSDT' || this.walletCurrencyList.payment[j].symbol == 'TRXUSDC')){
                countInc = 1
              }
              if(j == this.walletCurrencyList.payment.length-1){
                if(countInc == 0 && ((this.walletCurrencyList.currencies[i].keyType == "") || (this.walletCurrencyList.currencies[i].keyType != "" && (this.walletCurrencyList.currencies[i].symbol == 'ETH' || this.walletCurrencyList.currencies[i].symbol == 'TRX')))){
                  returnData.push(this.walletCurrencyList.currencies[i])
                }
              }
            }
          }else{
            returnData.push(this.walletCurrencyList.currencies[i])
          }

          if(i == this.walletCurrencyList.currencies.length-1){
            // console.log('returnData ===', returnData)
            var search = this.searchCurr.toLowerCase();
            return returnData.filter((val) => this.searchCurr ? (val.symbol.toLowerCase().includes(search) || val.currency_name.toLowerCase().includes(search)) : true);
          }
        }
      },
      getAllocationValue(getvalue){
        return parseFloat((getvalue/this.totalUsdValue)*100).toFixed(2);
      },
      getConvertedValue(item, currency) {
        if (item.currency == currency) {
          return item.amount;
        } else {
          let amount = 0;
          if(item.currency == 'UGOLD' && this.instruments[item.currency]){
            amount = this.instruments[item.currency].A;
          }else if (this.instruments[item.currency + "-" + currency]) {
            amount = this.instruments[item.currency + "-" + currency].A;
          } else if (this.instruments[currency + "-" + item.currency]) {
            amount = 1 / this.instruments[currency + "-" + item.currency].A;
          } else {
            let basePrice = null, reversebasePrice = null, pairValue = null, revpairValue = null;
            if (currency == "USD") {
              basePrice = this.instruments[item.currency + "-BTC"];
              reversebasePrice = this.instruments["BTC-" + item.currency];
              pairValue = this.instruments["BTC-" + currency];
            } else {
              basePrice = this.instruments[item.currency + "-USD"];
              reversebasePrice = this.instruments["USD-" + item.currency];
              pairValue = this.instruments["USD-" + currency];
            }
            if (basePrice && pairValue) {
              amount = pairValue.A * basePrice.A;
            } else if (reversebasePrice && pairValue) {
              amount = pairValue.A / reversebasePrice.A;
            } else {
              amount = 0;
            }
          }
          if (currency == "USD") {
            return (amount * item.amount);
          } else {
            return (amount * item.amount);
          }
        }
      },
      formatfloat(num) {
        if (num) {
          num = parseFloat(num);
          try {
            return format(num, { notation: "fixed" }) || "";
          } catch (e) {
            try {
              return num.toFixed(8);
            } catch (e) {
              return "";
            }
          }
        } else {
          return 0;
        }
      },
      getCurrencyChange(base) {
        // console.log('innnn',base)
        if (base != "USD" && this.instruments && this.instruments[`${base}-USD`]) {
          return this.instruments[`${base}-USD`].CB;
        } else {
          return 0;
        }
      },
      setTicketRequestparameters(getNetwork, getCurrSym, getCurrName) {
        let getCurrSymValue = getCurrSym ;
        let getNetworkName = 'token';
        if (getNetwork == "ERC20") {
          getNetworkName = 'wallet'
          getCurrSymValue = "ETH";
        } else if (getNetwork == "TRC20") {
          getNetworkName = 'wallet'
          getCurrSymValue = "TRX";
        }
        this.enableTicketCoinSelect = getCurrSymValue;
        this.enableTicketJson["coin"] = getCurrSymValue;
        this.enableTicketJson["networkName"] = getCurrSym;
        this.enableTicketJson["networkType"] = getNetworkName;
        this.enableTicketJson["getCurrName"] = getCurrName;
        this.enableTicketJson["reason"] = 3;
        this.enableTicketJson["text"] = "Add New Wallet or New Network <br>  Wallet / Network Details: "+getCurrSymValue;
        this.enableTicketJson["title"] = 21;
      },
      submitTicket() {
        let input_json = {
          globalParams: {
            coin: this.enableTicketJson.coin,
            network: (this.enableTicketJson.networkName == "ERC20" || this.enableTicketJson.networkName == "TRC20") ? this.enableTicketJson.networkName : '',
            reason: this.enableTicketJson.reason,
            title: this.enableTicketJson.title,
            text: this.enableTicketJson.text,
            otp: this.otp,
          },
          localParams: {
            parameter: this, fromPage :'enableWallet'
          },
        };
        this._runCreateTicket(input_json);
      },
      submit() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        let input_json = {
          globalParams: {
            otp: _that.otp.toString(),
            trans_id: _that.trans_id.toString(),
          },
          localParams: {
            parameter: _that
          },
        };
        _that._runTicketCheckOtp(input_json);
      },
      callcurrencyFunction(){
        this._runWalletCurrencyJsonList({
          globalParams: {},
          localParams: {
            parameter: this
          }
        });
      },
      TokenListAccToWallet(getData) {
        let walletJson = {};
        for (let i = 0; i <= this.$env_var.walletCurrencyList.length - 1; i++) {
          let val = this.$env_var.walletCurrencyList[i],
            setKeyValue = "1",
            keyType = "";
          if (val.keyType == "") {
            setKeyValue = "";
            keyType = "";
          } else if (val.keyType != "" && val.keyType != "FIAT") {
            setKeyValue = "-1";
            keyType = val.keyType;
          }
          if (
            ((getData == "" && setKeyValue == "") || (getData != "" && setKeyValue == "-1")) && ((this.searchWalletToken != "" && val.symbol.toLowerCase().includes(this.searchWalletToken.toLowerCase())) || val.symbol.toLowerCase().includes(this.searchWalletToken.toLowerCase()))) {
            if (!walletJson.hasOwnProperty(keyType)) {
              walletJson[keyType] = [];
            }
            walletJson[keyType].push(val);
          }
          if (i == this.$env_var.walletCurrencyList.length - 1) {
            return walletJson;
          }
        }
      },
      walletListFunc() {
        let Zero = [],
        NotZero = [],
        marginList = Object.values(this.margin_list);
        for (let i = 0; i <= this.$env_var.walletCurrencyList.length - 1; i++) {
          let json = {}, getFlag = -1;
          for (let j = 0; j <= marginList.length - 1; j++) {
              if (marginList[j].currency.charAt(0) !== 'C' && this.$env_var.walletCurrencyList[i].symbol == marginList[j].currency && marginList[j].amount > 0) {
                json = this.$env_var.walletCurrencyList[i];
                json["amount"] = marginList[j].amount;
                getFlag = 1;
              }
              if (marginList[j].currency.charAt(0) !== 'C' &&  this.$env_var.walletCurrencyList[i].symbol == marginList[j].currency && marginList[j].amount <= 0) {
                json = this.$env_var.walletCurrencyList[i];
                json["amount"] = 0;
                getFlag = 0;
              }
              if (j == marginList.length - 1) {
                if (getFlag == 1) {
                  NotZero.push(json);
                }
                if (getFlag == 0) {
                  Zero.push(json);
                }
              }
            
          }
          if (i == this.$env_var.walletCurrencyList.length - 1) {

            let returnArrayData = [];
            if (this.hideZero) {
              returnArrayData = NotZero;
            } else {
              returnArrayData = NotZero.concat(Zero);
            }
            if (returnArrayData.length > 0 && (this.searchCurrency != "" || this.activeWallets != "")) {
              
              let search = this.searchCurrency != "" ? this.searchCurrency.toLowerCase() : "";
              returnArrayData = returnArrayData.filter(
                (val) => (search == "" && ((this.activeWallets == "FIAT" && val.keyType.includes("FIAT")) || (this.activeWallets != "FIAT" && !val.keyType.includes("FIAT")))) || (search != "" && (val.symbol.toLowerCase().includes(search) || val.currency_name.toLowerCase().includes(search)) && ((this.activeWallets == "FIAT" && val.keyType.includes("FIAT")) || (this.activeWallets != "FIAT" && !val.keyType.includes("FIAT")))));
            }
            return returnArrayData;
          }
        }
      },
      isWalletEnabled(getSymbol) {
        if (getSymbol == "ERC20") {
          getSymbol = "ETH";
        } else if (getSymbol == "TRC20") {
          getSymbol = "TRC";
        }
        let setFlag = 0;
        for(let j=0 ; j<= this.getWallets.length-1 ; j++){
          if(this.getWallets[j].coin == getSymbol){
            setFlag = 1 
          }

          if(j == this.getWallets.length-1){
            return (setFlag == 1 ? true : false) ;
          }
        }
      },
    },
    created() {
      this.callcurrencyFunction()
      // this._runGetEnableWallets({globalParams: {},localParams: {  parameter: this, page: "Wallet"}});
      this._runTradingAccount({ globalParams: {}, localParams: { parameter: this, page: "Wallet" } });
      
      
    },
  };
</script>