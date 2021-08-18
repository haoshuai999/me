import React, {useRef, useEffect, useState} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "../543fc9bac1bd4e19";

function Chinamap({width}) {
  const viewofYearRef = useRef();
  const viewofMetricsRef = useRef();
  const chartRef = useRef();
  const [module, setModule] = useState();

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(notebook, name => {
      if (name === "viewof year") return new Inspector(viewofYearRef.current);
      if (name === "viewof metrics") return new Inspector(viewofMetricsRef.current);
      if (name === "chart") return new Inspector(chartRef.current);
    });
    setModule(main);
    return () => {
      setModule(undefined);
      runtime.dispose()
    };
  }, []);

  useEffect(() => {
    if (module !== undefined) {
      module.redefine("width", width);
    }
  }, [width, module]);

  return (
    <div className={`${width > 500 ? null : "order"}`}>
      <div ref={viewofYearRef} className={`${width > 500 ? "year" : "year-mobile"}`}/>
      <div ref={viewofMetricsRef} className={`${width > 500 ? "deputy" : "deputy-mobile"}`}/>
      <div ref={chartRef} className={`${width > 500 ? null : "chart"}`}/>
    </div>
  );
}

export default Chinamap;