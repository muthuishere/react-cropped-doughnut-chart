import { createElement, insertStyles } from "./elements";
import { getHtmlContainerElement } from "./HtmlContainerElement";
import { getSliceElement } from "./SliceElement";
import { formatItems } from "./formatter";


const thicknessWithRatio = {
  XXL: 150,
  XL: 125,
  L: 100,
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


  let initAngle = startAngle

  const formattedItems = formatItems(items, labelColor)


  formattedItems.forEach((item, index) => {
    const { label, value, color, percentage,id } = item


    const endAngle = initAngle + percentageToDegree(percentage)

    const currentBoxElement = getSliceElement({ startAngle: initAngle, endAngle }, item, {
      x,
      y
    }, { innerRadius: radius, outerRadius: outerRadius }, { labelSize, labelColor },
      {
      id: "2",
      previousId: "1"
    }
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

  // container.appendChild(backgroundCircle)
  container.appendChild(htmlContainerElement)

  const root = createElement('svg', [
    ['width', totalSize],
    ['height', totalSize]
  ])
  root.appendChild(container)
  // return root.outerHTML
  return root
}
