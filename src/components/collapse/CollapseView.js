import React, { useState } from 'react';
import './CollapseView.css'
import { Avatar } from '@material-ui/core';
const CollapseView = ({ title, avatar, content, classNameContainer }) => {
    const [isShow, setShow] = useState(false)
    return <div
        className={"collapseViewContainer " + classNameContainer}
        style={{ backgroundColor: isShow ? "rgba(15, 156, 241, 0.08)" : "white" }}
    >
        <div
            className="collapseViewHeaderContainer"
            onClick={() => setShow(!isShow)}
        >
            <div className="headerTitleContainer">
                <Avatar
                    src={avatar}
                    className="ava"
                />
                <text className="h4 titleText">{title}</text>
            </div>
            <ion-icon
                name={isShow ? "chevron-up-outline" : "chevron-down-outline"}
                className="arrowDownIcon"
                style={{ color: "#BDBDBD", fontSize: "1.5rem" }}
            />
        </div>
        {isShow && <div className="mainContentContainer">
            {content && content}
        </div>}
    </div>
}
export default CollapseView
