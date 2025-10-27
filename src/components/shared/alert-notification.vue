<template>
  <div class="position-relative tempLateMessage">
    <p
      :class="[
        { 'alert alert-danger': $parent.notification_type == 'error' },
        { 'alert alert-success': $parent.notification_type == 'success' },
      ]"
      v-html="$parent.notification_msg"
    ></p>
    <feather
      type="x"
      @click="
        $parent.notification_msg = '';
        $parent.notification_type = '';
      "
    />
  </div>
</template>

<script>
export default {
  name: "Alert-Notification",
};
</script>
