import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface IApiFunc {
  (props?: any): Promise<any>
}

export default function useLazyData<T = any>(apiFunc: IApiFunc, props?: T) {
  const goods = ref<any[]>([])
  const target = ref()

  const { stop } = useIntersectionObserver(target, async ([{ isIntersecting }], observerElement) => {
    // 滑到可视区在加载数据
    if (isIntersecting) {
      stop()
      let res
      if (props) {
        res = await apiFunc(props)
        goods.value = res.result
        return
      }
      res = await apiFunc()
      goods.value = res.result
    }
  }, { threshold: 0 })

  return [target, goods]
}
