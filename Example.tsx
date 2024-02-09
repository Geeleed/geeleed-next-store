"use client";

import {
  RootState,
  action,
  useAppDispatch,
  useAppSelector,
} from "@/geeleed-store/GeeleedStore";
import React, { useRef } from "react";

type Props = {};

export default function page({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const read = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <button onClick={() => dispatch(action("counter").increment())}>
        Increment
      </button>
      <button onClick={() => dispatch(action("counter").decrement())}>
        Decrement
      </button>
      <p>Count: {read}</p>
      <input ref={inputRef} type="text" />
      <button
        onClick={() =>
          dispatch(action("counter").setValue(inputRef.current?.value))
        }
      >
        Set value
      </button>
    </div>
  );
}
