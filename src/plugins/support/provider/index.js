import { mapActions } from "vuex";
import { Const } from "./lib/const.cls";
// import all store method extensions
import { state } from "./store-addons/state";
import { actions } from "./store-addons/actions";
import { getters } from "./store-addons/getters";
import { mutations } from "./store-addons/mutations";

// provide as export for main plugin
export const stateExt = state;
export const actionsExt = actions;
export const gettersExt = getters;
export const mutationsExt = mutations;
/**
 * export price-stream mixin methods for component
 */
let intervalValue = null;

export const mixin = {
  destroyed() {},
};
