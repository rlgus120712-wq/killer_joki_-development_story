import { defineStore } from 'pinia';

export const useWarningModalStore = defineStore('warningModal', {
  state: () => ({
    show: false,
    title: '',
    message: '',
  }),
  actions: {
    showModal(title: string, message: string) {
      this.title = title;
      this.message = message;
      this.show = true;
    },
    hideModal() {
      this.show = false;
      this.title = '';
      this.message = '';
    },
  },
});
