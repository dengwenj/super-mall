import { defineComponent, ref } from 'vue'
import { ElPagination } from 'element-plus'

import { orderStatus } from '@/global/constants'
import './index.less'

import WwTabs from '@/components/WwTabs'
import WwTabsPanel from '@/components/WwTabs/panel'
import WwButton from '@/components/lib/WwButton.vue'

export default defineComponent(function Order() {
  const active = ref('all')

  const updateActive = (name: string) => {
    active.value = name
  }

  return () => (
    <div>
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
      <div class="order-list">
        <div class="order-item">
          <div class="head">
            <span>下单时间：2018-01-08 15:02:00</span>
            <span>订单编号：62205697599</span>
            <span class="down-time">
              <i class="iconfont icon-down-time"></i>
              <b>付款截止：28分20秒</b>
            </span>
          </div>
          <div class="body">
            <div class="column goods">
              <ul>
                {
                  [1, 2, 3].map((item) => {
                    return (
                      <li key={item}>
                        <a class="image" href="javascript:;">
                          <img src="https://yanxuan-item.nosdn.127.net/f7a4f643e245d03771d6f12c94e71214.png" alt="" />
                        </a>
                        <div class="info">
                          <p class="name ellipsis-2">原创设计一体化机身,精致迷你破壁机350mL</p>
                          <p class="attr ellipsis">
                            <span>颜色：绿色</span>
                            <span>尺寸：10寸</span>
                          </p>
                        </div>
                        <div class="price">¥9.50</div>
                        <div class="count">x1</div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div class="column state">
              <p>待付款</p>
            </div>
            <div class="column amount">
              <p class="red">¥19.00</p>
              <p>（含运费：¥10.00）</p>
              <p>在线支付</p>
            </div>
            <div class="column action">
              <WwButton type="primary" size="small">立即付款</WwButton>
              <p><a href="javascript:;">查看详情</a></p>
              <p><a href="javascript:;">取消订单</a></p>
            </div>
          </div>
        </div>
              <div class="order-item">
          <div class="head">
            <span>下单时间：2018-01-08 15:02:00</span>
            <span>订单编号：62205697599</span>
            <a href="javascript:;" class="del">删除</a>
          </div>
          <div class="body">
            <div class="column goods">
              <ul>
                <li>
                  <a class="image" href="javascript:;">
                    <img src="https://yanxuan-item.nosdn.127.net/f7a4f643e245d03771d6f12c94e71214.png" alt="" />
                  </a>
                  <div class="info">
                    <p class="name ellipsis-2">原创设计一体化机身,精致迷你破壁机350mL</p>
                    <p class="attr ellipsis">
                      <span>颜色：绿色</span>
                      <span>尺寸：10寸</span>
                    </p>
                  </div>
                  <div class="price">¥9.50</div>
                  <div class="count">x1</div>
                </li>
              </ul>
            </div>
            <div class="column state">
              <p>已取消</p>
            </div>
            <div class="column amount">
              <p class="red">¥9.50</p>
              <p>（含运费：¥0.00）</p>
            </div>
            <div class="column action">
              <p><a href="javascript:;">查看详情</a></p>
            </div>
          </div>
        </div>

        {/* 分页 */}
        <ElPagination style={{ justifyContent: 'center' }} background layout="prev, pager, next" total={1000} />
      </div>
    </div>
  )
})
