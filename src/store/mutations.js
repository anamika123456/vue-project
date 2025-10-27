import {
  SET_INFO,
  SET_STATE,
  SET_COUNTRY,
  SET_STATE_PERSIST_LOCAL,
  SET_TICKET_ID,
  SET_TOGGLE_LOADER,
  SET_2FA_STATE,
} from "@/types";

export const mutations = {
  // broadcast app message
  [SET_INFO](state, data) {
    state.message =
      typeof data !== "undefined"
        ? data
        : {
            info: "",
            msg: "",
            errors: [],
          };
  },
  /**
   * set state from data object
   * @param state
   * @param data must contain user with token
   */
  [SET_2FA_STATE](state, data) {
    try {
      // console.log('user',data)
      const usr = data.user || data;
      state.fa_user_state = usr;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [SET_STATE](state, data) {
    try {
      // console.log('user',data)
      const usr = data.user || data;
      state.user = usr;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [SET_TICKET_ID](state, data) {
    try {
      state.ticket_id = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },

  [SET_COUNTRY](state, data) {
    try {
      state.country = data;
    } catch (ex) {
      console.debug("set state EX", ex);
    }
  },
  /**
   * save state to local storage
   * @param state
   */
  [SET_STATE_PERSIST_LOCAL](state) {
    try {
      // save user only to session storage
      window.localStorage.setItem("user", btoa(JSON.stringify(state.user)));
    } catch (ex) {
      console.debug("set state persist local EX", ex);
    }
  },
  /**
   * toggle one of the loader flags
   * @param ids array of loader ids ... 'a', 'b', 'c'
   */
  [SET_TOGGLE_LOADER](state, ids) {
    try {
      const loaders = state.loaders;
      for (let elem in loaders) {
        state.loaders[elem] = ids.length < 1 ? false : !loaders[elem];
      }
    } catch (ex) {
      console.log("set toggle loader EX", ex);
    }
  },
};
