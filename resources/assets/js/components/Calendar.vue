<template>
  <div class="row">
    <div class="col-md-9">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title" v-if="state == 'create'">Add New Calendar</h3>
          <h3 class="box-title" v-if="state == 'edit'">Edit Calendar</h3>
        </div>
        <div class="box-body">
          <div class="form-group">
            <input type="text" class="form-control input-lg" placeholder="Calendar Name/Title">  
          </div>
          <full-calendar 
            ref="calendar" 
            :event-sources="eventSources" 
            defaultView="month"
            @day-click="dayClick"></full-calendar>

            <modal :show.sync="displayModal" :backdrop="false" effect="fade">
              <div slot="modal-header" class="modal-header">
                <h4 class="modal-title" align="center">Add New Event</h4>
              </div>
              <div slot="modal-body" class="modal-body">
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" class="form-control" v-model="tempEvent.title">
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label>Start Date</label>
                      <div>
                        <datepicker :value.sync="tempEvent.start" :format="dateFormat"></datepicker>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group">
                      <label>End Date</label>
                      <div>
                        <datepicker :value.sync="tempEvent.end" :format="dateFormat"></datepicker>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="modal-footer" class="modal-footer">
                <button type="button" class="btn btn-default pull-left" @click="displayModal = false">Cancel</button>
                <button type="button" class="btn btn-primary pull-right">Save</button>
              </div>
            </modal>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <div class="col-md-3">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Publishing</h3>
        </div>
        <div class="box-body">
          <div class="form-group">
            <label for="status">Status</label>
            <select v-model="status" class="form-control">
              <option value="published" selected>Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button type="button" class="btn btn-block btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style>

<script>
import { modal, datepicker } from 'vue-strap'
import { calendar } from '../calendars/calendar.js'

export default {
    name: 'calendar',
    props: ['state'],
    components: { modal, datepicker },
    data() {
        return {
            displayModal: false,
            status: 'published',
            eventSources: [calendar],
            tempEvent: {
                title: '',
                start: '',
                end: ''
            },
            dateFormat: 'yyyy-MM-dd'
        }
    },
    methods: {
        dayClick(date, jsEvent, view) {
            this.displayModal = true
        }
    }
}
</script>