import React, { useEffect, useRef, useState } from "react";
import { HorseShoeChartCreator } from "./core/HorseShoeChartCreator";

export const HorseShoeChart = ({ items,options }) => {


  const svg = useRef(null);


  useEffect(() => {


    const result= HorseShoeChartCreator(items,options )

    if(svg.current){

      svg.current.appendChild(result)
    }


  }, [])

  // return   <div dangerouslySetInnerHTML={{ __html: state }} />
  return   <div ref={svg}/>


}
