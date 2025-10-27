// -------------------------------------------------------------------------------------------
// Copyright 2012-2017 by ChartIQ, Inc
// -------------------------------------------------------------------------------------------
// SAMPLE QUOTEFEED IMPLEMENTATION -- Connects charts to ChartIQ Simulator
///////////////////////////////////////////////////////////////////////////////////////////////////////////

(function (definition) {
  "use strict";

  if (typeof exports === "object" && typeof module === "object") {
    module.exports = definition(require("../js/chartiq"));
  } else if (typeof define === "function" && define.amd) {
    define(["chartiq"], definition);
  } else if (typeof window !== "undefined" || typeof self !== "undefined") {
    var global = typeof window !== "undefined" ? window : self;
    definition(global);
  } else {
    throw new Error(
      "Only CommonJS, RequireJS, and <script> tags supported for quoteFeedSimulator.js."
    );
  }
})(function (_exports) {
  var CIQ = _exports.CIQ;
  var quoteFeedSimulator = (_exports.quoteFeedSimulator = {}); // the quotefeed object

  /**
   * Convenience function for generating a globally unique id (GUID).
   * See http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   * @return {string} An RFC4122 version 4 compliant UUID
   * @private
   */
  quoteFeedSimulator.generateGUID = function () {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += window.performance.now(); //use high-precision timer if available
    }
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };

  quoteFeedSimulator.maxTicks = 50000;
  //quoteFeedSimulator.url="https://simulator.chartiq.com/datafeed";

  //quoteFeedSimulator.url="https://localhost:3000/api/provider/charting";

  // quoteFeedSimulator.url="https://dev.finvasia.com:5000/api/provider/charting";
  quoteFeedSimulator.url =
    "https://pricefeed.capitalwallet.com/api/provider/charting";
  // quoteFeedSimulator.url="https://devpricefeed.capitalwallet.com:2087/api/provider/charting";

  //quoteFeedSimulator.url="https://portfolios.com:2087/api/provider/charting";

  quoteFeedSimulator.url += "?session=" + quoteFeedSimulator.generateGUID(); // add on unique sessionID required by ChartIQ simulator;

  // called by chart to fetch initial data
  quoteFeedSimulator.fetchInitialData = function (
    symbol,
    suggestedStartDate,
    suggestedEndDate,
    params,
    cb
  ) {
    // var queryUrl = this.url +
    // 	"&identifier=" + symbol +
    // 	"&startdate=" + suggestedStartDate.toISOString() +
    // 	"&enddate=" + suggestedEndDate.toISOString() +
    // 	"&interval=" + params.interval +
    // 	"&period=" + params.period +
    // 	"&extended=" + (params.extended?1:0);   // using filter:true for after hours
    // console.log('params11111111111111111------------',params)
    var queryUrl =
      this.url +
      "&isin=" +
      symbol +
      "&startdate=" +
      formatDate(suggestedStartDate) +
      "&enddate=" +
      formatDate(suggestedEndDate) +
      "&interval=" +
      getInterval(params.period, params.interval); // params.period + params.interval;
    // +"&period=" + (params.period);

    //console.log("fetchInitialData" +  queryUrl)
    // alert("fetchPaginationData----------------------------------" +  queryUrl)
    CIQ.postAjax(queryUrl, null, function (status, response) {
      // process the HTTP response from the datafeed

      if (status == 200 && Array.isArray(JSON.parse(response).data)) {
        // if successful response from datafeed
        // console.log(Array.isArray(JSON.parse(response).data),JSON.parse(response).data)
        //console.log(response, status)
        var newQuotes = quoteFeedSimulator.formatChartData(response);
        cb({ quotes: newQuotes, moreAvailable: true, attribution: {} }); // return the fetched data; init moreAvailable to enable pagination
      } else {
        // else error response from datafeed
        cb({ error: response ? response : status }); // specify error in callback
      }
    });
  };

  // called by chart to fetch update data
  quoteFeedSimulator.fetchUpdateData = function (
    symbol,
    startDate,
    params,
    cb
  ) {
    // var queryUrl = this.url +
    // 	"&identifier=" + symbol +
    // 	"&startdate=" + startDate.toISOString() +
    // 	"&interval=" + params.interval +
    // 	"&period=" + params.period +
    // 	"&extended=" + (params.extended?1:0);   // using filter:true for after hours
    // alert("fetchUpdateData")
    // console.log('params22222222222222------------',params.chart.dataSet)
    var queryUrl =
      this.url +
      "&isin=" +
      symbol +
      "&startdate=" +
      formatDate(startDate) +
      "&enddate=" +
      "" +
      "&interval=" +
      getInterval(params.period, params.interval);
    // + "&extended=" + (params.stx.extendedHours?1:0);   // using filter:true for after hours

    //console.log("fetchUpdateData" +  queryUrl)

    CIQ.postAjax(queryUrl, null, function (status, response) {
      // process the HTTP response from the datafeed
      if (status == 200 && Array.isArray(JSON.parse(response).data)) {
        // if successful response from datafeed
        var newQuotes = quoteFeedSimulator.formatChartData(
          response,
          params.chart.dataSet
        );
        cb({
          quotes: newQuotes,
          attribution: { source: "simulator", exchange: "RANDOM" },
        }); // return the fetched data
      } else {
        // else error response from datafeed
        cb({ error: response ? response : status }); // specify error in callback
      }
    });
  };

  // called by chart to fetch pagination data
  quoteFeedSimulator.fetchPaginationData = function (
    symbol,
    suggestedStartDate,
    endDate,
    params,
    cb
  ) {
    // var queryUrl = this.url +
    // 	"&identifier=" + symbol +
    // 	"&startdate=" + suggestedStartDate.toISOString() +
    // 	"&enddate=" + endDate.toISOString() +
    // 	"&interval=" + params.interval +
    // 	"&period=" + params.period +
    // 	"&extended=" + (params.extended?1:0);   // using filter:true for after hours
    // console.log('data',endDate,suggestedStartDate)
    // console.log('suggestedStartDate==================------------', suggestedStartDate)

    var queryUrl =
      this.url +
      "&isin=" +
      symbol +
      "&startdate=" +
      formatDate(suggestedStartDate) +
      "&enddate=" +
      formatDate(endDate) +
      "&interval=" +
      getInterval(params.period, params.interval);
    // + "&extended=" + (params.extended?1:0);   // using filter:true for after hours

    CIQ.postAjax(queryUrl, null, function (status, response) {
      // process the HTTP response from the datafeed
      if (status == 200 && Array.isArray(JSON.parse(response).data)) {
        // if successful response from datafeed
        var newQuotes = quoteFeedSimulator.formatChartData(response);

        // console.log("fetchPaginationData========================================" +  newQuotes)

        cb({
          quotes: newQuotes,
          moreAvailable: suggestedStartDate.getTime() > 0,
          attribution: {},
        }); // return fetched data (and set moreAvailable)
      } else {
        // else error response from datafeed
        cb({ error: response ? response : status }); // specify error in callback
      }
    });
  };

  // utility function to format data for chart input; given simulator was designed to work with library, very little formatting is needed
  quoteFeedSimulator.formatChartData = function (response, allData) {
    var feeddata = JSON.parse(response);
    // console.log('response',feeddata)
    var newQuotes = [];

    if (typeof feeddata.data != "undefined" && feeddata.data) {
      var feedDataArray = feeddata.data;

      var loopCnt = 1;

      for (var i = 0; i < feedDataArray.length; i++) {
        try {
          newQuotes[i] = {};
          // console.log(feedDataArray[i])
          // utility function to format data for chart input; given simulator was designed to work with library, very little formatting is needed
          newQuotes[i].Date = quoteFeedSimulator.formatDate(
            feedDataArray[i].time
          ); // DT is a string in ISO format, make it a Date instance
          newQuotes[i].Open = parseFloat(feedDataArray[i].open);
          newQuotes[i].High = parseFloat(feedDataArray[i].high);
          newQuotes[i].Low = parseFloat(feedDataArray[i].low);
          newQuotes[i].Close = parseFloat(feedDataArray[i].close);
          newQuotes[i].Volume = parseFloat(feedDataArray[i].volume);
          if (parseFloat(feedDataArray[i].close) == 0) {
            newQuotes[i].Close = parseFloat(feedDataArray[i].open);
          }
          // if(loopCnt == feedDataArray.length && parseFloat(feedDataArray[i].close) == 0){
          // //if(loopCnt == feedDataArray.length && parseFloat(feedDataArray[i].close) == 0 && feedDataArray.length > 1){
          // 	//console.log("in" + feedDataArray[i-1].close);
          // 	if(allData){
          // 		newQuotes[i].Close = allData[allData.length-1].Close;
          // 	}else{
          // 		newQuotes[i].Close=parseFloat(feedDataArray[i-1].close);
          // 	}
          // }
          loopCnt++;
        } catch (e) {
          console.log("error in loop data===>", e);
        }
      }

      return newQuotes;
    }
  };

  // formatDate UTC
  quoteFeedSimulator.formatDate = function (getInterval) {
    var d = new Date(getInterval);
    var getDate = d.getUTCDate();
    var getMonth = d.getUTCMonth() + 1;
    var getYear = d.getUTCFullYear();
    var getHours = d.getUTCHours();
    var getMins = d.getUTCMinutes();
    var getSecs = d.getUTCSeconds();
    if (getMonth <= 9) {
      getMonth = "0" + getMonth;
    }
    if (getDate <= 9) {
      getDate = "0" + getDate;
    }
    if (getHours.toString().length <= 1) {
      getHours = "0" + getHours;
    }
    if (getMins.toString().length <= 1) {
      getMins = "0" + getMins;
    }
    if (getSecs.toString().length <= 1) {
      getSecs = "0" + getSecs;
    }
    UTC_DATE_FORMAT =
      getYear +
      "-" +
      getMonth +
      "-" +
      getDate +
      "T" +
      getHours +
      ":" +
      getMins +
      ":00.000Z";
    return UTC_DATE_FORMAT;
  };

  return _exports;
});

function formatDate(data) {
  now = new Date(data);
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1);
  if (month.length == 1) {
    month = "0" + month;
  }
  day = "" + now.getDate();
  if (day.length == 1) {
    day = "0" + day;
  }
  hour = "" + now.getHours();
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  minute = "" + now.getMinutes();
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  return year + month + day + hour + minute;
}
function getInterval(period, interval) {
  var peri, interv;
  if (period == 1 && interval == "minute") {
    return "1m";
  } else if (period >= 60 && interval == "minute") {
    return period / 60 + "h";
  } else {
    return period + interval;
  }
}
