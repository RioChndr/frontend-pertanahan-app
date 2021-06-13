<template>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-4 col-form-label">
      <strong>
        <slot name="left-column"></slot>
      </strong>
    </label>
    <div class="col-sm-8 col-form-label">
      <slot name="right-column">Value</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LabelHorizontal"
};
</script>

<style></style>
