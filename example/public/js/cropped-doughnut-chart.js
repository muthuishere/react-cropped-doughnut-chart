(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CroppedDoughnutChart = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoughnutElement = DoughnutElement;

var _elements = require("./elements");

var _HtmlContainerElement = require("./HtmlContainerElement");

var _SliceElement = require("./SliceElement");

var _formatter = require("./formatter");

var _elementCreator = require("./elementCreator");

function createArcForOverAllContainer(className, point, angles, radius) {
  const containerAttributes = [['fill', 'none'], ['stroke', 'none'], ['class', className], ['stroke-width', '0']];
  return (0, _elementCreator.createArc)(containerAttributes, point, angles, radius);
}

const thicknessWithRatio = {
  XXL: 125,
  XL: 100,
  L: 75,
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
const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'];

function getCircle({
  x,
  y
}, radius, defaultcolor) {
  return (0, _elements.createElement)('circle', [['cx', x], ['cy', y], ['r', radius], ['fill', defaultcolor]]);
}

function DoughnutElement(items, options) {
  (0, _elements.insertStyles)();
  const defaultOptions = {
    radius: 100,
    title: '',
    titleColor: '#FF0000',
    thicknessSize: 'M',
    gapSize: 'XL',
    labelSize: 12,
    labelColor: 'white',
    backgroundColor: 'white',
    imgUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  };
  const formattedOptions = { ...defaultOptions,
    ...options
  };
  const {
    radius,
    title,
    thicknessSize,
    gapSize,
    backgroundColor,
    imgUrl,
    titleColor,
    labelSize,
    labelColor
  } = formattedOptions;
  const thicknessOfCircle = thicknessWithRatio[thicknessSize];
  const totalSize = (radius + thicknessOfCircle) * 2;
  const x = totalSize / 2;
  const y = totalSize / 2;
  const outerRadius = radius + thicknessOfCircle;
  const sizeWithAngle = sizeWithAngles[gapSize];
  const [startAngle, endAngle] = sizeWithAngle;
  const total = (endAngle - startAngle) / 100;

  const percentageToDegree = percent => percent * total;

  const container = (0, _elements.createElement)('g', []);
  const innerArc = createArcForOverAllContainer('overall-inner-container', {
    x,
    y
  }, {
    startAngle,
    endAngle
  }, radius);
  const outerArc = createArcForOverAllContainer('overall-outer-container', {
    x,
    y
  }, {
    startAngle,
    endAngle
  }, outerRadius);
  container.appendChild(outerArc);
  container.appendChild(innerArc);
  let initAngle = startAngle;
  const formattedItems = (0, _formatter.formatItems)(items, labelColor);
  formattedItems.forEach((item, index) => {
    const {
      label,
      value,
      color,
      percentage
    } = item;
    const endAngle = initAngle + percentageToDegree(percentage);
    const currentBoxElement = (0, _SliceElement.getSliceElement)({
      startAngle: initAngle,
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
    });
    container.appendChild(currentBoxElement);
    initAngle = endAngle;
  });
  const htmlContainerElement = (0, _HtmlContainerElement.getHtmlContainerElement)({
    x,
    y
  }, radius, imgUrl, title, titleColor);
  const backgroundCircle = getCircle({
    x,
    y
  }, radius, backgroundColor);
  container.appendChild(backgroundCircle);
  container.appendChild(htmlContainerElement);
  const root = (0, _elements.createElement)('svg', [['width', totalSize], ['height', totalSize]]);
  root.appendChild(container); // return root.outerHTML

  return root;
}

},{"./HtmlContainerElement":2,"./SliceElement":3,"./elementCreator":5,"./elements":6,"./formatter":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PADDING_RATIO = void 0;
exports.getHtmlContainerElement = getHtmlContainerElement;

var _elements = require("./elements");

const PADDING_RATIO = 0.8;
exports.PADDING_RATIO = PADDING_RATIO;

function getHtmlContainerElement({
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

},{"./elements":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomSixDigitString = getRandomSixDigitString;
exports.getSliceElement = getSliceElement;

var _elements = require("./elements");

var _calculations = require("./calculations");

var _formatter = require("./formatter");

var _elementCreator = require("./elementCreator");

function createArcForSlice(point, angles, radius, color) {
  const containerAttributes = [['fill', color], ['stroke', 'none'], ['class', 'path-container'], ['stroke-width', '0']];
  const arc = (0, _elementCreator.createArc)(containerAttributes, point, angles, radius);
  const animateElement = (0, _elements.createElement)('animate', [['attributeName', 'fill'], ['attributeType', 'XML'], ['from', 'black'], ['to', color], ['dur', '2s'], ['repeatCount', '1']]); // <animateColor attributeName="fill" attributeType="XML"
  //               from="black" to="red" dur="6s" repeatCount="indefinite"/>

  arc.appendChild(animateElement);
  return arc;
}

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
  return {
    textPositionPathElement,
    textElement
  };
}

function getRandomSixDigitString() {
  const str = '' + Math.floor(Math.random() * (999999 - 1)) + 1;
  return str.padStart(6, '0');
} // export function sliceElement(
//   { startAngle, endAngle },
//   { label, item, color },
//   { x, y },
//   { innerRadius, outerRadius }
// )


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
}) {
  const id = 'box' + value + getRandomSixDigitString();
  const container = (0, _elements.createElement)('a', [['id', 'container' + id], ['href', '#'], ['style', 'text-decoration: none;']]); //<title>I'm a circle</title>

  const titleElement = (0, _elements.createElement)('title', []);
  titleElement.innerHTML = label;
  container.appendChild(titleElement);
  const arc = createArcForSlice(point, angles, outerRadius, color);
  container.appendChild(arc);
  const {
    textPositionPathElement,
    textElement
  } = getTextElements(id, {
    label,
    labelSize,
    labelColor
  }, {
    innerRadius,
    outerRadius
  }, angles, point);
  container.appendChild(textPositionPathElement);
  container.appendChild(textElement);
  return container;
}

},{"./calculations":4,"./elementCreator":5,"./elements":6,"./formatter":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawingCoordinatesBetweenInnerAndOuterCircle = drawingCoordinatesBetweenInnerAndOuterCircle;
exports.drawingCoordinatesForTextPosition = drawingCoordinatesForTextPosition;
exports.drawingCoordinatesinCircle = drawingCoordinatesinCircle;
exports.polarToCartesian = polarToCartesian;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
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
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
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


function drawingCoordinatesinCircle({
  x,
  y
}, {
  startAngle,
  endAngle
}, radius) {
  const startPoint = polarToCartesian(x, y, radius, startAngle);
  const endPoint = polarToCartesian(x, y, radius, endAngle);
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  const d = ['M', endPoint.x, endPoint.y, 'A', radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y, 'L', x, y, 'L', endPoint.x, endPoint.y].join(' ');
  return d;
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
  const middleRadius = innerRadius + (outerRadius - innerRadius) / 2;
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createArc = createArc;

var _calculations = require("./calculations");

var _elements = require("./elements");

function createArc(containerAttributes, point, angles, radius) {
  const innerArc = (0, _elements.createElement)("path", containerAttributes);
  const innerArcData = (0, _calculations.drawingCoordinatesinCircle)(point, angles, radius);
  innerArc.setAttributeNS(null, "d", innerArcData);
  return innerArc;
}

},{"./calculations":4,"./elements":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVG_NAMESPACE = void 0;
exports.createElement = createElement;
exports.createHtmlElement = createHtmlElement;
exports.insertStyles = insertStyles;
exports.setAttributeForSvg = setAttributeForSvg;

var _calculations = require("./calculations");

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

function insertStyles() {
  if (document.head.querySelector("#doughnut-cropped-chart-styles")) {
    return;
  }

  var styles = `
        a:hover .path-container {
            opacity: 0.5;
            transition: all ease 0.3s;
        }
        a .path-container {
            opacity: 1.0;
            transition: all ease 0.3s;
        }
`;
  var styleSheet = document.createElement('style');
  styleSheet.setAttribute('type', 'text/css');
  styleSheet.setAttribute('id', 'doughnut-cropped-chart-styles');
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);
}

},{"./calculations":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatItems = formatItems;
exports.formatToArrayOfObjects = formatToArrayOfObjects;
exports.reverseString = reverseString;
const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'];

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
  const isNumber = currentValue => typeof currentValue === 'number';

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
    throw new Error('Invalid Data Found, All items must have a value property');
  }

  const formatLabelColorWithDefault = item => formatLabelColor(item, defaultLabelColor);

  const total = items.reduce((acc, item) => acc + item.value, 0);
  return items.map(item => ({ ...item,
    percentage: item.value / total * 100
  })).map(formatLabel).map(formatColor).map(formatLabelColorWithDefault);
}

function formatLabelColor(item, defaultLabelColor) {
  return { ...{
      labelColor: defaultLabelColor
    },
    ...item
  };
}

},{}]},{},[1])(1)
});
