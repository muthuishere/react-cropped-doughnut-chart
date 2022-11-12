(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CroppedDoughnutChart = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorseShoeChartCreator = HorseShoeChartCreator;

var _elements = require("./builder/elements");

var _formatter = require("./shared/formatter");

var _Animator = require("./components/Animator");

var _config = require("./shared/config");

var _Slice = require("./components/Slice");

var _TitleContainer = require("./components/TitleContainer");

function getPoint(totalSize) {
  const x = totalSize / 2;
  const y = totalSize / 2;
  return {
    x,
    y
  };
}

function getChartStyleElement() {
  const styleElement = (0, _elements.createElement)("style", []);
  styleElement.innerHTML = _config.chartStyles;
  return styleElement;
}

function HorseShoeChartCreator(items, options) {
  // insertStyles(chartStyles);
  const defaultOptions = {
    radius: 100,
    showAnimation: true,
    animationDurationInSeconds: 2,
    title: "",
    titleColor: "#FF0000",
    thicknessSize: "M",
    gapSize: "XL",
    labelSize: 12,
    labelColor: "white",
    backgroundColor: "white",
    imgUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  };
  const formattedOptions = { ...defaultOptions,
    ...options
  };
  const {
    radius,
    title,
    showGlow,
    thicknessSize,
    showAnimation,
    animationDurationInSeconds,
    gapSize,
    backgroundColor,
    imgUrl,
    titleColor,
    labelSize,
    labelColor
  } = formattedOptions;
  const thicknessOfCircle = _config.thicknessWithRatio[thicknessSize];
  const totalSize = (radius + thicknessOfCircle) * 2;
  const {
    x,
    y
  } = getPoint(totalSize);
  const outerRadius = radius + thicknessOfCircle;
  const sizeWithAngle = _config.sizeWithAngles[gapSize];
  const [startAngle, endAngle] = sizeWithAngle;
  const total = (endAngle - startAngle) / 100;

  const percentageToDegree = percent => percent * total;

  const container = (0, _elements.createGroupElement)();
  const centerTitleContainer = (0, _TitleContainer.getTitleContainer)({
    x,
    y
  }, radius, imgUrl, title, titleColor);
  container.appendChild(centerTitleContainer);
  let currentAngle = startAngle;
  const formattedItems = (0, _formatter.formatItems)(items, labelColor);
  const filterElement = (0, _Animator.createHoverFilter)();
  container.appendChild(filterElement);
  formattedItems.forEach((item, index) => {
    const {
      percentage,
      id,
      previousId
    } = item;
    const endAngle = currentAngle + percentageToDegree(percentage);
    const currentBoxElement = (0, _Slice.getSliceElement)({
      startAngle: currentAngle,
      endAngle
    }, item, {
      x,
      y
    }, {
      innerRadius: radius,
      outerRadius: outerRadius
    }, {
      labelSize,
      labelColor
    }, {
      id,
      previousId
    });
    container.appendChild(currentBoxElement);
    currentAngle = endAngle;
  });

  if (showAnimation) {
    const borderAnimation = (0, _Animator.getBorderAnimation)({
      x,
      y
    }, {
      innerRadius: radius,
      outerRadius: outerRadius
    }, {
      startAngle,
      endAngle: currentAngle
    }, backgroundColor, animationDurationInSeconds);
    container.appendChild(borderAnimation);
    const centerTitleAnimation = (0, _Animator.getCenterTitleAnimation)({
      x,
      y
    }, radius, backgroundColor, animationDurationInSeconds);
    container.appendChild(centerTitleAnimation);

    centerTitleAnimation.querySelector("animate").onend = () => {
      container.removeChild(centerTitleAnimation);
      container.removeChild(borderAnimation);
    };
  }

  const root = (0, _elements.createSVGRoot)(totalSize);
  const styleElement = getChartStyleElement();
  root.appendChild(styleElement);
  root.appendChild(container);
  return root;
}

},{"./builder/elements":2,"./components/Animator":3,"./components/Slice":4,"./components/TitleContainer":5,"./shared/config":10,"./shared/formatter":11}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVG_NAMESPACE = void 0;
exports.createCircle = createCircle;
exports.createContainer = createContainer;
exports.createDefinitionBlock = createDefinitionBlock;
exports.createElement = createElement;
exports.createGroupElement = createGroupElement;
exports.createHtmlElement = createHtmlElement;
exports.createSVGRoot = createSVGRoot;
exports.createTitle = createTitle;
exports.insertStyles = insertStyles;
exports.setAttributeForSvg = setAttributeForSvg;
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
exports.SVG_NAMESPACE = SVG_NAMESPACE;

function createElement(name, attribs) {
  const xmlns = SVG_NAMESPACE;
  const svgElem = document.createElementNS(xmlns, name);
  attribs.forEach(([name, value]) => svgElem.setAttributeNS(null, name, value));
  return svgElem;
}

function createHtmlElement(name, attribs) {
  const element = document.createElement(name);
  attribs.forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function setAttributeForSvg(element, name, value) {
  element.setAttributeNS(null, name, value);
}

function insertStyles(styles) {
  if (document.head.querySelector("#doughnut-cropped-chart-styles")) {
    return;
  }

  var styleSheet = document.createElement('style');
  styleSheet.setAttribute('type', 'text/css');
  styleSheet.setAttribute('id', 'doughnut-cropped-chart-styles');
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);
}

function createContainer() {
  const container = createElement('g', []);
  return container;
}

function createCircle({
  x,
  y
}, radius, defaultcolor) {
  return createElement('circle', [['cx', x], ['cy', y], ['r', radius], ['fill', defaultcolor]]);
}

function createDefinitionBlock() {
  return createElement("defs", []);
}

function createGroupElement() {
  return createElement("g", []);
}

function createSVGRoot(totalSize) {
  return createElement("svg", [["width", totalSize], ["height", totalSize]]);
}

function createTitle(label) {
  const titleElement = createElement("title", []);
  titleElement.innerHTML = label;
  return titleElement;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create3deffect = create3deffect;
exports.createArcAnimation = createArcAnimation;
exports.createHoverFilter = createHoverFilter;
exports.createOpacityAnimation = createOpacityAnimation;
exports.getBorderAnimation = getBorderAnimation;
exports.getCenterTitleAnimation = getCenterTitleAnimation;

var _elements = require("../builder/elements");

var _arc = require("../draw/arc");

function createArcAnimation(strokeArray, duration = "2s") {
  const animateElement = (0, _elements.createElement)("animate", [["attributeType", "CSS"], ["attributeName", "stroke-dashoffset"], ["values", "0;" + strokeArray], ["dur", duration], ["fill", "freeze"]]);
  return animateElement;
}

function createOpacityAnimation(duration) {
  const animateElement = (0, _elements.createElement)("animate", [["attributeName", "opacity"], ["from", "1"], ["to", "0"], ["dur", duration], ["begin", ".5s"], ["fill", "freeze"], ["repeatCount", "1"]]);
  return animateElement;
}

function getBorderAnimation({
  x,
  y
}, {
  innerRadius,
  outerRadius
}, {
  startAngle,
  endAngle
}, backgroundColor, animationDurationInSeconds) {
  const strokeArray = 900;
  let adjustedAngle = 20;
  const animatedMaskArc = (0, _arc.createArcForSlice)({
    x,
    y
  }, {
    startAngle: startAngle - adjustedAngle,
    endAngle: endAngle + adjustedAngle
  }, {
    innerRadius,
    outerRadius: outerRadius + 10
  }, backgroundColor, strokeArray);
  animatedMaskArc.setAttribute("stroke-dashoffset", "0");
  const animateElement = createArcAnimation(strokeArray, animationDurationInSeconds + "s");
  animatedMaskArc.appendChild(animateElement);
  return animatedMaskArc;
}

function getCenterTitleAnimation({
  x,
  y
}, radius, backgroundColor, animationDurationInSeconds) {
  const animatedMaskCircle = (0, _elements.createCircle)({
    x,
    y
  }, radius, backgroundColor);
  const duration = animationDurationInSeconds + 1 + "s";
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


function createHoverFilter() {
  const filter = (0, _elements.createElement)("filter", [["id", "glowfilter"], ["filterUnits", "userSpaceOnUse"], ["x", "0"], ["y", "0"], ["width", "100%"], ["height", "100%"]]);
  const desc = (0, _elements.createElement)("desc", [], "Produces a 3D lighting effect.");
  filter.appendChild(desc); //<feMorphology operator="dilate" radius="2"/>

  const fegaussianBlur = (0, _elements.createElement)("feMorphology", [["operator", "dilate"], ["radius", "2"]]);
  filter.appendChild(fegaussianBlur);
  const defs = (0, _elements.createDefinitionBlock)();
  defs.appendChild(filter);
  return defs;
}

function create3deffect() {
  const filter = (0, _elements.createElement)("filter", [["id", "glowfilter"], ["filterUnits", "userSpaceOnUse"], ["x", "0"], ["y", "0"], ["width", "100%"], ["height", "100%"]]);
  const desc = (0, _elements.createElement)("desc", [], "Produces a 3D lighting effect.");
  filter.appendChild(desc);
  const fegaussianBlur = (0, _elements.createElement)("feGaussianBlur", [["in", "SourceAlpha"], ["stdDeviation", "4"], ["result", "blur"]]);
  filter.appendChild(fegaussianBlur);
  const feOffset = (0, _elements.createElement)("feOffset", [["in", "blur"], ["dx", "4"], ["dy", "4"], ["result", "offsetBlur"]]);
  filter.appendChild(feOffset);
  const fepointLight = (0, _elements.createElement)("fePointLight", [["x", "-5000"], ["y", "-10000"], ["z", "20000"]]);
  const feSpecularLighting = (0, _elements.createElement)("feSpecularLighting", [["in", "blur"], ["surfaceScale", "5"], ["specularConstant", ".5"], ["specularExponent", "20"], ["lighting-color", "#bbbbbb"], ["result", "specOut"]]);
  feSpecularLighting.appendChild(fepointLight);
  filter.appendChild(feSpecularLighting);
  const feCompositeSpecOut = (0, _elements.createElement)("feComposite", [["in", "specOut"], ["in2", "SourceAlpha"], ["operator", "in"], ["result", "specOut"]]);
  filter.appendChild(feCompositeSpecOut);
  const feCompositeSourceGraphic = (0, _elements.createElement)("feComposite", [["in", "SourceGraphic"], ["in2", "specOut"], ["operator", "arithmetic"], ["k1", "0"], ["k2", "1"], ["k3", "1"], ["k4", "0"], ["result", "litPaint"]]);
  filter.appendChild(feCompositeSourceGraphic);
  const defs = (0, _elements.createDefinitionBlock)();
  defs.appendChild(filter);
  return defs;
}

},{"../builder/elements":2,"../draw/arc":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSliceElement = getSliceElement;

var _elements = require("../builder/elements");

var _arc = require("../draw/arc");

var _textInArc = require("../draw/textInArc");

var _Tooltip = require("./Tooltip");

function getSliceElement(angles, {
  label,
  value,
  color,
  labelColor
}, point, {
  innerRadius,
  outerRadius
}, {
  labelSize
}, {
  id,
  previousId
}) {
  const containerId = 'box' + id;
  let sliceAttributes = [['id', 'container' + containerId], ['class', 'slice-container'], ['style', 'text-decoration: none;']];
  const container = (0, _elements.createElement)('a', sliceAttributes);
  container.appendChild((0, _elements.createTitle)(label)); //setupToolTips(label, container);

  const arc = (0, _arc.createArcForSlice)(point, angles, {
    innerRadius,
    outerRadius
  }, color, 0);
  container.appendChild(arc);
  const textContainer = (0, _textInArc.getTextElements)(id, {
    label,
    labelSize,
    labelColor
  }, {
    innerRadius,
    outerRadius
  }, angles, point);
  container.appendChild(textContainer);
  return container;
}

},{"../builder/elements":2,"../draw/arc":7,"../draw/textInArc":9,"./Tooltip":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PADDING_RATIO = void 0;
exports.getTitleContainer = getTitleContainer;

var _elements = require("../builder/elements");

const PADDING_RATIO = 0.8;
exports.PADDING_RATIO = PADDING_RATIO;

function getTitleContainer({
  x,
  y
}, radius, imgUrl, title, textColor) {
  // let {x,y} = polarToCartesian(centerX, centerY, radius, 90);
  const mainElement = (0, _elements.createHtmlElement)('div', [['style', 'display: table-cell; text-align: center; vertical-align: middle;color:' + textColor + ';']]);
  const paddedRadius = radius * PADDING_RATIO;
  const imgElement = (0, _elements.createHtmlElement)('img', [['src', imgUrl], ['width', paddedRadius], ['height', paddedRadius]]);
  const breakElement = (0, _elements.createHtmlElement)('br', []);
  mainElement.appendChild(imgElement);
  mainElement.appendChild(breakElement);
  mainElement.innerHTML += title;
  const container = (0, _elements.createHtmlElement)('div', [['style', 'display: table; font-size: 24px; width: 100%; height: 100%;']]);
  container.appendChild(mainElement);
  const paddedX = x - paddedRadius;
  const paddedY = y - paddedRadius; // y = centerY + radius;

  const width = paddedRadius * 2;
  const height = paddedRadius * 2; //  <foreignObject x="20" y="20" width="160" height="160">

  const foreignObject = (0, _elements.createElement)('foreignObject', [['x', paddedX], ['y', paddedY], ['width', width], ['height', height]]);
  foreignObject.appendChild(container);
  return foreignObject;
}

},{"../builder/elements":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onToolTipMouseOut = onToolTipMouseOut;
exports.onTooltipMouseOver = onTooltipMouseOver;
exports.setupToolTips = setupToolTips;

var _elements = require("../builder/elements");

const TOOL_TIP_CLASS = "horse-chart-tooltip";

const getToolTipElement = () => document.querySelector("." + TOOL_TIP_CLASS);

function createToolTipElement() {
  const tooltipElement = (0, _elements.createHtmlElement)("div", [["class", TOOL_TIP_CLASS], ["style", "position: absolute; display: block;background: cornsilk;  border: 1px solid black;  border-radius: 5px;  padding: 5px;  z-index: 1002;"]]);
  document.body.appendChild(tooltipElement);
  return tooltipElement;
}

function onTooltipMouseOver(evt, label) {
  let tooltipElement = getToolTipElement();

  if (tooltipElement == null) {
    tooltipElement = createToolTipElement();
  }

  if (label === tooltipElement.innerHTML) {
    return;
  }

  console.log("changing tooltip", label);
  tooltipElement.style.left = evt.clientX + "px";
  tooltipElement.style.top = evt.clientY - 20 + "px";
  tooltipElement.innerHTML = label;
}

function onToolTipMouseOut(evt) {
  const element = getToolTipElement();

  if (element) {
    document.body.removeChild(element);
  }
}

function setupToolTips(label, container) {
  const onTooltipMouseOverFunc = evt => onTooltipMouseOver(evt, label);

  container.addEventListener("mouseover", onTooltipMouseOverFunc);
  container.addEventListener("mouseout", onToolTipMouseOut);
}

},{"../builder/elements":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordinatesForArc = coordinatesForArc;
exports.createArc = createArc;
exports.createArcForSlice = createArcForSlice;

var _calculations = require("./calculations");

var _elements = require("../builder/elements");

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
function coordinatesForArc({
  x,
  y
}, {
  startAngle,
  endAngle
}, radius) {
  const startPoint = (0, _calculations.polarToCartesian)(x, y, radius, startAngle);
  const endPoint = (0, _calculations.polarToCartesian)(x, y, radius, endAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  const d = ["M", endPoint.x, endPoint.y, "A", radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y].join(" ");
  return d;
}

function createArc(containerAttributes, point, angles, radius) {
  const innerArc = (0, _elements.createElement)("path", containerAttributes);
  const innerArcData = coordinatesForArc(point, angles, radius);
  innerArc.setAttributeNS(null, "d", innerArcData);
  return innerArc;
}

function createArcForSlice(point, angles, {
  outerRadius,
  innerRadius
}, color, strokeArray) {
  const borderWidth = outerRadius - innerRadius;
  const strokeData = strokeArray * -1;
  const containerAttributes = [["fill", "none"], ["stroke", color], ["stroke-width", borderWidth], ["stroke-dashoffset", "" + strokeData], ["stroke-dasharray", "" + strokeArray], ["class", "path-container"]];
  return createArc(containerAttributes, point, angles, innerRadius);
}

},{"../builder/elements":2,"./calculations":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawingCoordinatesBetweenInnerAndOuterCircle = drawingCoordinatesBetweenInnerAndOuterCircle;
exports.drawingCoordinatesForTextPosition = drawingCoordinatesForTextPosition;
exports.polarToCartesian = polarToCartesian;

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
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function drawingCoordinatesBetweenInnerAndOuterCircle({
  innerRadius,
  outerRadius
}, {
  startAngle,
  endAngle
}, {
  x,
  y
}) {
  const middleRadius = innerRadius + (outerRadius - innerRadius) / 2 - 20;
  const drawingCoordinatesForText = drawingCoordinatesForTextPosition({
    x,
    y
  }, {
    startAngle,
    endAngle: endAngle
  }, middleRadius);
  return drawingCoordinatesForText;
}

function drawingCoordinatesForTextPosition({
  x,
  y
}, {
  startAngle,
  endAngle
}, radius) {
  const startPoint = polarToCartesian(x, y, radius, startAngle);
  const endPoint = polarToCartesian(x, y, radius, endAngle);
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  const d = ['M', endPoint.x, endPoint.y, 'A', radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y].join(' ');
  return d;
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextElements = getTextElements;

var _elements = require("../builder/elements");

var _calculations = require("../draw/calculations");

var _formatter = require("../shared/formatter");

function createTextDefinition(textId, innerAndOuterRadius, angles, point) {
  const textPathDefinitionElement = (0, _elements.createElement)('defs', []);
  const pathToDrawTextElement = (0, _elements.createElement)('path', [['id', textId], ['stroke-width', '0']]);
  textPathDefinitionElement.appendChild(pathToDrawTextElement);
  const drawingCoordinatesForText = (0, _calculations.drawingCoordinatesBetweenInnerAndOuterCircle)(innerAndOuterRadius, angles, point);
  pathToDrawTextElement.setAttributeNS(null, 'd', drawingCoordinatesForText);
  return textPathDefinitionElement;
}

function createTextElement(textId, {
  label,
  labelSize,
  labelColor
}) {
  const textElement = (0, _elements.createElement)('text', [['font-size', labelSize + 'px'], ['fill', labelColor], ['rotate', '180']]);
  const textPathElement = (0, _elements.createElement)('textPath', [['href', '#' + textId], ['text-anchor', 'middle'], ['startOffset', '50%']]); // 180 degree reverses stuff

  textPathElement.innerHTML = (0, _formatter.reverseString)(label);
  textElement.appendChild(textPathElement);
  return textElement;
}

function getTextElements(id, {
  label,
  labelSize,
  labelColor
}, innerAndOuterRadius, angles, point) {
  const textId = 'text' + id;
  const textPositionPathElement = createTextDefinition(textId, innerAndOuterRadius, angles, point);
  const textElement = createTextElement(textId, {
    label,
    labelSize,
    labelColor
  });
  const container = (0, _elements.createContainer)();
  container.appendChild(textPositionPathElement);
  container.appendChild(textElement);
  return container;
}

},{"../builder/elements":2,"../draw/calculations":8,"../shared/formatter":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thicknessWithRatio = exports.sizeWithAngles = exports.colors = exports.chartStyles = void 0;
const thicknessWithRatio = {
  XXL: 150,
  XL: 125,
  L: 100,
  M: 50,
  S: 35
};
exports.thicknessWithRatio = thicknessWithRatio;
const sizeWithAngles = {
  XXL: [261, 460],
  XL: [241, 480],
  L: [221, 500],
  M: [201, 520],
  S: [181, 540]
};
exports.sizeWithAngles = sizeWithAngles;
const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF"];
exports.colors = colors;
const chartStyles = `

.horse-chart-tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: cornsilk transparent transparent transparent;
}
.tooltip-animation-on
{
    display: block;

    -webkit-animation: fadeInFromNone 0.5s ease-out;
    -moz-animation: fadeInFromNone 0.5s ease-out;
    -o-animation: fadeInFromNone 0.5s ease-out;
    animation: fadeInFromNone 0.5s ease-out;
}
@keyframes fadeInFromNone {
    0% {
        display: none;
        opacity: 0;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: block;
        opacity: 1;
    }
}
.tooltip-animation-off
{
    display: block;

    -webkit-animation: fadeOutFromNone 0.5s ease-out;
    -moz-animation: fadeOutFromNone 0.5s ease-out;
    -o-animation: fadeOutFromNone 0.5s ease-out;
    animation: fadeOutFromNone 0.5s ease-out;
}
@keyframes fadeOutFromNone {
    0% {
        display: block;
        opacity: 1;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: none;
        opacity: 1;
    }
}

  a:hover .path-container {
    cursor: pointer;
    transition: all 0.5s ease;
   filter:url(#glowfilter) brightness(1.0);
  }

  a:hover text {
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: bold;
  }
  a text {
    transition: all 0.5s ease;
    filter: ;
    cursor: pointer;
  }
    a .path-container {

      transition: all 0.5s ease;
      filter: brightness(0.7);
    }

  foreignObject {
    cursor: pointer;
  }

`;
exports.chartStyles = chartStyles;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatItems = formatItems;
exports.formatLabelColor = formatLabelColor;
exports.formatSliceId = formatSliceId;
exports.formatSlicePreviousId = formatSlicePreviousId;
exports.formatToArrayOfObjects = formatToArrayOfObjects;
exports.reverseString = reverseString;

var _randomizer = require("./randomizer");

const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF"];

function formatLabel(item) {
  const {
    label
  } = item;
  if (label) return item;else return { ...item,
    label: `${item.value}`
  };
}

function formatColor(item, index) {
  const {
    color
  } = item;
  if (color) return item;else return { ...item,
    color: colors[index]
  };
}

function formatToArrayOfObjects(inputItems) {
  const isNumber = currentValue => typeof currentValue === "number";

  const isAllNumbers = inputItems.every(isNumber);
  let items = inputItems;

  if (isAllNumbers) {
    items = inputItems.map(item => ({
      value: item
    }));
  }

  return items;
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function formatItems(inputItems, defaultLabelColor) {
  const items = formatToArrayOfObjects(inputItems);

  const hasValueProperty = currentValue => null != currentValue.value;

  const isAllValid = items.every(hasValueProperty);

  if (!isAllValid) {
    throw new Error("Invalid Data Found, All items must have a value property");
  }

  const formatLabelColorWithDefault = item => formatLabelColor(item, defaultLabelColor);

  const total = items.reduce((acc, item) => acc + item.value, 0);
  return items.map(item => ({ ...item,
    percentage: item.value / total * 100
  })).map(formatLabel).map(formatColor).map(formatLabelColorWithDefault).map(formatSliceId).map(formatSlicePreviousId);
}

function formatLabelColor(item, defaultLabelColor) {
  return { ...{
      labelColor: defaultLabelColor
    },
    ...item
  };
}

function formatSliceId(item) {
  const {
    value
  } = item;
  const id = value + '' + (0, _randomizer.getRandomSixDigitString)();
  return { ...{
      id: id
    },
    ...item
  };
}

function formatSlicePreviousId(item, index, array) {
  // console.log(index)
  // console.log(array)
  const previousItem = array[index - 1];
  const {
    id: previousId
  } = previousItem || {
    id: null
  };
  return { ...{
      previousId: previousId
    },
    ...item
  };
}

},{"./randomizer":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomSixDigitString = getRandomSixDigitString;

function getRandomSixDigitString() {
  const str = "" + Math.floor(Math.random() * (999999 - 1)) + 1;
  return str.padStart(6, "0");
}

},{}]},{},[1])(1)
});
