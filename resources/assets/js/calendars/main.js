import _ from 'lodash'
import moment from 'moment'
import validate from 'validate.js'
import { http } from '../http/main'

const calendar = {
    fields: {
        title: '',
        status: 'published',
        events: [
            {
                id: 1,
                title: 'New Year 2017',
                start: moment('2017-01-01', 'YYYY-MM-DD').format('YYYY-MM-DD')
            }
        ]
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
        if (end == null) {
            var event = {
                id: this.generateEventId(),
                title: title,
                start: moment(start, 'YYYY-MM-DD').format('YYYY-MM-DD')
            }
        } else {
            var event = {
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
    create() {
        var data = {
            name: calendar.fields.title,
            status: calendar.fields.status,
            events: calendar.fields.events,
        }

        http.init()
        http.post('calendar', data, response => {
            if (response.data.result == "success") {
                window.location = '/dashboard/calendars/' + response.data.data.id
            }
        }, error => {
            alert('Cannot complete desired request')

            console.log(error)
        })
    }
}

const calendarEvent = {
    fields: {
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
            datetime: {
                dateOnly: true
            }
        }
    },
    getFields() {
        if (this.fields.end == '' || this.fields.end == this.fields.start) {
            return {
                title: this.fields.title,
                start: moment(this.fields.start, 'YYYY-MM-DD').format('YYYY-MM-DD')
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
            parse: (value, options) => {
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