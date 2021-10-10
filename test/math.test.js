//引入待测试的功能模块
import { add, multiple } from "../src/math";

//test suite
describe("math.js testing", () => {
  let a, b;
  beforeAll(() => {
    a = 2
    b = 3
  })

  beforeEach(() => {
    console.log(a, b);
  })

  //test case
  it("test add method", () => {
    //testing
    const result = add(a, b)
    //assertion
    expect(result).toEqual(5)
  })
  test("test multiple method 1", () => {
  expect(multiple(a,b)).toEqual(6)
  })
})

