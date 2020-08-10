import React, { Component, useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import './ProgressComponent.scss'
import { CircularProgress } from '@material-ui/core'
import _ from 'lodash'
class ProgressComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      error: false
    }
  }

  show = (promiseFunction, args, onSuccess, onError, handleError) => {
    this.setState(
      { open: true, promiseFunction, args, onSuccess, onError, handleError },
      () => this.loadData()
    )
  }

  loadData = () => {
    const { promiseFunction, args, onSuccess } = this.state
    let task

    if (!_.isArray(args)) task = promiseFunction(args)
    else task = promiseFunction(...args)

    task
      .then((result) => {
        if (result) {
          if (
            result.request &&
            result.data &&
            result.data.responseData &&
            result.data.responseData.error
          ) {
            this.setError(result.data.responseData.error)
            return
          }

          const error = result?.data?.error?.status

          if (!_.isEmpty(error)) {
            this.setError(result?.data)
            return
          }
          // Success
          this.dismiss()
          if (onSuccess) {
            onSuccess(result)
          }
        } else {
          this.setError({
            message: 'Error'
          })
        }
      })
      .catch((error) => {
        if (this.unmounted) {
          throw error
        }
        this.setError(error)
      })
  }

  setError(error) {
    const { handleError } = this.state
    if (handleError && handleError(error)) {
      this.dismiss()
      return
    }
    if (error && error.response && error.response.data) {
      this.setState({ error: error.response.data })
      return
    }
    this.setState({ error })
  }

  dismiss = () => {
    this.setState({ open: false })
  }

  renderLoadingView = () => {
    return (
      <DialogContent className='dialogProgressLoadingContainer'>
        <CircularProgress />
      </DialogContent>
    )
  }

  renderErrorView = () => {
    const { error } = this.state
    const {
      errorTitleText = 'Error',
      cancelText = 'Cancel',
      retryText
    } = this.props
    return (
      <div className='errorProgressContainer'>
        <DialogTitle>
          <text className='h3 errorTitleText'>{errorTitleText}</text>
        </DialogTitle>

        <DialogContent className='errorContentText'>
          <text className='h4'>{error.message}</text>
        </DialogContent>
        <DialogActions className='dialogActionsProgress'>
          <button onClick={this.dismiss} className='buttonDefault cancelButton'>
            {cancelText}
          </button>
          <button className='buttonDefault' onClick={this.loadData}>
            {retryText}
          </button>
        </DialogActions>
      </div>
    )
  }

  render() {
    const { title, content, buttons } = this.state
    return (
      <Dialog
        aria-labelledby='simple-dialog-title'
        open={this.state.open}
        id='progressMainContainer'
      >
        {!this.state.error && this.renderLoadingView()}
        {this.state.error && this.renderErrorView()}
      </Dialog>
    )
  }
}

export default ProgressComponent
