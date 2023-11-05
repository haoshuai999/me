import React, { useEffect } from "react";
import pym from "pym.js";

function Test({width}) {
    useEffect(() => {
        let pymParent = new pym.Parent('example', "https://observablehq.com/embed/7c527de234abd676?cells=viewof+r%2Cchart", {});
    }, [width]);

    return (
        <div id="example"></div>
    );
}

export default Test;