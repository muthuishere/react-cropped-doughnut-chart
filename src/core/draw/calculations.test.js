import { polarToCartesian } from "./calculations";
import { coordinatesForArc } from "./arc";

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

