import { defineComponent } from 'vue'
import WwTabs from '@/components/WwTabs'

export default defineComponent(function Order() {
  return () => (
    <div>
      <WwTabs a="1" b="2">hhh</WwTabs>
      <router-link to="/authorize/order/1111">订单1</router-link>
      <router-link to="/authorize/order/2222">订单2</router-link>
    </div>
  )
})
