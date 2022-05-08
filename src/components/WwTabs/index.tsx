import { defineComponent } from 'vue'

import './index.less'

import type { SetupContext } from 'vue'

// function WwTabs 这个相当于 setup 函数
export default defineComponent(function WwTabs(props, ctx: SetupContext) {
  const dynamicNode: any[] = []

  return () => (
    <div class="xtx-tabs">
      {/* tabs */}
      <nav>
        {
          ctx.slots.default?.().forEach((item, idx) => {
            if ((item.type as any).name === 'WwTabsPanel') {
              dynamicNode.push(item)
            } else {
              (item.children as any).forEach((item2: any) => {
                dynamicNode.push(item2)
              })
            }
          })
        }
        {
          dynamicNode.map((item) => {
            return (
              <a href="javascript:;" key={item.key!}>
                {item.props?.label}
              </a>
            )
          })
        }
      </nav>

      {/* 内容 */}
      {ctx.slots.default?.()}
      {/* <div>
        {
          ctx.slots.default?.().map((item, idx) => {
            return (
              <div key={item.key!}>{(item.children as any).default()}</div>
            )
          })
        }
      </div> */}
    </div>
  )
})
