<template>
  <span>
    <span v-if="data.mobile"> {{ getTel(data.mobile) }}</span>
    <span v-else> {{ getEmail(data.email) }}</span>
  </span>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    isAll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getTel(val) {
      if (this.isAll) return val;
      return val.substr(0, 3) + "****" + val.substr(val.length - 4);
    },
    getEmail(val) {
      if (this.isAll) return val;
      let index = val.indexOf("@");
      return val.substr(0, 3) + "****" + val.substr(index);
    },
  },
};
</script>

<style></style>
