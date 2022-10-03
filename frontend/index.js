const { createApp } = Vue;

const app = createApp({
  data() {
    return {};
  },

  mounted() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          this.$refs['webcam'].srcObject = stream;
        })
        .catch(err => console.error(err));
    }
  },
});

app.mount('#app');
