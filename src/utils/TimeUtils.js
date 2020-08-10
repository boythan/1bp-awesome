import moment from 'moment'

const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm'
const TIME_FORMAT = 'HH:mm'
const DATE_FORMAT = 'DD/MM/YYYY'

const DATE_TIME_INPUT_FORMAT = 'dd/MM/yyyy HH:mm'
const DATE_INPUT_FORMAT = 'dd/MM/yyyy'

const MONTH_MILISECOND = 30 * 24 * 60 * 60 * 1000
const WEEK_MILISECOND = 7 * 24 * 60 * 60 * 1000
const DAY_MILISECOND = 24 * 60 * 60 * 1000

const convertMilitoMinutes = (miliSeconds) => {
  if (!miliSeconds) return 0
  return miliSeconds / (1000 * 60)
}

const convertMinutesToMili = (minutes) => {
  if (!minutes) return 0

  return minutes * 60 * 1000
}
const convertMiliToDateTime = (timeInMillis, localize = 'en') => {
  let date = new Date(timeInMillis)
  if (localize === 'th') {
    return date ? moment(date).add('years', 543).format(DATE_TIME_FORMAT) : ''
  }
  return date ? moment(date).format(DATE_TIME_FORMAT) : ''
}

const convertDateTimeToMili = (dateTime) => {
  let date = new Date(dateTime)
  return date.getTime()
}

const convertMiliToDate = (timeInMillis, localize = 'en') => {
  let date = new Date(timeInMillis)
  if (localize === 'th') {
    return date ? moment(date).add('years', 543).format(DATE_FORMAT) : ''
  }
  return date ? moment(date).format(DATE_FORMAT) : ''
}

const convertMiliToTime = (timeInMillis) => {
  let date = new Date(timeInMillis)

  return date ? moment(date).format(TIME_FORMAT) : ''
}

const convertMiliToDateWithFormat = (timeInMillis, FORMAT) => {
  let date = new Date(timeInMillis)
  return date ? moment(date).format(FORMAT) : ''
}

const convertToDefaultInputFormat = (timeMili) => {
  return convertMiliToDateWithFormat(timeMili, 'YYYY-MM-DDTHH:mm')
}

export default {
  convertToDefaultInputFormat,
  convertMiliToDateWithFormat,
  convertMiliToTime,
  convertMiliToDate,
  convertMilitoMinutes,
  convertMinutesToMili,
  convertMiliToDateTime,
  convertDateTimeToMili,
  MONTH_MILISECOND,
  WEEK_MILISECOND,
  DAY_MILISECOND,

  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DATE_INPUT_FORMAT,
  DATE_TIME_INPUT_FORMAT
}
