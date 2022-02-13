import { HorseShoeChartCreator } from "./HorseShoeChartCreator";


test("Doughnut element test",()=>{
    const element = document.createElement("div");


  const items =[
    { value:24,color:"red"},
    { value:227,color:"blue"},
    { value:49,color:"pink"},
  ]

  //const items =[98,78,56]


  let imgUrl = "https://www.w3schools.com/html/pic_trulli.jpg";
  // <svg id="root">
  // </svg>
  const result= HorseShoeChartCreator(items,{
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

  element.innerHTML=result;
 expect(element.querySelector("svg")).not.toBeNull();
  console.log(element.innerHTML);

})
