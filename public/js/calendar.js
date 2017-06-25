/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(3),
    eventSource = _require.eventSource;

$(document).ready(function () {
    $('#eventEndDate').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    });
    $('#calendar').fullCalendar({
        defaultDate: moment().startOf('year'),
        eventSources: [eventSource],
        dayClick: function dayClick(date, jsEvent, view) {
            $('#eventStartDate').val(date.format());
            $('#eventEndDate').val(date.format());
            $('#eventDuration').val(1);
            $('#newEvent').modal();
        },
        eventClick: function eventClick(calEvent, jsEvent, view) {
            $('#editEvent').modal();
        }
    });
});

$(document).on('change', '#eventEndDate', function (e) {
    e.preventDefault();
    var startDate = moment($('#eventStartDate').val());
    var endDate = moment($('#eventEndDate').val());
    var diff = parseInt(endDate.diff(startDate, 'days'));
    $('#eventDuration').val(diff);
});

$(document).on('click', '#addEvent', function (e) {
    e.preventDefault();
    var startDate = moment($('#eventStartDate').val());
    var endDate = moment($('#eventEndDate').val());
    var diff = parseInt(endDate.diff(startDate, 'days'));

    if ($('#eventEndDate').val() == '' || diff == 0) {
        event = {
            title: $('#eventTitle').val(),
            start: startDate.format('YYYY-MM-DD')
        };
    } else {
        event = {
            title: $('#eventTitle').val(),
            start: startDate.format('YYYY-MM-DD'),
            end: endDate.format('YYYY-MM-DD')
        };
    }

    eventSource.events.push(event);
    $('#calendar').fullCalendar('refetchEvents');
    $('#calendar').fullCalendar('removeEventSource', eventSource);
    $('#calendar').fullCalendar('addEventSource', eventSource);
    $('#newEvent').modal('hide');
});

$(document).on('click', '#saveCalendar', function (e) {
    e.preventDefault();
    eventSource.latest($('#calendar'));
    var data = {
        name: $('#calendarName').val(),
        status: $('#calendarStatus').val(),
        events: eventSource.events
    };

    $.post(url, data, function (res) {
        if (res.result != 'success') {
            swal('Failed', res.error[0], 'error');
        } else {
            swal({
                title: 'Succeed',
                text: 'Calendar has been created',
                type: 'success'
            }, function () {
                window.location = editUrl;
            });
        }
    });
});

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventSource", function() { return eventSource; });
var _this = this;

var eventSource = {
    events: [],
    latest: function latest(calendar) {
        _this.events = calendar.fullCalendar('clientEvents');
    }
};

/***/ })
/******/ ]);