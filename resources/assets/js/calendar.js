import './bootstrap'
import VueFullCalendar from 'vue-full-calendar'
import calendar from './components/Calendar'

Vue.use(VueFullCalendar)

new Vue({
    el: '#cal',
    components: { calendar }
})