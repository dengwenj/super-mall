import { defineComponent, ref } from 'vue'

import WwTabs from '@/components/WwTabs'
import WwTabsPanel from '@/components/WwTabs/panel'

export default defineComponent(function Order() {
  const active = ref('name')

  const updateActive = (name: string) => {
    active.value = name
  }

  return () => (
    <WwTabs active={active.value} updateActive={updateActive}>
      <WwTabsPanel label={`选项卡`} name={`name`}>内容</WwTabsPanel>
      {
        [1, 2, 3 , 4].map((item) => {
          return (
            <WwTabsPanel 
              label={`选项卡${item}`} 
              name={`name${item}`} 
              key={item}
            >
              内容{item}
            </WwTabsPanel>
          )
        })
      }
    </WwTabs>
  )
})
