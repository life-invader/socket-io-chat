export const selectMessageSliceData = (state) => ({
  messages: state.messages,
  addMessage: state.addMessage,
  clearMessages: state.clearMessages,
});
