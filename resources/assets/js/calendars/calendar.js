import _ from 'lodash'

export const calendar = {
    events: [
        {
            _id: 1,
            title: 'New Year 2017',
            start: '2017-01-01'
        }
    ],
    find(id) {
        event = _.find(this.events, o => {
            return o._id == id
        })

        if (typeof event != 'undefined') {
            return event
        }

        return null
    },
    generateId() {
        let id = _.random(1, 720)  

        if (this.find(id) != null) {
            return this.generateId()
        }

        return id
    },
    add(title, start, end = null) {
        if (end == null) {
            var event = {
                _id: this.generateId(),
                title: title,
                start: start
            }
        } else {
            var event = {
                _id: this.generateId(),
                title: title,
                start: start,
                end: end
            }
        }

        this.events.push(event)
    },
    remove(id) {
        this.events = _.filter(this.events, o => {
            return o._id != id
        })
    }
}