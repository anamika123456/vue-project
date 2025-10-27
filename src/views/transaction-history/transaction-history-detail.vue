<template>
  <div class="mid_scroll_content">
    <section class="depoist_fund pb-5">
      <div class="row justify-content-center">
        <div class="col-8 col-8-offset-2">
          <div class="deposit_info d-flex align-items-center m_top mb-5">
            <div class="deposit_cell mr-4">
              <a href="#"> <strong>11</strong> Open </a>
            </div>
            <div class="deposit_cell mr-4 active">
              <a href="#"> <strong>07</strong> Completed </a>
            </div>
            <div class="deposit_cell">
              <a href="#"> <strong>02</strong> Rejected </a>
            </div>
          </div>
        </div>
        <div class="col-12">
          <table class="table">
            <thead class="thead-white">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Exchange pairs</th>
                <th scope="col">quantity</th>
                <th scope="col">exchange price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:12:13 08.08.2019</td>
                <td>BTC/ETH</td>
                <td>1.212343</td>
                <td>
                  229.12
                  <a class="t_ic" href="#"
                    ><feather type="x-circle"></feather
                  ></a>
                  <a class="t_ic" href="#"
                    ><feather type="more-vertical"></feather
                  ></a>
                </td>
              </tr>
              <tr>
                <td>10:12:13 08.08.2019</td>
                <td>BTC/ETH</td>
                <td>1.212343</td>
                <td>
                  229.12
                  <a class="t_ic" href="#"
                    ><feather type="x-circle"></feather
                  ></a>
                  <a class="t_ic" href="#"
                    ><feather type="more-vertical"></feather
                  ></a>
                </td>
              </tr>
              <tr>
                <td>10:12:13 08.08.2019</td>
                <td>BTC/ETH</td>
                <td>1.212343</td>
                <td>
                  229.12
                  <a class="t_ic" href="#"
                    ><feather type="x-circle"></feather
                  ></a>
                  <a class="t_ic" href="#"
                    ><feather type="more-vertical"></feather
                  ></a>
                </td>
              </tr>
              <tr>
                <td>10:12:13 08.08.2019</td>
                <td>BTC/ETH</td>
                <td>1.212343</td>
                <td>
                  229.12
                  <a class="t_ic" href="#"
                    ><feather type="x-circle"></feather
                  ></a>
                  <a class="t_ic" href="#"
                    ><feather type="more-vertical"></feather
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { registerStepsMixins } from "@/plugins/registerSteps";
export default {
  name: "transaction-history-detail",
  mixins: [registerStepsMixins],
  data() {
    return {};
  },

  created() {
    this.pageName("ORDER HISTORY");
  },
};
</script>
