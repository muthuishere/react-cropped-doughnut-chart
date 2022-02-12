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
function insertStyles() {
  if (document.head.querySelector("#doughnut-cropped-chart-styles")) {
    return;
  }

  var styles = "\n        a:hover .path-container {\n            opacity: 0.5;\n            transition: all ease 0.3s;\n        }\n        a .path-container {\n            opacity: 1.0;\n            transition: all ease 0.3s;\n        }\n\n";
  var styleSheet = document.createElement('style');
  styleSheet.setAttribute('type', 'text/css');
  styleSheet.setAttribute('id', 'doughnut-cropped-chart-styles');
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);
}

var PADDING_RATIO = 0.8;
function getHtmlContainerElement(_ref, radius, imgUrl, title, textColor) {
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
  }).map(formatLabel).map(formatColor).map(formatLabelColorWithDefault);
}
function formatLabelColor(item, defaultLabelColor) {
  return _extends({}, {
    labelColor: defaultLabelColor
  }, item);
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

function createArcForSlice(point, angles, _ref, color) {
  var outerRadius = _ref.outerRadius,
      innerRadius = _ref.innerRadius;
  var borderWidth = outerRadius - innerRadius;
  var containerAttributes = [['fill', 'none'], ['stroke', color], ['stroke-width', borderWidth], ['stroke-dashoffset', "-500"], ['stroke-dasharray', "500"], ['class', 'path-container']];
  var arc = createArc(containerAttributes, point, angles, innerRadius);
  return arc;
}

function createAnimation(id, animationStart) {
  var animateElement = createElement('animate', [['id', id], ['attributeName', 'stroke-dashoffset'], ['begin', animationStart], ['values', '-500;0'], ['dur', '5s'], ['calcMode', 'linear'], ['repeatCount', '1'], ['fill', 'freeze']]);
  return animateElement;
}

function createTextDefinition(textId, innerAndOuterRadius, angles, point) {
  var textPathDefinitionElement = createElement('defs', []);
  var pathToDrawTextElement = createElement('path', [['id', textId], ['stroke-width', '0']]);
  textPathDefinitionElement.appendChild(pathToDrawTextElement);
  var drawingCoordinatesForText = drawingCoordinatesBetweenInnerAndOuterCircle(innerAndOuterRadius, angles, point);
  pathToDrawTextElement.setAttributeNS(null, 'd', drawingCoordinatesForText);
  return textPathDefinitionElement;
}

function createTextElement(textId, _ref2) {
  var label = _ref2.label,
      labelSize = _ref2.labelSize,
      labelColor = _ref2.labelColor;
  var textElement = createElement('text', [['font-size', labelSize + 'px'], ['fill', labelColor], ['rotate', '180']]);
  var textPathElement = createElement('textPath', [['href', '#' + textId], ['text-anchor', 'middle'], ['startOffset', '50%']]);
  textPathElement.innerHTML = reverseString(label);
  textElement.appendChild(textPathElement);
  return textElement;
}

function getTextElements(id, _ref3, innerAndOuterRadius, angles, point) {
  var label = _ref3.label,
      labelSize = _ref3.labelSize,
      labelColor = _ref3.labelColor;
  var textId = 'text' + id;
  var textPositionPathElement = createTextDefinition(textId, innerAndOuterRadius, angles, point);
  var textElement = createTextElement(textId, {
    label: label,
    labelSize: labelSize,
    labelColor: labelColor
  });
  return {
    textPositionPathElement: textPositionPathElement,
    textElement: textElement
  };
}

function getSliceElement(angles, _ref4, point, _ref5, _ref6, _ref7) {
  var label = _ref4.label,
      color = _ref4.color,
      labelColor = _ref4.labelColor;
  var innerRadius = _ref5.innerRadius,
      outerRadius = _ref5.outerRadius;
  var labelSize = _ref6.labelSize;
  var id = _ref7.id;
  var containerId = 'box' + id;
  var container = createElement('a', [['id', 'container' + containerId], ['href', '#'], ['style', 'text-decoration: none;']]);
  var titleElement = createElement('title', []);
  titleElement.innerHTML = label;
  container.appendChild(titleElement);
  var arc = createArcForSlice(point, angles, {
    innerRadius: innerRadius,
    outerRadius: outerRadius
  }, color);
  var animateElement = createAnimation('anim' + containerId, "5s;anim4.end");
  arc.appendChild(animateElement);
  container.appendChild(arc);

  var _getTextElements = getTextElements(containerId, {
    label: label,
    labelSize: labelSize,
    labelColor: labelColor
  }, {
    innerRadius: innerRadius,
    outerRadius: outerRadius
  }, angles, point),
      textPositionPathElement = _getTextElements.textPositionPathElement,
      textElement = _getTextElements.textElement;

  container.appendChild(textPositionPathElement);
  container.appendChild(textElement);
  return container;
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

function getCircle(_ref, radius, defaultcolor) {
  var x = _ref.x,
      y = _ref.y;
  return createElement('circle', [['cx', x], ['cy', y], ['r', radius], ['fill', defaultcolor]]);
}

function DoughnutElement(items, options) {
  insertStyles();
  var defaultOptions = {
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

  var formattedOptions = _extends({}, defaultOptions, options);

  var radius = formattedOptions.radius,
      title = formattedOptions.title,
      thicknessSize = formattedOptions.thicknessSize,
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

  var container = createElement('g', []);
  var initAngle = startAngle;
  var formattedItems = formatItems(items, labelColor);
  formattedItems.forEach(function (item, index) {
    var percentage = item.percentage;
    var endAngle = initAngle + percentageToDegree(percentage);
    var currentBoxElement = getSliceElement({
      startAngle: initAngle,
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
      id: "2",
      previousId: "1"
    });
    container.appendChild(currentBoxElement);
    initAngle = endAngle;
  });
  var htmlContainerElement = getHtmlContainerElement({
    x: x,
    y: y
  }, radius, imgUrl, title, titleColor);
  var backgroundCircle = getCircle({
    x: x,
    y: y
  }, radius, backgroundColor);
  container.appendChild(htmlContainerElement);
  var root = createElement('svg', [['width', totalSize], ['height', totalSize]]);
  root.appendChild(container);
  return root;
}

var CroppedDoughnutChart = function CroppedDoughnutChart(_ref) {
  var items = _ref.items,
      options = _ref.options;
  var svg = React.useRef(null);
  React.useEffect(function () {
    var result = DoughnutElement(items, options);

    if (svg.current) {
      svg.current.appendChild(result);
    }
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    ref: svg
  });
};

exports.CroppedDoughnutChart = CroppedDoughnutChart;
//# sourceMappingURL=index.js.map
