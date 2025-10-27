import moment from "moment";
// import staticVars from "./staticVars"
// import { useMainStore } from '@/store'

export const formatDate = (date, format = "Do MMM YYYY") => {
  if (!date) return "N/A";
  if (format && format == "now") return moment(date).fromNow();
  return moment(date).format(format);
};

export const formatCalendarDate = (date, format = "Do MMM YYYY", offset) => {
  if (!date) return "N/A";
  let d = moment(
    `${date.split("T")[0]} ${date.split("T")[1]}`,
    "YYYY-MM-DD HH:mm:ss"
  );
  let tz = offset != 0 ? offset : -new Date().getTimezoneOffset();
  d.add(tz, "minutes");
  if (format && format == "duration") {
    let diff = d.diff(moment(), "seconds");
    let duration = moment.duration(diff, "seconds");
    return `${duration.humanize()}`;
    // return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
  }
  if (format && format == "now") return d.fromNow();
  return d.format(format);
};

export const formatTime = (time) => {
  if (!time) return "N/A";
  return moment(time).format("hh:mm:ss");
};

export const formatPrice = (price, isCrypto) => {
  if (typeof price != "number") price = parseFloat(price);
  if (isNaN(price)) return 0;
  price = price.toFixed(isCrypto ? 8 : 2);
  let stringPrice =
    parseInt(price).toLocaleString() +
    (price.toString().indexOf(".") != -1 ? "." + price.split(".")[1] : "");
  if (isCrypto) {
    return stringPrice.replace(/(?:(\.\d*?[1-9]+)|\.)0*$/gm, "$1");
  } else {
    return stringPrice;
  }
};

// export const convertStringToInteger = (val) => {
//     return parseFloat(val)
// }

// export const convertToTwoDecimalDigits = (val, digits = 2) => {
//     return parseFloat(parseFloat(val).toFixed(digits))
// }

// export const formatDate = (date, time) => {
//     if (time) {
//         return moment(date).format('Do MMM, YYYY hh:mm a')
//     } else {
//         return moment(date).format('Do MMM, YYYY')
//     }
// }

// export const getTicketReason = (reasonID, titleID) => {
//     const store = useMainStore()
//     try {
//         if (Object.keys(store.ticketReasons).length) {
//             if (store.ticketReasons[reasonID] && store.ticketReasons[reasonID].categories && store.ticketReasons[reasonID].categories.length) {
//                 let reason = store.ticketReasons[reasonID].categories.find(i => i.id === titleID)
//                 if (reason) {
//                     return { parent: store.ticketReasons[reasonID], child: reason }
//                 } else {
//                     return { parent: store.ticketReasons[reasonID], child: { title: '' } }
//                 }
//             } else {
//                 return { parent: { title: '' }, child: { title: '' } }
//             }
//         } else {
//             return { parent: { title: '' }, child: { title: '' } }
//         }
//     } catch (e) {
//         return { parent: { title: '' }, child: { title: '' } }
//     }
// }

// export const priceWithCurrency = (account, value) => {
//     if (account.currency && value) {
//         value = parseFloat(value)
//         if (value < 0) {
//             return `- ${staticVars.currency[account.currency]}${Math.abs(value)}`
//         } else {
//             return `${staticVars.currency[account.currency]}${value}`
//         }
//     } else {
//         return '$0'
//     }
// }
