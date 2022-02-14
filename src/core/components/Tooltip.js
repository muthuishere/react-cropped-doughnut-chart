import { createHtmlElement } from "../builder/elements";

const TOOL_TIP_CLASS = "horse-chart-tooltip";
const getToolTipElement = () => document.querySelector("." + TOOL_TIP_CLASS);

function createToolTipElement() {

  const tooltipElement = createHtmlElement("div", [
    ["class", TOOL_TIP_CLASS],
    [
      "style",
      "position: absolute; display: block;background: cornsilk;  border: 1px solid black;  border-radius: 5px;  padding: 5px;  z-index: 1002;"
    ]
  ]);
  document.body.appendChild(tooltipElement);
  return tooltipElement;
}

export function onTooltipMouseOver(evt, label) {
  let tooltipElement = getToolTipElement();
  if (tooltipElement == null) {
    tooltipElement = createToolTipElement();
  }

  if (label === tooltipElement.innerHTML) {
    return
  }
  console.log("changing tooltip", label);
  tooltipElement.style.left = evt.clientX + "px";
  tooltipElement.style.top = (evt.clientY-20) + "px";
  tooltipElement.innerHTML = label;
}

export function onToolTipMouseOut(evt) {

  const element = getToolTipElement();
  if (element) {
    document.body.removeChild(element);
  }


}

export function setupToolTips(label, container) {

  const onTooltipMouseOverFunc = (evt) => onTooltipMouseOver(evt, label);
  container.addEventListener("mouseover", onTooltipMouseOverFunc);
  container.addEventListener("mouseout", onToolTipMouseOut);
}
