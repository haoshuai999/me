import React, {useState, useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "../../fb5ed6161a8a33b8/fb5ed6161a8a33b8@601";

function Candidate({ width }) {
  const viewofProfileRef = useRef();
  const title1Ref = useRef();
  const barkeyRef = useRef();
  const barchartRef = useRef();
  const title2Ref = useRef();
  const viewofYearRef = useRef();
  const datavizRef = useRef();
  const [module, setModule] = useState();

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(notebook, name => {
      if (name === "viewof profile") return new Inspector(viewofProfileRef.current);
      if (name === "title1") return new Inspector(title1Ref.current);
      if (name === "barkey") return new Inspector(barkeyRef.current);
      if (name === "barchart") return new Inspector(barchartRef.current);
      if (name === "title2") return new Inspector(title2Ref.current);
      if (name === "viewof year") return new Inspector(viewofYearRef.current);
      if (name === "dataviz") return new Inspector(datavizRef.current);
      return ["series","y","yAxis","barcolor","x","xAxis"].includes(name);
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
      <div ref={viewofProfileRef} />
      <div ref={title1Ref} />
      <div ref={barkeyRef} />
      <div ref={barchartRef} />
      <div ref={title2Ref} />
      <div ref={viewofYearRef} />
      <div ref={datavizRef} />
    </>
  );
}

export default Candidate;