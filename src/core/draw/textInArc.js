import { createContainer, createElement } from "../builder/elements";
import { drawingCoordinatesBetweenInnerAndOuterCircle } from "../draw/calculations";
import { reverseString } from "../shared/formatter";


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

export function getTextElements(
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

  const container=createContainer();
  container.appendChild(textPositionPathElement)
  container.appendChild(textElement)
  return  container;

}
