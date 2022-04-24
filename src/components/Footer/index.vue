<script setup lang="ts">
import { ref } from 'vue'

const isShowWx = ref(false)
</script>

<template>
  <footer class="app-footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>开发者</dt>
          <dd class="hotline"> <small>由 <a style="color: #e55b29;" href="http://dengwj.vip" target="_brank">邓文杰</a> 独家开发</small></dd>
        </dl>
        <dl>
          <dt>开发者信息</dt>
          <dd><a style="color: #999999;" href="http://dengwj.vip" target="_brank"><img style="margin: 10px 0;" src="../../assets/images/text.png" alt=""><div>个人简介</div></a></dd>
          <dd><a style="color: #999999;" href="https://github.com/dengwenj" target="_brank"><img style="margin: 10px 0;" src="../../assets/images/github.png" alt=""><div>github</div></a></dd>
          <dd><a style="color: #999999;" href="https://www.zhihu.com/people/ni-shuo-bu-zou-de-98" target="_brank"><img style="margin: 10px 0;" src="../../assets/images/zhihu.png" alt=""><div>我的知乎</div></a></dd>
          <dd><a style="color: #999999;" href="https://weibo.com/u/6575004852" target="_branck"><i class="iconfont icon-weibo"></i><div>微博</div></a></dd>
        </dl>
        <dl>
          <dt>开发者微信</dt>
          <dd class="qrcode"><img src="../../assets/images/mywx.jpg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>一起探讨技术</span>
            <a href="javascript:;" @click="() => isShowWx = !isShowWx">加上开发者微信</a>
            <img v-if="isShowWx" class="wx" src="../../assets/images/mywx.jpg" alt="">
          </dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="http://dengwj.vip" target="_brank">关于我们</a>
            <a href="http://dengwj.vip" target="_brank">帮助中心</a>
            <a href="http://dengwj.vip" target="_brank">售后服务</a>
            <a href="http://dengwj.vip" target="_brank">配送与验收</a>
            <a href="http://dengwj.vip" target="_brank">商务合作</a>
            <a href="http://dengwj.vip" target="_brank">搜索推荐</a>
            <a href="http://dengwj.vip" target="_brank">友情链接</a>
          </p>
          <p>dengwj & ww</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='less'>
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 25px;
      display: flex;
      justify-content: center;
    }
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }
      &:hover {
        .iconfont {
          color: @themeColor;
        }
      }
      &:last-child {
        margin-right: 0;
      }
      div {
        &:hover {
          color: @themeColor;
        }
      }
    }
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: @themeColor;
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #333;
  }
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
      &:hover {
        color: @themeColor;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
.wx {
  position: absolute;
  top: 70%;
  left: 80%;
  z-index: 99999;
}
</style>
