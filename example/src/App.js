import React from 'react'

import { HorseShoeChart } from 'react-cropped-doughnut-chart'
import 'react-cropped-doughnut-chart/dist/index.css'
// import { HorseShoeChart } from "../../src";


const App = () => {


  const items =[
    { value:24,color:"red"},
    { value:227,color:"blue"},
    { value:49,color:"pink"},
  ]
  const items2 =[
    { value:4659,color:"green",labelColor:"white"},
    { value:701,color:"red"},
    { value:500,color:"yellow"},

  ]
  const items3 =[
    { value:124,color:"red"},
    { value:27,color:"blue"},
    { value:149,color:"pink",labelColor:"black"},
  ]
  let options = {
    radius: 100,
    title:"Halo",
    titleColor:"#FF0000",
    thicknessSize:"S",
    gapSize:"XL",
    labelSize:12,
    labelColor:"white",
    backgroundColor:"white",
    imgUrl:"https://www.w3schools.com/html/pic_trulli.jpg" };


  return <div className="container">
    <HorseShoeChart items={items} options={options} />
    <hr/>
    <HorseShoeChart items={items2}  />
    <hr/>
    <HorseShoeChart items={items2}  />
  </div>
}

export default App
