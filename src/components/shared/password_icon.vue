<template>
  <div>
    <feather
      type="eye"
      v-if="value === 'text'"
      class=""
      @click="$emit('receive-emit', 'password')"
    ></feather>
    <feather
      type="eye-off"
      v-if="value === 'password'"
      class=""
      @click="$emit('receive-emit', 'text')"
    ></feather>
  </div>
</template>

<script>
export default {
  name: "password-icon",
  props: ["varName", "type"],
  methods: {
    // changeValue: function(val){
    //     this.$parent.changeMode(val,this.type)
    // }
  },
};
</script>

<!-- <template>
    <div>
        <a href="javascript:void(0);" class="d-block ml-2 mr-2" v-if="value === 'text'" class="" @click="changeValue('password')"><feather type="eye" size="18px" class="d-block textcolor"></feather></a>
        <a href="javascript:void(0);" class="d-block ml-2 mr-2" v-if="value === 'password'" class="" @click="changeValue('text')"><feather type="eye-off" size="18px" class="d-block textcolor"></feather></a>
    </div>
</template>

<script>
export default {
    name:'password-icon',
    props:['value'],
    methods:{
        changeValue: function(val){
            this.$emit("input", val)
        }
    }
}
</script> -->
