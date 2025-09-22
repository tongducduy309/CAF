export interface DateTimeParts {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

export function parseLocalDateTime(dateTimeStr: string): DateTimeParts | null {
    if (!dateTimeStr) return null;

    try {
        const normalized = dateTimeStr.includes("T") ? dateTimeStr : dateTimeStr.replace(" ", "T");

        const d = new Date(normalized);

        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds(),
        };
    } catch (e) {
        console.error("Cannot parse LocalDateTime:", dateTimeStr, e);
        return null;
    }
}

export const numberToStringMonth = (month: number): string => {
    const months: string[] = [
  "", 
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
    return months[month]
}