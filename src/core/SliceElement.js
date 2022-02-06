import { createElement } from './elements'
import {
  drawingCoordinatesBetweenInnerAndOuterCircle

} from './calculations'
import { reverseString } from './formatter'
import { createArc } from './elementCreator'
function createArcForSlice(point, angles, radius, color) {
  const containerAttributes = [
    ['fill', color],
    ['stroke', 'none'],
    ['class', 'path-container'],
    ['stroke-width', '0']
  ]
  const arc = createArc(containerAttributes, point, angles, radius);
  const animateElement = createElement('animate', [
    ['attributeName', 'fill'],
    ['attributeType', 'XML'],
    ['from', 'black'],
    ['to', color],
    ['dur', '2s'],
    ['repeatCount', '1']


  ]);
  // <animateColor attributeName="fill" attributeType="XML"
  //               from="black" to="red" dur="6s" repeatCount="indefinite"/>
  arc.appendChild(animateElement);
  return arc
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

function createTextElement(textId, { label, labelSize, labelColor }) {
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

  // 180 degree reverses stuff
  textPathElement.innerHTML = reverseString(label)
  textElement.appendChild(textPathElement)
  return textElement
}

function getTextElements(
  id,
  { label, labelSize, labelColor },
  innerAndOuterRadius,
  angles,
  point
) {
  const textId = 'text' + id
  const textPositionPathElement = createTextDefinition(
    textId,
    innerAndOuterRadius,
    angles,
    point
  )
  const textElement = createTextElement(textId, {
    label,
    labelSize,
    labelColor
  })

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
  { label, value, color,labelColor },
  point,
  { innerRadius, outerRadius },
  { labelSize }
) {
  const id = 'box' + value + getRandomSixDigitString()
  const container = createElement('a', [
    ['id', 'container' + id],
    ['href', '#'],
    ['style', 'text-decoration: none;']
  ])

    //<title>I'm a circle</title>
  const titleElement = createElement('title', [])
  titleElement.innerHTML = label;

  container.appendChild(titleElement)
  const arc = createArcForSlice(point, angles, outerRadius, color)

  container.appendChild(arc)
  const { textPositionPathElement, textElement } = getTextElements(
    id,
    { label, labelSize, labelColor },
    { innerRadius, outerRadius },
    angles,
    point
  )
  container.appendChild(textPositionPathElement)
  container.appendChild(textElement);


  return container
}
