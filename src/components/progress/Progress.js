export default {
  currentProgress: null,

  initialProgress(refProgress) {
    this.currentProgress = refProgress;
  },

  show(promiseFunction, args, onSuccess, onError, handleError) {
    this.currentProgress.show(promiseFunction, args, onSuccess, onError, handleError);
  },
};
