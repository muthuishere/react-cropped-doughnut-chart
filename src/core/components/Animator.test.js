import { createHoverFilter } from "./Animator";


describe('createHoverFilter  Specification', function () {


  test('createHoverFilter should generate filter with id', function () {
    const el = createHoverFilter("lightfilter")

      expect(el.nodeName).toEqual("defs")
      expect(el.querySelector("#lightfilter")).not.toBeNull()
      expect(el.querySelector("feGaussianBlur")).not.toBeNull()


  })


})
