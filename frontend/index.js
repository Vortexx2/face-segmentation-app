const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      isCameraOn: false,
      stream: null,
      photoTaken: false,
      loading: false,
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

    async takePhoto() {
      if (this.isCameraOn) {
        this.photoTaken = true;
        const canvas = this.$refs['canvas'];
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.$refs['webcam'], 0, 0, canvas.width, canvas.height);
        this.loading = true;
      }
    },
  },

  mounted() {
    this.toggleVideo();
  },
});

app.mount('#app');
