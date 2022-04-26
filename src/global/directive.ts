import logo from '../assets/images/dwjww.png'

import type { App } from "vue"

export default {
  install(app: App) {
    app.directive('lazy', {
      mounted(el: HTMLImageElement, binding) {
        // 做懒加载可以用这个构造函数
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
          // isIntersecting 相交了 为true
          if (isIntersecting) {
            // 进入可视区停止观察
            observer.unobserve(el)
            el.src = binding.value
            el.addEventListener('error', () => {
              // 图片加载失败的情况做些事
              el.src = logo
            })
          }
        }, { threshold: 0 })

        // 开启观察
        observer.observe(el)
      }
    })
  }
}
