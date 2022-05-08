import { defineComponent, SetupContext } from 'vue'

import './index.less'

interface IWwTabsPanelProps {
  label: string
  name: string
}

export default defineComponent<IWwTabsPanelProps>(function WwTabsPanel(props, ctx: SetupContext) {
  return () => (
    <div class='ww_tabs_panel'>
      {ctx.slots.default?.()}
    </div>
  )
})
