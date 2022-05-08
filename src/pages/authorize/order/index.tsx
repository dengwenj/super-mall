import { defineComponent, onMounted, ref } from 'vue'
import { ElPagination } from 'element-plus'

import { getMyOrder } from '@/services/api/order'
import { orderStatus } from '@/global/constants'
import './index.less'

import WwTabs from '@/components/WwTabs'
import WwTabsPanel from '@/components/WwTabs/panel'
import OrderItem from './components/order-item'

export default defineComponent(function Order() {
  const active = ref('all')
  const myOrder = ref()

  onMounted(async () => {
    const res = await getMyOrder({ page: 1, pageSize: 5, orderState: 0 })
    myOrder.value = res.result
  })

  /**
   * 处理函数
   */
  const updateActive = (name: string) => {
    active.value = name
  }
  
  const handleCurrentChange = (current: number) => {
    console.log(11);
    
    getMyOrder({ page: current, pageSize: 5, orderState: 0 }).then((res) => {
      myOrder.value = res.result
    })
  }

  const handleNextOrPrevClick = (val: number) => {
    getMyOrder({ page: val, pageSize: 5, orderState: 0 }).then((res) => {
      myOrder.value = res.result
    })
  }

  return () => (
    <div class='order'>
      <WwTabs active={active.value} updateActive={updateActive}>
        {
          orderStatus.map((item) => {
            return (
              <WwTabsPanel 
                label={`${item.label}`} 
                name={`${item.name}`} 
                key={item.name}
              >
              </WwTabsPanel>
            )
          })
        }
      </WwTabs>

      {/* 订单列表 */}
      {
        myOrder.value && (
          <div class="order-list">
            <OrderItem items={myOrder.value.items} />

            {/* 分页 */}
            <ElPagination 
              style={{ justifyContent: 'center' }} 
              background 
              layout="prev, pager, next"
              page-size={5}
              total={myOrder.value.counts}
              onCurrent-change={handleCurrentChange}
              onNext-click={handleNextOrPrevClick}
              onPrev-click={handleNextOrPrevClick}
            />
          </div>
        )
      }
    </div>
  )
})
