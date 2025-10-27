<template>
  <div>
    <div class="captail_wrap position-relative fullLoader p-0">
      <div class="authincation w-100">
        <div class="container">
          <div
            class="row justify-content-center align-items-center"
            style="height: 100vh"
          >
            <div class="col-12">
              <div class="form-input-content text-center error-page">
                <img
                  src="/assets/website/images/pageNotFound.svg"
                  alt="404 Page"
                  class="d-block m-auto"
                />
                <h1 class="error-text font-weight-bold mt-4">404</h1>
                <h4>The page you were looking for is not found!</h4>
                <p>
                  You may have mistyped the address or the page may have moved.
                </p>

                <router-link class="cap_btn" to="/dashboard"
                  >Back to Home</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "404-not-found",
  data() {
    return {};
  },
  methods: {},
};
</script>
