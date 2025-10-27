import { createApp, nextTick } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/store";
// Harjot 
const app = createApp(App);

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import $env_var from "@/staticVars";

import * as COMMON_METHODS from "./commonFunctions";
import { defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import Paginate from "vuejs-paginate-next";
import { createI18n } from "vue-i18n";
import VueCookies from "vue-cookies";

import decodeUriComponent from 'decode-uri-component';

// import VueCryptojs from "vue-cryptojs";

import VueChatScroll from 'vue3-chat-scroll';


import VueTelInput from 'vue3-tel-input'
  import 'vue3-tel-input/dist/vue3-tel-input.css'

  const VueTelInputOptions = {
    mode: "international",
    // onlyCountries: ['NG', 'GH', "GB", "US", "CA"]
  }
app.use(VueTelInput, VueTelInputOptions);

import VueCryptojs from 'vue-cryptojs'

app.use(VueCryptojs)


// import VueCountryCode from "vue-country-code";
// app.use(VueCountryCode)

// import VueCountryIntl from 'vue-country-intl';
// // import css
// import 'vue-country-intl/lib/vue-country-intl.css'
// // Global registration component
// app.component(VueCountryIntl.name, VueCountryIntl);

// import vueCountryRegionSelect from 'vue3-country-region-select'
// app.use(vueCountryRegionSelect);

app.use(VueChatScroll);

//=================import mixins=================================
import commonAllmixins from "./plugins/commonAll/index.ts";
app.mixin(commonAllmixins);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


import { static_var } from './static_var_func.js';
configure({
  validateOnBlur: false,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

defineRule('required', (value, t, ctx) => {
  if (!value || (value + '').trim() == '' || !value.length) {
    return static_var.checkName(ctx.field) + ' field is required';
  }
  return true;
});
defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return `confirm password doesn't match with ${static_var.checkName(target)}`;
});

defineRule('decimal', (value, [limit], ctx) => {
  var split = value.toString().split('.');
  if (split[1] && (split[1].length > limit || !Number(value))) {
    return `Please enter a maximum of ${limit} digits after the decimal point .`;
  }
  return true;
});
defineRule('min_value', (value, [limit], ctx) => {
  if (parseFloat(value) < parseFloat(limit)) {
    return `${static_var.checkName(ctx.field)}  must be ${new Number(limit)} or more`;
  }
  return true;
});
defineRule('mul_of', (value, [limit], ctx) => {
  if (!isNaN(value) && value == 0) { return true; }
  let dev = Math.round(1000 * (parseFloat(value) / parseFloat(limit))) / 1000
  if (Number(dev) % 1 > 0) {
    return `${static_var.checkName(ctx.field)} should be multiple of ${limit}`;
  }
  return true;
});
defineRule('max_value', (value, [limit], ctx) => {
  if (!parseFloat(limit)) { return true }
  if (parseFloat(value) > parseFloat(limit)) {
    return `${static_var.checkName(ctx.field)} can't be greater than ${new Number(limit)}`;
  }
  return true;
});
defineRule('min_date', (value, [limit], ctx) => {
  if (!value || !limit) { return true }
  if (moment(value, 'YYYY-MM-DD').diff(moment(limit, 'YYYY-MM-DD'), 'days') < 0) {
    return `Entered date should not be before ${moment(limit, 'YYYY-MM-DD').format('DD-MM-YYYY')}.`;
  }
  return true;
});
defineRule('max_date', (value, [limit], ctx) => {
  if (!value || !limit) { return true }
  if (moment(value, 'YYYY-MM-DD').diff(moment(limit, 'YYYY-MM-DD'), 'days') > 0) {
    return `Entered date should not be later than ${moment(limit, 'YYYY-MM-DD').format('DD-MM-YYYY')}.`;
  }
  return true;
});
defineRule('less_then', (value, [target], ctx) => {
  if (!isNaN(value) && value == 0) { return true; }
  if (parseFloat(value) < parseFloat(ctx.form[target])) {
    return true;
  }
  return `${static_var.checkName(ctx.field)} is more than ${static_var.checkName(target)}`;
});
defineRule('geater_then', (value, [target], ctx) => {
  if (parseFloat(value) > parseFloat(ctx.form[target])) { return true; }
  return `${static_var.checkName(ctx.field)} should be greater than ${static_var.checkName(target)}`;
});
defineRule('between', (value, [a, b], ctx) => {
  if (value == '' || value < a || value > b) {
    return `${static_var.checkName(ctx.field)} should be in range ${a}-${b}`
  }
  return true
});
defineRule('maxLength', (value, [limit]) => {
  if (!value || !value.length) { return true; }
  if (value.length > limit) {
    return `${static_var.checkName(ctx.field)} must be less then ${limit} characters`;
  }
  return true;
});

// import 'popper.js'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import jQuery from 'jquery'
// window.jQuery = jQuery;
// window.$ = jQuery;
// Object.assign(window, { $: jQuery, jQuery });
//global declaration of jquery
// global.jQuery = jQuery
// global.$ = jQuery

$(() => {
  $("#app").tooltip({
    selector: '[data-toggle="tooltip"]',
  });
});

// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
// import jQuery from "jquery";
// Object.assign(window, { $: jQuery, jQuery });
// $ = jQuery ;

// import jQuery from 'jquery';
// window.jQuery = jQuery;
// window.$ = jQuery;

// import Popper from 'vue-popperjs';
// import 'vue-popperjs/dist/vue-popper.css';

// import VieOtpInput from "@bachdgvn/vue-otp-input"
// app.component("vie-otp-input", VieOtpInput);

import VOtpInput from "vue3-otp-input";
app.component("v-otp-input", VOtpInput);
import Datepicker from "vue2-datepicker";
app.component("datepicker", Datepicker);

import  VueSelect  from "vue-select";
import "vue-select/dist/vue-select.css";
app.component("v-select", VueSelect);

import Notifications from "@kyvg/vue3-notification";
// app.use(Notifications)

import "froala-editor/js/plugins.pkgd.min.js";
//Import third party plugins
import "froala-editor/js/third_party/embedly.min";
import "froala-editor/js/third_party/font_awesome.min";
import "froala-editor/js/third_party/spell_checker.min";
import "froala-editor/js/third_party/image_tui.min";
// Import Froala Editor css files.
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import VueFroala from "vue-froala-wysiwyg";

// import '/assets/website/js/bootstrap.min.js';
// import '/assets/website/js/jquery.dataTables.min.js';

import * as moment from "moment";

// import crypto from 'crypto'

import VueFeather from "vue-feather";

app.component("feather", VueFeather);

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
app.component("VueDatePicker", VueDatePicker);

import Toast from "vue-toastification";
const filterBeforeCreate = (toast, toasts) => {
  if (toasts.filter((t) => t.type === toast.type).length !== 0) {
    return false;
  }
  return toast;
};

app.use(Toast, {
  position: "top-center",
  timeout: 2000,
  hideProgressBar: true,
  filterBeforeCreate,
  type: "success",
  transition: "Vue-Toastification__bounce",
  //maxToasts: 5,
  newestOnTop: true,
});

//Create global variables
app.config.globalProperties.$env_var = $env_var;
app.config.globalProperties.envFile = import.meta.env;
app.config.globalProperties.COMMON = COMMON_METHODS;

import loader from "./components/shared/loader.vue";
app.component("loader", loader);
import table_loader from "./components/shared/table_loader.vue";
app.component("table-loader", table_loader);

import alert_notification from "./components/shared/alert-notification.vue";
app.component("alert-notification", alert_notification);

import no_data from "./components/shared/no-data.vue";
app.component("no-data", no_data);
import header from "./components/shared/header.vue";
app.component("app-header", header);
import password_icon from "./components/shared/password_icon.vue";
app.component("passwordIcon", password_icon);
import pagination from "./components/shared/pagination.vue";
app.component("pagination", pagination);

app.component("paginate", Paginate);
// app.use(i18n);
app.use(VueCookies, { expires: "7d" });
app.use(pinia);
app.use(VueCryptojs);
app.use(store);
app.use(Notifications);
app.use(VueFroala);
app.use(router);
app.mount("#app");
