import { createElement } from "../builder/elements";
import { createArcForSlice } from "../draw/arc";
import { getTextElements } from "../draw/textInArc";


export function getSliceElement(
  angles,
  { label, value, color, labelColor },
  point,
  { innerRadius, outerRadius },
  { labelSize },
  { id, previousId }
) {
  const containerId = 'box' + id
  const container = createElement('a', [
    ['id', 'container' + containerId],
    ['href', '#'],
    ['style', 'text-decoration: none;']
  ])

  // <title>I'm a circle</title>
  const titleElement = createElement('title', [])
  titleElement.innerHTML = label
  container.appendChild(titleElement)



  const arc = createArcForSlice(point, angles, { innerRadius, outerRadius }, color, 0)


  container.appendChild(arc);


  const textContainer = getTextElements(
    id,
    { label, labelSize, labelColor },
    { innerRadius, outerRadius },
    angles,
    point
  )
  container.appendChild(textContainer);

  return container
}
