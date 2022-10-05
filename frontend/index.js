const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      isCameraOn: false,
      stream: null,
      cameraError: '',
    };
  },
  methods: {
    async toggleVideo() {
      if (!this.isCameraOn) {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });

          this.$refs['webcam'].srcObject = this.stream;
          this.isCameraOn = true;
        } catch (err) {
          cameraError = err.message;
          this.isCameraOn = false;
          console.error(err);
        }
      }

      // if camera is on
      else {
        this.isCameraOn = false;
        this.stream.getTracks()[0].stop();
      }
    },
  },

  mounted() {
    this.toggleVideo();
  },
});

app.mount('#app');
