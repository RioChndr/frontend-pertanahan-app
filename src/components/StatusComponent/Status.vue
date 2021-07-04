<template>
  <span>
    <span class="badge" :class="'badge-' + getColor">
      {{ getText }}
    </span>
  </span>
</template>

<script>
import configStatus from "./configStatus";

export default {
  props:{
    permohonan: {
      type: Boolean,
      default: false,
    },
    arsipLogs: {
      type: Boolean,
      default: false,
    },
    delivery: {
      type: Boolean,
      default: false,
    },
    status: null,
  },
  data() {
    return {
      configStatus,
    }
  },
  computed:{
    typeStatus(){
      if(this.permohonan) return "permohonan"
      if(this.arsipLogs) return "arsipLogs"
      if(this.delivery) return "delivery"
      else return "permohonan" // default
    },
    getColor(){
      if(this.configStatus[this.typeStatus][this.status]){
        return this.configStatus[this.typeStatus][this.status].color
      } else {
        return "secondary" // default
      }
    },
    getText(){
      if(this.configStatus[this.typeStatus][this.status]){
        return this.configStatus[this.typeStatus][this.status].text
      } else{
        return "secondary" // default
      }
    }
  }
}
</script>

<style>

</style>