import { GlobalState } from '@/store/interface';
import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '@/utils/cookies';

const initialState: GlobalState = {
  token: '',
  refresh_token: '',
  username: '',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    SET_TOKEN_INFO: {
      reducer(state, action) {
        console.log(action.payload);
        const { token, refresh_token } = action.payload;
        state.token = token;
        state.refresh_token = refresh_token;
        setCookie('token', token);
        setCookie('refresh_token', refresh_token);
      },
      // @ts-ignore
      prepare(tokenInfo) {
        return {
          payload: tokenInfo,
        };
      },
    },
  },
});

export const { SET_TOKEN_INFO } = globalSlice.actions;

export default globalSlice.reducer;
