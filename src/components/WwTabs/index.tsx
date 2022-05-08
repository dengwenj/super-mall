import { defineComponent, ref } from 'vue'

import './index.less'

import type { SetupContext } from 'vue'

interface IWwTabsProps { 
  onUpdateActive: (name: string, idx: number) => void
}

// function WwTabs 这个相当于 setup 函数
export default defineComponent<IWwTabsProps>(function WwTabs(props, ctx: SetupContext) {
  const active = ref('all')

  // 点击每一项
  const handleClick = (name: string, idx: number) => {
    return () => {
      active.value = name
      ;(ctx.attrs.onUpdateActive as (name: string, idx: number) => void)(name, idx)
    }
  }
  return () => {
    const dynamicNode: any[] = []

    return (
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
            dynamicNode.map((item, idx) => {
              return (
                <a
                  class={active.value === item.props.name ? 'active' : ''}
                  onClick={handleClick(item.props.name, idx)} 
                  href="javascript:;" 
                  key={item.key!}
                >
                  {item.props?.label}
                </a>
              )
            })
          }
        </nav>

        {/* 内容 */}
        {
          (function () {
            let obj: any
            const panel = ctx.slots.default?.().find((item) => {
              if ((item.type as any).name === 'WwTabsPanel') {
                return item.props?.name === ctx.attrs.active
              } else {
                for (let i = 0; i < (item.children as any).length; i++) {
                  if (ctx.attrs.active === (item.children as any)[i].props.name) {
                    obj = (item.children as any)[i]
                    return
                  }
                }
              }
            })
            return obj || panel
          })()
        }
      </div>
    )
  }
})
