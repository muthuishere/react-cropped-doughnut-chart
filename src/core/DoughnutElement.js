import { createElement } from './elements'
import {  drawingCoordinatesinCircle } from "./calculations";
import { getHtmlContainerElement } from './HtmlContainerElement'
import { getSliceElement } from './SliceElement'
import { formatItems } from "./formatter";

function createArcFrom(point, angles, radius) {
  const innerArc = createElement('path', [])
  const innerArcData = drawingCoordinatesinCircle(point, angles, radius)
  innerArc.setAttributeNS(null, 'd', innerArcData)
  return innerArc
}

const thicknessWithRatio = {
  XXL: 125,
  XL: 100,
  L: 75,
  M: 50,
  S: 35
}

const sizeWithAngles = {
  XXL: [261, 460],
  XL: [241, 480],
  L: [221, 500],
  M: [201, 520],
  S: [181, 540]
}
const colors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#8B00FF'
]

function getCircle({ x, y }, radius, defaultcolor) {
  return createElement('circle', [
    ['cx', x],
    ['cy', y],
    ['r', radius],
    ['fill', defaultcolor]
  ])
}


export function DoughnutElement(
  items,
  { radius, title, thicknessSize, gapSize, backgroundColor, imgUrl,  titleColor,labelSize,labelColor }
) {
  const thicknessOfCircle = thicknessWithRatio[thicknessSize]
  const totalSize = (radius + thicknessOfCircle) * 2
  const x = totalSize / 2
  const y = totalSize / 2
  const outerRadius = radius + thicknessOfCircle
  const sizeWithAngle = sizeWithAngles[gapSize]
  const [startAngle, endAngle] = sizeWithAngle
  const total = (endAngle - startAngle) / 100
  const percentageToDegree = (percent) => percent * total

  const container = createElement('g', [])

  const innerArc = createArcFrom({ x, y }, { startAngle, endAngle }, radius)
  const outerArc = createArcFrom(
    { x, y },
    { startAngle, endAngle },
    outerRadius
  )

  container.appendChild(outerArc)
  container.appendChild(innerArc)

  let initAngle = startAngle


  const formattedItems = formatItems(items)

  formattedItems.forEach((item, index) => {
    let {label, value,color,percentage} = item
    // if(undefined == value){
    //   label = "" + item
    //   value = item;
    //   color =colors[index]
    // }else {
    //
    //   let formattedItem = item || { label: '' +item.value, color: colors[index] }
    //   label = formattedItem.label
    //   color = formattedItem.color
    //   value = formattedItem.value
    // }

    console.log(label)
    console.log(color)
    console.log(value)
    const endAngle = initAngle + percentageToDegree(percentage)

    const currentBoxElement = getSliceElement(
      { startAngle: initAngle, endAngle },
      {label, value,color},
      { x, y },
      { innerRadius: radius, outerRadius: outerRadius },{labelSize,labelColor}
    )

    container.appendChild(currentBoxElement)
    initAngle = endAngle
  })

  const htmlContainerElement = getHtmlContainerElement(
    { x, y },
    radius,
    imgUrl,
    title,
    titleColor
  )
  const backgroundCircle = getCircle({ x, y }, radius, backgroundColor)

  container.appendChild(backgroundCircle)
  container.appendChild(htmlContainerElement)

  const root = createElement('svg', [
    ['width', totalSize],
    ['height', totalSize]
  ])
  root.appendChild(container)
  return root.outerHTML
}
