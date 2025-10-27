import Vue from "vue";
import { Const } from "./provider/lib/const.cls";
import * as Types from "../../types";
import { mapActions } from "vuex";
import { registerSteps } from "./lib/registerSteps.cls";
import * as registerStepsStoreExtensions from "./provider/";
const state = {
  ...registerStepsStoreExtensions.stateExt,
};
const actions = {
  ...registerStepsStoreExtensions.actionsExt,
};
const mutations = {
  ...registerStepsStoreExtensions.mutationsExt,
};
const getters = {
  ...registerStepsStoreExtensions.gettersExt,
};
// new store module definition
const registerStepsStore = {
  state,
  actions,
  mutations,
  getters,
};
// main mixin to load the new store module
export const registerStepsMixins = {
  created() {
    const _store = this.$store;
    if (
      !(_store && _store.state && _store.state[registerSteps.STORE_MODULE_NAME])
    ) {
      try {
        this.$store.registerModule(
          registerSteps.STORE_MODULE_NAME,
          registerStepsStore
        );
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      //===================common-steps===========================
      _runStep1: Const.RUN_STEP1,
      _runStep2: Const.RUN_STEP2,
      _runResendOtp: Const.RUN_RESEND_OTP,
      _runStep3: Const.RUN_STEP3,
      _runGetStepInfo: Const.RUN_GET_STEP_INFO,

      _runAddLegalEntity: Const.RUN_ADD_LEGAL_ENTITY,
      _runAddRepresentative: Const.RUN_ADD_REPRESENTATIVE,
      _runAddBeneficial: Const.RUN_ADD_BENEFICIAL,
      _runUpdateBeneficial: Const.RUN_UPDATE_BENEFICIAL,
      _runDeleteBeneficial: Const.RUN_DELETE_BENEFICIAL,
      _runAddDoc: Const.RUN_ADD_DOC,
      _runGetDoc: Const.RUN_GET_DOC,
      _runDelDoc: Const.RUN_DEL_DOC,
      _runFinishReg: Const.RUN_FINISH_REGISTERATION,
    }),
    computedCommonFunc(getFuncName) {
      try {
        return this.$store.getters[getFuncName];
      } catch (ex) {
        return [];
      }
    },
  },
  computed: {
    step2: function () {
      return this.computedCommonFunc(Const.GET_STEP2);
    },
    step3: function () {
      return this.computedCommonFunc(Const.GET_STEP3);
    },
    getStepInfo: function () {
      return this.computedCommonFunc(Const.GET_STEP_INFO);
    },
  },
};

export default registerStepsMixins;
