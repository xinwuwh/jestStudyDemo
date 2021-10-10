# jest

### 安装和初始化

1. 安装和初始化

```js
npm init -y
yarn add jest -D

//使用jest的三种方式
npx jest --version
./node_modules/.bin/jest --version

npx jest
npm run test
//常用CLI命令
npx jest --help
npx jest --coverage
npx jest --verbose 
```

2. 修改package.json

   ```json
   "scripts": {
     "test": "jest"
   },
   ```

3. 使用Babel，确保可以支持ES 6. 添加babel.config.js 文件

```js
// babel.config.js
module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };
```

### 简单例子

test suite 包含多个 test case

describe属于test suite的描述，而每个test 或者it 则描述了每个test case

```js
//math.js file
export const add = (a, b) => a + b
export const multiple = (a, b) => a * b

//引入待测试的功能模块
import { add, multiple } from "./src/math";

//test suite
describe("math.js testing", () => {
  //test case
  it("test add method", () => {
    //testing
    const result = add(3, 4)
    //assertion
    expect(result).toEqual(7)
  })

  test("test add method 2", () => {
    expect(add(1,2)).toEqual(3)
  })

  describe("test suite", () => {
    test("test add method 3", () => {
      expect(add(11,12)).toEqual(23)
    })
  })
})

test("test multiple method 1", () => {
  expect(multiple(1,2)).toEqual(2)
})
```



- beforeAll : 所有的测试用例之前执行，通常放公共部分的代码
- beforeEach：每一个测试用例执行前都会执行



### Mock 与 Spy

Mock测试：对于某些不容易构造或者不容易获取的对象，用一个虚拟的对象来创建以便测试的测试方法

**为什么使用Mock？**

在单元测试中，可能并不需要关心内部调用的方法的执行过程和结果，只想知道它是否被正确调用，甚至会置顶该函数的返回值。

- 捕获函数调用情况
- 设置函数返回值
- 改变函数的内部实现

```js
test("测试jest.fn调用", () => {
  let mockFn = jest.fn()
  let result = mockFn(1,2,3)
  expect(result).toBeUndefined()
  expect(mockFn).toBeCalled()
  expect(mockFn).toBeCalledTimes(1)
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
})
```

#### 情景一： 设置函数的返回值

```js
//单独测试calculate npx jest test/calculate.test.js
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
})``
```

#### 情景二：捕获函数调用情况

```js
const bot = {
  sayHello: name => {
    console.log(`Hello${name}!`)
  }
}

describe("test bot object", () => {
  it("should say hello to the name", () => {
    const spy = jest.spyOn(bot, "sayHello")
    bot.sayHello("itheima")
    expect(spy).toHaveBeenCalledWith("itheima")
  })
})
```



#### 情景三：修改函数内容的实现

jest.spyOn

jest.spyOn().mockImplementation

spy.mockRestore()

```js
const bot = {
  sayHello: name => {
    console.log(`Hello${name}!`)
  }
}

describe("test bot object", () => {
  it("should say hello to the name", () => {
    const spy = jest.spyOn(bot, "sayHello").mockImplementation(name => {
      console.log(`Hello mix ${name}`)
    })
    bot.sayHello("itheima")
    expect(spy).toHaveBeenCalledWith("itheima")
    //还原被Mock修改的方法
    spy.mockRestore()
  })

  it("should be hello name", () => {
    //必须用jest mock 或者 spy方法来调用function
    const spy = jest.spyOn(bot, "sayHello")
    bot.sayHello("candice")
    expect(bot.sayHello).toHaveBeenCalled()
  })
})
```

