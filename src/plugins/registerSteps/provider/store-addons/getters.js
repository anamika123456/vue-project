import { Const } from "../lib/const.cls";

export const getters = {
  [Const.GET_STEP2]: (state) => {
    return state.step2;
  },
  [Const.GET_STEP3]: (state) => {
    return state.step3;
  },
  [Const.GET_STEP_INFO]: (state) => {
    return state.getStepInfo;
  },
};
