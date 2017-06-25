export const eventSource = {
    events: [],
    latest: calendar => {
        this.events = calendar.fullCalendar('clientEvents')
    }
}