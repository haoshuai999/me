import React, {useRef, useEffect, useState} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "../../4cbd138614bf115f/4cbd138614bf115f@585";

function Congress({width}) {
    const viewofRRef = useRef();
    const chartRef = useRef();
    const [module, setModule] = useState();
  
    useEffect(() => {
      const runtime = new Runtime();
      const main = runtime.module(notebook, name => {
        if (name === "viewof r") return new Inspector(viewofRRef.current);
        if (name === "chart") return new Inspector(chartRef.current);
        return ["pie"].includes(name);
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
      <div ref={viewofRRef} />
      <div ref={chartRef} className="chart"/>
      {/* <p>Credit: <a href="https://observablehq.com/d/4cbd138614bf115f">US Congress Chart by CoinDesk</a></p> */}
    </>
  );
}

export default Congress;