import React, { Component } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import './DateInput.css'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { Button } from '@material-ui/core'
import TimeUtils from '../../utils/TimeUtils'

class DateInput extends Component {
  state = {
    startOpen: false,
    ref: null
  }

  render() {
    const {
      title,
      value,
      onChange,
      containerStyle,
      showTime = false,
      titleStyle,
      format = TimeUtils.DATE_TIME_INPUT_FORMAT,
      titleClassName = 'subTitle2',
      buttonStyle = {}
    } = this.props
    return (
      <div
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          ...(containerStyle && containerStyle)
        }}
      >
        <div className={titleClassName} style={titleStyle && titleStyle}>
          {title}
        </div>
        <div className={'containerDateInputContent'}>
          <DatePicker
            locale={'th'}
            {...this.props}
            selected={value}
            onChange={onChange}
            timeInputLabel='Time:'
            dateFormat={format}
            showTimeInput={showTime}
            className='subTitle1 dateTimePicker'
            style={{ fontSize: '8rem' }}
            startOpen={this.state.startOpen}
            ref={(node) => {
              this.calenderRef = node
            }}
          />
          <Button
            startIcon={<DateRangeIcon style={buttonStyle} />}
            onClick={() => this.calenderRef.setOpen(true)}
          />
        </div>
      </div>
    )
  }
}

export default DateInput
