import {
  formatItems,
  formatSliceId,
  formatSlicePreviousId,
  formatToArrayOfObjects
} from "./formatter";

// import * as formatter from "./formatter"
import { getRandomSixDigitString } from "./randomizer";
jest.mock('./randomizer');
// let getRandomSixDigitStringSpy;


const DEFAULT_RANDOM_VALUE = '123456';

// function mockRandomSixDigitString() {
//    getRandomSixDigitStringSpy = jest.spyOn(formatter, "getRandomSixDigitString");
//   getRandomSixDigitStringSpy.mockImplementation(() => {
//     return DEFAULT_RANDOM_VALUE;
//   });
//
// }





describe('formatItems Specification', function () {

  // beforeAll(() => {
  //   console.log("before all")
  //   mockRandomSixDigitString()
  // });
  //
  // afterAll(() => {
  //   console.log("afterAll all")
  //   getRandomSixDigitStringSpy.mockRestore()
  // });

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
      const result = formatItems(input, "white").map(({ percentage }) => percentage)
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
      const result = formatItems(input, "white").map(({ label }) => label)
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
      const result = formatItems(input, "white").map(({ color }) => color)
      expect(result).toEqual(expected)
    })
  })
  test('formatItems should work fine for labelColor or set DefaultColor', function () {
    const defaultLabelColor = 'white'
    const allTests = [
      {
        input: [
          { label: '23', value: 50 , color: 'blue',labelColor:'red'},
          { label: '25', value: 100, color: 'blue' },
          { value: 50 }
        ],
        expected: ['red', 'white', 'white']
      }
    ]

    allTests.forEach(({ input, expected }) => {
      const result = formatItems(input, defaultLabelColor).map(
        ({ labelColor }) => labelColor
      )
      expect(result).toEqual(expected)
    })
  })


  test('getRandomSixDigitString should be mocked', function () {

    expect(getRandomSixDigitString()).toBe(DEFAULT_RANDOM_VALUE)

  })
  test('formatItems should work fine for id generation random', function () {

    const allTests = [
      {
        input: [
          { label: '23', value: 50 , color: 'blue',labelColor:'red'},
          { label: '25', value: 100, color: 'blue' },
          { value: 50 }
        ],
        expected:   [
          { previousId: null, id: '50123456' },
          { previousId: '50123456', id: '100123456' },
          { previousId: '100123456', id: '50123456' }
        ]
      }
    ]

    allTests.forEach(({ input, expected }) => {


      const formattedItems = formatItems(input, "white")

      const result = formattedItems.map(formatSliceId).map(formatSlicePreviousId).map(({ previousId,id }) => ({ previousId,
        id}))

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
      const result = formatItems(input, "white").map(({ value }) => value)
      expect(result).toEqual(expected)
    })
  })
  test('formatItems should throw error for invalid Data', function () {

    const input = [{"m":23},{"m":45},{"m":54}]

    const t = () => {
      formatItems(input, "white")
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
