import React from 'react'
import { useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { HorseShoeChart } from 'react-cropped-doughnut-chart'
import 'react-cropped-doughnut-chart/dist/index.css'
// import { HorseShoeChart } from "../../src";




function DynamicImage()  {
  // formik
  // JSON schema

  //Options


  const defaultItems =[
    { value:24,color:"red",labelColor:"white",label:"High"},
    { value:227,color:"yellow",labelColor:"white",label:"Medium"},
    { value:49,color:"#00EE00",label:"Low"},
  ]

  const defaultOptions = {
    radius: 200,
    title:"Issues",
    titleColor:"#FF0000",
    thicknessSize:"S",
    gapSize:"XL",
    labelSize:12,
    showAnimation: false,
    animationDurationInSeconds:5,
    labelColor:"white",
    backgroundColor:"white",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Noun_project_exclamation_icon_620383.svg/512px-Noun_project_exclamation_icon_620383.svg.png?20180327224854",

    items:JSON.stringify(defaultItems)
  }

  const [items, setItems] = useState(defaultItems);
  const [options, setOptions] = useState(defaultOptions);

  const availableOptions = {
    radius: "any Number",
    title:"any string",
    titleColor:"Color in format #FF0000 or color string",
    thicknessSize:"Any of S,M,L,XL",
    gapSize:"Any of S,M,L,XL",
    labelSize:"Any Number",
    labelColor:"Color in format #FF0000 or color string",
    backgroundColor:"Color in format #FF0000 or color string",
    imgUrl:"Any URL" ,
    showAnimation: "true or false",
    animationDurationInSeconds:"Any Number",
    items:"JSON string with format [ { value:24,color:'red',labelColor:'white'}]"
  }
  //submit
  const formik = useFormik({
    initialValues: {
      ...defaultOptions
    },
    onSubmit: values => {
      console.log('values:', values);

      const updatedOptions = {...values}
      delete updatedOptions.items

      setOptions(updatedOptions)
      setItems(JSON.parse(values.items))
    },
  });


  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <form onSubmit={formik.handleSubmit}>

            {Object.keys(defaultOptions).map((key) => (
               <div className="form-group" key={"div" + key}>
                  <label htmlFor={key}>{key}</label>
                  <input className="form-control" id={key} name={key} type="text" onChange={formik.handleChange} value={formik.values[key]} />
                 <small id={key + "Help"} className="form-text text-muted">{availableOptions[key]}</small>
            </div>
              ))}

          <button type="submit">Submit</button>

          </form>
        </div>
        <div className="col-6">
          <HorseShoeChart items={items} options={options} />
        </div>
      </div>
    </div>
    )



}

const App = () => {



  return <div className="container">

      <DynamicImage/>
      <hr/>

  </div>
}

export default App
