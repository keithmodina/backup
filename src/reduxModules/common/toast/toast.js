import { SHOW_TOAST, HIDE_TOAST } from './index';

export const initialState = {
  isShown: false,
  props: {
    message: '',
    buttonText: '',
    onClick: () => { }
  }
};

const toast = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_TOAST:
      if (typeof action.payload.props === 'string' || action.payload.props instanceof String) {
        return {
          ...state,
          isShown: true,
          props: {
            message: action.payload.props
          }
        };
      }
      return {
        ...state,
        isShown: true,
        props: action.payload.props
      };
    case HIDE_TOAST:
      return initialState;
    default:
      return state;
  }
};

export default toast;
