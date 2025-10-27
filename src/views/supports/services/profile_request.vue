<template>
  <div v-if="ticketFilter != ''">
    <loader v-if="pageLoader"></loader>
    <alert-notification v-if="notification_msg != ''" />
    <!--<complete-loading :pageloader_value="pageLoader" :type="'complete'" v-if="pageLoader"></complete-loading>-->
    <!------------------------div1  for sub topcis only -------------------------------------->
    <div class="px-3" v-if="
        $parent.showDiv == '1' &&
        trans_id == '' &&
        !congModule &&
        (ticketFilter.id != '10' ||
          ticketFilter.id != '12' ||
          ticketFilter.id != '13')
      ">
      <div class="container relatedTopicCustom p-4">
        <div class="row py-4">
          <div class="col-12 section_title mb-3 mb-md-5 text-center">
            <h5 class="support_titles" v-if="parseInt(ticketFilter.id) == 93">
              {{ ticketFilter.title }}
            </h5>
            <h5 class="support_titles" v-else> Get Help With <span class="secondary">{{ ticketFilter.title }}</span>
              <span>Related Queries</span>
            </h5>
          </div>
          <div class="col-12 relatedRequestOuter">
            <div class="relatedRequest bg-p" @click="$parent.chooseRequestType(inList, ticketFilter)" v-for="inList in ticketData[ticketFilter.id]" v-if="
                (parseInt(inList) == 111 && parseInt(get_user.pro_user) == 1) ||
                (parseInt(inList) != 111 && parseInt(inList) != 112)
              " :class="'count' + ticketData[ticketFilter.id].length">
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0">{{ ticketFilter.categories[inList].title }}</p>
                <feather type="chevron-right"></feather>
              </div>
            </div>
          </div>
          <!--Static Accordian-->
          <!-- <a class="mx-auto mt-4 underline supportHome d-flex align-items-center justify-content-center" href="#" @click="backTick()"><feather type="home"></feather> Support Home</a> -->
        </div>
      </div>
    </div>
    <!------------------------div2  for sub topic detail only -------------------------------------->
    <div class="container" v-if="
        $parent.showDiv == '2' &&
        trans_id == '' &&
        !congModule &&
        (ticketFilter.id != '10' ||
          ticketFilter.id != '12' ||
          ticketFilter.id != '13')
      ">
      <div class="row pt-3">
        <div class="col-12 p-0">
          <div class="rightside_answers">
            <div class="section_title mb-3 mb-md-5">
              <h5>{{ $parent.title_text }}</h5>
              <!-- <a class="mr-3 cap_btn" href="#" @click="backTick()">Back</a> -->
            </div>
            <div class="mb-3">
              <p class="mb-3" v-html="showText($parent.title_text, $parent.title)"></p>
              <span v-if="$parent.title_text == 'Investor Password Request'">
                <p dir="ltr" style="line-height: 1.38; text-align: center">
                  <span style="
                      background-color: transparent;
                      font-weight: 400;
                      font-style: normal;
                      font-variant: normal;
                      text-decoration: none;
                      vertical-align: baseline;
                      white-space: pre;
                      white-space: pre-wrap;
                    "></span>
                </p>
                <p dir="ltr" style="line-height: 1.38"> In case if you face any issues setting investor password from your MT4/MT5 platform, Please proceed with creating the support request </p>
              </span>
            </div>
            <div class="pt-3 text-center">
              <button class="cap_btn d-flex align-items-center justify-content-center mx-auto" v-on:click="openForm()">
                <feather size="17px" class="mr-2" type="home"></feather> I'm not satisfied
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!------------------------div3   for sub topic or other form only-------------------------------------->
    <div class="mt-2 middleBox" v-if="$parent.showDiv == '3' && trans_id == '' && !congModule">
      <div class="section_title mb-0 text-center pt-4">
        <h5 class="support_title" v-if="parseInt(ticketFilter.id) == 10"> Submit a complaint </h5>
        <h5 class="support_title" v-else-if="parseInt(ticketFilter.id) == 12"> Help us with your {{ $parent.reason_text }}
        </h5>
        <h5 class="support_title secondaryBG colored" v-else-if="parseInt(ticketFilter.id) == 13"> Ask us any other question </h5>
        <h5 class="support_title secondaryBG colored" v-else-if="
            parseInt(ticketFilter.id) == 16 && parseInt($parent.title) == 93
          "> Add Bank Details </h5>
        <h5 class="support_title" v-else-if="
            parseInt(ticketFilter.id) == 16 && parseInt($parent.title) == 95
          "> Add Skrill Id Details </h5>
        <h5 class="support_title" v-else-if="
            parseInt(ticketFilter.id) == 16 && parseInt($parent.title) == 96
          "> Add Neteller Id Details </h5>
        <h5 class="support_title" v-else-if="
            parseInt(ticketFilter.id) == 16 && parseInt($parent.title) == 107
          "> Add Credit Card Details </h5>
        <h5 class="support_title" v-else-if="
            parseInt(ticketFilter.id) == 5 &&
            parseInt($parent.title) == 69 &&
            ticketRequest != ''
          "> Get Help With Change in {{ ticketRequest }} Wallet Address </h5>
        <h5 class="support_title secondaryBG colored" v-else> Get Help With {{ $parent.title_text }} in {{ $parent.reason_text }}
          <span>support</span>
        </h5>
      </div>
      <!-- <span class="cross_divsec" @click="backTick()"><feather class="d-block" type="x-circle"></feather> 
                close
            </span> -->
      <div v-if="parseInt(ticketFilter.id) == 1 && parseInt($parent.title) == 87">
        <div class="CustomBlockWidth SupportBlockCenter mb-3">
          <div class="mainTitle text-center">
            <small class="mb-3 mb-md-5 d-block">Please Enter your new email ID below</small>
          </div>
          <div class="form-group field-wrapper">
            <label class="labeltext active">Existing Email Address</label>
            <input placeholder=" " class="form-control" v-model="get_user.email" type="text" disabled="" />
          </div>
          <div class="form-group field-wrapper">
            <label for="username" class="labeltext">Enter Your New Email Address</label>
            <input placeholder=" " type="email" name="new_email" v-model="new_email" class="form-control form-control" ref="new_emailInput" />
            <!-- <p class="error" v-for="error in errors.collect('new_email')"><span v-if="error == 'The new_email field must be a valid email.'">Please enter a valid email address</span><span v-if="error == 'The new_email field is required.'">Email field is required</span></p> -->
          </div>
          <div class="text-center">
            <!-- <a class="mr-3 underline" href="#" @click="backTick()">Back To Tickets</a> -->
            <button class="cap_btn large_btn" :class="pageLoader ? 'disabled' : ''" v-on:click="submitNow()"> Change Email Address </button>
          </div>
        </div>
      </div>
      <div v-else-if="
          parseInt(ticketFilter.id) == 1 && parseInt($parent.title) == 88
        ">
        <div class="CustomBlockWidth SupportBlockCenter mb-3">
          <div class="mainTitle text-center">
            <small class="mb-3 mb-md-5 d-block">Please Enter Your New Mobile Number Below</small>
          </div>
          <div class="form-group field-wrapper" v-if="get_user.mobile_no">
            <label class="labeltext active">Existing Mobile Number</label>
            <input placeholder=" " class="form-control" v-model="get_user.mobile_no" type="text" disabled="" />
          </div>
          <div class="form-group field-wrapper">
            <vue-phone-number-input v-model="new_mobile" :no-example="true" :default-country-code="userCountry" ref="new_mobileInput" name="new_mobile" @update="updatedText" />
            <p class="error" v-if="!numberValid">Invalid Number</p>
          </div>
          <div class="text-center">
            <button class="cap_btn large_btn mt-4" v-on:click="submitNow()"> Change Mobile Number </button>
          </div>
        </div>
      </div>
      <div v-else-if="
          parseInt(ticketFilter.id) == 1 && parseInt($parent.title) == 90
        ">
        <form action="" method="post" enctype="multipart/form-data" id="addressForm" v-on:submit.prevent="submitNow()">
          <div class="CustomBlockWidth SupportBlockCenter mb-3">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group field-wrapper">
                  <label for="username" class="labeltext">Residential Address line 1 </label>
                  <input placeholder=" " class="form-control form-control" name="address1" type="text" ref="address1Input" />
                  <!-- <p class="error" v-for="error in errors.collect('address1')">{{ error }}</p> -->
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group field-wrapper">
                  <label for="username" class="labeltext"> Residential Address line 2 </label>
                  <input placeholder=" " class="form-control form-control" name="address2" type="text" ref="address2Input" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group field-wrapper">
                  <label for="username" class="labeltext"> Post Code</label>
                  <input placeholder=" " class="form-control form-control" name="post_code" type="text" ref="post_codeInput" />
                  <!-- <p class="error" v-for="error in errors.collect('post_code')">The post code is required</p>  -->
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group field-wrapper">
                  <label for="username" class="labeltext"> Country of Residence</label>
                  <select name="residence_country" v-model="residence_country" ref="residence_countryInput" class="form-control form-control">
                    <option v-for="list in $env_var.countriesList" :value="list.name">
                      {{ list.name }}
                    </option>
                  </select>
                  <!-- <p class="error" v-for="error in errors.collect('residence_country')">The residence country is required1</p> -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group field-wrapper">
                  <label for="username" class="labeltext"> Country of Nationality</label>
                  <select name="nationality" v-model="nationality_country" ref="nationalityInput" class="form-control form-control">
                    <option v-for="list in $env_var.countriesList" :value="list.code">
                      {{ list.name }}
                    </option>
                  </select>
                  <!-- <p class="error" v-for="error in errors.collect('nationality')">The nationality country is required</p> -->
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group field-wrapper">
                  <label for="username" class="labeltext"> City or Town</label>
                  <input placeholder=" " class="form-control form-control" name="city" type="text" ref="cityInput" />
                  <!-- <p class="error" v-for="error in errors.collect('city')">{{ error }}</p>  -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="field-wrapper">
                  <!-- <div class="supportingdocument w-100"><p class="btn" @click="$refs.address.click()" ><feather type="upload" class="mr-2"></feather>Upload recent address proof</p><input type="file"  name="document[]" value="Upload Document" ref="address" v-on:change="onFileChange('address', $event.target.files)"  class="form-control form-control"  /><p class="error" v-for="error in errors.collect('document[]')">document is required</p></div> -->
                  <div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.address != ''">
                    <span class="nameIco">
                      <feather class="mr-2" type="file"></feather>
                      <span>{{ document_proof_array.address }}</span>
                    </span>
                    <a href="#" class="closeBtn" @click="clearDoc('address')">
                      <feather type="x"></feather>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="cap_btn large_btn" :class="pageLoader ? 'disabled' : ''"> Change Address </button>
            </div>
          </div>
        </form>
      </div>
      <div class="row mx-0" v-else-if="parseInt(ticketFilter.id) == 16">
        <div class="CustomBlockWidth SupportBlockCenter mb-3 col-12">
          <form action="" method="post" enctype="multipart/form-data" id="bankForm" v-on:submit.prevent="submitNow()" v-if="
              parseInt($parent.title) == 93 || parseInt($parent.method_id) == 1
            ">
            <div class="CustomBlockWidth SupportBlockCenter mb-3">
              <div class="row">
                <div class="col-12">
                  <div class="form-group field-wrapper">
                    <label for="username" class="labeltext">Bank Name:</label>
                    <input placeholder=" " class="form-control form-control" name="bank_name" type="text" ref="bank_nameInput" />
                    <!-- <p class="error" v-for="error in errors.collect('bank_name')">The bank name is required</p>  -->
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group field-wrapper">
                    <label for="username" class="labeltext">Account Name</label>
                    <input placeholder=" " class="form-control form-control" name="holder_name" type="text" ref="holder_nameInput" />
                    <!-- <p class="error" v-for="error in errors.collect('holder_name')">The account holder name is required</p>  -->
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group field-wrapper">
                    <label for="username" class="labeltext">Account Number:</label>
                    <input placeholder=" " class="form-control form-control" name="account_no" type="text" ref="account_noInput" />
                    <!-- <p class="error" v-for="error in errors.collect('account_no')">The account number is required</p>  -->
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group field-wrapper">
                    <label for="username" class="labeltext">Country</label>
                    <select name="country" v-model="countrybank" :class="countrybank != '' ? 'active' : ''" ref="countryInput" class="form-control form-control">
                      <option v-for="list in $env_var.countriesList" :value="list.name">
                        {{ list.name }}
                      </option>
                    </select>
                    <!-- <p class="error" v-for="error in errors.collect('country')">The country field is required</p>  -->
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group field-wrapper mb-0">
                    <label for="username" class="labeltext">IBAN</label>
                    <input placeholder=" " class="form-control form-control" name="micr" type="text" ref="micrInput" />
                    <!-- <p class="error mb-2" v-for="error in errors.collect('micr')">The iban is required</p>    -->
                  </div>
                  <label class="customCheckbox ibancheckbox stitle mb-3 none-before align-items-center d-flex">
                    <small>My Bank Doesn’t issue IBAN</small>
                    <input type="checkbox" v-model="iban_not_issue" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group field-wrapper">
                    <label for="username" class="labeltext">Swift/BIC/Sort Code</label>
                    <input placeholder=" " class="form-control form-control" name="sort_code" type="text" ref="sort_codeInput" />
                    <!-- <p class="error" v-for="error in errors.collect('sort_code')">The swift code is required</p>   -->
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group field-wrapper">
                    <label for="username" class="labeltext">Bank Address:</label>
                    <input placeholder=" " class="form-control form-control" name="bank_address" type="text" ref="bank_addressInput" />
                    <!-- <p class="error" v-for="error in errors.collect('bank_address')">The bank address is required</p>  -->
                  </div>
                </div>
                <div class="col-12">
                  <div class="field-wrapper">
                    <!-- <div class="supportingdocument w-100" ><label for="username" class="labeltext">Upload Bank Statement</label><p class="btn" @click="$refs.bank.click()" ><feather type="upload" class="mr-2"></feather>Upload </p><input type="file"  name="document[]" value="Upload Document" ref="bank" v-on:change="onFileChange('bank', $event.target.files)"  class="form-control form-control"  /><p class="error mb-2" v-for="error in errors.collect('document[]')">document is required</p></div> -->
                    <div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.bank != ''">
                      <span class="nameIco">
                        <feather class="mr-2" type="file"></feather>
                        <span>{{ document_proof_array.bank }}</span>
                      </span>
                      <a href="#" class="closeBtn" @click="clearDoc('bank')">
                        <feather type="x"></feather>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button class="cap_btn large_btn" :class="pageLoader ? 'disabled' : ''"> Add a New Bank Account </button>
              </div>
            </div>
          </form>
          <form action="" method="post" enctype="multipart/form-data" id="formRequest" v-on:submit.prevent="submitNow()" v-if="parseInt($parent.title) == 107">
            <div class="cardcontainer">
              <div class="subContainer d-flex flex-wrap">
                <div class="cardHolderName">{{ get_user.username }}</div>
                <div class="form-controls w-100">
                  <div class="visaCont" v-if="creditCardType != ''"></div>
                  <!--<img :src="'/assets/fxView/images/'+creditCardType" alt="card">-->
                </div>
                <div class="form-controls w-100">
                  <div class="cardNum">
                    <label class="w-100">Credit Card Number</label>
                    <div class="d-inline-flex mainBG">
                      <ul class="d-flex align-items-center">
                        <li>
                          <input type="text" placeholder="----" class="cardinput form-control" v-model="first_digit_card" name="first_digit_card" maxlength="4" ref="first_digit_cardInput" v-on:keyup="keymonitor" />
                        </li>
                        <li>****</li>
                        <li>****</li>
                        <li>
                          <input type="text" placeholder="----" class="cardinput form-control" v-model="last_digit_card" name="last_digit_card" maxlength="4" ref="last_digit_cardInput" />
                        </li>
                      </ul>
                    </div>
                    <p class="error" v-if="!errors.first('first_digit_card') && msz != ''">
                      {{ msz }}
                    </p>
                    <!-- <p class="error" v-for="error in errors.collect('last_digit_card')">last 4 digits is required and contains only numeric character</p>  -->
                    <!-- <p class="error" v-for="error in errors.collect('first_digit_card')">first 4 digits is required and contains only numeric character</p> -->
                  </div>
                </div>
                <div class="form-controls w-100">
                  <label>Expiration</label>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="date">
                      <p class="datepara">
                        <select id="expiry-date" class="selectExpiryDate form-control" name="month" ref="monthInput">
                          <option value="">--</option>
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        <span>/</span>
                        <select id="expiry-date" class="selectExpiryDate form-control" name="year" ref="yearInput">
                          <option value="">----</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                        </select>
                      </p>
                    </div>
                    <div class="ccv">
                      <p>***</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="backlayer"></div>
            <div class="field-wrapper">
              <div class="supportingdocument w-100">
                <p class="mb-2"> We require the following for the card verification - </p>
                <p class="mb-2"> Color copy of the front side of the card, showing: full name, expiration date, Bank name/logo, first 4 and last 4 digits of the credit card number hiding the middle 8 digits. </p>
                <p class="btn" @click="$refs.ccFront.click()">
                  <feather type="upload" class="mr-2"></feather>Upload a Supporting Document
                </p>
                <!-- <input type="file"  name="document[]" value="Upload Document" ref="ccFront" v-on:change="onFileChange('ccFront', $event.target.files)"  class="form-control form-control"  /> -->
              </div>
              <div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.ccFront != ''">
                <span class="nameIco">
                  <feather class="mr-2" type="file"></feather>
                  <span>{{ document_proof_array.ccFront }}</span>
                </span>
                <a href="#" class="closeBtn" @click="clearDoc('ccFront')">
                  <feather type="x"></feather>
                </a>
              </div>
            </div>
            <div class="field-wrapper">
              <div class="supportingdocument w-100">
                <p class="mb-2"> Color copy of the back side of the card hiding the CVV security code. The back copy should shown the sign of the holder </p>
                <p class="btn" @click="$refs.ccBack.click()">
                  <feather type="upload" class="mr-2"></feather>Upload a Supporting Document
                </p>
                <!-- <input type="file"  name="document[]" value="Upload Document" ref="ccBack" v-on:change="onFileChange('ccBack', $event.target.files)"  class="form-control form-control"  /> -->
              </div>
              <div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.ccBack != ''">
                <span class="nameIco">
                  <feather class="mr-2" type="file"></feather>
                  <span>{{ document_proof_array.ccBack }}</span>
                </span>
                <a href="#" class="closeBtn" @click="clearDoc('ccBack')">
                  <feather type="x"></feather>
                </a>
              </div>
            </div>
            <div class="text-center">
              <button class="cap_btn large_btn" :class="pageLoader ? 'disabled' : ''"> Submit </button>
            </div>
          </form>
          <form action="" method="post" enctype="multipart/form-data" id="formRequest" v-on:submit.prevent="submitNow()" v-if="
              parseInt($parent.title) == 95 || parseInt($parent.title) == 96
            ">
            <div class="form-group field-wrapper">
              <input type="text" name="online_payment_id" class="form-control form-control" ref="online_payment_idInput" />
              <label class="labeltext" v-html="
                  $parent.method_id != ''
                    ? parseInt($parent.method_id) == 2
                      ? 'Skrill Id'
                      : 'Netteller Id'
                    : $parent.title_text + ' Id'
                "></label>
              <!-- <p class="error" v-for="error in errors.collect('online_payment_id')">The payment id field is required and may only contain numeric characters.</p>  -->
            </div>
            <div class="field-wrapper"> please upload the screenshot of the {{ $parent.title_text }} profile contacting the full name, {{ $parent.title_text }} id and address. We are going to match the name and address <div class="supportingdocument w-100">
                <p class="btn" @click="$refs.skillNet.click()">
                  <feather type="upload" class="mr-2"></feather>Upload a Supporting Document
                </p>
                <!-- <input type="file"  name="document[]" value="Upload Document" ref="skillNet" v-on:change="onFileChange('skillNet', $event.target.files)" class="form-control form-control"  /> -->
                <!-- <p class="error" v-for="error in errors.collect('document[]')">document is required</p>  -->
              </div>
              <div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.skillNet != ''">
                <span class="nameIco">
                  <feather class="mr-2" type="file"></feather>
                  <span>{{ document_proof_array.skillNet }}</span>
                </span>
                <a href="#" class="closeBtn" @click="clearDoc('skillNet')">
                  <feather type="x"></feather>
                </a>
              </div>
            </div>
            <div class="text-center">
              <button class="cap_btn large_btn" :class="pageLoader ? 'disabled' : ''"> Submit </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row justify-content-center mx-0" v-else-if="parseInt($parent.title) == 10">
        <div class="CustomBlockWidth SupportBlockCenter mb-3 col-12">
          <form action="" method="post" enctype="multipart/form-data" id="formRequest" v-on:submit.prevent="submitNow()">
            <h4 class="mb-3">User Details</h4>
            <div class="form-group field-wrapper mb-0">
              <input placeholder=" " type="hidden" name="legal_entity" class="form-control form-control" />
            </div>
            <div class="form-group field-wrapper">
              <account-id></account-id>
            </div>
            <h4 class="mb-3">Complaint Details</h4>
            <div class="row">
              <div class="col-12 col-md-12">
                <div class="form-group field-wrapper">
                  <label class="labeltext"> Employee who offered the services to the Client:</label>
                  <input placeholder=" " type="text" name="employee" class="form-control form-control" ref="employeeInput" />
                  <!-- <p class="error" v-for="error in errors.collect('employee')">{{ error }}</p> -->
                </div>
              </div>
              <div class="col-12 col-md-12">
                <div class="form-group field-wrapper">
                  <label>Date and Time of the disputed situation (in MetaTrader server time):</label>
                  <datepicker v-model="dispute_time" placeholder=" " class="w-100" name="dispute_time" ref="dispute_timeInput" type="date" :lang="lang" format="YYYY-MM-DD 00:00:00" :not-after="disabledDates"></datepicker>
                  <!-- <p class="error" v-for="error in errors.collect('dispute_time')">The dispute time is required</p> -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-12">
                <div class="form-group field-wrapper">
                  <label class="labeltext"> Ticket Number(s) of all contested positions and/or pending orders:</label>
                  <input placeholder=" " type="text" name="order" class="form-control form-control" ref="orderInput" />
                  <!-- <p class="error" v-for="error in errors.collect('order')">{{ error }}</p> -->
                </div>
              </div>
              <div class="col-12 col-md-12">
                <div class="form-group field-wrapper">
                  <label class="labeltext"> Disputed amount:</label>
                  <input placeholder=" " type="text" name="amount" class="form-control form-control" ref="amountInput" />
                  <!-- <p class="error" v-for="error in errors.collect('amount')">{{ error }}</p> -->
                </div>
              </div>
            </div>
            <div class="form-group field-wrapper">
              <label class="text-left customCheckbox">
                <input type="checkbox" class="form-control" v-model="authority" name="authority" />
                <span class="checkmark"></span> Have you reported your complaint to any Supervisory Authority? </label>
            </div>
            <div class="form-group field-wrapper" v-if="authority">
              <label class="labeltext">Please state the name of the Supervisory Authority</label>
              <input placeholder=" " type="text" name="authority_name" class="form-control form-control" ref="authority_nameInput" />
              <!-- <p class="error" v-for="error in errors.collect('authority_name')">The authority name is required</p> -->
            </div>
            <div class="form-group field-wrapper">
              <label class="labeltext"> Detailed description of the Complaint: </label>
              <textarea class="form-control form-control" placeholder=" " name="text" ref="textInput"></textarea>
              <!-- <p class="error" v-for="error in errors.collect('text')">{{ error }}</p> -->
            </div>
            <div class="field-wrapper">
              <p class="mb-3"> Please attach together with this form any supporting evidence to your claim that will facilitate fxview's investigation of your complaint. Supporting evidence may consist of any documentation (screenshots, chats, phone records etc) relevant to the complaint. </p>
              <div class="supportingdocument w-100">
                <p class="btn" @click="$refs.complaint.click()">
                  <feather type="upload" class="mr-2"></feather>Upload a Supporting Document
                </p>
                <!-- <input type="file"  name="document[]" value="Upload Document" ref="complaint" v-on:change="onFileChange('complaint', $event.target.files)"/> -->
              </div>
              <div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.complaint != ''">
                <span class="nameIco">
                  <feather class="mr-2" type="file"></feather>
                  <span>{{ document_proof_array.complaint }}</span>
                </span>
                <a href="#" class="closeBtn" @click="clearDoc('complaint')">
                  <feather type="x"></feather>
                </a>
              </div>
            </div>
            <div class="text-center">
              <button class="cap_btn large_btn" :class="pageLoader ? 'disabled' : ''"> Submit </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row justify-content-center mx-0" v-else>
        <!--{{parseInt($parent.title)}}69---{{parseInt($parent.reason)}}5-->
        <div class="CustomBlockWidth SupportBlockCenter mb-3 col-12">
          <form action="" method="post" enctype="multipart/form-data" id="formRequest" v-on:submit.prevent="submitNow()">
            <div class="form-group field-wrapper">
              <label class="labeltext"> Subject</label>
              <input placeholder=" " type="text" name="subject" class="form-control form-control" ref="subjectInput" />
              <!-- <p class="error" v-for="error in errors.collect('subject')">{{ error }}</p> -->
            </div>
            <div class="form-group field-wrapper">
              <label class="labeltext"> Message</label>
              <textarea class="form-control form-control" placeholder="Your Message" name="text" ref="textInput"></textarea>
              <!-- <p class="error" v-for="error in errors.collect('text')">{{ error }}</p> -->
            </div>
            <!-- <div class="field-wrapper"><label class="labeltext"> Upload A Supporting Document</label><div class="supportingdocument w-100"><p class="btn" @click="$refs.rest.click()"><feather type="upload" class="mr-2"></feather>Upload Here</p><input type="file"  name="document[]" value="Upload Document" ref="rest" v-on:change="onFileChange('rest', $event.target.files)"/></div><div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.rest != ''"><span class="nameIco"><feather class="mr-2" type="file"></feather> {{document_proof_array.rest}}  </span><a href="#" class="closeBtn" @click="clearDoc('rest')"><feather type="x"></feather></a></div></div>   -->
            <div class="text-center">
              <button class="cap_btn large_btn" :class="pageLoader ? 'disabled' : ''"> Submit </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="mt-2 middleBox" v-if="trans_id != '' && !congModule && !authComponent">
      <app-OptVerfication :transaction_id="trans_id" :module="$parent.reason" :title_parent="$parent.title" :data="''" :ticketRequestFrom="ticketRequest" :accountId="accountIdFrom"></app-OptVerfication>
    </div>
    <div class="mt-2 middleBox" v-if="congModule">
      <div class="row">
        <div class="col-12 whitebox p-4">
          <div class="congratulations">
            <div class="section_title mb-3 text-center" v-if="
                parseInt(ticketFilter.id) == 10 ||
                parseInt(ticketFilter.id) == 12 ||
                parseInt(ticketFilter.id) == 13
              ">
              <h5 class="support_title"> Get Help With {{ $parent.reason_text }}
                <span>Support</span>
              </h5>
            </div>
            <div class="support_search mb-3 text-center" v-else>
              <p class="support_title"> Get Help With {{ $parent.title_text }} in {{ $parent.reason_text }}
                <span>Support</span>
              </p>
            </div>
            <div class="succesFront">
              <div class="logo_congrats">
                <img src="/assets/website/images/success-icon.svg" alt="Icon" />
              </div>
              <div class="subtitle">
                <h3> Congratulations <span class="themecolor">{{ get_user.username }}</span>
                </h3>
                <p v-if="
                    parseInt(ticketFilter.id) == 1 &&
                    parseInt($parent.title) == 10
                  "> Your complaint has been Registered successfully </p>
                <p v-if="
                    parseInt($parent.reason) == 1 &&
                    parseInt($parent.title) == 88
                  "> Mobile number changed successfully </p>
                <p v-else>Your ticket has been created</p>
              </div>
            </div>
            <div class="signupbtn full-width submitButton w-100 mt-4 text-center">
              <!-- <router-link :to="{ name: 'support', params: {tabName:'openRequest'}}" class="cap_btn large_btn">Go to Tickets </router-link> -->
              <a href="javascript:void(0)" class="cap_btn large_btn blue" @click="
                  fromStart = 1;
                  backTick();
                ">Go to Tickets </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import optVerfication from "./otp_verification.vue";
  import Datepicker from "vue2-datepicker";
  //import twoFa from '../../users/2FA'
  import moment from "moment";
  import {
    supportMixins
  } from "@/plugins/support";
  // const support_text = require('/assets/website/js/support.json')
  export default {
    mixins: [supportMixins],
    data() {
      return {
        notification_msg: "",
        notification_type: "",
        authComponent: false,
        request_page: "tickets",
        //-----select account----
        selectAccount: false,
        account_id: "",
        act_account_id: "",
        demo_live: "",
        platform: "",
        //============message and loader ===========
        response_msg: "",
        msg_type: "",
        pageLoader: false,
        loaderFuncRun: "1",
        //==========================================
        authority: false,
        countrybank: "",
        //mobile
        new_mobile: "",
        //email
        new_email: "",
        submitted: false,
        informationRequired: 1,
        //credit card
        first_digit_card: "",
        last_digit_card: "",
        creditCardType: "",
        //complaints
        lang: {
          formatLocale: {
            firstDayOfWeek: 1,
          },
          monthBeforeYear: false,
        },
        dispute_time: "",
        congModule: false,
        trans_id: "",
        comment: "",
        iban_not_issue: false,
        entension_allowed: ["image/png", "application/pdf", "text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/plain", ],
        document_proof_array: {
          bank: "",
          address: "",
          skillNet: "",
          rest: "",
          complaint: "",
          ccBack: "",
          ccFront: "",
        },
        msz: "",
        numberWithCountry: "",
        numberValid: true,
        userCountry: "IN",
        disabledDates: new Date(),
        residence_country: "",
        nationality_country: "",
        disabledBefore: new Date(2019, 10, 2),
        disabledAfter: new Date(2020, 6, 31),
      };
    },
    props: ["ticketFilter", "ticketRequest", "accountIdFrom"],
    components: {
      appOptVerfication: optVerfication,
      datepicker: Datepicker,
    },
    methods: {
      customFormatter(date) {
        return moment(date).format("DD-MM-YYYY  hh:mm:ss");
      },
      updatedText(e) {
        this.numberWithCountry = e.formattedNumber;
        this.numberValid = e.isValid;
      },
      keymonitor() {
        if (this.first_digit_card != "") {
          if (this.first_digit_card.charAt(0) == "4") {
            this.msz = "";
            this.creditCardType = "visa.svg";
          } else if (this.first_digit_card.charAt(0) == "5") {
            this.msz = "";
            this.creditCardType = "mastercard.svg";
          } else if (this.first_digit_card.charAt(0) == "6") {
            this.msz = "";
            this.creditCardType = "american_express.svg";
          } else {
            this.msz = "please enter valid card number";
          }
        } else {
          this.creditCardType = "";
        }
      },
      clearDoc(getdocType) {
        this.document_proof_array[getdocType] = "";
      },
      onFileChange(getdocType, file) {
        this.document_proof_array[getdocType] = file[0].name;
      },
      showText(title, key) {
        // console.log('--->',title,key)
        // const text = title.split(" ").join('')
        //return this.$t(text)
        if (key == "21") {
          // return support_text[key+'_'+this.get_user.lead_type] || '-';
        } else {
          // return support_text[key] || '-';
        }
      },
      backTick() {
        this.ticketRequest = "";
        this.$parent.allBack();
        /*this.$parent.loadServiceRequest = ''
                this.$parent.serviceRequest = true
				this.$parent.reason = '',
				this.$parent.reason_text = '',
				this.$parent.title = '0',
				this.$parent.title_text = ''
				this.$parent.inList_custom_id = ''
				this.$parent.info_req = ''
				this.$parent.method_id = ''
				this.$parent.ticketRequestFrom = ''*/
      },
      openForm() {
        this.$parent.showDiv = "3";
      },
      submitNow() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        _that.submitted = true;
        if (parseInt(_that.ticketFilter.id) == 1 && parseInt(_that.$parent.title) == 87) {
          let comment = "Please Change my email as per following details  < br > Old Email: " +
          this.get_user.email + " < br > New Email: " +
          this.new_email;
          // _that.$validator.validate().then(valid => {
          //     if (valid){
          let input_json = {
            globalParams: {
              email: _that.new_email,
              reason: _that.$parent.reason,
              reason_text: _that.$parent.reason_text,
              title: _that.$parent.title,
              title_text: _that.$parent.title_text,
              text: comment,
            },
            localParams: {
              parameter: _that
            },
          };
          _that._runTicketRequestOtp(input_json);
          //     }
          // })
        } else if (parseInt(_that.ticketFilter.id) == 1 && parseInt(_that.$parent.title) == 10) {
          let formRequest = document.getElementById("formRequest");
          let form_name = new FormData(formRequest);
          // pehle complaint yeh tha , ab complint ka ticketfilter.id = 1 reason, title 10
          if (!_that.authority) {
            form_name.append("authority_name", "");
          }
          form_name.append("authority", _that.authority);
          form_name.append("account_id", _that.account_id);
          form_name.append("act_account_id", _that.act_account_id);
          form_name.append("reason", _that.$parent.reason);
          form_name.append("reason_text", _that.$parent.title_text);
          form_name.append("title", _that.$parent.title);
          form_name.append("title_text", _that.$parent.title_text);
          // _that.$validator.validate().then(valid => {
          //     if (valid){
          let input_json = {
            globalParams: {
              form: form_name,
            },
            localParams: {
              parameter: _that,
              type: "form"
            },
          };
          _that._runTicketRequestOtp(input_json);
          //     }
          // })
        } else if (parseInt(_that.ticketFilter.id) == 1 && parseInt(_that.$parent.title) == 88) {
          let comment = "Please Change my Mobile Number as per following details  < br > Old Number: " +
          this.get_user.mobile_no + " < br > New Number: " +
          this.new_mobile;
          // _that.$validator.validate().then(valid => {
          //     if (valid){
          let input_json = {
            globalParams: {
              mobile: _that.numberWithCountry,
              reason: _that.$parent.reason,
              reason_text: _that.$parent.reason_text,
              title: _that.$parent.title,
              title_text: _that.$parent.title_text,
              text: comment,
            },
            localParams: {
              parameter: _that
            },
          };
          _that._runTicketRequestOtp(input_json);
          //     }
          // })
        } else if (parseInt(_that.ticketFilter.id) == 16 && parseInt(_that.$parent.title) == 93) {
          let bankForm = document.getElementById("bankForm");
          let comment = "Please Change my Bank Information as per following details  < br > Account Number: " +
          bankForm.elements[0].value + " < br > Holder Name: " +
          bankForm.elements[1].value + " < br > Bank Name: " +
          bankForm.elements[2].value + " < br > Bank Code: " +
          bankForm.elements[3].value + " < br > Sort Code: " +
          bankForm.elements[4].value + " < br > Bank Address: " +
          bankForm.elements[5].value;
          let form_name = new FormData(bankForm);
          form_name.append("reason", _that.$parent.reason);
          form_name.append("reason_text", _that.$parent.reason_text);
          form_name.append("title", _that.$parent.title);
          form_name.append("title_text", _that.$parent.title_text);
          form_name.append("text", comment);
          // _that.$validator.validate().then(valid => {
          //     if (valid){
          let input_json = {
            globalParams: {
              form: form_name,
            },
            localParams: {
              parameter: _that,
              type: "form"
            },
          };
          _that._runTicketRequestOtp(input_json);
          //     }
          // })
        } else if (parseInt(_that.ticketFilter.id) == 1 && parseInt(_that.$parent.title) == 90) {
          let addressForm = document.getElementById("addressForm");
          let comment = "Please Change my Address as per following details  < br > Address1: " +
          addressForm.elements[0].value + " < br > Address2: " +
          addressForm.elements[1].value + " < br > Post Code: " +
          addressForm.elements[2].value + " < br > Residence Country: " +
          addressForm.elements[3].value + " < br > Nationality: " +
          addressForm.elements[4].value + " < br > City: " +
          addressForm.elements[5].value;
          let form_name = new FormData(addressForm);
          form_name.append("reason", _that.$parent.reason);
          form_name.append("reason_text", _that.$parent.reason_text);
          form_name.append("title", _that.$parent.title);
          form_name.append("title_text", _that.$parent.title_text);
          form_name.append("text", comment);
          // _that.$validator.validate().then(valid => {
          //     if (valid){
          let input_json = {
            globalParams: {
              form: form_name,
            },
            localParams: {
              parameter: _that,
              type: "form"
            },
          };
          _that._runTicketRequestOtp(input_json);
          //     }
          // })
        } else if (parseInt(_that.ticketFilter.id) == 16) {
          if (parseInt(this.$parent.title) == 107 && this.msz == "") {
            let formRequest = document.getElementById("formRequest");
            let mnth_year = formRequest.elements[2].value + "/" + formRequest.elements[3].value;
            let comment = "Please Add " + this.$parent.title_text + " Payment Method per following details  < br > " +
            this.$parent.title_text + " Number : " + formRequest.elements[0].value + "  **** **** " + formRequest.elements[1].value + " < br > Expiry Date: " +
            mnth_year;
            let form_name = new FormData(formRequest);
            form_name.append("expiry_date", mnth_year);
            form_name.append("method", 5);
            form_name.append("subject", _that.$parent.reason_text);
            form_name.append("text", comment);
            form_name.append("reason", _that.$parent.reason);
            form_name.append("reason_text", _that.$parent.reason_text);
            form_name.append("title", _that.$parent.title);
            form_name.append("title_text", _that.$parent.title_text);
            // _that.$validator.validate().then(valid => {
            // 	if (valid){
            let input_json = {
              globalParams: {
                form: form_name,
              },
              localParams: {
                parameter: _that,
                type: "form"
              },
            };
            _that._runTicketRequestOtp(input_json);
            // 	}
            // })
          } else {
            let formRequest = document.getElementById("formRequest");
            let comment = "Please Add " + this.$parent.title_text + " Payment Method per following details  < br > " +
            this.$parent.title_text + " Id : " + formRequest.elements[0].value;
            let form_name = new FormData(formRequest);
            /*if(this.$parent.method_id != ''){
							this.title_text =(parseInt(this.$parent.method_id) == 2)? 'Skrill' : 'Netteller'
							this.title =(parseInt(this.$parent.method_id) == 2)? 95 : 96
						}*/
            form_name.append("method", this.$parent.method_id);
            form_name.append("subject", _that.$parent.reason_text);
            form_name.append("text", comment);
            form_name.append("reason", _that.$parent.reason);
            form_name.append("reason_text", _that.$parent.reason_text);
            form_name.append("title", _that.$parent.title);
            form_name.append("title_text", _that.$parent.title_text);
            // _that.$validator.validate().then(valid => {
            // 	if (valid){
            let input_json = {
              globalParams: {
                form: form_name,
              },
              localParams: {
                parameter: _that,
                type: "form"
              },
            };
            _that._runTicketRequestOtp(input_json);
            // 	}
            // })
          }
        } else {
          let formRequest = document.getElementById("formRequest");
          let form_name = new FormData(formRequest);
          form_name.append("reason", _that.$parent.reason);
          form_name.append("reason_text", _that.$parent.reason_text);
          form_name.append("title", _that.$parent.title);
          form_name.append("title_text", _that.$parent.title_text);
          // _that.$validator.validate().then(valid => {
          //     if (valid){
          let input_json = {
            globalParams: {
              form: form_name,
            },
            localParams: {
              parameter: _that,
              type: "form"
            },
          };
          _that._runTicketRequestOtp(input_json);
          //     }
          // })
        }
      },
    },
  };
</script>