import { drawingCoordinatesinCircle } from "./calculations";

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



export function insertStyles() {
  if(document.head.querySelector("#doughnut-cropped-chart-styles")) {
    return
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
`

  var styleSheet = document.createElement('style')
  styleSheet.setAttribute('type', 'text/css')
  styleSheet.setAttribute('id', 'doughnut-cropped-chart-styles')

  styleSheet.innerHTML = styles
  document.head.appendChild(styleSheet)
}

