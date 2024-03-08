import * as moment from 'moment';
export enum UtcToLocalTimeFormat {
    FULL = 'full',        // 'EEEE, MMMM d, y, h:mm:ss a zzzz'   - Monday, June 15, 2015 at 9:03:01 AM GMT+01:00
    SHORT = 'short',       // 'd/M/yy, h:mm'                      - 15/6/15, 9:03
    SHORT_DATE = 'shortDate',   // 'd/M/yy'                            - 15/6/15
    SHORT_TIME = 'shortTime'   // 'h:mm'                              - 9:03
    
}

export class UtcConverterService {
    public convertUtcToLocalTime(
        utcDate: string,    // UTC ISO-8601
        format: UtcToLocalTimeFormat = UtcToLocalTimeFormat.FULL
    ): string {

        var browserLanguage = navigator.language;

        if (utcDate == "" || utcDate == null) {
            return "";
        }
        if (format === UtcToLocalTimeFormat.SHORT) {
            let dateGMT = moment.utc(utcDate).toDate()
            var local = moment(dateGMT).local().format('MMM DD, yyyy hh:mm A');
            return `${local}`;
        }
        else if (format === UtcToLocalTimeFormat.SHORT_DATE) {
            let dateGMT = moment.utc(utcDate).format('MMM DD, yyyy')
            return dateGMT;
        }
        else if (format === UtcToLocalTimeFormat.SHORT_TIME) {
            return new Date(utcDate).toLocaleTimeString(browserLanguage);
        }
        else if (format === UtcToLocalTimeFormat.FULL) {
            return new Date(utcDate).toString();
        }
        else {
            console.error(
                `Do not have logic to format utc date, format:${format}`
            );
            return new Date(utcDate).toString();
        }
    }

    public convertLocalTimeToUtc(localDate: string): string {
        var date = new Date(localDate);
        return date.toUTCString();
    }
}