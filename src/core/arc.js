import { polarToCartesian } from './calculations'
import { createElement } from './elements'

/**
 * Get Drawing Coordinates for an Arc , The arc is a fully closed area in a circle
 *  The arc is drawn from the startAngle to the endAngle
 * The arc is drawn in the clockwise direction
 * @param x - Center of Circle X
 * @param y - Center of Circle Y
 * @param startAngle - Start Angle in Degrees
 * @param endAngle - End Angle in Degrees
 * @param radius - Radius of Circle
 */
export function coordinatesForArc(
  { x, y },
  { startAngle, endAngle },
  radius
) {
  const startPoint = polarToCartesian(x, y, radius, startAngle);
  const endPoint = polarToCartesian(x, y, radius, endAngle);

  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M", endPoint.x, endPoint.y,
    "A", radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y
  ].join(" ");

  return d;
}


export function createArc(containerAttributes, point, angles, radius) {
  const innerArc = createElement("path", containerAttributes);
  const innerArcData = coordinatesForArc(point, angles, radius);
  innerArc.setAttributeNS(null, "d", innerArcData);
  return innerArc;
}
