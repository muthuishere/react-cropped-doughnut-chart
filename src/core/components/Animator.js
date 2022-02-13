import { createCircle, createElement } from "../builder/elements";
import { createArcForSlice } from "../draw/arc";

export function createArcAnimation(strokeArray, duration = "2s") {



  const animateElement = createElement("animate", [
    ["attributeType", "CSS"],
    ["attributeName", "stroke-dashoffset"],
    ["values", "0;" + strokeArray],
    ["dur", duration],
    ["fill", "freeze"]
  ]);
  return animateElement;
}
export function createOpacityAnimation(duration) {



  const animateElement = createElement("animate", [
    ["attributeName", "opacity"],
    ["from", "1"],
    ["to", "0"],
    ["dur", duration],
    ["begin", ".1s"],
    ["fill", "freeze"],
    ["repeatCount", "1"]

  ]);
  return animateElement;
}


export function getBorderAnimation({ x, y }, { innerRadius, outerRadius }, {
  startAngle,
  endAngle
}, backgroundColor ,
animationDurationInSeconds ) {
  const strokeArray = 500;
  const animatedMaskArc = createArcForSlice({ x, y }, { startAngle, endAngle }, {
    innerRadius,
    outerRadius: outerRadius + 10
  }, backgroundColor, strokeArray);

  animatedMaskArc.setAttribute("stroke-dashoffset", "0");
  const animateElement = createArcAnimation(strokeArray, animationDurationInSeconds + "s");

  animatedMaskArc.appendChild(animateElement);
  return animatedMaskArc;
}

export function getCenterTitleAnimation({ x, y }, radius, backgroundColor ,animationDurationInSeconds) {

  const animatedMaskCircle = createCircle({ x, y }, radius, backgroundColor)
  const duration = (animationDurationInSeconds + 0.5)+ "s";
  const animateElement = createOpacityAnimation(duration);




  animatedMaskCircle.appendChild(animateElement);

  return animatedMaskCircle;
}
