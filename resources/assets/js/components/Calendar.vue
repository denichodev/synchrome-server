<template>
  <div class="row">
    <div class="col-md-9">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Add New Calendar</h3>
        </div>
        <div class="box-body">
					<div class="form-group">
						<input v-model="calendar.fields.title" type="text" class="form-control input-lg" placeholder="Calendar Title">
					</div>
          <full-calendar
						ref="calendar"
            defaultView="month"
						:event-sources="eventSources"
						@day-click="dayClick"
						@event-selected="eventClick"></full-calendar>

						<modal effect="fade" :show.sync="config.showModal" :backdrop="false">
							<div slot="modal-header" class="modal-header">
								<h4 v-if="config.modalState == 'create'" class="modal-title" align="center">Add New Event</h4>
								<h4 v-if="config.modalState == 'edit'" class="modal-title" align="center">Edit Event</h4>
							</div>
							<div slot="modal-body" class="modal-body">
								<div class="form-group">
									<label>Event Title</label>
									<input type="text" class="form-control" v-model="event.fields.title">
								</div>
								<div class="form-group">
									<div class="row">
										<div class="col-xs-6">
											<label>Start Date</label>
											<datepicker v-model="event.fields.start" input-class="form-control" format="yyyy-MM-dd"></datepicker>
										</div>
										<div class="col-xs-6">
											<label>End Date</label>
											<datepicker v-model="event.fields.end" input-class="form-control" format="yyyy-MM-dd"></datepicker>
										</div>
									</div>
								</div>
							</div>
							<div slot="modal-footer" class="modal-footer">
								<button type="button" class="btn btn-default pull-left" @click="cancelEvent">Cancel</button>
								<button type="button" class="btn btn-primary pull-right" @click="saveEvent">Save</button>
								<button v-if="config.modalState == 'edit'" type="button" class="btn btn-danger pull-right" @click="removeEvent">Delete</button>
							</div>
						</modal>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Publishing</h3>
        </div>
        <div class="box-body">
					<div class="form-group">
						<label>Status</label>
						<select v-model="calendar.fields.status" class="form-control">
							<option value="published" selected>Published</option>
							<option value="draft">Draft</option>
						</select>
					</div>
					<button type="button" class="btn btn-primary btn-lg btn-block">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  @import '~fullcalendar/dist/fullcalendar.css';
</style>

<script>
	import moment from 'moment'
	import Datepicker from 'vuejs-datepicker'
	import { calendar, calendarEvent } from '../calendars/main'
	import { modal, datepicker } from 'vue-strap'

  export default {
		components: { 
			modal,
			Datepicker
		},
    data() {
			return {
				calendar: calendar,
				event: calendarEvent,
				eventSources: [calendar.fields],
				config: {
					showModal: false,
					modalState: 'create',
					format: 'YYYY-MM-DD'
				}
			}
    },
		methods: {
			dayClick(date, jsEvent, view) {
				calendarEvent.fields.start = calendarEvent.fields.end = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')

				this.config.showModal = true
			},
			eventClick(event, jsEvent, view) {
				this.config.modalState = 'edit'
				calendarEvent.fields.id = event.id
				calendarEvent.fields.title = event.title,
				calendarEvent.fields.start = moment(event.start, 'YYYY-MM-DD').format('YYYY-MM-DD')
				calendarEvent.fields.end = moment(event.end, 'YYYY-MM-DD').format('YYYY-MM-DD')
				this.config.showModal = true
			},
			cancelEvent() {
				this.config.showModal = false
				calendarEvent.init()
			},
			addEvent(calendarEvent) {
				calendar.addEvent(calendarEvent.fields.title, calendarEvent.fields.start, calendarEvent.fields.end)
			},
			updateEvent(calendarEvent) {
				event = calendar.findEvent(calendarEvent.fields.id)

				event.title = calendarEvent.fields.title
				event.start = moment(calendarEvent.fields.start).format('YYYY-MM-DD')
				event.end = moment(calendarEvent.fields.end).format('YYYY-MM-DD')
				this.config.modalState = 'create'
			},
			removeEvent() {
				calendar.removeEvent(calendarEvent.fields.id)
				calendarEvent.init()
				this.config.showModal = false
			},
			saveEvent() {
				if (! calendarEvent.validate()) {
					alert('Fill in all required fields')

					return false
				}

				if (this.config.modalState == 'create') {
					this.addEvent(calendarEvent)
				} else {
					this.updateEvent(calendarEvent)
				}
				this.config.showModal = false
				calendarEvent.init()
			}
		}
  }
</script>