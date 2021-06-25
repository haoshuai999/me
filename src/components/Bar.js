import React, {useState, useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "../576de58dae43c14e";

function Notebook({ width }) {
  const chartRef = useRef();
  const viewofChRef = useRef();
  const viewofEnddateRef = useRef();
  const viewofStartdateRef = useRef();
  const [module, setModule] = useState();

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(notebook, name => {
      if (name === "chart") return new Inspector(chartRef.current);
      if (name === "viewof ch") return new Inspector(viewofChRef.current);
      if (name === "viewof enddate") return new Inspector(viewofEnddateRef.current);
      if (name === "viewof startdate") return new Inspector(viewofStartdateRef.current);
      return ["calcuate_returns","returns","","x","xAxis","yAxis","y","size_input","width","height","data"].includes(name);
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
      <div ref={viewofStartdateRef} />
      <div ref={viewofEnddateRef} />
      <div ref={viewofChRef} />
      <div ref={chartRef} />
    </>
  );
}

export default Notebook;