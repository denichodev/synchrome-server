import _ from 'lodash'
import moment from 'moment'
import validate from 'validate.js'

const calendar = {
  fields: {
    id: '',
    name: '',
    status: 'published',
    events: []
  },
  findEvent(id) {
    event = _.find(this.fields.events, o => {
      return o.id == id
    })

    if (typeof event != 'undefined') {
      return event
    }

    return null
  },
  generateEventId() {
    let id = _.random(1, 720)  

    if (this.findEvent(id) != null) {
      return this.generateEventId()
    }

    return id
  },
  addEvent(title, start, end = null) {
    let event = {}

    if (end == null) {
      event = {
        id: this.generateEventId(),
        title: title,
        start: moment(start, 'YYYY-MM-DD').format('YYYY-MM-DD')
      }
    } else {
      event = {
        id: this.generateEventId(),
        title: title,
        start: moment(start, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        end: moment(end, 'YYYY-MM-DD').format('YYYY-MM-DD')
      }
    }

    this.fields.events.push(event)
  },
  removeEvent(id) {
    this.fields.events = _.filter(this.fields.events, o => {
      return o.id != id
    })
  },
  getFields() {
    return {
      name: calendar.fields.name,
      status: calendar.fields.status,
      events: calendar.fields.events
    }
  },
  fetchCalendar(calendar) {
    this.fields.id = calendar.id
    this.fields.name = calendar.name
    this.fields.status = calendar.status
    this.fields.events = calendar.events
  }
}

const calendarEvent = {
  fields: {
    originalId: '',
    id: '',
    title: '',
    start: '',
    end: ''
  },
  rules: {
    title: {
      presence: true,
    },
    start: {
      presence: true,
      datetime: {
        dateOnly: true
      }
    },
    end: {
      presence: true,
      datetime: {
        dateOnly: true
      }
    }
  },
  getFields() {
    if (this.fields.end == null || this.fields.end == '' || this.fields.end == this.fields.start) {
      return {
        title: this.fields.title,
        start: moment(this.fields.start, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        end: moment(this.fields.start, 'YYYY-MM-DD').format('YYYY-MM-DD')
      }
    }

    return {
      title: this.fields.title,
      start: moment(this.fields.start, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      end: moment(this.fields.end, 'YYYY-MM-DD').format('YYYY-MM-DD')
    }
  },
  init() {
    this.fields.id = ''
    this.fields.title = ''
    this.fields.start = ''
    this.fields.end = ''
  },
  initValidate() {
    validate.extend(validate.validators.datetime, {
      parse: (value) => {
        return +moment.utc(value)
      },
      format: (value, options) => {
        let format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'

        return moment.utc(value).format(format)
      }
    })
  },
  validate() {
    this.initValidate()

    return typeof validate(this.getFields(), this.rules) == 'undefined'
  }
}

export {
  calendar,
  calendarEvent
}