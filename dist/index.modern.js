import React, { useRef, useEffect } from 'react';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
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

function getRandomSixDigitString() {
  const str = "" + Math.floor(Math.random() * (999999 - 1)) + 1;
  return str.padStart(6, "0");
}

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
  const id = value + '' + getRandomSixDigitString();
  return { ...{
      id: id
    },
    ...item
  };
}
function formatSlicePreviousId(item, index, array) {
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

function coordinatesForArc({
  x,
  y
}, {
  startAngle,
  endAngle
}, radius) {
  const startPoint = polarToCartesian(x, y, radius, startAngle);
  const endPoint = polarToCartesian(x, y, radius, endAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  const d = ["M", endPoint.x, endPoint.y, "A", radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y].join(" ");
  return d;
}
function createArc(containerAttributes, point, angles, radius) {
  const innerArc = createElement("path", containerAttributes);
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

function createArcAnimation(strokeArray, duration = "2s") {
  const animateElement = createElement("animate", [["attributeType", "CSS"], ["attributeName", "stroke-dashoffset"], ["values", "0;" + strokeArray], ["dur", duration], ["fill", "freeze"]]);
  return animateElement;
}
function createOpacityAnimation(duration) {
  const animateElement = createElement("animate", [["attributeName", "opacity"], ["from", "1"], ["to", "0"], ["dur", duration], ["begin", ".5s"], ["fill", "freeze"], ["repeatCount", "1"]]);
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
  const animatedMaskArc = createArcForSlice({
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
  const animatedMaskCircle = createCircle({
    x,
    y
  }, radius, backgroundColor);
  const duration = animationDurationInSeconds + 1 + "s";
  const animateElement = createOpacityAnimation(duration);
  animatedMaskCircle.appendChild(animateElement);
  return animatedMaskCircle;
}
function createHoverFilter() {
  const filter = createElement("filter", [["id", "glowfilter"], ["filterUnits", "userSpaceOnUse"], ["x", "0"], ["y", "0"], ["width", "100%"], ["height", "100%"]]);
  const desc = createElement("desc", []);
  filter.appendChild(desc);
  const fegaussianBlur = createElement("feMorphology", [["operator", "dilate"], ["radius", "2"]]);
  filter.appendChild(fegaussianBlur);
  const defs = createDefinitionBlock();
  defs.appendChild(filter);
  return defs;
}

const thicknessWithRatio = {
  XXL: 150,
  XL: 125,
  L: 100,
  M: 50,
  S: 35
};
const sizeWithAngles = {
  XXL: [261, 460],
  XL: [241, 480],
  L: [221, 500],
  M: [201, 520],
  S: [181, 540]
};
const chartStyles = `


.description {
  pointer-events: none;
  position: absolute;
  font-size: 18px;
  text-align: center;
  background: white;
  padding: 10px 15px;
  z-index: 5;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  color: #21669e;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #eee;
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  display: none;
}
.description.active {
  display: block;
}
.description:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  width: 0;
  height: 0;
  margin-left: -10px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
}


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

function createTextDefinition(textId, innerAndOuterRadius, angles, point) {
  const textPathDefinitionElement = createElement('defs', []);
  const pathToDrawTextElement = createElement('path', [['id', textId], ['stroke-width', '0']]);
  textPathDefinitionElement.appendChild(pathToDrawTextElement);
  const drawingCoordinatesForText = drawingCoordinatesBetweenInnerAndOuterCircle(innerAndOuterRadius, angles, point);
  pathToDrawTextElement.setAttributeNS(null, 'd', drawingCoordinatesForText);
  return textPathDefinitionElement;
}

function createTextElement(textId, {
  label,
  labelSize,
  labelColor
}) {
  const textElement = createElement('text', [['font-size', labelSize + 'px'], ['fill', labelColor], ['rotate', '180']]);
  const textPathElement = createElement('textPath', [['href', '#' + textId], ['text-anchor', 'middle'], ['startOffset', '50%']]);
  textPathElement.innerHTML = reverseString(label);
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
  const container = createContainer();
  container.appendChild(textPositionPathElement);
  container.appendChild(textElement);
  return container;
}

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
  const container = createElement('a', sliceAttributes);
  container.appendChild(createTitle(label));
  const arc = createArcForSlice(point, angles, {
    innerRadius,
    outerRadius
  }, color, 0);
  container.appendChild(arc);
  const textContainer = getTextElements(id, {
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

const PADDING_RATIO = 0.8;
function getTitleContainer({
  x,
  y
}, radius, imgUrl, title, textColor) {
  const mainElement = createHtmlElement('div', [['style', 'display: table-cell; text-align: center; vertical-align: middle;color:' + textColor + ';']]);
  const paddedRadius = radius * PADDING_RATIO;
  const imgElement = createHtmlElement('img', [['src', imgUrl], ['width', paddedRadius], ['height', paddedRadius]]);
  const breakElement = createHtmlElement('br', []);
  mainElement.appendChild(imgElement);
  mainElement.appendChild(breakElement);
  mainElement.innerHTML += title;
  const container = createHtmlElement('div', [['style', 'display: table; font-size: 24px; width: 100%; height: 100%;']]);
  container.appendChild(mainElement);
  const paddedX = x - paddedRadius;
  const paddedY = y - paddedRadius;
  const width = paddedRadius * 2;
  const height = paddedRadius * 2;
  const foreignObject = createElement('foreignObject', [['x', paddedX], ['y', paddedY], ['width', width], ['height', height]]);
  foreignObject.appendChild(container);
  return foreignObject;
}

function getPoint(totalSize) {
  const x = totalSize / 2;
  const y = totalSize / 2;
  return {
    x,
    y
  };
}

function getChartStyleElement() {
  const styleElement = createElement("style", []);
  styleElement.innerHTML = chartStyles;
  return styleElement;
}

function HorseShoeChartCreator(items, options) {
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
  const thicknessOfCircle = thicknessWithRatio[thicknessSize];
  const totalSize = (radius + thicknessOfCircle) * 2;
  const {
    x,
    y
  } = getPoint(totalSize);
  const outerRadius = radius + thicknessOfCircle;
  const sizeWithAngle = sizeWithAngles[gapSize];
  const [startAngle, endAngle] = sizeWithAngle;
  const total = (endAngle - startAngle) / 100;

  const percentageToDegree = percent => percent * total;

  const container = createGroupElement();
  const centerTitleContainer = getTitleContainer({
    x,
    y
  }, radius, imgUrl, title, titleColor);
  container.appendChild(centerTitleContainer);
  let currentAngle = startAngle;
  const formattedItems = formatItems(items, labelColor);
  const filterElement = createHoverFilter();
  container.appendChild(filterElement);
  formattedItems.forEach((item, index) => {
    const {
      percentage,
      id,
      previousId
    } = item;
    const endAngle = currentAngle + percentageToDegree(percentage);
    const currentBoxElement = getSliceElement({
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
    const borderAnimation = getBorderAnimation({
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
    const centerTitleAnimation = getCenterTitleAnimation({
      x,
      y
    }, radius, backgroundColor, animationDurationInSeconds);
    container.appendChild(centerTitleAnimation);

    centerTitleAnimation.querySelector("animate").onend = () => {
      container.removeChild(centerTitleAnimation);
      container.removeChild(borderAnimation);
    };
  }

  const root = createSVGRoot(totalSize);
  const styleElement = getChartStyleElement();
  root.appendChild(styleElement);
  root.appendChild(container);
  return root;
}

const HorseShoeChart = ({
  items,
  options
}) => {
  const svg = useRef(null);
  useEffect(() => {
    const result = HorseShoeChartCreator(items, options);

    if (svg.current) {
      svg.current.appendChild(result);
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: svg
  });
};

export { HorseShoeChart };
//# sourceMappingURL=index.modern.js.map
