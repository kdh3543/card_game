import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  show: boolean;
}

const initialState: initialStateType = {
  show: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpenHowToPlayModal: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { actions: modalSliceAction, reducer: modalSliceReducer } =
  modalSlice;

export default modalSlice;
