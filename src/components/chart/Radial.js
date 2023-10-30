import React, {useRef, useEffect, useState} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "../../684a54bcf8262fbd/684a54bcf8262fbd@361";

function Radial() {
    const chartRef = useRef();
    const width = 975;
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
      {/* <p>Credit: <a href="https://observablehq.com/d/684a54bcf8262fbd">Coinbase Radial Stacked Bar Chart by CoinDesk</a></p> */}
    </>
  );
}

export default Radial;