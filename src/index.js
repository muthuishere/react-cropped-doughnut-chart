import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import { DoughnutElement } from "./core/DoughnutElement";

export const CroppedDoughnutChart = ({ text }) => {


  const [state, setState] = useState("");

  useEffect(() => {



    const items =[
      { value:24,color:"red"},
      { value:227,color:"blue"},
      { value:49,color:"pink"},
    ]

    //const items =[98,78,56]


    let imgUrl = "https://www.w3schools.com/html/pic_trulli.jpg";
    // <svg id="root">
    // </svg>
   const result= DoughnutElement(items,{
     radius: 100,
     width: 200,
     title:"Halo",
     titleColor:"#FF0000",
     thicknessSize:"M",
     gapSize:"XL",
     labelSize:12,
     labelColor:"white",
     backgroundColor:"white",
     imgUrl

   } )
    setState(result);



  }, [])

  return   <div dangerouslySetInnerHTML={{ __html: state }} />


}
