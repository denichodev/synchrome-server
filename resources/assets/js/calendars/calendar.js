const { eventSource } = require('./eventSource.js')

$(document).ready(() => {
    $('#eventEndDate').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    })
    $('#calendar').fullCalendar({
        defaultDate: moment().startOf('year'),
        eventSources: [
            eventSource
        ],
        dayClick: (date, jsEvent, view) => {
            $('#eventStartDate').val(date.format())
            $('#eventEndDate').val(date.format())
            $('#eventDuration').val(1)
            $('#newEvent').modal()
        },
        eventClick: (calEvent, jsEvent, view) => {
            $('#editEvent').modal()
        }
    })
})

$(document).on('change', '#eventEndDate', e => {
    e.preventDefault()
    let startDate = moment($('#eventStartDate').val())
    let endDate = moment($('#eventEndDate').val())
    let diff = parseInt(endDate.diff(startDate, 'days'))
    $('#eventDuration').val(diff)
})

$(document).on('click', '#addEvent', e => {
    e.preventDefault()
    var startDate = moment($('#eventStartDate').val())
    var endDate = moment($('#eventEndDate').val())
    var diff = parseInt(endDate.diff(startDate, 'days'))

    if ($('#eventEndDate').val() == '' || diff == 0) {
        event = {
            title: $('#eventTitle').val(),
            start: startDate.format('YYYY-MM-DD')
        }
    } else {
        event = {
            title: $('#eventTitle').val(),
            start: startDate.format('YYYY-MM-DD'),
            end: endDate.format('YYYY-MM-DD')
        }
    }

    eventSource.events.push(event)
    $('#calendar').fullCalendar('refetchEvents')
    $('#calendar').fullCalendar('removeEventSource', eventSource)
    $('#calendar').fullCalendar('addEventSource', eventSource)
    $('#newEvent').modal('hide')
})

$(document).on('click', '#saveCalendar', e => {
    e.preventDefault()
    eventSource.latest($('#calendar'))
    var data = {
        name: $('#calendarName').val(),
        status: $('#calendarStatus').val(),
        events: eventSource.events
    }

    $.post(url, data, res => {
        if (res.result != 'success') {
            swal('Failed', res.error[0], 'error')
        } else {
            swal({
                title: 'Succeed',
                text: 'Calendar has been created',
                type: 'success'
            }, () => {
                window.location = editUrl
            })
        }
    })
})