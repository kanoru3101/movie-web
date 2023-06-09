import React, { ReactElement, useState, useEffect } from 'react'
import styles from './Tabs.module.css'
import { Tab, Tabs as TB, TabList, TabPanel } from 'react-tabs'

type Props = {
  titles: Array<string>
  isHideTabs?: boolean
  children: Array<React.ReactNode>
  defaultTab: number | null
}
const Tabs: React.FC<Props> = ({
  titles,
  defaultTab,
  isHideTabs = false,
  children,

}): ReactElement => {
  const [tabIndex, setTabIndex] = useState<number>(defaultTab ?? 0)
  const [isDisableOtherTabs, setIsDisableOtherTabs] = useState<boolean>(false)

  useEffect(() => {
    if (defaultTab === null) {
      setIsDisableOtherTabs(false)
    }

    if (defaultTab !== null) {
      setTabIndex(defaultTab)
      setIsDisableOtherTabs(true)
    }
  }, [defaultTab, tabIndex])

  return (
    <TB className={styles.wrapper} selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList className={`${styles.tabList} ${isHideTabs && styles.hideTabs}`}>
        {titles.map((title, index) => (
          <Tab
            key={index}
            className={`${styles.tabItem}
            ${index === tabIndex ? styles.activeTab : ''}
            ${isDisableOtherTabs && index !== tabIndex ? styles.disableTab : ''}`}
            disabled={isDisableOtherTabs}
          >
            {title}
          </Tab>
        ))}
      </TabList>
      {children.map((child, index) => (
        <TabPanel key={index}> {child} </TabPanel>
      ))}
    </TB>
  )
}
export default Tabs
