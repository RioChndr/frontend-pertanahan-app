<template>
  <div class="form-group" :class="{ 'input-group': hasIcon }">
    <slot name="label">
      <label v-if="label" class="control-label" v-html="label"></label>
      <label style="color: red" v-if="isRequired">
        <i><sup>* Wajib Diisi</sup></i>
      </label>
    </slot>
    <slot name="addonLeft">
      <span v-if="addonLeftIcon" class="input-group-prepend">
        <i :class="addonLeftIcon" class="input-group-text"></i>
      </span>
    </slot>
    <input
      v-if="!isNumber"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      class="form-control border"
      aria-describedby="addon-right addon-left"
    />
    <input
      v-else
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      class="form-control border"
      aria-describedby="addon-right addon-left"
      @keypress="validateNumber"
      :maxlength="maxLength"
    />
    <slot></slot>
    <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-append">
        <i :class="addonRightIcon" class="input-group-text"></i>
      </span>
    </slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "fg-input",
  props: {
    label: String,
    value: [String, Number],
    addonRightIcon: String,
    addonLeftIcon: String,
    isNumber: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
    },
  },
  computed: {
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      );
    },
  },
  methods: {
    validateNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
<style></style>
