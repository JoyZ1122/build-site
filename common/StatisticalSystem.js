MyPlugin.install = function (Vue, options) {
    Vue.prototype.$BuriedPoint = function (id, btnText) {
        console.log('countAdd id', id)
        console.log('countAdd btnText', btnText)
    }
  }