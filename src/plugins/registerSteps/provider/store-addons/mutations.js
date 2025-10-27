import { Const } from "../lib/const.cls";

export const mutations = {
  [Const.SET_STEP2](state, data) {
    try {
      state.step2 = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_STEP3](state, data) {
    try {
      state.step3 = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  [Const.SET_STEP_INFO](state, data) {
    try {
      state.getStepInfo = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
};
