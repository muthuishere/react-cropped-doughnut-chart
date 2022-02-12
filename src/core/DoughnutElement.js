import { createElement, insertStyles } from "./builder/elements";
import { getHtmlContainerElement } from "./components/HtmlContainerElement";
import { getSliceElement } from "./components/SliceElement";
import { formatItems } from "./shared/formatter";
import { getBorderAnimation, getCenterTitleAnimation } from "./components/Animations";
import { chartStyles, sizeWithAngles, thicknessWithRatio } from "./shared/config";


export function DoughnutElement(items, options) {
  insertStyles(chartStyles);
  const defaultOptions = {
    radius: 100,
    showAnimation: true,
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

  const htmlContainerElement = getHtmlContainerElement(
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
    }, { startAngle, endAngle: currentAngle }, backgroundColor);
    container.appendChild(borderAnimation);

    const centerTitleAnimation = getCenterTitleAnimation({ x, y }, radius, backgroundColor);
    container.appendChild(centerTitleAnimation);


  }


  const root = createElement("svg", [
    ["width", totalSize],
    ["height", totalSize]
  ]);
  root.appendChild(container);

  return root;
}
