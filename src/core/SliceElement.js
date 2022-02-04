import { createElement, setAttributeForSvg } from './elements'
import {
  drawingCoordinatesBetweenInnerAndOuterCircle,
  drawingCoordinatesinCircle
} from './calculations'
import { reverseString } from "./formatter";

function createArc({ x, y }, { startAngle, endAngle }, outerRadius, color) {
  const chartPath = createElement('path', [
    ['fill', color],
    ['class', 'path-container'],
    ['stroke-width', '0']
  ])

  const chartPositionData = drawingCoordinatesinCircle(
    { x, y },
    { startAngle, endAngle },
    outerRadius
  )

  // identify center between start and end angle
  // set label position,and use it

  setAttributeForSvg(chartPath, 'd', chartPositionData)
  return chartPath
}

function createTextDefinition(textId, innerAndOuterRadius, angles, point) {
  const textPathDefinitionElement = createElement('defs', [])

  const pathToDrawTextElement = createElement('path', [
    ['id', textId],
    ['stroke-width', '0']
  ])
  textPathDefinitionElement.appendChild(pathToDrawTextElement)
  const drawingCoordinatesForText =
    drawingCoordinatesBetweenInnerAndOuterCircle(
      innerAndOuterRadius,
      angles,
      point
    )
  pathToDrawTextElement.setAttributeNS(null, 'd', drawingCoordinatesForText)
  return textPathDefinitionElement
}

function createTextElement(textId,{label,labelSize,labelColor}) {
  const textElement = createElement('text', [
    ['font-size', labelSize + 'px'],
    ['fill', labelColor],
    ['rotate', '180']
  ])
  const textPathElement = createElement('textPath', [
    ['href', '#' + textId],
    ['text-anchor', 'top'],
    ['startOffset', '0%']
  ])

  //180 degree reverses stuff
  textPathElement.innerHTML =reverseString(label)
  textElement.appendChild(textPathElement)
  return textElement
}

function getTextElements(id, {label,labelSize,labelColor}, innerAndOuterRadius, angles, point) {
  const textId = 'text' + id
  const textPositionPathElement = createTextDefinition(
    textId,
    innerAndOuterRadius,
    angles,
    point
  )
  const textElement = createTextElement(textId, {label,labelSize,labelColor})

  return {
    textPositionPathElement,
    textElement
  }
}
export function getRandomSixDigitString() {
  const str = '' + Math.floor(Math.random() * (999999 - 1)) + 1
  return str.padStart(6, '0')
}

// export function sliceElement(
//   { startAngle, endAngle },
//   { label, item, color },
//   { x, y },
//   { innerRadius, outerRadius }
// )

export function getSliceElement(
  angles,
  { label, value, color },
  point,
  { innerRadius, outerRadius },
  {labelSize,labelColor}
) {
  const id = 'box' + value + getRandomSixDigitString()
  const container = createElement('a', [
    ['id', 'container' + id],
    ['href', '#'],
    ['style', 'text-decoration: none;']
  ])
  const arc = createArc(point, angles, outerRadius, color)

  container.appendChild(arc)
  const { textPositionPathElement, textElement } = getTextElements(
    id,
    {label,labelSize,labelColor},
    { innerRadius, outerRadius },
    angles,
    point
  )
  container.appendChild(textPositionPathElement)
  container.appendChild(textElement)

  return container
}
