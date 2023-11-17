import moment from 'moment';
import 'moment/dist/locale/pt-br.js';
moment.locale('pt-br');

export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: {
			relative: (d) => moment().from(d),
			mostRecentDate: (dates, type) => {
				// Converta as strings de datas para objetos Moment
				const datasMoment = dates.map((dateStr) => moment(dateStr));

				// Encontre a data mais recente usando Math.max ou a mais antiga com Math.min
				switch (type) {
					case 'min':
						return moment(Math.min.apply(null, datasMoment));
					case 'max':
						return moment(Math.max.apply(null, datasMoment));
				}
			},
			checkDatePassed: (date) => moment(date).isBefore(moment()),
			formatDayMonthYearFull: (date) => {
				return moment(date).format('DD[ de ]MMMM[, ]YYYY');
			},
			formatDayMonthYearComplete: (date) => moment(date).format('DD/MM/YYYY'),
			formatDayMonthYear: (date) => moment(date).format('DD/MM/YY'),
			countdown: (date) => {
				const dateEvent = moment(date);

				if (dateEvent.isValid()) {
					let now = moment().format();
					let diffDuration = moment.duration(dateEvent.diff(now));
					let hours = diffDuration.hours();
					let minutes = diffDuration.minutes();
					let seconds = diffDuration.seconds();
					let hoursView = hours >= 1 ? `${hours}h` : '';

					return `${hoursView}${minutes}m${seconds}s`;
				}

				return null;
			},
		},
	};
});
