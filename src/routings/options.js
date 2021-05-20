export default {
  onBeforeChange: async (dispatch, getState, { action }) => {
    // On before router change codes here
    const { type } = getState().location;
  },
  onAfterChange: async (dispatch, getState, { action }) => {
    // On after router change codes here
  }
};
