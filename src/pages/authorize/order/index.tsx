import { defineComponent } from 'vue'

import WwTabs from '@/components/WwTabs'
import WwTabsPanel from '@/components/WwTabs/panel'

export default defineComponent(function Order() {
  return () => (
    <>
      <WwTabs>
        <WwTabsPanel label={`选项卡`} name={`name`}>内容</WwTabsPanel>
        {
          [1, 2, 3 , 4].map((item) => {
            return (
              <WwTabsPanel label={`选项卡${item}`} name={`name${item}`} key={item}>内容{item}</WwTabsPanel>
            )
          })
        }
      </WwTabs>
    </>
  )
})
