export const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const EP_WALLET_CURRENCY_JSON_LIST = "/api/currencies";
export const EP_RUN_FIAT_WITHDRAWAL_REQUEST_OTP = "/withdrawal/request/otp";
export const EP_FIAT_WITHDRAWAL_REQUEST_RESEND_OTP =
  "/withdrawal/request/resend/otp";
export const EP_RUN_FIAT_WITHDRAWAL_REQUEST = "/withdrawal/request";
export const EP_UNSUBSCRIBE_USER_BY_LINK = "/unsubscribe/updates";
export const EP_GET_USER_DATA = "/get/registration/data";
export const EP_GET_BANK_DETAILS = "/get/bank/accounts";
export const EP_ADD_BANK_DETAILS = "/add/bank/account";
export const EP_Edit_BANK_DETAILS = "/update/bank/account";
export const EP_RUN_DELETE_PAYMENT_METHOD = "/delete/bank/account";
export const EP_GET_FAQS_LISTING = "/api/blog/categories";

export const EP_GET_ACTIVITY_LIST = "/get/user/activity/logs";
export const EP_MARK_ACTIVITY_AS_READ = "/read/user/activity/logs";

export const EP_MULTI_USER_UPDATE= "/api/multi-user/update/user"

export const EP_DISABLE_2FA_QRCODE = "/disable/twofa";

export const EP_GET_IP_DETAILS = "/ip/address/list";
export const EP_ADD_IP_DETAILS = "/add/ip/address";
export const EP_EDIT_IP_DETAILS = "/ip/address/update";
export const EP_GET_WALLETS = "/get/user/wallets";

export const EP_GET_SUB_USERS = "/api/multi-user/get/users";
export const EP_DELETE_SUB_USERS = "/api/multi-user/remove/user";
export const EP_GET_PENDING_INVITES = "/api/multi-user/get/pending/invites";
export const EP_CANCEL_INVITES = "/api/multi-user/cancel/invite";
export const EP_RESEND_INVITES = "/api/multi-user/resend/invite";
export const EP_SEND_INVITES = "/api/multi-user/send/invite";
export const EP_REGISTER_USER_BY_INVITE_LINK = "/api/multi-user/register";
export const EP_GET_INVITATION_DATA = "/api/get/invitation";
export const EP_GET_INVITATION_DATA_ROLE =  "/api/get/role/invitation";
export const EP_GET_ROLES = "/api/multi-user/get/roles";
export const EP_UPDATE_PRIMARY_BANK = "/update/primary/bank";

// export const EP_GET_API_KEYS = "/get/api/keys";
// export const EP_ADD_API_KEYS = "/create/api/key";
// export const EP_DISABLE_API_KEYS = "/disable/api/key";
export const EP_GET_API_KEYS = "/get/api/keys";
export const EP_ADD_API_KEYS = "/create/api/key";
export const EP_DISABLE_API_KEYS = "/disable/api/key";

export const EP_GET_WEBHOOK = "/api/get/webhook";
export const EP_ADD_WEBHOOK = "/api/add/webhook";
//=============================================local store===============================================
export const EP_LOGIN = "/api/login";
export const EP_LOGIN_WITH_HASH = "/ip/address/update/via/email";
export const EP_USER_LOGIN_2FA = "/api/login/twofa";
export const EP_LOGOUT = "/signout";
export const EP_FRESH_DATA = "/get/fresh/user/data";
export const EP_FORGOT_PASSWORD = "/forgot/password";
export const EP_RESET_PASSWORD_FROM_HASH = "/change/via/forgot/password";
export const EP_CHANGE_PASSWORD = "/change/password";
export const COUNTRY_API = "/get/country/list";
//============================================common-plugin==============================================
export const EP_GENERATE_2FA_QRCODE = "/generate/twofa/qrcode";
export const EP_VERIFY_2FA_QRCODE = "/verify/twofa/secret";
export const EP_GET_ACTIVITY_CATEGORIES = "/api/get/categories";

export const EP_GET_PROFILE_INFO = "/get/user/profile";
//=============================================registerStep plugin=======================================
export const EP_STEP1 = "/api/create/lead";
export const EP_STEP2 = "/api/verify/otp/lead";
export const EP_RESEND_OTP = "/api/resend/otp/lead";
export const EP_STEP3 = "/api/user/register";
export const EP_GET_STEP_INFO = "/get/registration/data";
export const EP_CREATE_TICKET = "/create/ticket";
export const EP_ADD_LEGAL_ENTITY = "/add/legal/entity/information";
export const EP_ADD_REPRESENTATIVE = "/add/representive/information";
export const EP_ADD_BENEFICIAL = "/add/beneficial/information";
export const EP_UPDATE_BENEFICIAL = "/update/beneficial/information";
export const EP_DELETE_BENEFICIAL = "/delete/beneficial/information";
export const EP_ADD_DOC = "/add/registration/docs";
export const EP_GET_DOC = "/add/corporate/personal/information";
export const EP_DEL_DOC = "/delete/register/docs";
export const EP_FINISH_REGISTERATION = "/api/finish/registration";

//=============================================support plugin=============================================
export const EP_TICKET_REQUEST_OTP = "/ticket/request/otp";
export const EP_TICKET_CHECK_OTP = "/ticket/request";
export const EP_GET_TICKET_LIST = "/list/ticket";
export const EP_GET_TICKET_DETAIL = "/ticket/details";
export const EP_TICKET_REPLY = "/create/ticket/thread";
export const EP_GET_TICKET_REASON_LIST = "/get/ticket/reasons";
export const EP_TICKET_RESEND_OTP = "/ticket/request/otp/resend";
//========================================deposit-withdrawal pluigin====================================================
export const EP_GENERATE_WALLET_ADDRESS = "/deposit/request/operations";

export const EP_GET_USER_CAN_DEPOSIT = "/get/deposit/methods";
export const EP_TRANS_LIMIT_CURRENCY = "/get/deposit/limit";
export const EP_DEMO_DEPOSIT = "/deposit/demo/account";
export const EP_CREDIT_CARD_DEPOSIT = "/get/deposit/url";

export const EP_WITHDRAWAL_REQUEST_OTP = "/withdrawal/request/otp";
export const EP_WITHDRAWAL_CHECK_OTP = "/withdrawal/request";
export const EP_RESEND_EMAIL_LINK = "/withdrawal/request/resend/otp";
export const EP_GET_WITHDRAWAL_DESC = "/get/withdrawal/desc";

export const EP_GET_WITHDRAWAL_METHODS = "/get/withdrawal/methods";
// ========================order list======================
export const EP_OPEN_ORDER_LIST = "/get/open/orders";
export const EP_CANCEL_ORDER_LIST = "/get/cancel/orders";
export const EP_COMPLETED_ORDER_LIST = "/get/filled/orders";
export const EP_ORDER_LIST = "/get/orders";
// =====================trading account======================
export const EP_TRADING_ACCOUNT = "/get/trading/account/list";
// =======================Crypto list========================
export const EP_CRYPTO_LIST = "/get/crypto/list";
// =======================Crypto list========================
export const EP_GET_MARGIN_INFO = "/get/margin/info";
// =======================payment Method=====================
export const EP_GET_PAYMENT_METHODS = "/get/payment/methods";
// =======================IP ADDRESS=========================
export const EP_IP_ADDRESS_LIST = "/ip/address/list";
export const EP_ADD_IP_ADDRES = "/add/ip/address";
export const EP_UPDATE_IP_ADDRES = "/ip/address/update";
// ================== transaction History ===============
export const EP_DEPOSIT_HISTORY = "";
export const EP_WITHDRAWAL_HISTORY = "";
// ================== Login Info =========================
export const EP_LOGIN_INFO = "";
// ============== favorite Currency List ================
export const EP_GET_FAVORITE_CURRENCY_LIST = "/get/favorite/currency";
export const EP_GET_COUNTRY_IP = "/get/geo";
export const EP_ADD_FAVORITE_CURRENCY_LIST = "/add/favorite/currency";

export const EP_GET_DEPOSIT_LIST = "/get/deposit/list";
export const EP_GET_WITHDRAWAL_LIST = "/get/withdrawal/list";
export const EP_GET_IMAGE_OTP = "/individual/ipv/otp";
export const EP_GET_NOTIFICATION_LIST = "/common/get/notification";
export const EP_READ_UNREAD_NOTIFICATION =
  "/common/update/unread/notification/as/read";

export const EP_UPDATE_WEBHOOK = "/api/update/webhook";
export const EP_NOTIFICATION_SETTINGS = "/user/notification/settings";
export const EP_NOTIFICATION_GET_SETTINGS = "/get/user/notification/settings";
export const EP_NOTIFICATION_ENABLE_GET_SETTINGS = "/get/enable/notifications";

// export const EP_GET_API_KEYS = '/get/api/keys'
export const EP_UPDATE_API_KEYS = "/update/api/key";
export const EP_ADD_API_KEYS1 = "/update/allowed/ips";
// export const EP_DISABLE_API_KEYS = '/disable/api/key'
export const EP_UPDATE_API_WEBOOK = "/update/api/webhook";
export const EP_GET_WALLET_MARGIN = "/get/transaction/wallet/margin";
export const EP_CONFIRM_WALLET_TRANSACTION = "/complete/wallet/transaction";

//Steps for social trading
export const EP_CREATE_ACCOUNT = "/create/account";
export const EP_INTERNAL_TRANSFER_VERIFY = "/internal/transfer";
export const EP_GENERATE_API_KEY = "/create/api/key";

/** Crypo Addresses */
export const EP_GET_CRYPTO_ADDRESSES = "/deposit/addresses";

/** Bank addresses list */
export const EP_GET_BANK_ADDRESSES = "/get/bank/accounts";

/** Portfolio Reports  */
export const EP_PORTFOLIO_REPORT = "/api/portfolio";

/** Revenue Reports  */
export const EP_REVENUE_REPORT = "/deposit/volume";

export const EP_GET_WATCH_LIST = "/api/user/watchlist/get";

export const EP_GET_NEWS_LIST = "/get/news";

/** Deposit / Withdrawal Currency  */
export const EP_GET_WITH_DEPO_CUR_LIST = "/currencies";

/** Questionare  */
export const EP_GET_QUESTION = "/get/questionnaire";
export const EP_QUESTION = "/add/questionnaire";
export const EP_FINANCIAL_QUESTION = "/add/financial/info";

export const EP_FINANCIAL_DOCS = "/add/financial/docs";


//cards
export const EP_CREATE_CARD_USER = "/api/cards/user/create";
export const EP_GET_CARD_USER = "/api/cards/user";
export const EP_GET_CARD_ALL_USER = "/api/cards/users";
export const EP_VERIFY_CARD_EMAIL = "/api/cards/user/verify-email";
export const EP_RESEND_CARD_EMAIL = "/api/cards/user/resend-email";
export const EP_VERIFY_CARD_MOBILE = "/api/cards/user/verify-mobile";
export const EP_RESEND_CARD_MOBILE = "/api/cards/user/resend-sms";
export const EP_UPDATE_USER_CARD_ADDRESS = "/api/cards/user/update";
export const EP_START_KYC = "/api/cards/user/kyc/start";
export const EP_GET_ALL_CARD_WALLET_BY_USER = "/api/cards/wallets/get/all"
export const EP_GET_CARD_ADDRESS = "/api/cards/wallets/account/enrich"
export const EP_CARD_ACTIVATE = "/api/cards/card/create"
export const EP_CARD_TRANSACTIONS = "/api/cards/wallet/get/statement"
export const EP_CARD_DETAILS = "/api/cards/card"
export const EP_CARD_BLOCK = "/api/cards/card/block"
export const EP_CARD_UNBLOCK = "/api/cards/card/unblock"
export const EP_CARD_ACCOUNT_DETAILS = "/api/cards/accounts/get"
export const EP_GET_ALL_WALLET_BY_ID = "/api/cards/wallets/get"
export const EP_LINK_ACCOUNT = "/api/cards/card/link-account"
export const EP_CARD_BURN = "/api/cards/card/burn"
export const EP_GET_CARDS = "/api/cards/card/get-all"
export const EP_CARD_WALLET_CREATE = "/api/cards/wallets/create"
export const EP_EDIT_PASSWORD = "/api/cards/card/3ds"
export const EP_MULTI_USER_ROLE_UPDATE = "/api/multi-user/update/role"
export const EP_GET_CHART_DATA = "/api/cards/payment/volume"