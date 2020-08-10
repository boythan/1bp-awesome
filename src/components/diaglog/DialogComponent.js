import React, { Component, useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import './DialogComponent.css'

class DialogComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      title: '',
      content: null,
      buttons: []
    }
  }

  openDialog = (title = '', content = null, buttons = []) => {
    this.setState({ open: true, title, content, buttons })
  }

  closeDialog = () => {
    this.setState({ open: false })
  }

  render() {
    const { title, content, buttons } = this.state
    const { okeText = 'OK' } = this.props
    return (
      <Dialog
        aria-labelledby='simple-dialog-title'
        open={this.state.open}
        id='diaglogMainContainer'
      >
        <DialogContent>
          <text className={'modalTitle'}>{title}</text>
          <div className={'subTitle2 contentDialog'}>{content}</div>
        </DialogContent>
        <DialogActions>
          {buttons.map(({ text, onClick }) => {
            return (
              <button
                classNameCustom={'buttonActionDialog'}
                onClick={() => {
                  onClick && onClick()
                  this.closeDialog()
                }}
              >
                {text}
              </button>
            )
          })}
          {buttons.length === 0 && (
            <Button onClick={() => this.closeDialog()}>
              <div className={'subTitle1'}>{okeText}</div>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  }
}

export default DialogComponent
