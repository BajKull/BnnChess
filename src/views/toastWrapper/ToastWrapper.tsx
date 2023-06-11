"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastWrapper = () => {
  return <ToastContainer position="bottom-right" limit={3} />;
};

export default ToastWrapper;
