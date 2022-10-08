const { createApp } = Vue;

const API_URL = 'http://localhost:8000/';
const SEGMENTATION_ENDPOINT = API_URL + 'segmentation/faces';

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
      try {
        if (this.isCameraOn) {
          this.photoTaken = true;

          // take frame of video and set it to canvas
          const canvas = this.$refs['canvas'];
          const ctx = canvas.getContext('2d');
          ctx.drawImage(
            this.$refs['webcam'],
            0,
            0,
            canvas.width,
            canvas.height
          );
          this.loading = true;

          const response = await this.sendImage(canvas);

          const imageToDraw = new Image();

          imageToDraw.onload = () => {
            ctx.drawImage(imageToDraw, 0, 0, canvas.width, canvas.height);
          };
          imageToDraw.src = URL.createObjectURL(response);

          this.loading = false;
        }
      } catch (err) {
        console.error(err);
      }
    },

    async sendImage(canvas) {
      let canvasData = canvas.toDataURL();
      const file = this.dataURLtoBlob(canvasData);

      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(SEGMENTATION_ENDPOINT, {
        method: 'POST',
        body: formData,
      }).then(res => res.blob());

      return response;
    },

    dataURLtoBlob(dataURL) {
      const binary = atob(dataURL.split(',')[1]);

      const array = [];

      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      return new Blob([new Uint8Array(array)], {
        type: 'image/png',
      });
    },
  },

  mounted() {
    this.toggleVideo();
  },
});

app.mount('#app');
