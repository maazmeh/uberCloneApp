const initialState = {
  userData: null,
};

export const setUserData = (userData:any) => ({
  type: 'SET_USER_DATA',
  payload: userData,
});

const userReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;