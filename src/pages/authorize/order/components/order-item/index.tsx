import { defineComponent } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { orderStatus } from '@/global/constants'

import WwButton from '@/components/lib/WwButton.vue'
import './index.less'

import type { SetupContext } from 'vue'

export default defineComponent<{ items: any[] }>(function OrderItem(props, ctx: SetupContext) {
  const router = useRouter()

  return () => {
    return (
      <div>
        {
          (ctx.attrs.items as any[]).map((item) => {
            return (
              <div class="order-item" key={item.id}>
                <div class="head">
                  <span>下单时间：{item.createTime}</span>
                  <span>订单编号：{item.id}</span>
                  {
                    item.orderState === 1 && (
                      <span class="down-time">
                        <i class="iconfont icon-down-time"></i>
                        <b>付款截止：28分20秒</b>
                      </span>
                    )
                  }
                  {
                    [5, 6].includes(item.orderState) && <a href="javascript:;" class='del'>删除</a>
                  }
                </div>
                <div class="body">
                  <div class="column goods">
                    <ul>
                      {
                        item.skus.map((item2: any) => {
                          return (
                            <li key={item2.id}>
                              <RouterLink class="image" to={`/product/${item2.spuId}`}>
                                <img src={item2.image} alt="" />
                              </RouterLink>
                              <div class="info">
                                <p class="name ellipsis-2">{item2.name}</p>
                                <p class="attr ellipsis">
                                  {
                                    item2.properties.map((item3: any) => {
                                      return (
                                        <span>{item3.propertyMainName}：{item3.propertyValueName}</span>
                                      )
                                    })
                                  }
                                </p>
                              </div>
                              <div class="price">¥{item2.realPay}</div>
                              <div class="count">x{item2.quantity}</div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div class="column state">
                    <p>{orderStatus[item.orderState].label}</p>
                    { item.orderState === 3 && <a href="javascript:;" class='green'>查看物流</a> }
                    { item.orderState === 4 && <a href="javascript:;" class='green'>评价商品</a> }
                    { item.orderState === 5 && <a href="javascript:;" class='green'>查看评价</a> }
                  </div>
                  <div class="column amount">
                    <p class="red">¥{(item.payMoney as number).toFixed(2)}</p>
                    <p>（含运费：¥{item.postFee.toFixed(2)}）</p>
                    <p>在线支付</p>
                  </div>
                  <div class="column action">
                    {item.orderState === 1 && <WwButton onClick={() => router.push(`/authorize/pay?id=${item.id}`)} type="primary" size="small">立即付款</WwButton>}
                    {item.orderState === 3 && <WwButton type="primary" size="small">确认收货</WwButton>}
                    <p><a href="javascript:;">查看详情</a></p>
                    {item.orderState === 1 && <p><a href="javascript:;">取消订单</a></p>}
                    {[2,3,4,5].includes(item.orderState) && <p><a href="javascript:;">再次购买</a></p>}
                    {[4,5].includes(item.orderState) && <p><a href="javascript:;">申请售后</a></p>}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
})
