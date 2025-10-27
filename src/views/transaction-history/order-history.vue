<template>
  <div class="mid_scroll_content">
    <section class="depoist_fund mktSearch pb-5 border-0">
      <div class="row justify-content-center">
        <div class="col-10 mb-4">
          <div class="deposit_info d-flex align-items-center m_top mb-3">
            <div
              class="deposit_cell mr-4"
              :class="type == '1' ? 'active' : 'deposit_bg'"
              @click.prevent="type = '1'"
            >
              <a href="#">
                <strong>{{ orderList.open.length }}</strong> Open
              </a>
            </div>
            <div
              class="deposit_cell mr-4"
              :class="type == '2' ? 'active' : 'deposit_bg'"
              @click.prevent="type = '2'"
            >
              <a href="#">
                <strong>{{ orderList.completed.length }}</strong> Completed
              </a>
            </div>
            <div
              class="deposit_cell mr-4"
              :class="type == '3' ? 'active' : 'deposit_bg'"
              @click.prevent="type = '3'"
            >
              <a href="#">
                <strong>{{ orderList.cancel.length }}</strong> Rejected
              </a>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="dataTable table-responsive inLeft-search">
            <table class="table table-striped table-bordered" width="100%">
              <thead class="thead-white">
                <tr>
                  <th width="150px" scope="col">OPENED DATE</th>
                  <th width="150px" scope="col" v-if="type == '2'">
                    CLOSED DATE
                  </th>
                  <th width="150px" scope="col" v-if="type == '3'">
                    CANCELED DATE
                  </th>
                  <th width="150px" scope="col">PAIR</th>
                  <th width="150px" scope="col">SIDE</th>
                  <th width="150px" scope="col">TYPE</th>
                  <th width="150px" scope="col">Price</th>
                  <th width="150px" scope="col">Quantity</th>
                  <!--<th width="150px" scope="col">UNITS FILLED</th>
									<th width="150px" scope="col">Units total</th>
									<th width="150px" scope="col">actual rate</th>
									<th width="150px" scope="col">total cost</th>-->
                  <th width="150px" scope="col">STATUS</th>
                  <th v-if="type == '1'">Close Order</th>
                </tr>
              </thead>
              <order-list
                v-if="
                  tradingAccount != null &&
                  Object.keys(tradingAccount).length > 0
                "
                ref="orderList"
              ></order-list>
              <tbody v-else>
                <td valign="top" colspan="8" class="dataTables_empty">
                  <span class="noData-img my-3">
                    <img
                      src="../../../../static/website/images/no-data.png"
                      alt="Icon"
                    />
                  </span>
                  No data available
                </td>
              </tbody>
            </table>
            <pagination
              :totalRecords="orderData(type).length"
              :limit="pageLimit"
              v-if="orderData(type).length > 0"
            ></pagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import orderList from "./order/list";
export default {
  name: "order-history",
  data() {
    return {
      type: "1",
      page: "1",
      pageLimit: "10",
    };
  },
  components: {
    orderList,
  },
  methods: {
    orderData(type) {
      if (type == "1") {
        return this.orderList.open;
      } else if (type == "2") {
        return this.orderList.completed;
      } else if (type == "3") {
        return this.orderList.cancel;
      }
    },
    listing() {},
    // listing(val){
    // 	if(this.tradingAccount != null && Object.keys(this.tradingAccount).length > 0){
    // 		this.type = type
    // 		try {
    // 			this.refs.orderList.listing()
    // 		}
    // 		catch(err) {}
    // 	}
    // }
  },
  created() {
    this.pageName("ORDER HISTORY");
  },
};
</script>
