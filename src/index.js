import React, { useEffect, useRef, useState } from "react";
import { DoughnutElement } from "./core/DoughnutElement";

export const CroppedDoughnutChart = ({ items,options }) => {


  const svg = useRef(null);


  useEffect(() => {




    const result= DoughnutElement(items,options )

    if(svg.current){
      svg.current.appendChild(result)
    }


  }, [])

  // return   <div dangerouslySetInnerHTML={{ __html: state }} />
  return   <div ref={svg}/>


}
