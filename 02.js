let b = 2

new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      const a = 1
      a = 2
      throw Error("错误结果");
    } catch (error) {
      console.log(error);
    }
  }, 0);
}).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
})




