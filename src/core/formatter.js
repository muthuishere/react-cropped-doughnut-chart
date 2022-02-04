const colors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#8B00FF'
]
function formatLabel(item) {
  const { label } = item
  if (label) return item
  else
    return {
      ...item,
      label: `${item.value}`
    }
}

function formatColor(item, index) {
  const { color } = item
  if (color) return item
  else
    return {
      ...item,
      color: colors[index]
    }
}

export function formatToArrayOfObjects(inputItems) {
  const isNumber = (currentValue) => typeof currentValue === 'number'
  const isAllNumbers = inputItems.every(isNumber)
  let items = inputItems
  if (isAllNumbers) {
    items = inputItems.map((item) => ({ value: item }))
  }
  return items
}
export function reverseString(str) {
  return str.split("").reverse().join("");
}
export function formatItems(inputItems) {
  const items = formatToArrayOfObjects(inputItems)

  const hasValueProperty = (currentValue) => null != currentValue.value
  const isAllValid = items.every(hasValueProperty)
  if (!isAllValid) {
    throw new Error('Invalid Data Found, All items must have a value property')
  }


  const total = items.reduce((acc, item) => acc + item.value, 0)
  return items
    .map((item) => ({
      ...item,
      percentage: (item.value / total) * 100
    }))
    .map(formatLabel)
    .map(formatColor)
}
