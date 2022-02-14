import { createElement, createTitle } from "../builder/elements";
import { createArcForSlice } from "../draw/arc";
import { getTextElements } from "../draw/textInArc";
import { setupToolTips } from "./Tooltip";


export function getSliceElement(
  angles,
  { label, value, color, labelColor },
  point,
  { innerRadius, outerRadius },
  { labelSize },
  { id, previousId }
) {




  const containerId = 'box' + id
  let sliceAttributes = [
    ['id', 'container' + containerId],
    ['class', 'slice-container'],
    ['style', 'text-decoration: none;']
  ];


  const container = createElement('a', sliceAttributes)

  container.appendChild(createTitle(label))
  //setupToolTips(label, container);


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
