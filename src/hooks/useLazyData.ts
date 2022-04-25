import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface IApiFunc {
  (): Promise<any>
}

export default function useLazyData(target: any, apiFunc: IApiFunc) {
  const goods = ref<any[]>([])

  const { stop } = useIntersectionObserver(target, async ([{ isIntersecting }], observerElement) => {
    // 滑到可视区在加载数据
    if (isIntersecting) {
      stop()
      const res = await apiFunc()
      goods.value = res.result
    }
  })

  return goods
}
