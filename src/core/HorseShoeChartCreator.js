import { createElement, insertStyles } from "./builder/elements";

import { formatItems } from "./shared/formatter";
import { getBorderAnimation, getCenterTitleAnimation } from "./components/Animator";
import { chartStyles, sizeWithAngles, thicknessWithRatio } from "./shared/config";
import { getSliceElement } from "./components/Slice";
import { getTitleContainer } from "./components/TitleContainer";


export function HorseShoeChartCreator(items, options) {
  insertStyles(chartStyles);
  const defaultOptions = {
    radius: 100,
    showAnimation: true,
    animationDurationInSeconds:2,
    title: "",
    titleColor: "#FF0000",
    thicknessSize: "M",
    gapSize: "XL",
    labelSize: 12,
    labelColor: "white",
    backgroundColor: "white",
    imgUrl:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  };

  const formattedOptions = { ...defaultOptions, ...options };

  const {
    radius,
    title,
    thicknessSize,
    showAnimation,
    animationDurationInSeconds,
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
  const percentageToDegree = (percent) => percent * total;

  const container = createElement("g", []);


  let currentAngle = startAngle;

  const formattedItems = formatItems(items, labelColor);


  formattedItems.forEach((item, index) => {
    const { label, value, color, percentage, id, previousId } = item;


    const endAngle = currentAngle + percentageToDegree(percentage);

    const currentBoxElement = getSliceElement(
      { startAngle: currentAngle, endAngle },
      item,
      { x, y },
      { innerRadius: radius, outerRadius: outerRadius },
      { labelSize, labelColor },
      { id, previousId }
    );

    container.appendChild(currentBoxElement);
    currentAngle = endAngle;
  });

  const htmlContainerElement = getTitleContainer(
    { x, y },
    radius,
    imgUrl,
    title,
    titleColor
  );


  container.appendChild(htmlContainerElement);


  if (showAnimation) {


    const borderAnimation = getBorderAnimation({ x, y }, {
      innerRadius: radius,
      outerRadius: outerRadius
    }, { startAngle, endAngle: currentAngle }, backgroundColor,animationDurationInSeconds);
    container.appendChild(borderAnimation);


    const centerTitleAnimation = getCenterTitleAnimation({ x, y }, radius, backgroundColor,animationDurationInSeconds);
    container.appendChild(centerTitleAnimation);
    centerTitleAnimation.querySelector("animate").onend = () => {
      // animatedMaskCircle.parent.removeChild(animatedMaskCircle);
      console.log("animate end")
      container.removeChild(centerTitleAnimation);
      container.removeChild(borderAnimation);
    }

  }


  const root = createElement("svg", [
    ["width", totalSize],
    ["height", totalSize]
  ]);
  root.appendChild(container);

  return root;
}
