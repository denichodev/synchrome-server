require('./bootstrap')

import VueFullCalendar from 'vue-full-calendar'
import calendar from './components/Calendar.vue'

Vue.use(VueFullCalendar)

const cal = new Vue({
    el: '#cal',
    components: { calendar }
})