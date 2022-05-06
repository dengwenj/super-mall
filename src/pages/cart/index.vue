<script setup lang="ts">
import { computed } from 'vue'
import { ElInputNumber, ElCheckbox, ElPopconfirm, ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

import { useStore } from '@/store'

import GoodRelevant from '@/pages/goods/components/goods-relevant/index.vue'
import WwButton from '@/components/lib/WwButton.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import CartNone from './components/cart-none/index.vue'
import CartSku from './components/cart-sku/index.vue'

import type { IListItem } from '@/store/modules/cart/types'

const router = useRouter()
const store = useStore()
const getters = computed(() => store.getters)

/**
 * 处理函数
 */
// 单选
const handleChange = (skuId: string, selected: boolean) => {
  store.dispatch('cart/updateGoods', { skuId, selected: !selected })
}

// 是否全选
const handleCheckAll = () => {
  if (getters.value['cart/validList'].length) {
    store.dispatch('cart/updateGoods', { selected: !getters.value['cart/isCheckAll'] })
  }
}

// 删除商品
const handleRemove = (skuId: string) => {
 store.dispatch('cart/removeGoods', skuId)
}

// 批量删除商品
const handleBatchRemoveGoods = async (isClearInvalidGoods: boolean) => {
  if (getters.value['cart/validList'].length) {
    if (!isClearInvalidGoods) {
      ElMessage.success(await store.dispatch('cart/batchRemoveGoods'))
    }
  }

  if (getters.value['cart/invalidList'].length) {  
    if (isClearInvalidGoods) {
      ElMessage.success(await store.dispatch('cart/batchRemoveGoods', isClearInvalidGoods))
    }
  }
}

// 数量选择
const handleInputNumber = (skuId: string, currentValueOrEvent: any) => {
  if (currentValueOrEvent?.target?.value) {
    store.dispatch('cart/updateGoods', { skuId, count: currentValueOrEvent.target.value})
    return
  }

  store.dispatch('cart/updateGoods', { skuId, count: currentValueOrEvent })
}

// 修改规格
const updateCartSku = (oldSkuId: string, newSku: any) => {
  store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
}

// 点击下单
const handleCheckOut = () => {
  if (!store.getters['cart/selectedList'].length) {
    return ElMessage.warning('您还没有勾选要下单的商品~')
  }

  // 没有登录，弹出层
  if (!store.state.user.profile?.token) {
    ElMessageBox.confirm(
      '下单结算需要登录，去登录吗?',
      '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
    )
      .then(() => {
        // 点击确定要做的事
        router.push('/authorize/settlement')
      })
      .catch(() => {})
    }
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container">
      <Breadcrumb :breadcrumb="[{ path: '/', name: '首页' }, { name: '购物车' }]"></Breadcrumb>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <ElCheckbox @change="handleCheckAll" :model-value="getters['cart/isCheckAll']" label="全选" size="large" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="!getters['cart/validList'].length">
              <td colspan="6"><CartNone /></td>
            </tr>
            <tr v-for="item in getters['cart/validList']" :key="item.skuId">
              <td><ElCheckbox @change="handleChange(item.skuId, item.selected)" :model-value="item.selected" size="large" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"><img :src="item.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <!-- 选择规格组件 -->
                    <CartSku @change="e => updateCartSku(item.skuId, e)" :skuId="item.skuId" :attrsText="item.attrsText" />
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">比加入时降价 <span class="red">&yen;{{ item.price - item.nowPrice }}</span></p>
              </td>
              <td class="tc">
                <ElInputNumber 
                  @change="(currentValue) => handleInputNumber(item.skuId, currentValue)"
                  :min="1"
                  :max="item.stock" 
                  :model-value="item.count"
                  @blur="(e) => handleInputNumber(item.skuId, e)"
                />
              </td>
              <td class="tc"><p class="f16 red">&yen;{{ (item.nowPrice * item.count).toFixed(2) }}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <ElPopconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  placement="bottom"
                  title="确定删除吗？"
                  :width="200"
                  trigger="click"
                  @confirm="handleRemove(item.skuId)"
                >
                  <template #reference>
                    <p><a class="green" href="javascript:;">删除</a></p>
                  </template>
                </ElPopconfirm>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="getters['cart/invalidList'].length">
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="item in getters['cart/invalidList']" :key="item.skuId">
              <td><ElCheckbox size="large" style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"><img :src="item.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;{{ item.price }}</p></td>
              <td class="tc">1</td>
              <td class="tc"><p>&yen;{{ item.nowPrice }}</p></td>
              <td class="tc">
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <ElCheckbox @change="handleCheckAll" :model-value="getters['cart/isCheckAll']" label="全选" size="large" />
          <ElPopconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            placement="bottom"
            title="确定删除选中的商品吗？"
            :width="200"
            trigger="click"
            @confirm="handleBatchRemoveGoods(false)"
          >
            <template #reference>
              <a href="javascript:;">删除商品</a>
            </template>
          </ElPopconfirm>
          <a href="javascript:;">移入收藏夹</a>
          <ElPopconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            placement="bottom"
            title="确定清空失效的商品吗？"
            :width="200"
            trigger="click"
            @confirm="handleBatchRemoveGoods(true)"
          >
            <template #reference>
              <a href="javascript:;">清空失效商品</a>
            </template>
          </ElPopconfirm>
        </div>
        <div class="total">
          共 {{ getters['cart/validTotal'] }} 件商品，已选择 {{ getters['cart/selectedTotal'] }} 件，商品合计：
          <span class="red">¥{{ getters['cart/selectedAllPrice'] }}</span>
          <WwButton @click="handleCheckOut" type="primary">下单结算</WwButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @themeColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>