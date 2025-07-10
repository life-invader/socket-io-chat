export const selectMessageSliceData = (state) => ({
  messages: state.messages,
  addMessage: state.addMessage,
  addMessages: state.addMessages,
  clearMessages: state.clearMessages,
});
