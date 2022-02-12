import { createElement } from "./elements";
import { drawingCoordinatesBetweenInnerAndOuterCircle } from "./calculations";
import { reverseString } from "./formatter";
import { createArc } from "./arc";

function createArcForSlice(point, angles, { outerRadius, innerRadius }, color) {
  const borderWidth=  outerRadius - innerRadius
  const containerAttributes = [
    ['fill', 'none'],
    ['stroke', color],
    ['stroke-width', borderWidth],
    ['stroke-dashoffset', "-500"],
    ['stroke-dasharray', "500"],
    ['class', 'path-container']

  ]


  // fill="none" stroke="#bc85ff" stroke-miterlimit="50" stroke-width="50" stroke-dashoffset="0" class="path-container"



  const arc = createArc(containerAttributes, point, angles, innerRadius);

  return arc
}

function createAnimation(id,animationStart){

//begin="5s;anim4.end"
  const animateElement = createElement('animate', [
    ['id', id],
    ['attributeName', 'stroke-dashoffset'],
    ['begin', animationStart],
    ['values', '-500;0'],
    ['dur', '5s'],
    ['calcMode', 'linear'],
    ['repeatCount', '1'],
    ['fill', 'freeze']


  ]);
  return animateElement
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
    ['text-anchor', 'middle'],
    ['startOffset', '50%']
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


// export function sliceElement(
//   { startAngle, endAngle },
//   { label, item, color },
//   { x, y },
//   { innerRadius, outerRadius }
// )

export function getSliceElement(
  angles,
  { label, value, color, labelColor },
  point,
  { innerRadius, outerRadius },
  { labelSize }
  , { id, previousId } ) {

  const containerId = 'box' + id
  const container = createElement('a', [
    ['id', 'container' + containerId],
    ['href', '#'],
    ['style', 'text-decoration: none;']
  ])

    //<title>I'm a circle</title>
  const titleElement = createElement('title', [])
  titleElement.innerHTML = label;

  container.appendChild(titleElement)
  //let animationStart = "5s;anim4.end";
  const arc = createArcForSlice(point, angles,  { innerRadius, outerRadius }, color)
  const animateElement = createAnimation('anim' + containerId, "5s;anim4.end")
  arc.appendChild(animateElement);

  container.appendChild(arc)
  const { textPositionPathElement, textElement } = getTextElements(
    containerId,
    { label, labelSize, labelColor },
    { innerRadius, outerRadius },
    angles,
    point
  )
  container.appendChild(textPositionPathElement)
  container.appendChild(textElement);


  return container
}
