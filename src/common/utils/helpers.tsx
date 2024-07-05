function formatDate(dateString: string): string {
    const dateParts: string[] = dateString.split('/');
    const year: string = dateParts[2];
    const month: string = dateParts[0];
    const day: string = dateParts[1];


    const monthNames: string[] = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];


    const date: Date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Month needs to be 0-indexed

    const formattedDate: string = `${day} ${monthNames[date.getMonth()]} ${year}`;

    return formattedDate;
}

export { formatDate };