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
  var container = createElement('g', []);
  return container;
}
function createCircle(_ref3, radius, defaultcolor) {
  var x = _ref3.x,
      y = _ref3.y;
  return createElement('circle', [['cx', x], ['cy', y], ['r', radius], ['fill', defaultcolor]]);
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
function createArcForSlice(point, angles, _ref4, color, strokeArray) {
  var outerRadius = _ref4.outerRadius,
      innerRadius = _ref4.innerRadius;
  var borderWidth = outerRadius - innerRadius;
  var strokeData = strokeArray * -1;
  var containerAttributes = [["fill", "none"], ["stroke", color], ["stroke-width", borderWidth], ["stroke-dashoffset", "" + strokeData], ["stroke-dasharray", "" + strokeArray], ["class", "path-container"]];
  var arc = createArc(containerAttributes, point, angles, innerRadius);
  return arc;
}

function createArcAnimation(strokeArray, duration) {
  if (duration === void 0) {
    duration = "2s";
  }

  var animateElement = createElement("animate", [["attributeType", "CSS"], ["attributeName", "stroke-dashoffset"], ["values", "0;" + strokeArray], ["dur", duration], ["fill", "freeze"]]);
  return animateElement;
}
function createOpacityAnimation(duration) {
  var animateElement = createElement("animate", [["attributeName", "opacity"], ["from", "1"], ["to", "0"], ["dur", duration], ["begin", ".1s"], ["fill", "freeze"], ["repeatCount", "1"]]);
  return animateElement;
}
function getBorderAnimation(_ref, _ref2, _ref3, backgroundColor, animationDurationInSeconds) {
  var x = _ref.x,
      y = _ref.y;
  var innerRadius = _ref2.innerRadius,
      outerRadius = _ref2.outerRadius;
  var startAngle = _ref3.startAngle,
      endAngle = _ref3.endAngle;
  var strokeArray = 500;
  var animatedMaskArc = createArcForSlice({
    x: x,
    y: y
  }, {
    startAngle: startAngle,
    endAngle: endAngle
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
  var duration = animationDurationInSeconds + 0.5 + "s";
  var animateElement = createOpacityAnimation(duration);
  animatedMaskCircle.appendChild(animateElement);
  return animatedMaskCircle;
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
var chartStyles = "\n\n        a:hover .path-container {\n        cursor: pointer;\n            opacity: 0.5;\n            transition: all ease 0.3s;\n        }\n        a .path-container {\n        cursor: pointer;\n            opacity: 1.0;\n            transition: all ease 0.3s;\n        }\n\n    a .slice-container *{\n       cursor: pointer;\n        }\n\n";

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
  var container = createElement('a', [['id', 'container' + containerId], ['class', 'slice-container'], ['style', 'text-decoration: none;']]);
  var titleElement = createElement('title', []);
  titleElement.innerHTML = label;
  container.appendChild(titleElement);
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

function HorseShoeChartCreator(items, options) {
  insertStyles(chartStyles);
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
  var x = totalSize / 2;
  var y = totalSize / 2;
  var outerRadius = radius + thicknessOfCircle;
  var sizeWithAngle = sizeWithAngles[gapSize];
  var startAngle = sizeWithAngle[0],
      endAngle = sizeWithAngle[1];
  var total = (endAngle - startAngle) / 100;

  var percentageToDegree = function percentageToDegree(percent) {
    return percent * total;
  };

  var container = createElement("g", []);
  var currentAngle = startAngle;
  var formattedItems = formatItems(items, labelColor);
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
  var htmlContainerElement = getTitleContainer({
    x: x,
    y: y
  }, radius, imgUrl, title, titleColor);
  container.appendChild(htmlContainerElement);

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
      console.log("animate end");
      container.removeChild(centerTitleAnimation);
      container.removeChild(borderAnimation);
    };
  }

  var root = createElement("svg", [["width", totalSize], ["height", totalSize]]);
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
