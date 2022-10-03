const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      message: 'FROM VUE',
    };
  },
});

app.mount('#app');
