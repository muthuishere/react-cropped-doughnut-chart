function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
function createElement(name, attribs) {
  var xmlns = SVG_NAMESPACE;
  var svgElem = document.createElementNS(xmlns, name);
  attribs.forEach(function (_ref) {
    var name = _ref[0],
        value = _ref[1];
    return svgElem.setAttributeNS(null, name, value);
  });
  return svgElem;
}
function createHtmlElement(name, attribs) {
  var element = document.createElement(name);
  attribs.forEach(function (_ref2) {
    var name = _ref2[0],
        value = _ref2[1];
    return element.setAttribute(name, value);
  });
  return element;
}
function createContainer() {
  var container = createElement('g', []);
  return container;
}
function createCircle(_ref3, radius, defaultcolor) {
  var x = _ref3.x,
      y = _ref3.y;
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
  var titleElement = createElement("title", []);
  titleElement.innerHTML = label;
  return titleElement;
}

function getRandomSixDigitString() {
  var str = "" + Math.floor(Math.random() * (999999 - 1)) + 1;
  return str.padStart(6, "0");
}

var colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF"];

function formatLabel(item) {
  var label = item.label;
  if (label) return item;else return _extends({}, item, {
    label: "" + item.value
  });
}

function formatColor(item, index) {
  var color = item.color;
  if (color) return item;else return _extends({}, item, {
    color: colors[index]
  });
}

function formatToArrayOfObjects(inputItems) {
  var isNumber = function isNumber(currentValue) {
    return typeof currentValue === "number";
  };

  var isAllNumbers = inputItems.every(isNumber);
  var items = inputItems;

  if (isAllNumbers) {
    items = inputItems.map(function (item) {
      return {
        value: item
      };
    });
  }

  return items;
}
function reverseString(str) {
  return str.split("").reverse().join("");
}
function formatItems(inputItems, defaultLabelColor) {
  var items = formatToArrayOfObjects(inputItems);

  var hasValueProperty = function hasValueProperty(currentValue) {
    return null != currentValue.value;
  };

  var isAllValid = items.every(hasValueProperty);

  if (!isAllValid) {
    throw new Error("Invalid Data Found, All items must have a value property");
  }

  var formatLabelColorWithDefault = function formatLabelColorWithDefault(item) {
    return formatLabelColor(item, defaultLabelColor);
  };

  var total = items.reduce(function (acc, item) {
    return acc + item.value;
  }, 0);
  return items.map(function (item) {
    return _extends({}, item, {
      percentage: item.value / total * 100
    });
  }).map(formatLabel).map(formatColor).map(formatLabelColorWithDefault).map(formatSliceId).map(formatSlicePreviousId);
}
function formatLabelColor(item, defaultLabelColor) {
  return _extends({}, {
    labelColor: defaultLabelColor
  }, item);
}
function formatSliceId(item) {
  var value = item.value;
  var id = value + '' + getRandomSixDigitString();
  return _extends({}, {
    id: id
  }, item);
}
function formatSlicePreviousId(item, index, array) {
  var previousItem = array[index - 1];

  var _ref = previousItem || {
    id: null
  },
      previousId = _ref.id;

  return _extends({}, {
    previousId: previousId
  }, item);
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
function drawingCoordinatesBetweenInnerAndOuterCircle(_ref, _ref2, _ref3) {
  var innerRadius = _ref.innerRadius,
      outerRadius = _ref.outerRadius;
  var startAngle = _ref2.startAngle,
      endAngle = _ref2.endAngle;
  var x = _ref3.x,
      y = _ref3.y;
  var middleRadius = innerRadius + (outerRadius - innerRadius) / 2 - 20;
  var drawingCoordinatesForText = drawingCoordinatesForTextPosition({
    x: x,
    y: y
  }, {
    startAngle: startAngle,
    endAngle: endAngle
  }, middleRadius);
  return drawingCoordinatesForText;
}
function drawingCoordinatesForTextPosition(_ref4, _ref5, radius) {
  var x = _ref4.x,
      y = _ref4.y;
  var startAngle = _ref5.startAngle,
      endAngle = _ref5.endAngle;
  var startPoint = polarToCartesian(x, y, radius, startAngle);
  var endPoint = polarToCartesian(x, y, radius, endAngle);
  var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  var d = ['M', endPoint.x, endPoint.y, 'A', radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y].join(' ');
  return d;
}

function coordinatesForArc(_ref, _ref2, radius) {
  var x = _ref.x,
      y = _ref.y;
  var startAngle = _ref2.startAngle,
      endAngle = _ref2.endAngle;
  var startPoint = polarToCartesian(x, y, radius, startAngle);
  var endPoint = polarToCartesian(x, y, radius, endAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = ["M", endPoint.x, endPoint.y, "A", radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y].join(" ");
  return d;
}
function createArc(containerAttributes, point, angles, radius) {
  var innerArc = createElement("path", containerAttributes);
  var innerArcData = coordinatesForArc(point, angles, radius);
  innerArc.setAttributeNS(null, "d", innerArcData);
  return innerArc;
}
function createArcForSlice(point, angles, _ref3, color, strokeArray) {
  var outerRadius = _ref3.outerRadius,
      innerRadius = _ref3.innerRadius;
  var borderWidth = outerRadius - innerRadius;
  var strokeData = strokeArray * -1;
  var containerAttributes = [["fill", "none"], ["stroke", color], ["stroke-width", borderWidth], ["stroke-dashoffset", "" + strokeData], ["stroke-dasharray", "" + strokeArray], ["class", "path-container"]];
  return createArc(containerAttributes, point, angles, innerRadius);
}

function createArcAnimation(strokeArray, duration) {
  if (duration === void 0) {
    duration = "2s";
  }

  var animateElement = createElement("animate", [["attributeType", "CSS"], ["attributeName", "stroke-dashoffset"], ["values", "0;" + strokeArray], ["dur", duration], ["fill", "freeze"]]);
  return animateElement;
}
function createOpacityAnimation(duration) {
  var animateElement = createElement("animate", [["attributeName", "opacity"], ["from", "1"], ["to", "0"], ["dur", duration], ["begin", ".5s"], ["fill", "freeze"], ["repeatCount", "1"]]);
  return animateElement;
}
function getBorderAnimation(_ref, _ref2, _ref3, backgroundColor, animationDurationInSeconds) {
  var x = _ref.x,
      y = _ref.y;
  var innerRadius = _ref2.innerRadius,
      outerRadius = _ref2.outerRadius;
  var startAngle = _ref3.startAngle,
      endAngle = _ref3.endAngle;
  var strokeArray = 900;
  var adjustedAngle = 20;
  var animatedMaskArc = createArcForSlice({
    x: x,
    y: y
  }, {
    startAngle: startAngle - adjustedAngle,
    endAngle: endAngle + adjustedAngle
  }, {
    innerRadius: innerRadius,
    outerRadius: outerRadius + 10
  }, backgroundColor, strokeArray);
  animatedMaskArc.setAttribute("stroke-dashoffset", "0");
  var animateElement = createArcAnimation(strokeArray, animationDurationInSeconds + "s");
  animatedMaskArc.appendChild(animateElement);
  return animatedMaskArc;
}
function getCenterTitleAnimation(_ref4, radius, backgroundColor, animationDurationInSeconds) {
  var x = _ref4.x,
      y = _ref4.y;
  var animatedMaskCircle = createCircle({
    x: x,
    y: y
  }, radius, backgroundColor);
  var duration = animationDurationInSeconds + 1 + "s";
  var animateElement = createOpacityAnimation(duration);
  animatedMaskCircle.appendChild(animateElement);
  return animatedMaskCircle;
}
function createHoverFilter() {
  var filter = createElement("filter", [["id", "glowfilter"], ["filterUnits", "userSpaceOnUse"], ["x", "0"], ["y", "0"], ["width", "100%"], ["height", "100%"]]);
  var desc = createElement("desc", []);
  filter.appendChild(desc);
  var fegaussianBlur = createElement("feMorphology", [["operator", "dilate"], ["radius", "2"]]);
  filter.appendChild(fegaussianBlur);
  var defs = createDefinitionBlock();
  defs.appendChild(filter);
  return defs;
}

var thicknessWithRatio = {
  XXL: 150,
  XL: 125,
  L: 100,
  M: 50,
  S: 35
};
var sizeWithAngles = {
  XXL: [261, 460],
  XL: [241, 480],
  L: [221, 500],
  M: [201, 520],
  S: [181, 540]
};
var chartStyles = "\n\n\n.description {\n  pointer-events: none;\n  position: absolute;\n  font-size: 18px;\n  text-align: center;\n  background: white;\n  padding: 10px 15px;\n  z-index: 5;\n  height: 30px;\n  line-height: 30px;\n  margin: 0 auto;\n  color: #21669e;\n  border-radius: 5px;\n  box-shadow: 0 0 0 1px #eee;\n  -moz-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  display: none;\n}\n.description.active {\n  display: block;\n}\n.description:after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 100%;\n  width: 0;\n  height: 0;\n  margin-left: -10px;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-top: 10px solid white;\n}\n\n\n.horse-chart-tooltip::after {\n    content: \"\";\n    position: absolute;\n    top: 100%;\n    left: 50%;\n    margin-left: -5px;\n    border-width: 5px;\n    border-style: solid;\n    border-color: cornsilk transparent transparent transparent;\n}\n.tooltip-animation-on\n{\n    display: block;\n\n    -webkit-animation: fadeInFromNone 0.5s ease-out;\n    -moz-animation: fadeInFromNone 0.5s ease-out;\n    -o-animation: fadeInFromNone 0.5s ease-out;\n    animation: fadeInFromNone 0.5s ease-out;\n}\n@keyframes fadeInFromNone {\n    0% {\n        display: none;\n        opacity: 0;\n    }\n\n    1% {\n        display: block;\n        opacity: 0;\n    }\n\n    100% {\n        display: block;\n        opacity: 1;\n    }\n}\n.tooltip-animation-off\n{\n    display: block;\n\n    -webkit-animation: fadeOutFromNone 0.5s ease-out;\n    -moz-animation: fadeOutFromNone 0.5s ease-out;\n    -o-animation: fadeOutFromNone 0.5s ease-out;\n    animation: fadeOutFromNone 0.5s ease-out;\n}\n@keyframes fadeOutFromNone {\n    0% {\n        display: block;\n        opacity: 1;\n    }\n\n    1% {\n        display: block;\n        opacity: 0;\n    }\n\n    100% {\n        display: none;\n        opacity: 1;\n    }\n}\n\n  a:hover .path-container {\n    cursor: pointer;\n    transition: all 0.5s ease;\n   filter:url(#glowfilter) brightness(1.0);\n  }\n\n  a:hover text {\n    transition: all 0.5s ease;\n    cursor: pointer;\n    font-weight: bold;\n  }\n  a text {\n    transition: all 0.5s ease;\n    filter: ;\n    cursor: pointer;\n  }\n    a .path-container {\n\n      transition: all 0.5s ease;\n      filter: brightness(0.7);\n    }\n\n  foreignObject {\n    cursor: pointer;\n  }\n\n";

function createTextDefinition(textId, innerAndOuterRadius, angles, point) {
  var textPathDefinitionElement = createElement('defs', []);
  var pathToDrawTextElement = createElement('path', [['id', textId], ['stroke-width', '0']]);
  textPathDefinitionElement.appendChild(pathToDrawTextElement);
  var drawingCoordinatesForText = drawingCoordinatesBetweenInnerAndOuterCircle(innerAndOuterRadius, angles, point);
  pathToDrawTextElement.setAttributeNS(null, 'd', drawingCoordinatesForText);
  return textPathDefinitionElement;
}

function createTextElement(textId, _ref) {
  var label = _ref.label,
      labelSize = _ref.labelSize,
      labelColor = _ref.labelColor;
  var textElement = createElement('text', [['font-size', labelSize + 'px'], ['fill', labelColor], ['rotate', '180']]);
  var textPathElement = createElement('textPath', [['href', '#' + textId], ['text-anchor', 'middle'], ['startOffset', '50%']]);
  textPathElement.innerHTML = reverseString(label);
  textElement.appendChild(textPathElement);
  return textElement;
}

function getTextElements(id, _ref2, innerAndOuterRadius, angles, point) {
  var label = _ref2.label,
      labelSize = _ref2.labelSize,
      labelColor = _ref2.labelColor;
  var textId = 'text' + id;
  var textPositionPathElement = createTextDefinition(textId, innerAndOuterRadius, angles, point);
  var textElement = createTextElement(textId, {
    label: label,
    labelSize: labelSize,
    labelColor: labelColor
  });
  var container = createContainer();
  container.appendChild(textPositionPathElement);
  container.appendChild(textElement);
  return container;
}

function getSliceElement(angles, _ref, point, _ref2, _ref3, _ref4) {
  var label = _ref.label,
      color = _ref.color,
      labelColor = _ref.labelColor;
  var innerRadius = _ref2.innerRadius,
      outerRadius = _ref2.outerRadius;
  var labelSize = _ref3.labelSize;
  var id = _ref4.id;
  var containerId = 'box' + id;
  var sliceAttributes = [['id', 'container' + containerId], ['class', 'slice-container'], ['style', 'text-decoration: none;']];
  var container = createElement('a', sliceAttributes);
  container.appendChild(createTitle(label));
  var arc = createArcForSlice(point, angles, {
    innerRadius: innerRadius,
    outerRadius: outerRadius
  }, color, 0);
  container.appendChild(arc);
  var textContainer = getTextElements(id, {
    label: label,
    labelSize: labelSize,
    labelColor: labelColor
  }, {
    innerRadius: innerRadius,
    outerRadius: outerRadius
  }, angles, point);
  container.appendChild(textContainer);
  return container;
}

var PADDING_RATIO = 0.8;
function getTitleContainer(_ref, radius, imgUrl, title, textColor) {
  var x = _ref.x,
      y = _ref.y;
  var mainElement = createHtmlElement('div', [['style', 'display: table-cell; text-align: center; vertical-align: middle;color:' + textColor + ';']]);
  var paddedRadius = radius * PADDING_RATIO;
  var imgElement = createHtmlElement('img', [['src', imgUrl], ['width', paddedRadius], ['height', paddedRadius]]);
  var breakElement = createHtmlElement('br', []);
  mainElement.appendChild(imgElement);
  mainElement.appendChild(breakElement);
  mainElement.innerHTML += title;
  var container = createHtmlElement('div', [['style', 'display: table; font-size: 24px; width: 100%; height: 100%;']]);
  container.appendChild(mainElement);
  var paddedX = x - paddedRadius;
  var paddedY = y - paddedRadius;
  var width = paddedRadius * 2;
  var height = paddedRadius * 2;
  var foreignObject = createElement('foreignObject', [['x', paddedX], ['y', paddedY], ['width', width], ['height', height]]);
  foreignObject.appendChild(container);
  return foreignObject;
}

function getPoint(totalSize) {
  var x = totalSize / 2;
  var y = totalSize / 2;
  return {
    x: x,
    y: y
  };
}

function getChartStyleElement() {
  var styleElement = createElement("style", []);
  styleElement.innerHTML = chartStyles;
  return styleElement;
}

function HorseShoeChartCreator(items, options) {
  var defaultOptions = {
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

  var formattedOptions = _extends({}, defaultOptions, options);

  var radius = formattedOptions.radius,
      title = formattedOptions.title,
      thicknessSize = formattedOptions.thicknessSize,
      showAnimation = formattedOptions.showAnimation,
      animationDurationInSeconds = formattedOptions.animationDurationInSeconds,
      gapSize = formattedOptions.gapSize,
      backgroundColor = formattedOptions.backgroundColor,
      imgUrl = formattedOptions.imgUrl,
      titleColor = formattedOptions.titleColor,
      labelSize = formattedOptions.labelSize,
      labelColor = formattedOptions.labelColor;
  var thicknessOfCircle = thicknessWithRatio[thicknessSize];
  var totalSize = (radius + thicknessOfCircle) * 2;

  var _getPoint = getPoint(totalSize),
      x = _getPoint.x,
      y = _getPoint.y;

  var outerRadius = radius + thicknessOfCircle;
  var sizeWithAngle = sizeWithAngles[gapSize];
  var startAngle = sizeWithAngle[0],
      endAngle = sizeWithAngle[1];
  var total = (endAngle - startAngle) / 100;

  var percentageToDegree = function percentageToDegree(percent) {
    return percent * total;
  };

  var container = createGroupElement();
  var centerTitleContainer = getTitleContainer({
    x: x,
    y: y
  }, radius, imgUrl, title, titleColor);
  container.appendChild(centerTitleContainer);
  var currentAngle = startAngle;
  var formattedItems = formatItems(items, labelColor);
  var filterElement = createHoverFilter();
  container.appendChild(filterElement);
  formattedItems.forEach(function (item, index) {
    var percentage = item.percentage,
        id = item.id,
        previousId = item.previousId;
    var endAngle = currentAngle + percentageToDegree(percentage);
    var currentBoxElement = getSliceElement({
      startAngle: currentAngle,
      endAngle: endAngle
    }, item, {
      x: x,
      y: y
    }, {
      innerRadius: radius,
      outerRadius: outerRadius
    }, {
      labelSize: labelSize,
      labelColor: labelColor
    }, {
      id: id,
      previousId: previousId
    });
    container.appendChild(currentBoxElement);
    currentAngle = endAngle;
  });

  if (showAnimation) {
    var borderAnimation = getBorderAnimation({
      x: x,
      y: y
    }, {
      innerRadius: radius,
      outerRadius: outerRadius
    }, {
      startAngle: startAngle,
      endAngle: currentAngle
    }, backgroundColor, animationDurationInSeconds);
    container.appendChild(borderAnimation);
    var centerTitleAnimation = getCenterTitleAnimation({
      x: x,
      y: y
    }, radius, backgroundColor, animationDurationInSeconds);
    container.appendChild(centerTitleAnimation);

    centerTitleAnimation.querySelector("animate").onend = function () {
      container.removeChild(centerTitleAnimation);
      container.removeChild(borderAnimation);
    };
  }

  var root = createSVGRoot(totalSize);
  var styleElement = getChartStyleElement();
  root.appendChild(styleElement);
  root.appendChild(container);
  return root;
}

var HorseShoeChart = function HorseShoeChart(_ref) {
  var items = _ref.items,
      options = _ref.options;
  var svg = React.useRef(null);
  React.useEffect(function () {
    var result = HorseShoeChartCreator(items, options);

    if (svg.current) {
      svg.current.appendChild(result);
    }
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    ref: svg
  });
};

exports.HorseShoeChart = HorseShoeChart;
//# sourceMappingURL=index.js.map
