<template>
	<div class="row">
		<div class="col-md-9">
			<div v-if="loaders.isUpdating" class="callout callout-info">
				<h4>Updating...</h4>
				<p>Just a moment</p>
			</div>
			<div v-if="loaders.isUpdated" class="alert alert-success alert-dismissible">
				<button @click="loaders.isUpdated = false" type="button" class="close">&times;</button>
				<h4><i class="icon fa fa-check"></i> Updated!</h4>
				Calendar has been successfully updated.
			</div>
			<div v-if="loaders.isError" class="alert alert-danger alert-dismissible">
				<button @click="loaders.isError = false" type="button" class="close">&times;</button>
				<h4><i class="icon fa fa-ban"></i> Error</h4>
				An unexpected error occured.
			</div>
			<div class="box">
				<div class="box-header">
					<h3 v-if="state == 'create'" class="box-title">Add New Calendar</h3>
					<h3 v-if="state == 'edit'" class="box-title">Edit Calendar</h3>
				</div>
				<div class="box-body">
					<div class="form-group">
						<input v-model="calendar.fields.name" type="text" class="form-control input-lg" placeholder="Calendar Title">
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
					<button type="button" class="btn btn-primary btn-lg btn-block" @click="saveCalendar">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	@import '~fullcalendar/dist/fullcalendar.css';
</style>

<script>
	import _ from 'lodash'
	import moment from 'moment'
	import Datepicker from 'vuejs-datepicker'
	import { calendar, calendarEvent } from '../calendars/main'
	import { modal, datepicker } from 'vue-strap'
	import { http } from '../http/main'

	export default {
		props: [
			'state',
			'id'
		],
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
				},
				loaders: {
					isUpdating: false,
					isUpdated: false,
					isError: false,
				},
				deletedEvents: []
			}
		},
		beforeMount() {
			if (this.id && this.state == 'edit') {
				http.init()
				http.get('calendar/' + this.id, response => {
					if (response.data.result == 'success') {
						const data = response.data.data
						data.events = _.map(data.events, item => {
							item.id = calendar.generateEventId()

							return item
						})
						calendar.fetchCalendar(data)
						this.$refs.calendar.$emit('reload-events')
					} else {
						alert('Internal server error occured')
					}
				}, error => {
					alert('Unable to fetch calendar')
				})
			}
		},
		methods: {
			dayClick(date, jsEvent, view) {
				calendarEvent.fields.start = calendarEvent.fields.end = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')

				this.config.showModal = true
			},
			eventClick(event, jsEvent, view) {
				this.config.modalState = 'edit'
				
				if (_.has(event, 'originalId')) {
					calendarEvent.fields.originalId = event.originalId
				}

				calendarEvent.fields.id = event.id
				calendarEvent.fields.title = event.title,
				calendarEvent.fields.start = moment(event.start, 'YYYY-MM-DD').format('YYYY-MM-DD')
				calendarEvent.fields.end = calendarEvent.fields.end == '' ? moment(event.start, 'YYYY-MM-DD').format('YYYY-MM-DD') : moment(event.end, 'YYYY-MM-DD').format('YYYY-MM-DD')
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

				if (_.has(event, 'originalId')) {
					event.isEdited = true
				}

				this.config.modalState = 'create'
			},
			removeEvent() {
				calendar.removeEvent(calendarEvent.fields.id)
				this.deletedEvents.push({originalId: calendarEvent.fields.originalId})
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
				} else if (this.config.modalState == 'edit') {
					this.updateEvent(calendarEvent)
				}
				this.config.showModal = false
				calendarEvent.init()
			},
			saveCalendar() {
				http.init()

				if (this.state == 'create') {
					http.post('calendar', calendar.getFields(), response => {
						if (response.data.result == "success") {
							window.location = '/dashboard/calendars/' + response.data.data.id
						} else {
							this.loaders.isError = true
						}
					}, error => {
						this.loaders.isError = true
					})
				} else if (this.state == 'edit') {
					this.loaders.isUpdating = true
					const newEvents = _.filter(calendar.fields.events, event => {
						return ! _.has(event, 'originalId')
					})
					const updatedEvents = _.filter(calendar.fields.events, event => {
						return event.isEdited
					})
					const data = {
						_method: 'PATCH',
						name: calendar.fields.name,
						status: calendar.fields.status,
						newEvents: newEvents,
						updatedEvents: updatedEvents,
						deletedEvents: this.deletedEvents
					}

					http.post('calendar/' + calendar.fields.id, data, response => {
						if (response.data.result == 'success') {
							this.loaders.isUpdating = false
							this.loaders.isUpdated = true
						} else {
							this.loaders.isError = true
						}
					}, error => {
						this.loaders.isError = true
					})
				}
			}
		}
	}
</script>