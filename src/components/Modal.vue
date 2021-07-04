<script>
export default {
  name: "modal",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop-custom">
      <div
        class="modal-custom"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            This is the default tile!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            I'm the default body!
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

@media screen and (min-width: 300px) and (max-width: 600px) {
  .modal-custom {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    z-index: 50500;
    max-width: 100vw;
    max-height: 50vh;
  }
}

@media screen and (min-width: 800px) {
  .modal-custom {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    z-index: 50500;
    width: 65rem;
    max-height: 60vh;
  }
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  /* border-bottom: 1px solid #eeeeee; */
  color: #4aae9b;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  /* border-top: 1px solid #eeeeee; */
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 0 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
