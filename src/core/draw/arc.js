import { polarToCartesian } from "./calculations";
import { createElement } from "../builder/elements";

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

/** draw Circle with Path
 *
 * @param containerAttributes
 * @param point
 * @param angles
 * @param radius
 * @returns {*}
 */


export function coordinatesForCircle(
  { x, y },
  radius
) {



  const d = [
    "M", x-radius, y,
    "A", radius, radius, 0, 1, 0, (radius *2), 0,
    "A", radius, radius, 0, 1, 0, -(radius *2), 0,
  ].join(" ");

  return d;
}

export function createArc(containerAttributes, point, angles, radius) {
  const innerArc = createElement("path", containerAttributes);
  const innerArcData = coordinatesForArc(point, angles, radius);
  innerArc.setAttributeNS(null, "d", innerArcData);
  return innerArc;
}

export function createArcForSlice(
  point,
  angles,
  { outerRadius, innerRadius },
  color
  , strokeArray) {
  const borderWidth = outerRadius - innerRadius;

  const strokeData = strokeArray * -1;
  const containerAttributes = [
    ["fill", "none"],
    ["stroke", color],
    ["stroke-width", borderWidth],
    ["stroke-dashoffset", "" + strokeData],
    ["stroke-dasharray", "" + strokeArray],
    ["class", "path-container"]
  ];

  const arc = createArc(containerAttributes, point, angles, innerRadius);

  return arc;
}
