import moment from 'moment';

moment.locale('pt');

export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: {
			relative: (d) => moment().from(d),
			formatDayMonthYear: (date) => moment(date).format('DD/MM/YY'),
			countdown: (date) => {
				const dateEvent = moment(date);

				let now = moment().format();
				let diffDuration = moment.duration(dateEvent.diff(now));
				let hours = diffDuration.hours();
				let minutes = diffDuration.minutes();
				let seconds = diffDuration.seconds();
				let hoursView = hours >= 1 ? `${hours}h` : '';

				return `${hoursView}${minutes}m${seconds}s`;
			},
		},
	};
});
