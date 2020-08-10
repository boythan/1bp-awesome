import React from 'react'
import "./ItemListBase.css"
import { Avatar } from '@material-ui/core'

const ItemListBase = ({ isSelected, content, avatar, classNameAva, classNameContent }) => {
    return <div
        className="itemListBaseContainer"
        style={{
            backgroundColor: isSelected ? "rgb(15, 156, 241, 0.1)" : "white",
        }}>
        <Avatar
            src={avatar}
            className={"ava " + classNameAva}
        />

        <div className={"h3 content " + classNameContent}>{content}</div>
    </div>
}

export default ItemListBase