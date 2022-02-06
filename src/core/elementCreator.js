import { drawingCoordinatesinCircle } from "./calculations";
import { createElement } from "./elements";

export function createArc(containerAttributes, point, angles, radius) {
  const innerArc = createElement("path", containerAttributes);
  const innerArcData = drawingCoordinatesinCircle(point, angles, radius);
  innerArc.setAttributeNS(null, "d", innerArcData);
  return innerArc;
}
