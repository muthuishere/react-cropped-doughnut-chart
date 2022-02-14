

export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
export function createElement(name, attribs) {
  const xmlns = SVG_NAMESPACE
  const svgElem = document.createElementNS(xmlns, name)

  attribs.forEach(([name, value]) => svgElem.setAttributeNS(null, name, value))

  return svgElem
}

export function createHtmlElement(name, attribs) {
  const element = document.createElement(name)

  attribs.forEach(([name, value]) => element.setAttribute(name, value))

  return element
}


export function setAttributeForSvg(element, name, value) {
  element.setAttributeNS(null, name, value)
}



export function insertStyles(styles) {
  if(document.head.querySelector("#doughnut-cropped-chart-styles")) {
    return
  }
  var styleSheet = document.createElement('style')
  styleSheet.setAttribute('type', 'text/css')
  styleSheet.setAttribute('id', 'doughnut-cropped-chart-styles')

  styleSheet.innerHTML = styles
  document.head.appendChild(styleSheet)
}

export function createContainer(){
  const container = createElement('g', [])
  return container;
}
export function createCircle({ x, y }, radius, defaultcolor) {
  return createElement('circle', [
    ['cx', x],
    ['cy', y],
    ['r', radius],
    ['fill', defaultcolor]
  ])
}

export function createDefinitionBlock() {
  return createElement("defs", []);
}

export function createGroupElement() {
  return createElement("g", []);
}

export function createSVGRoot(totalSize) {
  return createElement("svg", [
    ["width", totalSize],
    ["height", totalSize]
  ]);
}

export function createTitle(label) {
  const titleElement = createElement("title", []);
  titleElement.innerHTML = label;
  return titleElement;
}
