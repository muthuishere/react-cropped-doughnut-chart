import { createCircle, createDefinitionBlock, createElement } from "../builder/elements";
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
    ["begin", ".5s"],
    ["fill", "freeze"],
    ["repeatCount", "1"]

  ]);
  return animateElement;
}


export function getBorderAnimation({ x, y }, { innerRadius, outerRadius }, {
                                     startAngle,
                                     endAngle
                                   }, backgroundColor,
                                   animationDurationInSeconds) {
  const strokeArray = 900;
  let adjustedAngle = 20;
  const animatedMaskArc = createArcForSlice({ x, y }, { startAngle:startAngle- adjustedAngle, endAngle:endAngle+adjustedAngle }, {
    innerRadius,
    outerRadius: outerRadius + 10
  }, backgroundColor, strokeArray);

  animatedMaskArc.setAttribute("stroke-dashoffset", "0");
  const animateElement = createArcAnimation(strokeArray, animationDurationInSeconds + "s");

  animatedMaskArc.appendChild(animateElement);
  return animatedMaskArc;
}

export function getCenterTitleAnimation({ x, y }, radius, backgroundColor, animationDurationInSeconds) {

  const animatedMaskCircle = createCircle({ x, y }, radius, backgroundColor);
  const duration = (animationDurationInSeconds + 1) + "s";
  const animateElement = createOpacityAnimation(duration);


  animatedMaskCircle.appendChild(animateElement);

  return animatedMaskCircle;
}

/**
 * Based on W3 Spec
 *  <defs>
 *     <filter id="MyFilter" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
 *      <desc>Produces a 3D lighting effect.</desc>
 *   <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
 *   <feOffset in="blur" dx="4" dy="4" result="offsetBlur"/>
 *   <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".5"
 *                       specularExponent="20" lighting-color="#bbbbbb"
 *                       result="specOut">
 *     <fePointLight x="-5000" y="-10000" z="20000"/>
 *   </feSpecularLighting>
 *   <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
 *   <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
 *                k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
 *
 *
 *     </filter>
 *   </defs>
 *
 */


export function createHoverFilter() {

  const filter = createElement("filter", [
    ["id", "glowfilter"],
    ["filterUnits", "userSpaceOnUse"],
    ["x", "0"],
    ["y", "0"],
    ["width", "100%"],
    ["height", "100%"]]);

  const desc = createElement("desc", [], "Produces a 3D lighting effect.");
  filter.appendChild(desc);

  //<feMorphology operator="dilate" radius="2"/>
  const fegaussianBlur = createElement("feMorphology", [
    ["operator", "dilate"], ["radius", "2"]
  ]);
  filter.appendChild(fegaussianBlur);

  const defs = createDefinitionBlock();
  defs.appendChild(filter);
  return defs;
}


export function create3deffect() {

  const filter = createElement("filter", [
    ["id", "glowfilter"],
    ["filterUnits", "userSpaceOnUse"],
    ["x", "0"],
    ["y", "0"],
    ["width", "100%"],
    ["height", "100%"]]);

  const desc = createElement("desc", [], "Produces a 3D lighting effect.");
  filter.appendChild(desc);
  const fegaussianBlur = createElement("feGaussianBlur", [
    ["in", "SourceAlpha"],
    ["stdDeviation", "4"],
    ["result", "blur"]
  ]);
  filter.appendChild(fegaussianBlur);
  const feOffset = createElement("feOffset", [
    ["in", "blur"],
    ["dx", "4"],
    ["dy", "4"],
    ["result", "offsetBlur"]
  ]);
  filter.appendChild(feOffset);
  const fepointLight = createElement("fePointLight", [
    ["x", "-5000"],
    ["y", "-10000"],
    ["z", "20000"]
  ]);
  const feSpecularLighting = createElement("feSpecularLighting", [
    ["in", "blur"],
    ["surfaceScale", "5"],
    ["specularConstant", ".5"],
    ["specularExponent", "20"],
    ["lighting-color", "#bbbbbb"],
    ["result", "specOut"]
  ]);
  feSpecularLighting.appendChild(fepointLight);
  filter.appendChild(feSpecularLighting);
  const feCompositeSpecOut = createElement("feComposite", [
    ["in", "specOut"],
    ["in2", "SourceAlpha"],
    ["operator", "in"],
    ["result", "specOut"]
  ]);
  filter.appendChild(feCompositeSpecOut);
  const feCompositeSourceGraphic = createElement("feComposite", [
    ["in", "SourceGraphic"],
    ["in2", "specOut"],
    ["operator", "arithmetic"],
    ["k1", "0"],
    ["k2", "1"],
    ["k3", "1"],
    ["k4", "0"],
    ["result", "litPaint"]
  ]);
  filter.appendChild(feCompositeSourceGraphic);
  const defs = createDefinitionBlock();
  defs.appendChild(filter);
  return defs;
}
