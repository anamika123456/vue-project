export const state = {
  generateWalletAddress: "",

  // GetPaymentMethods: [],

  deposit_limit: [],
  depositList: {},
  depositStatus: {
    0: { class: "alert-info", name: "pending" },
    2: { class: "alert-danger", name: "Rejected" },
    1: { class: "alert-success", name: "success" },
    3: { class: "alert-danger", name: "Canceled" },
    4: { class: "alert-warning", name: "Unverified Account" },
  },
  withdrawalList: {},

  withdrawalMethodResponse: {},
  withdrawalMethodResponseDep: {},
  withDepoCurList: [],
};
