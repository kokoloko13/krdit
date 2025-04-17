type SimpleExtractedDate = {
    year: number,
    month: string | number,
    day: string | number,
    hours: string | number,
    minutes: string | number,
    seconds: string | number
};

export const simpleExtractDate = (date: Date): SimpleExtractedDate => {
    return {
        year: date.getFullYear(),
        month: formatNumberWithLeadingZero(date.getMonth()+1),
        day: formatNumberWithLeadingZero(date.getDate()),
        hours: formatNumberWithLeadingZero(date.getHours()),
        minutes: formatNumberWithLeadingZero(date.getMinutes()),
        seconds: formatNumberWithLeadingZero(date.getSeconds())
    };
};

export const formatNumberWithLeadingZero = (num: number): string | number => {
    if(num > 0 && num < 10) {
        return `0${num}`;
    }
    
    return num;
};

export const isoToDateString = (iso: string): string => {
    const {year, month, day} = simpleExtractIsoDate(iso);
    return `${day}-${month}-${year}`;
}

export const isoToDate = (iso: string): Date => {
    return new Date(iso);
};

export const simpleExtractIsoDate = (iso: string): SimpleExtractedDate => {
    const date = isoToDate(iso);
    return simpleExtractDate(date);
}