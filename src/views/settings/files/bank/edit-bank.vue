<template>
  <div>
    <loader v-if="pageLoader" />
    <form
      action=""
      method="post"
      enctype="multipart/form-data"
      id="formRequest"
      v-on:submit.prevent="editBankDetails()"
    >
      <div class="row">
        <div class="col-6">
          <label class="mb-2 semibold themecolor">Bank Details</label>
          <!-- <input type="text" placeholder="Description" class="form-control mb-2">
                    <span class="f-12 textcolor">In case you add multiple accounts, please add a description for identifying your bank account</span> -->
          <input
            type="text"
            placeholder="International Bank Account Number (IBAN)"
            class="form-control mt-3 mb-3"
            v-model="account_number"
            name="account_number"
            required=""
            v-validate="{ required: true }"
          />
          <span
            v-if="bankSubmitted && errors.has('account_number')"
            class="text-danger"
            >{{ errors.first("account_number") }}</span
          >
          <input
            type="text"
            placeholder="Bank Name"
            class="form-control mb-3"
            v-model="bank_name"
            name="bank_name"
            required=""
            v-validate="{ required: true }"
          />
          <span
            v-if="bankSubmitted && errors.has('bank_name')"
            class="text-danger"
            >{{ errors.first("bank_name") }}</span
          >
          <input
            type="text"
            placeholder="BIC/ SWIFT Code/ Sort Code"
            class="form-control mb-3"
            v-model="micr"
            name="micr"
            required=""
            v-validate="{ required: true }"
          />
          <span
            v-if="bankSubmitted && errors.has('micr')"
            class="text-danger"
            >{{ errors.first("micr") }}</span
          >
          <input
            type="text"
            placeholder="Bank Address"
            class="form-control mb-3"
            v-model="bank_address"
            name="bank_address"
            required=""
            v-validate="{ required: true }"
          />
          <span
            v-if="bankSubmitted && errors.has('bank_address')"
            class="text-danger"
            >{{ errors.first("bank_address") }}</span
          >
          <!-- <div class="row">
                        <div class="col-6">
                            <input type="text" placeholder="Country" class="form-control mb-3">
                        </div>
                        <div class="col-6">
                            <input type="text" placeholder="City" class="form-control mb-3">
                        </div>
                    </div> -->
        </div>
        <div class="col-6">
          <label class="mb-2 semibold themecolor">Beneficiary Details</label>
          <input
            type="text"
            placeholder="Beneficiary Name"
            class="form-control mb-3"
            v-model="baneficiary_name"
            name="baneficiary_name"
            required=""
            v-validate="{ required: true }"
          />
          <span
            v-if="bankSubmitted && errors.has('baneficiary_name')"
            class="text-danger"
            >{{ errors.first("baneficiary_name") }}</span
          >
          <v-select
            :options="Object.values($env_var.countriesList)"
            :reduce="(country) => country.code"
            v-model="baneficiary_country"
            label="name"
            placeholder="Beneficiary Country"
            name="baneficiary_country"
            v-validate="'required'"
            class="form-control mb-3 scrollbar"
            :autocomplete="'off'"
          ></v-select>
          <!-- <input type="text" placeholder="Beneficiary Country" class="form-control mb-3" v-model="baneficiary_country"  name="baneficiary_country" required=""  v-validate="{ required: true }"> -->
          <span
            v-if="bankSubmitted && errors.has('baneficiary_country')"
            class="text-danger"
            >{{ errors.first("baneficiary_country") }}</span
          >
          <input
            type="text"
            placeholder="Beneficiary City"
            class="form-control mb-3"
            v-model="baneficiary_city"
            name="baneficiary_city"
            required=""
            v-validate="{ required: true }"
          />
          <span
            v-if="bankSubmitted && errors.has('baneficiary_city')"
            class="text-danger"
            >{{ errors.first("baneficiary_city") }}</span
          >
          <input
            type="text"
            placeholder="Beneficiary Address"
            class="form-control mb-3"
            v-model="baneficiary_address"
            name="baneficiary_address"
            required=""
            v-validate="{ required: true }"
          />
          <span
            v-if="bankSubmitted && errors.has('baneficiary_address')"
            class="text-danger"
            >{{ errors.first("baneficiary_address") }}</span
          >
          <div class="field-wrapper">
            <div
              class="supportingdocument w-100"
              v-show="document_proof_array.bank == ''"
            >
              <p class="btn" @click="$refs.bank.click()">
                <feather type="upload" class="mr-2"></feather>Upload Bank
                Document
              </p>
              <input
                type="file"
                name="document"
                value="Upload Document"
                ref="bank"
                v-on:change="onFileChange('bank', $event.target.files)"
              />
            </div>
            <div
              class="linerUpload d-flex align-items-center mb-3"
              v-if="document_proof_array.bank != ''"
            >
              <span class="nameIco"
                ><feather class="mr-2" type="file"></feather>
                <span>{{ document_proof_array.bank }}</span>
              </span>
              <a href="#" class="closeBtn" @click="clearDoc('bank')"
                ><feather type="x"></feather
              ></a>
            </div>
          </div>
          <!-- <input type="file" class="form-control mb-3 border-0 p-1"> -->
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label class="mb-2 semibold themecolor"
            >2-Factor Authentication Code</label
          >
          <input
            type="text"
            placeholder=""
            class="form-control mt-3 mb-3"
            v-model="bankotp"
            name="bankotp"
            required=""
            v-validate="{ required: true, max: 6 }"
          />
          <span
            v-if="bankSubmitted && errors.has('bankotp')"
            class="text-danger"
            >{{ errors.first("bankotp") }}</span
          >
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <a
          href="javascript:void(0)"
          class="cap_btn large_btn secondaryBG w-100 mt-3"
          data-toggle="modal"
          data-target="#withdrawalmessage"
          >Edit Bank Account</a
        >
      </div>
    </form>
  </div>
</template>
<script>
import settingsMixins from "@/plugins/settings";
export default {
  name: "deposit-section",
  mixins: [settingsMixins],
  data() {
    return {
      pageLoader: false,

      bankSubmitted: false,
      account_number: "",
      bank_name: "",
      micr: "",
      bank_address: "",
      baneficiary_name: "",
      baneficiary_country: "",
      baneficiary_city: "",
      baneficiary_address: "",
      bankotp: "",
      document_proof_array: {
        bank: "",
      },
    };
  },
  computed: {},
  props: ["bankData", "pageNameData"],
  methods: {
    onFileChange(getdocType, file) {
      this.document_proof_array[getdocType] = file[0].name;
    },
    clearDoc(getdocType) {
      this.document_proof_array[getdocType] = "";
    },
    editbankfunc() {
      this.account_number = this.bankData.account_no;
      this.bank_name = this.bankData.bank_name;
      this.micr = this.bankData.micr;
      this.bank_address = this.bankData.bank_address;
      this.baneficiary_name = this.bankData.beneficiary_name;
      this.baneficiary_country = this.bankData.beneficiary_country;
      this.baneficiary_city = this.bankData.beneficiary_city;
      this.baneficiary_address = this.bankData.beneficiary_address;
    },
    editBankDetails() {
      const _that = this;
      _that.bankSubmitted = true;
      let formRequest = document.getElementById("formRequest");
      let form_name = new FormData(formRequest);
      _that.$validator.validate().then((valid) => {
        if (valid) {
          let json = {
            globalParams: {
              form: form_name,
              // "google_token" : _that.bankotp,
              // "bank_id" : _that.bankData.id,
              // "account_no" : _that.account_number, //"46132156462",
              // "bank_name": _that.bank_name, //"PNB_Beneficiary2",
              // "micr": _that.micr, //"8947654",
              // "bank_address": _that.bank_address, //"PNB bank, sector 71, Mohali",
              // "beneficiary_detail": {
              //     "benificiary_id" : _that.bankData.benificiary_id,
              //     "beneficiary_name" : _that.baneficiary_name, //"Harry2",
              //     "country": _that.baneficiary_country, //"India",
              //     "city" : _that.baneficiary_city, //"Mohali",
              //     "address": _that.baneficiary_address //"#D-179, finvasia building, Industrial Area 8b, Mohali."
              // }
            },
            localParams: { parameter: _that, pagename: _that.pageNameData },
          };
          _that._runEditBankDetails(json);
        }
      });
    },
    reset() {
      this.bankSubmitted = false;
      this.account_number = "";
      this.bank_name = "";
      this.micr = "";
      this.bank_address = "";
      this.baneficiary_name = "";
      this.baneficiary_country = "";
      this.baneficiary_city = "";
      this.baneficiary_address = "";
      this.document_proof_array = {
        bank: "",
      };
      this.bankotp = "";
    },
  },
  created() {
    this.editbankfunc();
  },
};
</script>
