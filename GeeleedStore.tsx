"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { Slice, configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import geeleedSlices from "@/app/geeleedSlices"; // geeleedSlices.ts --> [slice1, slice2, ...]

let allActions: any = {};
for (let i = 0; i < geeleedSlices.length; i++) {
  const slice = createSlice(geeleedSlices[i]);
  allActions[geeleedSlices[i].name] = slice.actions;
}

const makeStore = () => {
  let reducers: any = {};
  for (let i = 0; i < geeleedSlices.length; i++) {
    const slice: Slice = createSlice(geeleedSlices[i]);
    reducers[slice.name] = slice.reducer;
  }
  return configureStore({
    reducer: reducers,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppStore: () => AppStore = useStore;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const action = (sliceName: string) => {
  return allActions[sliceName];
};
export default function GeeleedStore({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// "use client";
// import {
//   Provider,
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
// } from "react-redux";
// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Assuming geeleedSlices is an array of slice configurations
// import geeleedSlices from "@/app/geeleedSlices";

// // Combine slices and reducers
// const slices = geeleedSlices.map((config) => createSlice(config));
// const reducers = slices.reduce((acc: any, slice) => {
//   acc[slice.name] = slice.reducer;
//   return acc;
// }, {});

// // Actions combined
// const allActions = slices.reduce((acc: any, slice) => {
//   acc[slice.name] = slice.actions;
//   return acc;
// }, {});

// // Configure store
// const store = configureStore({
//   reducer: reducers,
// });

// // Types
// export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = typeof store.dispatch;

// // Hooks
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

// export const action = (sliceName: string) => allActions[sliceName];

// const GeeleedStore = ({ children }: { children: React.ReactNode }) => {
//   return <Provider store={store}>{children}</Provider>;
// };

// export default GeeleedStore;
