<template>
  <tbody>
    <tr
      class="customtableloading"
      v-if="type == 'table' && pageloader_value"
      v-for="i in parseInt(colspan)"
    >
      <td class="animated-background loading" v-for="j in parseInt(colspan)">
        <div class="animated-background"></div>
      </td>
    </tr>
    <tr v-if="type == 'table' && listLength == 0 && !pageloader_value">
      <td class="dataTables_empty text-center" :colspan="colspan">
        <span class="noData-img my-3">
          <img src="/assets/website/images/no-data.png" alt="Icon" />
        </span>
        <p>No data available</p>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "loader",
  props: ["pageloader_value", "type", "colspan", "listLength"],
};
</script>
