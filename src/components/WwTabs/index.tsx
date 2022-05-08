import { defineComponent } from 'vue'

import type { SetupContext } from 'vue'

import './index.less'

// function WwTabs 这个相当于 setup 函数
export default defineComponent<any>(function WwTabs(props, ctx: SetupContext) {
  return () => (
    <div>
      {ctx.slots.default?.()}
      {ctx.attrs.a}
      {ctx.attrs.b}
    </div>
  )
})
