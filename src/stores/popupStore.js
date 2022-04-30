import { defineStore } from "pinia";

export const popupStore = defineStore("popupStore", {
  state: () => ({
    isShow: false,
    title: "",
    message: "",
    onBackPreesed: null,
    onTryPressed: null,
    onOkPressed: null,
  }),
  actions: {
    setData(data) {
      this.state.onBackPreesed = data.onBackPreesed;
      this.state.onTryPressed = data.onTryPressed;
      this.state.onOkPressed = data.onOkPressed;
      this.state.title = data.title;
      this.state.message = data.message;
    },
    close() {
      this.state.isShow = false;
      this.state.onBackPreesed = null;
      this.state.onTryPressed = null;
      this.state.onOkPressed = null;
      this.state.title = "";
      this.state.message = "";
    },
  },
});
