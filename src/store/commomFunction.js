import * as RxFactory from "@/api/rx-factory";
import * as Enpoints from "@/api/endpoints";
export function _executeApiWithoutToken(
  apiLink,
  credentials,
  getToken,
  commit,
  callback
) {
  try {
    let response_array = [],
      x_auth_token = "",
      headersJson = {};
    if (credentials.localParams.type == "form") {
      credentials.globalParams = credentials.globalParams.form;
    }
    headersJson["x-auth-token"] = import.meta.env.VITE_AUTH_TOKEN;

    // credentials.localParams.parameter.pageLoader = true
    return new Promise((resolve, reject) => {
      RxFactory.post(
        Enpoints.BASE_URL + apiLink,
        credentials.globalParams,
        headersJson
      )
        .then((data) => {
          // console.log('data--',data)
          if (data.info === "OK") {
            response_array.res_data = data.data;
            if (data.msg) {
              response_array.msg = data.msg;
            }
            callback(false, response_array);
          } else {
            if ("status" in data && data.status == 401) {
              // credentials.localParams.parameter.$root.$children[0].walletSessionTimeOut = true
              // callback(true, response_array)
            } else {
              if (typeof data.msg == "object") {
                response_array.res_data = data.msg.msg;
                response_array["code"] = data.msg.code;
              } else {
                response_array.res_data = data.msg;
                response_array["code"] = data.code;
              }
              callback(true, response_array);
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (ex) {
    _handleErrorResponse(ex, commit);
  }
}
export function _executeApi(apiLink, credentials, getToken, commit, callback) {
  try {
    let response_array = [],
      x_auth_token = "",
      headersJson = {};
    if (credentials.localParams.type == "form") {
      credentials.globalParams = credentials.globalParams.form;
    }
    if (credentials.localParams.link) {
      
      let API_LINK = (credentials.localParams.getDocLink) ? credentials.localParams.getDocLink : Enpoints.BASE_URL + apiLink
      if (credentials.localParams.getDocLink && getToken != "" && getToken != undefined && getToken != null) {
        headersJson["Authorization"] = "Bearer " + getToken;
      }else if (credentials.localParams.getNotifyEvents && getToken != "" && getToken != undefined && getToken != null) {
        headersJson["Authorization"] = "Bearer " + getToken;
      }else{
        headersJson["x-auth-token"] = import.meta.env.VITE_AUTH_TOKEN;
      }


      if(credentials.localParams.getDocLink){
        // return new Promise((resolve, reject) => {
          RxFactory.getDoc( API_LINK, credentials.globalParams, headersJson )
          .then((data) => {
           
            // callback(false, data)
            if ('info' in data) {
                if (data.info === 'OK') {
                    response_array.res_data = data.data
                    callback(false, response_array)
                } else {
                    if (typeof data.msg == 'object') {
                        response_array.res_data = data.msg.msg
                    } else {
                        response_array.res_data = data.msg
                    }
                    callback(true, response_array)
                }
            }
          })
          .catch((error) => {
            // reject(error);
          });
        // });
      }else{
        return new Promise((resolve, reject) => {
          RxFactory.get(
            API_LINK,
            credentials.globalParams,
            headersJson
          )
            .then((data) => {
              console.log('data of imgggg=====',data)
              // callback(false, data);
              if(credentials.localParams.getDocLink){
               
                // const objectURL = URL.createObjectURL(data);
                
                callback(false, data)
              }else if ('info' in data) {
                  if (data.info === 'OK') {
                      response_array.res_data = data.data
                      callback(false, response_array)
                  } else {
                      if (typeof data.msg == 'object') {
                          response_array.res_data = data.msg.msg
                      } else {
                          response_array.res_data = data.msg
                      }
                      callback(true, response_array)
                  }
              }else{
                  if ('walletCurrencyList' in data) {
                      response_array.res_data = data.walletCurrencyList
                      callback(false, response_array)
                  }else if(credentials.localParams.link == "country") {
                      callback(false, data)
                  }else{
                      response_array.res_data = 'no data fetch from api'
                      callback(true, response_array)
                  }
              }
            })
            .catch((error) => {
              reject(error);
            });
        });
      }




      
    } else {
      if (getToken != "" && getToken != undefined && getToken != null) {
        headersJson["Authorization"] = "Bearer " + getToken;
      }
      let API_LINK = Enpoints.BASE_URL + apiLink 
      if (credentials.localParams.sse && credentials.localParams.sse == "sse") {
          API_LINK = apiLink
      }
      return new Promise((resolve, reject) => {
        RxFactory.post(
          API_LINK,
          credentials.globalParams,
          headersJson
        )
          .then((data) => {
            if (data.info === "OK") {
              response_array.res_data = data.data;
              if (data.msg) {
                response_array.msg = data.msg;
              }
              callback(false, response_array);
            } else {
              if ("status" in data && data.status == 401) {
                // console.log('data from common function else innn ===> ')
                localStorage.setItem("walletSessionTimeOut", true);
                let data = {};
                let options = {};
                options.forward = true;
                _handleLogout(data, commit, options);
                // console.log('inn11',credentials.localParams.parameter.$root)
                // credentials.localParams.parameter.$root.walletSessionTimeOut = true
              } else {
                if (typeof data.msg == "object") {
                  response_array.res_data = data.msg.msg;
                  response_array.msg = data.msg.msg;
                  response_array["code"] = data.msg.code;
                } else {
                  response_array.res_data = data.msg;
                  response_array.msg = data.msg;
                  response_array["code"] = data.code;
                }
                callback(true, response_array);
              }
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  } catch (ex) {
    _handleErrorResponse(ex, commit);
  }
}

export function _messageDisplayFunction(getParameter, getMessage, msgType) {
  try {
    getParameter.$notify({
      // title: "Important message",
      text: getMessage,
      duration: 10000,
      pauseOnHover: true,
      type: msgType,
      classes: "Ucfirst"
    });
  } catch (e) {}
}

export function _cleanUp(commit, msg, status, loaderId) {
  let loaderArr = typeof loaderId !== "undefined" ? [loaderId] : [];
  commit("SET_INFO", msg);
}

export function _handleErrorResponse(e, commit) {
  let response = { info: "NOK", msg: "Service not available" };
  if (typeof e.response === "undefined") {
    try {
      const statusCheck = e.toString().toLowerCase();
      if (statusCheck.indexOf("network") > -1) {
        response = { info: "NOK", msg: "Network Error" };
      }
    } catch (e) {}
  } else {
    response = e.response.data;
  }
  _cleanUp(commit, response, response.status);
  if (typeof e.response !== "undefined") {
    if (e.response.status == 401) {
      let data = {};
      let options = {};
      options.forward = true;
      _handleLogout(data, commit, options);
    }
  }
}

export function _handleLogout(data, commit, options) {
  const router = options.router;
  let user = {};
  localStorage.clear();
  if ("msg" in data && "info" in data) {
    _cleanUp(commit, data.msg, data.info);
  }
  if (options.forward === true) {
    window.location.replace("/");
  }
}

export function formatPriceCommon(price, isCrypto) {
  if (typeof price != "number") price = parseFloat(price);
  if (isNaN(price)) return 0;
  price = price.toFixed(isCrypto ? 8 : 2);
  // return price.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
  let stringPrice =
    parseInt(price).toLocaleString() +
    (price.toString().indexOf(".") != -1 ? "." + price.split(".")[1] : "");
  if (isCrypto) {
    return stringPrice.replace(/(?:(\.\d*?[1-9]+)|\.)0*$/gm, "$1");
  } else {
    return stringPrice;
  }
}
