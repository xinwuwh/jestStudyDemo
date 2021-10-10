import { getFooBarResult } from "../src/caculate";
import * as foobar from "../src/math";

//mock 两个函数返回值
test("test getFooBarResult logic", () => {
  foobar.getBarResult = jest.fn(() => 10)
  foobar.getFooResult = jest.fn(() => 5)

  const result = getFooBarResult()
  expect(result).toEqual(15)
  expect(foobar.getFooResult).toHaveBeenCalled()
  expect(foobar.getBarResult).toHaveBeenCalled()
})