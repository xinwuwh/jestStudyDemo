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
