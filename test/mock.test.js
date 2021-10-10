test("测试jest.fn调用", () => {
  let mockFn = jest.fn()
  let result = mockFn(1,2,3)
  expect(result).toBeUndefined()
  expect(mockFn).toBeCalled()
  expect(mockFn).toBeCalledTimes(1)
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
})