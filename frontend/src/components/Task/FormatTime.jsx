import moment from "moment";

export const FormatTime = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);

    //if task created today
    if (created.isSame(now, 'day')) {
        return "Today";
    }

    //if task created yesterday
    if (created.isSame(now.subtract(1, 'days'), 'day')) {
        return "Yesterday";
    }

    //if task created this week
    if (created.isAfter(moment().subtract(6, 'days'))) {
        return created.fromNow();
    }

    //if task created in past 4 weeks
    if (created.isAfter(moment().subtract(3, 'weeks'))) {
        return created.fromNow();
    }    


    return created.format('Do MMM YYYY');
}