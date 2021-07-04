<template>
  <span>
    <span class="badge-outlined" :class="'badge-outlined-' + getColor">
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

<style lang="scss" scoped>
.badge-outlined{
  padding: .5em .4em;
  border:1px solid;
  border-radius:8px;
  background:white;
  &.badge-outlined-primary{
    border-color: #007bff;
    color: #007bff;
  }
  &.badge-outlined-secondary{
    border-color: #6c757d;
    color: #6c757d;
  }
  &.badge-outlined-success{
    border-color: #28a745;
    color: #28a745;
  }
  &.badge-outlined-danger{
    border-color: #dc3545;
    color: #dc3545;
  }
  &.badge-outlined-warning{
    border-color: #ffc107;
    color: #ffc107;
  }
  &.badge-outlined-dark{
    border-color: #343a40;
    color: #343a40;
  }
}
</style>