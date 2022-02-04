import { formatItems, formatToArrayOfObjects } from "./formatter";

describe('formatItems Specification', function () {
  test('formatItems should work fine for calculating percentage', function () {
    const allTests = [
      {
        input: [
          { label: '23', value: 50, color: 'red' },
          { label: '25', value: 100, color: 'blue' },
          { label: '49', value: 50, color: 'pink' }
        ],
        expected: [25, 50, 25]
      }
    ]
    allTests.forEach(({ input, expected }) => {
      const result = formatItems(input).map(({ percentage }) => percentage)
      expect(result).toEqual(expected)
    })
  })

  test('formatItems should work fine for label', function () {
    const allTests = [
      {
        input: [
          { label: '23', value: 50, color: 'red' },
          { label: '25', value: 100, color: 'blue' },
          { value: 50, color: 'pink' }
        ],
        expected: ['23', '25', '50']
      }
    ]
    allTests.forEach(({ input, expected }) => {
      const result = formatItems(input).map(({ label }) => label)
      expect(result).toEqual(expected)
    })
  })

  test('formatItems should work fine for color', function () {
    const allTests = [
      {
        input: [
          { label: '23', value: 50 },
          { label: '25', value: 100, color: 'blue' },
          { value: 50 }
        ],
        expected: ['#FF0000', 'blue', '#FFFF00']
      }
    ]

    allTests.forEach(({ input, expected }) => {
      const result = formatItems(input).map(({ color }) => color)
      expect(result).toEqual(expected)
    })
  })
  test('formatItems should work fine for number array', function () {
    const allTests = [
      {
        input:[23,45,54]
        ,
        expected:[23,45,54]
      }
    ]

    allTests.forEach(({ input, expected }) => {
      const result = formatItems(input).map(({ value }) => value)
      expect(result).toEqual(expected)
    })
  })
  test('formatItems should throw error for invalid Data', function () {

    const input = [{"m":23},{"m":45},{"m":54}]

    const t = () => {
      formatItems(input)
    };
    expect(t).toThrow(Error);


  })
})



describe('format array of objects Specification', function () {
  test('format array of objects should work fine for array of numbers', function () {
    const allTests = [
      {
        input: [23,45,54],
        expected: [ {  value: 23 },{  value: 45 },{  value: 54 },]
      }
    ]
    allTests.forEach(({ input, expected }) => {
      const result = formatToArrayOfObjects(input)
      expect(result).toEqual(expected)
    })
  })
  test('format array of objects should work fine for array of objects', function () {
    const allTests = [
      {
        input: [{  value: 23 },{  value: 45 },{  value: 54 }],
        expected: [ {  value: 23 },{  value: 45 },{  value: 54 },]
      }
    ]
    allTests.forEach(({ input, expected }) => {
      const result = formatToArrayOfObjects(input)
      expect(result).toEqual(expected)
    })
  })

})
