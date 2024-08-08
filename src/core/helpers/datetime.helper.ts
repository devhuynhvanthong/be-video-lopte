import * as moment from 'moment';
export const formatDateTime = (format: string, dataTime: any = ''): string => {
    if (dataTime && dataTime !== '' && dataTime !== '0000-00-00 00:00:00') {

        return moment(dataTime).format(format);
    }
    return moment().format(format);
}