import { createElement, createHtmlElement, SVG_NAMESPACE } from "./elements";

function assertNumericEquals(actual, expected) {
  expect(Math.floor(actual)).toBe(expected)
}

function getAttributesAsArrayOfArray(el) {
  const arr = []
  for (let i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
    arr.push([atts[i].nodeName, atts[i].nodeValue])
  }
  return arr
}

describe('Element  Specification', function () {


  test('createElement should work fine', function () {
    const allTests = [
      { name: 'path', attribs: [['id', 'x']], expected: [['id', 'x']] },
      {
        name: 'line',
        attribs: [
          ['id', 'x'],
          ['size', 1]
        ],
        expected: [
          ['id', 'x'],
          ['size', '1']
        ]
      },
      { name: 'circle', attribs: [], expected: [] }
    ]
    allTests.forEach(({ name, attribs, expected }) => {
      const el = createElement(name, attribs)
      const attributesAsArrayOfArray = getAttributesAsArrayOfArray(el)

      expect(attributesAsArrayOfArray).toEqual(expected)
      expect(el.nodeName).toEqual(name)
      expect(el.namespaceURI).toEqual(SVG_NAMESPACE)
    })
  })


  test('createHtmlElement should work fine', function () {
    const allTests = [
      { name: 'div', attribs: [['id', 'x']], expected: [['id', 'x']] },
      {
        name: 'span',
        attribs: [
          ['id', 'x'],
          ['size', 1]
        ],
        expected: [
          ['id', 'x'],
          ['size', '1']
        ]
      },
      { name: 'main', attribs: [], expected: [] }
    ]
    const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";

    allTests.forEach(({ name, attribs, expected }) => {
      const el = createHtmlElement(name, attribs)
      const attributesAsArrayOfArray = getAttributesAsArrayOfArray(el)

      expect(attributesAsArrayOfArray).toEqual(expected)
      expect(el.nodeName).toEqual(name.toUpperCase())

      expect(el.namespaceURI).toBe(HTML_NAMESPACE)
    })
  })
})
