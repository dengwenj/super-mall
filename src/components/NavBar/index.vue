<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElPopover, ElButton } from 'element-plus'

import { useStore } from '@/store'

const visible = ref(false)
const router = useRouter()
const store = useStore()

const token = computed(() => store.state.user.profile?.token)

const handleLoign = () => {
  router.push('/login')
}

const handleLoginout = () => {
  router.push('/login')
  store.commit('user/setUser', null)
  store.commit('user/setRedirectUrl', '/')
  store.commit('cart/setList', [])
  visible.value = true
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="token">
          <li><a href="javascript:;" @click="$router.push('/authorize/my')"><i class="iconfont icon-user"></i>{{store.state.user.profile?.account}}</a></li>
          <el-popover v-model:visible="visible" placement="bottom" :width="160">
            <p style="text-align: center;">确定退出登录吗?</p>
            <div style="text-align: right; margin-top: 10px; ">
              <el-button style="color: #444;" size="small" type="text" @click="visible = false">取消</el-button>
              <el-button style="color: #444;" size="small" type="text" @click="handleLoginout">确定</el-button>
            </div>
            <template #reference>
              <li><a href="javascript:;" @click="visible = true">退出登录</a></li>
            </template>
          </el-popover>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="handleLoign">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="http://dengwj.vip" target="_brank">关于自己</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @themeColor;
        }
      }
      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>