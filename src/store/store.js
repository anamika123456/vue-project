import Vuex from "vuex";

// load global methods from external files
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

const localStorageValue = localStorage.getItem("user");
let userValue = {};
if (localStorageValue) {
  userValue = JSON.parse(window.atob(localStorage.getItem("user")));
}
const user = userValue;
const fa_user_state = {};
const message = {
  info: "",
  msg: "",
  errors: [],
};

const loaders = {
  a: false,
  b: false,
  c: false,
};

const store = new Vuex.Store({
  state: {
    country: {},
    ticket_id: "",
    user,
    fa_user_state,
    message,
    loaders,
  },
  actions,
  getters,
  mutations,
  modules: {},
});

export default store;
