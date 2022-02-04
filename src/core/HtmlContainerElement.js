import { createElement, createHtmlElement } from './elements'

export const PADDING_RATIO = 0.8
export function getHtmlContainerElement({ x, y }, radius, imgUrl, title, textColor) {
  // let {x,y} = polarToCartesian(centerX, centerY, radius, 90);

  const mainElement = createHtmlElement('div', [
    [
      'style',
      'display: table-cell; text-align: center; vertical-align: middle;color:' +
        textColor +
        ';'
    ]
  ])
  const paddedRadius = radius * PADDING_RATIO

  const imgElement = createHtmlElement('img', [
    ['src', imgUrl],
    ['width', paddedRadius],
    ['height', paddedRadius]
  ])
  const breakElement = createHtmlElement('br', [])
  mainElement.appendChild(imgElement)
  mainElement.appendChild(breakElement)
  mainElement.innerHTML += title

  const container = createHtmlElement('div', [
    ['style', 'display: table; font-size: 24px; width: 100%; height: 100%;']
  ])
  container.appendChild(mainElement)

  const paddedX = x - paddedRadius
  const paddedY = y - paddedRadius
  // y = centerY + radius;
  const width = paddedRadius * 2
  const height = paddedRadius * 2
  //  <foreignObject x="20" y="20" width="160" height="160">
  const foreignObject = createElement('foreignObject', [
    ['x', paddedX],
    ['y', paddedY],
    ['width', width],
    ['height', height]
  ])

  foreignObject.appendChild(container)

  return foreignObject
}
