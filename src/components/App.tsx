import React from "react";
import { Controller } from "./Controller";
import { Display } from "./Display";

export const App = () => (
  <>
    <Display />
    <Controller number={10000} margin={0} threshold={1.0} />
  </>
);
