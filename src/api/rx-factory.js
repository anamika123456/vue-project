import axios from "axios";
import { useToast } from "vue-toastification";
import { useMainStore } from "@/store/pinia.ts";
import router from "@/router";

const toast = useToast();

const handleUnauthorizedToken = () => {
  const store = useMainStore();
  toast("Authentication expired. Please login again", { type: "error" });
  store.$reset();
  router.replace("/");
};

export const post = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    const store = useMainStore();
    

    if(headers['x-auth-token'] != undefined){
      headers['x-auth-token'] = import.meta.env.VITE_AUTH_TOKEN
      delete  axios.defaults.headers.common.Authorization  ;
    }else{
      delete  axios.defaults.headers.common['x-auth-token']  ;
    }

    axios
      .post(url, params, { headers: headers })
      .then((response) => {
        try {
          if (!response.data?.data && response.data?.result) {
            resolve(response.data.result);
          } else {
            resolve(response.data);
          }
        } catch (error) {
          resolve(error.response);
        }
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const get = (url, params, headers) => {
    return new Promise((resolve, reject) => {
        const store = useMainStore()
    if(headers['x-auth-token'] != undefined){
      headers['x-auth-token'] = import.meta.env.VITE_AUTH_TOKEN
      delete  axios.defaults.headers.common.Authorization  ;
    }else{
      delete  axios.defaults.headers.common['x-auth-token']  ;
    }
        axios.get(
            url,
            {headers : headers}
        ).then(response => {
            if (response.info && response.info == 'NOK') {
                toast(response.data.msg.msg, {
                    type: 'error'
                })
                reject(response)
            } else {
                resolve(response.data)
            }
        }).catch(error => {
            if (error.response && error.response.status && error.response.status === 401) {
                handleUnauthorizedToken()
                reject(error)
            } else {
                toast('Something went wrong. Please try again', {
                    type: 'error'
                })
                reject({ ...error })
            }
        })
    })
}

export const getDoc = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    const store = useMainStore()
    if(headers['x-auth-token'] != undefined){
      headers['x-auth-token'] = import.meta.env.VITE_AUTH_TOKEN
      delete  axios.defaults.headers.common.Authorization  ;
    }else{
      delete  axios.defaults.headers.common['x-auth-token']  ;
    }
    axios.get( url,  {headers : headers}).then(response => {
      if (response.info && response.info == 'NOK') {
        toast(response.data.msg.msg, {
            type: 'error'
        })
        reject(response)
      } else {
        // console.log('main file============',  response)
        resolve(response.data)
      }
    }).catch(error => {
      if (error.response && error.response.status && error.response.status === 401) {
        handleUnauthorizedToken()
        reject(error)
      } else {
        toast('Something went wrong. Please try again', { type: 'error' })
        reject({ ...error })
      }
    })
  })
}

// export const get = (url, params, headers) => {alert()
//   return new Promise((resolve, reject) => {
//     const store = useMainStore();
//       headers['x-auth-token'] = import.meta.env.VITE_AUTH_TOKEN
//     axios
//       .get(url, params, { headers: headers })
//       .then((response) => {
//         try {
//           if (!response.data?.data && response.data?.result) {
//             resolve(response.data.result);
//           } else {
//             resolve(response.data);
//           }
//         } catch (error) {
//           resolve(error.response);
//         }
//       })
//       .catch((error) => {
//         resolve(error.response);
//       });
//   });
// };
