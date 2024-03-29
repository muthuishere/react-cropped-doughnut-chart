/**
 * Convert a polar coordinate (r,theta) to cartesian (x,y). The calculations are x=r*cos(theta) and y=r*sin(theta).
 * This Method is used in the DoughnutChart. to calculate the x,y position from center of a sliceElement.
 * Usually in Math the origin is Zero, Since the center of the doughnut is the origin, the centerX and centerY are added to the result.
 * @param centerX - Center of Circle X
 * @param centerY - Center of Circle Y
 * @param radius  - Radius of Circle
 * @param angleInDegrees - Angle in Degrees
 * @returns {{x: *, y: *}}
 */
export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {

  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}


export function drawingCoordinatesBetweenInnerAndOuterCircle(
  { innerRadius, outerRadius },
  { startAngle, endAngle },
  { x, y }
) {
  const middleRadius = innerRadius + (outerRadius - innerRadius) / 2 -20

  const drawingCoordinatesForText = drawingCoordinatesForTextPosition(
    { x, y },
    {
      startAngle,
      endAngle: endAngle
    },
    middleRadius
  )
  return drawingCoordinatesForText
}


export function drawingCoordinatesForTextPosition(
  { x, y },
  { startAngle, endAngle },
  radius
) {
  const startPoint = polarToCartesian(x, y, radius, startAngle)
  const endPoint = polarToCartesian(x, y, radius, endAngle)

  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

  const d = [
    'M',    endPoint.x,    endPoint.y,
    'A',    radius,    radius,    0,    arcSweep,    0,    startPoint.x,    startPoint.y

  ].join(' ')

  return d
}
