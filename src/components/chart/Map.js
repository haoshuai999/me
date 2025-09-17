import React, {useRef, useEffect } from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "543fc9bac1bd4e19";

function Chinamap({width}) {
  const viewofYearRef = useRef();
  const viewofMetricsRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "viewof year") return new Inspector(viewofYearRef.current);
      if (name === "viewof metrics") return new Inspector(viewofMetricsRef.current);
      if (name === "chart") return new Inspector(chartRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <div className={`${width > 500 ? null : "order"}`}>
      <div ref={viewofYearRef} className={`${width > 500 ? "year" : "year-mobile"}`}/>
      <div ref={viewofMetricsRef} className={`${width > 500 ? "deputy" : "deputy-mobile"}`}/>
      <div ref={chartRef} className={`${width > 500 ? null : "chart"}`}/>
    </div>
  );
}

export default Chinamap;