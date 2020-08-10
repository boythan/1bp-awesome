import React, { useState } from 'react'
import "./TabViewComponent.css"
import { Tabs, Tab } from '@material-ui/core'
const TabViewComponent = ({ data = [], classNameContainer }) => {
    const [tabValue, setTabValue] = useState(0)

    return <div className={"tabViewContainer " + classNameContainer} >
        <Tabs
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => setTabValue(newValue)}
            aria-label="disabled tabs example"
        >
            {data.map((item, index) => {
                const isSelect = index === tabValue
                return <Tab
                    label={item.label}
                    className={"h3 " + (isSelect ? "tabLabelSelect" : "tabLabelDeselect")}
                />
            })}


        </Tabs>
        {data[tabValue]?.scene()}

    </div >
}

export default TabViewComponent