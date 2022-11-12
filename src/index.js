import React, { useEffect, useRef, useState } from "react";
import { HorseShoeChartCreator } from "./core/HorseShoeChartCreator";

export const HorseShoeChart = ({ items,options }) => {


  const svg = useRef(null);


  useEffect(() => {


    const result= HorseShoeChartCreator(items,options )

    if(svg.current){



      if(svg.current.children.length>0){
        svg.current.removeChild(svg.current.children[0])
      }
       svg.current.appendChild(result)
      // svg.current.parentNode.replaceChild(result, svg.current);
    }


  }, [items,options])

  // return   <div dangerouslySetInnerHTML={{ __html: state }} />
  return   <div ref={svg}/>


}
