<template>
  <tbody>
    <loader v-if="pageLoader"></loader>
    <tr
      v-for="(val, index) in orderData($parent.type)"
      v-if="
        index >= ($parent.page - 1) * pageLimit &&
        index < $parent.page * pageLimit
      "
    >
      <td>{{ val.Opened | moment("DD-MM-YYYY, h:mm:ss a") }}</td>
      <td v-if="$parent.type == '2'">
        {{ val.Closed | moment("DD-MM-YYYY, h:mm:ss a") }}
      </td>
      <td v-if="$parent.type == '3'">
        {{ val.Canceled | moment("DD-MM-YYYY, h:mm:ss a") }}
      </td>
      <td>{{ val.Symbol }}</td>
      <td class="red">
        {{ val.OrderSide == 0 ? "SELL" : val.OrderSide == 1 ? "BUY" : "-" }}
      </td>
      <td>{{ val.OrderType }}</td>
      <td>{{ val.Price }}</td>
      <td>{{ val.Quantity }}</td>
      <td v-if="$parent.type == '1'">OPEN</td>
      <td v-else-if="$parent.type == '2'">Completed</td>
      <td v-else-if="$parent.type == '3'">Canceled</td>
      <td v-if="$parent.type == '1'" @click="deleteOrder(val.OrderId)">
        <feather type="settings" />
      </td>
    </tr>
    <td
      valign="top"
      colspan="8"
      class="dataTables_empty"
      v-if="orderData($parent.type).length == 0"
    >
      No data available in table
    </td>
  </tbody>
</template>
<script>
import moment from "moment";
import { Const } from "@/plugins/vue-provider-cache/const.mod";
export default {
  name: "trading",
  data() {
    return {
      pageLoader: false,
      page: "1",
      pageLimit: "10",
    };
  },
  methods: {
    successWs() {
      // console.log("success");
    },
    failedWs() {
      // console.log("failed");
    },
    deleteOrder(id) {
      const _that = this;
      let orderJson = {
        order_id: id,
        type: "CLOSE",
        localParams: _that,
      };
      // orderJson['hey'] = 'yo'
      this.$store.getters[Const.GET_PROVIDERS]["priceFeed"].seeders[
        "S_PF_PF"
      ].orderOperation(orderJson);
    },
    orderData(type) {
      if (type == "1") {
        return this.orderList.open;
      } else if (type == "2") {
        return this.orderList.completed;
      } else if (type == "3") {
        return this.orderList.cancel;
      }
    },
    orderlisting() {
      let _that = this;
      // console.log("order-list1", _that.tradingAccount);
      let jsonData = {
        globalParams: {
          account_id: _that.tradingAccount.account_id,
          demo_live: _that.tradingAccount.demo_live,
        },
        localParams: { parameter: this },
      };
      this._runOpenOrderList(jsonData);
      this._runCompletedOrderList(jsonData);
      this._runCancelOrderList(jsonData);
    },
  },
  created() {
    this.orderlisting();
  },
};
</script>
