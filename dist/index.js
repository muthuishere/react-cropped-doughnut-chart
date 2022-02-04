function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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
function setAttributeForSvg(element, name, value) {
  element.setAttributeNS(null, name, value);
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
function drawingCoordinatesinCircle(_ref, _ref2, radius) {
  var x = _ref.x,
      y = _ref.y;
  var startAngle = _ref2.startAngle,
      endAngle = _ref2.endAngle;
  var startPoint = polarToCartesian(x, y, radius, startAngle);
  var endPoint = polarToCartesian(x, y, radius, endAngle);
  var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  var d = ['M', endPoint.x, endPoint.y, 'A', radius, radius, 0, arcSweep, 0, startPoint.x, startPoint.y, 'L', x, y, 'L', endPoint.x, endPoint.y].join(' ');
  return d;
}
function drawingCoordinatesBetweenInnerAndOuterCircle(_ref3, _ref4, _ref5) {
  var innerRadius = _ref3.innerRadius,
      outerRadius = _ref3.outerRadius;
  var startAngle = _ref4.startAngle,
      endAngle = _ref4.endAngle;
  var x = _ref5.x,
      y = _ref5.y;
  var middleRadius = innerRadius + (outerRadius - innerRadius) / 2;
  var middleAngle = startAngle + (endAngle - startAngle) / 2;
  var drawingCoordinatesForText = drawingCoordinatesinCircle({
    x: x,
    y: y
  }, {
    startAngle: startAngle,
    endAngle: middleAngle
  }, middleRadius);
  return drawingCoordinatesForText;
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

var colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'];

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
    return typeof currentValue === 'number';
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
function formatItems(inputItems) {
  var items = formatToArrayOfObjects(inputItems);

  var hasValueProperty = function hasValueProperty(currentValue) {
    return null != currentValue.value;
  };

  var isAllValid = items.every(hasValueProperty);

  if (!isAllValid) {
    throw new Error('Invalid Data Found, All items must have a value property');
  }

  var total = items.reduce(function (acc, item) {
    return acc + item.value;
  }, 0);
  return items.map(function (item) {
    return _extends({}, item, {
      percentage: item.value / total * 100
    });
  }).map(formatLabel).map(formatColor);
}

function createArc(_ref, _ref2, outerRadius, color) {
  var x = _ref.x,
      y = _ref.y;
  var startAngle = _ref2.startAngle,
      endAngle = _ref2.endAngle;
  var chartPath = createElement('path', [['fill', color], ['class', 'path-container'], ['stroke-width', '0']]);
  var chartPositionData = drawingCoordinatesinCircle({
    x: x,
    y: y
  }, {
    startAngle: startAngle,
    endAngle: endAngle
  }, outerRadius);
  setAttributeForSvg(chartPath, 'd', chartPositionData);
  return chartPath;
}

function createTextDefinition(textId, innerAndOuterRadius, angles, point) {
  var textPathDefinitionElement = createElement('defs', []);
  var pathToDrawTextElement = createElement('path', [['id', textId], ['stroke-width', '0']]);
  textPathDefinitionElement.appendChild(pathToDrawTextElement);
  var drawingCoordinatesForText = drawingCoordinatesBetweenInnerAndOuterCircle(innerAndOuterRadius, angles, point);
  pathToDrawTextElement.setAttributeNS(null, 'd', drawingCoordinatesForText);
  return textPathDefinitionElement;
}

function createTextElement(textId, _ref3) {
  var label = _ref3.label,
      labelSize = _ref3.labelSize,
      labelColor = _ref3.labelColor;
  var textElement = createElement('text', [['font-size', labelSize + 'px'], ['fill', labelColor], ['rotate', '180']]);
  var textPathElement = createElement('textPath', [['href', '#' + textId], ['text-anchor', 'top'], ['startOffset', '0%']]);
  textPathElement.innerHTML = reverseString(label);
  textElement.appendChild(textPathElement);
  return textElement;
}

function getTextElements(id, _ref4, innerAndOuterRadius, angles, point) {
  var label = _ref4.label,
      labelSize = _ref4.labelSize,
      labelColor = _ref4.labelColor;
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

function getRandomSixDigitString() {
  var str = '' + Math.floor(Math.random() * (999999 - 1)) + 1;
  return str.padStart(6, '0');
}
function getSliceElement(angles, _ref5, point, _ref6, _ref7) {
  var label = _ref5.label,
      value = _ref5.value,
      color = _ref5.color;
  var innerRadius = _ref6.innerRadius,
      outerRadius = _ref6.outerRadius;
  var labelSize = _ref7.labelSize,
      labelColor = _ref7.labelColor;
  var id = 'box' + value + getRandomSixDigitString();
  var container = createElement('a', [['id', 'container' + id], ['href', '#'], ['style', 'text-decoration: none;']]);
  var arc = createArc(point, angles, outerRadius, color);
  container.appendChild(arc);

  var _getTextElements = getTextElements(id, {
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

function createArcFrom(point, angles, radius) {
  var innerArc = createElement('path', []);
  var innerArcData = drawingCoordinatesinCircle(point, angles, radius);
  innerArc.setAttributeNS(null, 'd', innerArcData);
  return innerArc;
}

var thicknessWithRatio = {
  XXL: 125,
  XL: 100,
  L: 75,
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

function DoughnutElement(items, _ref2) {
  var radius = _ref2.radius,
      title = _ref2.title,
      thicknessSize = _ref2.thicknessSize,
      gapSize = _ref2.gapSize,
      backgroundColor = _ref2.backgroundColor,
      imgUrl = _ref2.imgUrl,
      titleColor = _ref2.titleColor,
      labelSize = _ref2.labelSize,
      labelColor = _ref2.labelColor;
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
  var innerArc = createArcFrom({
    x: x,
    y: y
  }, {
    startAngle: startAngle,
    endAngle: endAngle
  }, radius);
  var outerArc = createArcFrom({
    x: x,
    y: y
  }, {
    startAngle: startAngle,
    endAngle: endAngle
  }, outerRadius);
  container.appendChild(outerArc);
  container.appendChild(innerArc);
  var initAngle = startAngle;
  var formattedItems = formatItems(items);
  formattedItems.forEach(function (item, index) {
    var label = item.label,
        value = item.value,
        color = item.color,
        percentage = item.percentage;
    console.log(label);
    console.log(color);
    console.log(value);
    var endAngle = initAngle + percentageToDegree(percentage);
    var currentBoxElement = getSliceElement({
      startAngle: initAngle,
      endAngle: endAngle
    }, {
      label: label,
      value: value,
      color: color
    }, {
      x: x,
      y: y
    }, {
      innerRadius: radius,
      outerRadius: outerRadius
    }, {
      labelSize: labelSize,
      labelColor: labelColor
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
  container.appendChild(backgroundCircle);
  container.appendChild(htmlContainerElement);
  var root = createElement('svg', [['width', totalSize], ['height', totalSize]]);
  root.appendChild(container);
  return root.outerHTML;
}

var CroppedDoughnutChart = function CroppedDoughnutChart(_ref) {

  var _useState = React.useState(""),
      state = _useState[0],
      setState = _useState[1];

  React.useEffect(function () {
    var items = [{
      value: 24,
      color: "red"
    }, {
      value: 227,
      color: "blue"
    }, {
      value: 49,
      color: "pink"
    }];
    var imgUrl = "https://www.w3schools.com/html/pic_trulli.jpg";
    var result = DoughnutElement(items, {
      radius: 100,
      width: 200,
      title: "Halo",
      titleColor: "#FF0000",
      thicknessSize: "M",
      gapSize: "XL",
      labelSize: 12,
      labelColor: "white",
      backgroundColor: "white",
      imgUrl: imgUrl
    });
    setState(result);
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: state
    }
  });
};

exports.CroppedDoughnutChart = CroppedDoughnutChart;
//# sourceMappingURL=index.js.map
