const { createApp } = Vue;

const API_URL = 'http://localhost:8000/';
const SEGMENTATION_ENDPOINT = API_URL + 'segmentation/faces/';

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

          let canvasData = canvas.toDataURL();
          canvasData = canvasData.replace(/^data:image\/png;base64,/, '');

          const reqBody = {
            image: canvasData,
            technique: 'cascade',
          };

          const response = await fetch(SEGMENTATION_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
          }).then(res => res.json());

          console.log(response);
          this.loading = false;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },

  mounted() {
    this.toggleVideo();
  },
});

app.mount('#app');
