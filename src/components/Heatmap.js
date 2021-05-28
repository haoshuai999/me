import React, {useRef, useEffect, useState} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "../@shuaihaofzny/heatmap-example";

function HeatmapExample({width}) {
  const chartRef = useRef();
  const [module, setModule] = useState();

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(notebook, name => {
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
    <>
      <div ref={chartRef} className="chart"/>
      {/* <p>Credit: <a href="https://observablehq.com/@shuaihaofzny/heatmap-example">Heatmap Example by Shuai Hao</a></p> */}
    </>
  );
}

export default HeatmapExample;