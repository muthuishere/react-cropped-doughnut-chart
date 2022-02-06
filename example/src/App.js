import React from 'react'

import { CroppedDoughnutChart } from 'react-cropped-doughnut-chart'
import 'react-cropped-doughnut-chart/dist/index.css'


const App = () => {


  const items =[
    { value:24,color:"red"},
    { value:227,color:"blue"},
    { value:49,color:"pink"},
  ]
  const items2 =[
    { value:124,color:"red"},
    { value:27,color:"blue"},
    { value:149,color:"pink",labelColor:"black"},
  ]
  let options = {
    radius: 100,
    title:"Halo",
    titleColor:"#FF0000",
    thicknessSize:"M",
    gapSize:"XL",
    labelSize:12,
    labelColor:"white",
    backgroundColor:"white",
    imgUrl:"https://www.w3schools.com/html/pic_trulli.jpg" };


  return <div className="container">
    <CroppedDoughnutChart items={items} options={options} />
    <hr/>
    <CroppedDoughnutChart items={items2}  />
  </div>
}

export default App
