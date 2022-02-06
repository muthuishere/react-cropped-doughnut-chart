import React, { useRef, useEffect } from 'react';

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
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

const PADDING_RATIO = 0.8;
function getHtmlContainerElement({
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

function createArc(containerAttributes, point, angles, radius) {
  const innerArc = createElement("path", containerAttributes);
  const innerArcData = drawingCoordinatesinCircle(point, angles, radius);
  innerArc.setAttributeNS(null, "d", innerArcData);
  return innerArc;
}

function createArcForSlice(point, angles, radius, color) {
  const containerAttributes = [['fill', color], ['stroke', 'none'], ['class', 'path-container'], ['stroke-width', '0']];
  const arc = createArc(containerAttributes, point, angles, radius);
  const animateElement = createElement('animate', [['attributeName', 'fill'], ['attributeType', 'XML'], ['from', 'black'], ['to', color], ['dur', '2s'], ['repeatCount', '1']]);
  arc.appendChild(animateElement);
  return arc;
}

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
  return {
    textPositionPathElement,
    textElement
  };
}

function getRandomSixDigitString() {
  const str = '' + Math.floor(Math.random() * (999999 - 1)) + 1;
  return str.padStart(6, '0');
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
}) {
  const id = 'box' + value + getRandomSixDigitString();
  const container = createElement('a', [['id', 'container' + id], ['href', '#'], ['style', 'text-decoration: none;']]);
  const titleElement = createElement('title', []);
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

function createArcForOverAllContainer(className, point, angles, radius) {
  const containerAttributes = [['fill', 'none'], ['stroke', 'none'], ['class', className], ['stroke-width', '0']];
  return createArc(containerAttributes, point, angles, radius);
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

function getCircle({
  x,
  y
}, radius, defaultcolor) {
  return createElement('circle', [['cx', x], ['cy', y], ['r', radius], ['fill', defaultcolor]]);
}

function DoughnutElement(items, options) {
  insertStyles();
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

  const container = createElement('g', []);
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
  const formattedItems = formatItems(items, labelColor);
  formattedItems.forEach((item, index) => {
    const {
      label,
      value,
      color,
      percentage
    } = item;
    const endAngle = initAngle + percentageToDegree(percentage);
    const currentBoxElement = getSliceElement({
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
  const htmlContainerElement = getHtmlContainerElement({
    x,
    y
  }, radius, imgUrl, title, titleColor);
  const backgroundCircle = getCircle({
    x,
    y
  }, radius, backgroundColor);
  container.appendChild(backgroundCircle);
  container.appendChild(htmlContainerElement);
  const root = createElement('svg', [['width', totalSize], ['height', totalSize]]);
  root.appendChild(container);
  return root;
}

const CroppedDoughnutChart = ({
  items,
  options
}) => {
  const svg = useRef(null);
  useEffect(() => {
    const result = DoughnutElement(items, options);

    if (svg.current) {
      svg.current.appendChild(result);
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: svg
  });
};

export { CroppedDoughnutChart };
//# sourceMappingURL=index.modern.js.map
