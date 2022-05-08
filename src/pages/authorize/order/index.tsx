import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { ElPagination } from 'element-plus'

import { getMyOrder } from '@/services/api/order'
import { orderStatus } from '@/global/constants'
import './index.less'

import WwTabs from '@/components/WwTabs'
import WwTabsPanel from '@/components/WwTabs/panel'
import OrderItem from './components/order-item'

export default defineComponent(function Order() {
  const myOrder = ref()
  const myOrderParams = reactive({
    page: 1,
    pageSize: 5,
    orderState: 0
  })
  const isLoading = ref(false)

  watchEffect(async () => {
    isLoading.value = true
    const res = await getMyOrder(myOrderParams)
    
    myOrder.value = res.result
    isLoading.value = false
  })

  /**
   * 处理函数
   */
  const handleUpdateActive = (name: string, idx: number) => {
    myOrderParams.page = 1
    myOrderParams.orderState = idx
  }
  
  const handleCurrentChange = async (current: number) => {
    console.log('点击了这个函数没触发')

    const res = await getMyOrder(myOrderParams)
    myOrder.value = res.result
  }

  const handleNextOrPrevClick = (val: number) => { 
    myOrderParams.page = val
    getMyOrder(myOrderParams).then((res) => {
      myOrder.value = res.result
    })
  }

  const hh = () => {
    console.log('hh');
    
  }

  return () => (
    <div class='order'>
      <WwTabs onUpdateActive={handleUpdateActive}>
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
        isLoading.value ? '加载中...' : ''
      }
      {
        myOrder.value && (
          <div class="order-list">
            <OrderItem items={myOrder.value.items} />

            {/* 分页 */}
            {
              myOrder.value.items.length ? (
                <ElPagination 
                  style={{ justifyContent: 'center' }} 
                  background 
                  layout="prev, pager, next"
                  page-size={myOrderParams.pageSize}
                  total={myOrder.value.counts}
                  onNext-click={handleNextOrPrevClick}
                  onPrev-click={handleNextOrPrevClick}
                  onCurrent-change={handleCurrentChange}
                />
              ) : ''
            }
          </div>
        )
      }
    </div>
  )
})
