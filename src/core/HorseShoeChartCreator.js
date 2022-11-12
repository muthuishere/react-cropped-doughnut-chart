import {
  createElement,
  createGroupElement,
  createSVGRoot
} from './builder/elements'

import { formatItems } from './shared/formatter'
import {
  createHoverFilter,
  getBorderAnimation,
  getCenterTitleAnimation
} from './components/Animator'
import {
  chartStyles, hoverStyles,
  sizeWithAngles,
  thicknessWithRatio
} from "./shared/config";
import { getSliceElement } from './components/Slice'
import { getTitleContainer } from './components/TitleContainer'

function getPoint(totalSize) {
  const x = totalSize / 2
  const y = totalSize / 2
  return { x, y }
}

function getChartStyleElement({showGlow}) {

  let result ="";
  if(showGlow)
    result = hoverStyles ;

  const styleElement = createElement('style', [])
  styleElement.innerHTML = result + chartStyles
  return styleElement
}

export function HorseShoeChartCreator(items, options) {
  // insertStyles(chartStyles);
  const defaultOptions = {
    radius: 100,
    showAnimation: false,
    animationDurationInSeconds: 5,
    title: '',
    titleColor: '#FF0000',
    thicknessSize: 'M',
    gapSize: 'XL',
    showGlow: false,
    labelSize: 12,
    labelColor: 'white',
    backgroundColor: 'white',
    imageUrl:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  const mergedOptions = { ...defaultOptions, ...options }
  const formattedOptions = {
    ...mergedOptions,
    showAnimation: String(mergedOptions.showAnimation) === 'true',
    showGlow: String(mergedOptions.showGlow) === 'true',
    radius: Number(mergedOptions.radius),
    animationDurationInSeconds: Number(
      mergedOptions.animationDurationInSeconds
    ),
    labelSize: Number(mergedOptions.labelSize)
  }

  const {
    radius,
    title,
    showGlow,
    thicknessSize,
    showAnimation,
    animationDurationInSeconds,
    gapSize,
    backgroundColor,
    imageUrl,
    titleColor,
    labelSize,
    labelColor
  } = formattedOptions
  const thicknessOfCircle = thicknessWithRatio[thicknessSize]
  const totalSize = (radius + thicknessOfCircle) * 2

  const { x, y } = getPoint(totalSize)

  const outerRadius = radius + thicknessOfCircle
  const sizeWithAngle = sizeWithAngles[gapSize]
  const [startAngle, endAngle] = sizeWithAngle
  const total = (endAngle - startAngle) / 100
  const percentageToDegree = (percent) => percent * total

  const container = createGroupElement()

  const centerTitleContainer = getTitleContainer(
    { x, y },
    radius,
    imageUrl,
    title,
    titleColor
  )

  container.appendChild(centerTitleContainer)

  let currentAngle = startAngle

  const formattedItems = formatItems(items, labelColor)

  if (showGlow) {
    console.log('showGlow')
    const filterElement = createHoverFilter()
    container.appendChild(filterElement)
  }
  formattedItems.forEach((item, index) => {
    const { percentage, id, previousId } = item
    const endAngle = currentAngle + percentageToDegree(percentage)

    const currentBoxElement = getSliceElement(
      { startAngle: currentAngle, endAngle },
      item,
      {
        x,
        y
      },
      { innerRadius: radius, outerRadius: outerRadius },
      { labelSize, labelColor },
      { id, previousId }
    )

    container.appendChild(currentBoxElement)
    currentAngle = endAngle
  })

  if (showAnimation) {
    const borderAnimation = getBorderAnimation(
      { x, y },
      {
        innerRadius: radius,
        outerRadius: outerRadius
      },
      { startAngle, endAngle: currentAngle },
      backgroundColor,
      animationDurationInSeconds
    )
    container.appendChild(borderAnimation)

    const centerTitleAnimation = getCenterTitleAnimation(
      { x, y },
      radius,
      backgroundColor,
      animationDurationInSeconds
    )
    container.appendChild(centerTitleAnimation)
    centerTitleAnimation.querySelector('animate').onend = () => {
      container.removeChild(centerTitleAnimation)
      container.removeChild(borderAnimation)
    }
  }

  const root = createSVGRoot(totalSize)
  const styleElement = getChartStyleElement({ showGlow })
  root.appendChild(styleElement)
  root.appendChild(container)

  return root
}
