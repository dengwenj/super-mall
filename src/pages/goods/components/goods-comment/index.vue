<script setup lang="ts">
import { onMounted, ref, inject, defineEmits, onUpdated } from 'vue'
import { ElPagination } from 'element-plus'
import axios from 'axios'

import GoodsCommentImage from './components/goods-comment-image/index.vue'

const goods: Record<string, any> | undefined = inject('goods')

const initNewHot = ['默认', '最新', '最热']
const activeByIdx = ref(0)
const initNewHotBuIdx = ref(0)
const evaluateComment = ref<any>(null)
const evaluatePageComment = ref<any>(null)

const emit = defineEmits<{
  (e: 'evaluateCount', evaluateCount: number): void
}>()

onMounted(async () => {
  const { data: { result } } = await axios.get(`https://mock.boxuegu.com/mock/1175/goods/${goods?.id}/evaluate`)
  result.tags.unshift({ title: '全部评论', tagCount: result.evaluateCount }, { title: '有图', tagCount: result.hasPictureCount })
  evaluateComment.value = result
  emit('evaluateCount', evaluateComment.value.evaluateCount)
})

async function requst(params: Record<string, any>) {
  const res = await axios.get(`https://mock.boxuegu.com/mock/1175/goods/${goods?.id}/evaluate/page`, {
    params
  })
  evaluatePageComment.value = (await res).data.result
}

onMounted(() => {
  requst({
    page: 1,
    pageSize: 10
  })
})

const handleCurrentChange = (currentChange: number) => {
  requst({
    page: currentChange,
    pageSize: 10
  })
}

const handleClickSort = (idx: number, sortField: string) => {
  initNewHotBuIdx.value = idx

  requst({
    page: 1,
    package: 10,
    sortField
  })
}

const handleClickTags = (idx: number, title: string) => {
  activeByIdx.value = idx

  let hasPicture = false
  let paramsKey
  if (title === '有图') {
    hasPicture = true
    paramsKey = 'hasPicture'
  } else {
    paramsKey = 'tags'
  }

  requst({
    page: 1,
    pageSize: 10,
    [paramsKey]: hasPicture ? hasPicture : title
  })
}
</script>

<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p><span>{{ evaluateComment?.salesCount }}</span><span>人购买</span></p>
        <p><span>{{ evaluateComment?.praisePercent }}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, index) in evaluateComment?.tags" 
            :key="item.title"
            :class="activeByIdx === index ? 'active' : ''"
            @click="handleClickTags(index, item.title)"
          >
            {{ item.title }}({{ item.tagCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a 
        :class="initNewHotBuIdx === index ? 'active' : ''" 
        v-for="(item, index) in initNewHot" 
        :key="item"
        @click="handleClickSort(index, index === 1 ? 'createTime' : index === 2 ? 'praiseCount' : '')"
      >
        {{ item }}
      </a>
    </div>
    <!-- 列表 -->
    <div class="list" v-if="evaluatePageComment">
      <div class="item" v-for="item in evaluatePageComment.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{ item.member.nickname }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01" 
              v-for="itex in item.score"
              :key="itex"
            />
            <i 
              class="iconfont icon-wjx02" 
              v-for="itey in 5 - item?.score" 
              :key="itey"
            />
            <span class="attr">
              <span style="margin-right: 10px;" v-for="itez in item.orderInfo.specs" :key="itez.name">
                {{itez.name}}: {{ itez.nameValue }}
              </span>
            </span>
          </div>
          <div class="text">{{ item.content }}</div>
          <GoodsCommentImage :pictures="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <ElPagination
      v-if="evaluatePageComment"
      background
      layout="prev, pager, next"
      :total="evaluatePageComment.counts"
      class="pagination"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          &:hover {
            border-color: @themeColor;
            background: lighten(@themeColor,50%);
            color: @themeColor;
          }
          &.active {
            border-color: @themeColor;
            background: @themeColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      cursor: pointer;
      &.active,&:hover {
        color: @themeColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
  .pagination {
    justify-content: center;
    padding: 20px 0;
  }

  /deep/ .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
    background-color: @themeColor;
  }
}
</style>
