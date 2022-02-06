import { createElement, insertStyles } from "./elements";
import { getHtmlContainerElement } from './HtmlContainerElement'
import { getSliceElement } from './SliceElement'
import { formatItems } from './formatter'
import { createArc } from './elementCreator'

function createArcForOverAllContainer(className, point, angles, radius) {
  const containerAttributes = [
    ['fill', 'none'],
    ['stroke', 'none'],
    ['class', className],
    ['stroke-width', '0']
  ]
  return createArc(containerAttributes, point, angles, radius)
}

const thicknessWithRatio = {
  XXL: 125,
  XL: 100,
  L: 75,
  M: 50,
  S: 35
}

const sizeWithAngles = {
  XXL: [261, 460],
  XL: [241, 480],
  L: [221, 500],
  M: [201, 520],
  S: [181, 540]
}
const colors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#8B00FF'
]

function getCircle({ x, y }, radius, defaultcolor) {
  return createElement('circle', [
    ['cx', x],
    ['cy', y],
    ['r', radius],
    ['fill', defaultcolor]
  ])
}

export function DoughnutElement(items, options) {
  insertStyles()
  const defaultOptions = {
    radius: 100,
    title: '',
    titleColor: '#FF0000',
    thicknessSize: 'M',
    gapSize: 'XL',
    labelSize: 12,
    labelColor: 'white',
    backgroundColor: 'white',
    imgUrl:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  const formattedOptions = { ...defaultOptions, ...options }

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
  } = formattedOptions
  const thicknessOfCircle = thicknessWithRatio[thicknessSize]
  const totalSize = (radius + thicknessOfCircle) * 2
  const x = totalSize / 2
  const y = totalSize / 2
  const outerRadius = radius + thicknessOfCircle
  const sizeWithAngle = sizeWithAngles[gapSize]
  const [startAngle, endAngle] = sizeWithAngle
  const total = (endAngle - startAngle) / 100
  const percentageToDegree = (percent) => percent * total

  const container = createElement('g', [])
  const innerArc = createArcForOverAllContainer(
    'overall-inner-container',
    { x, y },
    { startAngle, endAngle },
    radius
  )
  const outerArc = createArcForOverAllContainer(
    'overall-outer-container',
    { x, y },
    { startAngle, endAngle },
    outerRadius
  )

  container.appendChild(outerArc)
  container.appendChild(innerArc)

  let initAngle = startAngle

  const formattedItems = formatItems(items, labelColor)

  formattedItems.forEach((item, index) => {
    const { label, value, color, percentage } = item

    const endAngle = initAngle + percentageToDegree(percentage)

    const currentBoxElement = getSliceElement(
      { startAngle: initAngle, endAngle },
      item,
      { x, y },
      { innerRadius: radius, outerRadius: outerRadius },
      { labelSize, labelColor }
    )

    container.appendChild(currentBoxElement)
    initAngle = endAngle
  })

  const htmlContainerElement = getHtmlContainerElement(
    { x, y },
    radius,
    imgUrl,
    title,
    titleColor
  )
  const backgroundCircle = getCircle({ x, y }, radius, backgroundColor)

  container.appendChild(backgroundCircle)
  container.appendChild(htmlContainerElement)

  const root = createElement('svg', [
    ['width', totalSize],
    ['height', totalSize]
  ])
  root.appendChild(container)
  // return root.outerHTML
  return root
}
