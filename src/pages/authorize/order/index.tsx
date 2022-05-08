import { defineComponent, ref } from 'vue'

import { orderStatus } from '@/global/constants'

import WwTabs from '@/components/WwTabs'
import WwTabsPanel from '@/components/WwTabs/panel'

export default defineComponent(function Order() {
  const active = ref('all')

  const updateActive = (name: string) => {
    active.value = name
  }

  return () => (
    <WwTabs active={active.value} updateActive={updateActive}>
      {
        orderStatus.map((item) => {
          return (
            <WwTabsPanel 
              label={`${item.label}`} 
              name={`${item.name}`} 
              key={item.name}
            >
              内容{item.name}
            </WwTabsPanel>
          )
        })
      }
    </WwTabs>
  )
})
