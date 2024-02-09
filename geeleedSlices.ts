import { RootState } from "@/geeleed-store/GeeleedStore";

export default [
  // example
  {
    name: "counter",
    initialState: {
      value: 0,
    },
    reducers: {
      increment: (state: RootState) => {
        state.value++;
      },
      decrement: (state: RootState) => {
        state.value--;
      },
      setValue: (state: RootState, action: { payload: number }) => {
        state.value = action.payload;
      },
    },
  },
];
