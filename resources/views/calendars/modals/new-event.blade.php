<div class="modal fade" id="newEvent">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add New Event</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-xs-3">
            <div class="form-group">
              <label>Start</label>
              <input type="text" id="eventStartDate" class="form-control" readonly>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="form-group">
              <label>End</label>
              <input type="text" id="eventEndDate" class="form-control">
            </div>
          </div>
          <div class="col-xs-3">
            <div class="form-group">
              <label>Duration</label>
              <div class="input-group">
                <input type="number" id="eventDuration" class="form-control" readonly>
                <span class="input-group-addon">day(s)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="eventTitle" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
        <button type="button" id="addEvent" class="btn btn-primary pull-right">Save</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->