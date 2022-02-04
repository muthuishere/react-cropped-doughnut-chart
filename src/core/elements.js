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

