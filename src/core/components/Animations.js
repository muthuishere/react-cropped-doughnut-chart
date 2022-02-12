import { createCircle, createElement } from "../builder/elements";
import { createArcForSlice } from "../draw/arc";

export function createArcAnimation(strokeArray) {


  const animateElement = createElement("animate", [
    ["attributeType", "CSS"],
    ["attributeName", "stroke-dashoffset"],
    ["values", "0;" + strokeArray],
    ["dur", "2s"],
    ["fill", "freeze"]
  ]);
  return animateElement;
}
export function createOpacityAnimation() {



  const animateElement = createElement("animate", [
    ["attributeName", "opacity"],
    ["from", "1"],
    ["to", "0"],
    ["dur", "2s"],
    ["begin", ".1s"],
    ["fill", "freeze"],
    ["repeatCount", "1"]

  ]);
  return animateElement;
}


export function getBorderAnimation({ x, y }, { innerRadius, outerRadius }, {
  startAngle,
  endAngle
}, backgroundColor = "white") {
  const strokeArray = 500;
  const animatedMaskArc = createArcForSlice({ x, y }, { startAngle, endAngle }, {
    innerRadius,
    outerRadius: outerRadius + 10
  }, backgroundColor, strokeArray);

  animatedMaskArc.setAttribute("stroke-dashoffset", "0");
  const animateElement = createArcAnimation(strokeArray);

  animatedMaskArc.appendChild(animateElement);
  return animatedMaskArc;
}

export function getCenterTitleAnimation({ x, y }, radius, backgroundColor = "white") {

  const animatedMaskCircle = createCircle({ x, y }, radius, backgroundColor)

  const animateElement = createOpacityAnimation();



  animatedMaskCircle.appendChild(animateElement);
  return animatedMaskCircle;
}
