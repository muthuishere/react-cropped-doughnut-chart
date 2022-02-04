import {
  calculatePercentage,
  drawingCoordinatesinCircle,
  polarToCartesian
} from './calculations'

function assertNumericEquals(actual, expected) {
  expect(Math.floor(actual)).toBe(expected)
}

describe('PolarToCartesian Specification', function () {
  function assertPolarCartisian(
    [centerX, centerY, radius, angleInDegrees],
    [expectedX, expectedY]
  ) {
    const { x, y } = polarToCartesian(centerX, centerY, radius, angleInDegrees)
    assertNumericEquals(x, expectedX)
    assertNumericEquals(y, expectedY)
  }

  test('polarToCartesian should work fine', function () {
    const allTests = [
      { input: [100, 100, 80, 45], expected: [156, 43] },
      { input: [100, 100, 80, 180], expected: [100, 180] },
      { input: [100, 100, 270, 45], expected: [290, -91] }
    ]
    allTests.forEach(({ input, expected }) => {
      assertPolarCartisian(input, expected)
    })
  })
})

describe('drawingCoordinatesinCircle Specification', function () {
  function assertPathAttributeForArc(
    [centerX, centerY, radius, startAngle, endAngle],
    expectedResult
  ) {
    const result = drawingCoordinatesinCircle(
      { x: centerX, y: centerY },
      { startAngle, endAngle },
      radius
    )

    expect(result).toEqual(expectedResult)
  }

  test('drawingCoordinatesinCircle should work fine', function () {
    const allTests = [
      {
        input: [100, 100, 80, 45, 90],
        expected:
          'M 180 100 A 80 80 0 0 0 156.5685424949238 43.4314575050762 L 100 100 L 180 100'
      },
      {
        input: [100, 100, 80, 180, 270],
        expected:
          'M 20 100.00000000000001 A 80 80 0 0 0 100 180 L 100 100 L 20 100.00000000000001'
      },
      {
        input: [100, 100, 270, 45, 330],
        expected:
          'M -35.000000000000114 -133.82685902179838 A 270 270 0 1 0 290.91883092036784 -90.91883092036781 L 100 100 L -35.000000000000114 -133.82685902179838'
      }
    ]
    allTests.forEach(({ input, expected }) => {
      assertPathAttributeForArc(input, expected)
    })
  })
})
