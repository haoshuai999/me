import React, {useRef, useEffect, useState} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "../99803321128e165f";

function Returns({ width }) {
  const viewofStartdateRef = useRef();
  const viewofEnddateRef = useRef();
  const viewofChRef = useRef();
  const chartRef = useRef();
  const [module, setModule] = useState();

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(notebook, name => {
      if (name === "viewof startdate") return new Inspector(viewofStartdateRef.current);
      if (name === "viewof enddate") return new Inspector(viewofEnddateRef.current);
      if (name === "viewof ch") return new Inspector(viewofChRef.current);
      if (name === "chart") return new Inspector(chartRef.current);
      return ["startdate_obj","cd_startdate_obj","regular_startdate","calcuate_return","cd_startdate","gold_return","sp500_return","tlt_return","silver_return","nikkei_return","ftse_return","crypto_return","all_returns","returns_map","x","line","xAxis","enddate_obj","cd_enddate_obj","cd_enddate","calcuate_start_date"].includes(name);
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
      <div ref={chartRef} className="chart"/>
      {/* <p>Credit: <a href="https://observablehq.com/d/99803321128e165f">Crypto Asset Returns - CD by CoinDesk</a></p> */}
    </>
  );
}

export default Returns;