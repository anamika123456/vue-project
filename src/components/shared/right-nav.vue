<template>
  <div class="cap_rightbar">
    <app-header />
    <div class="right_scrollbar">
      <div class="today_vol border-top-0 right_box">
        <h3>Today's Volume</h3>
        <div class="cap_newwallet">
          <router-link to="/order-history"
            ><feather type="trending-up"></feather> $ 1840.0
            (10.64%)</router-link
          >
        </div>
      </div>
      <div class="cap_wallet right_box">
        <h3>Wallets</h3>
        <router-link to="/wallets" class="subdropdown"
          ><i class="fa fa-ellipsis-h"></i
        ></router-link>
        <div class="wallet_cur">
          <ul>
            <li class="active">
              <a href="#">
                <h4>
                  BTC
                  <span class="price">0.75273</span>
                </h4>
                <div class="add">
                  <feather type="plus" class="icon"></feather>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <h4>
                  BTC
                  <span class="price">0.75273</span>
                </h4>
                <div class="add">
                  <feather type="plus" class="icon"></feather>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <h4>
                  BTC
                  <span class="price">0.75273</span>
                </h4>
                <div class="add">
                  <feather type="plus" class="icon"></feather>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <h4>
                  BTC
                  <span class="price">0.75273</span>
                </h4>
                <div class="add">
                  <feather type="plus" class="icon"></feather>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="addphonenumber right_box">
        <a href="#"
          ><feather type="lock" class="icon"></feather> Add phone number to
          increase limits</a
        >
      </div>
      <div class="payments right_box">
        <h3>Payments</h3>
        <a class="subdropdown" href="#"><i class="fa fa-ellipsis-h"></i></a>
        <div class="usercard">
          <img src="/assets/website/images/credit_card.png" alt="" />
        </div>
        <div class="actions">
          <h4>ACTIONS</h4>
          <ul>
            <li>
              <router-link to="/payment-methods"
                ><feather type="edit-2"></feather
              ></router-link>
            </li>
            <li>
              <router-link to="/deposit-withdraw"
                ><feather type="send"></feather
              ></router-link>
            </li>
            <li>
              <a href="#"><feather type="trash"></feather></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
