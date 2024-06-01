function calculate() {
    const carNumber = document.getElementById('carNumber').value;
    const driver = document.getElementById('driver').value;
    const timeOut = document.getElementById('timeOut').value;
    const timeIn = document.getElementById('timeIn').value;
    const firstRun = document.getElementById('firstRun').value;
    const secondRun = document.getElementById('secondRun').value;
    const thirdRun = document.getElementById('thirdRun').value;
    const fourthRun = document.getElementById('fourthRun').value;

    if (!carNumber || !driver || !timeOut || !timeIn) {
        alert('Please fill out all required fields.');
        return;
    }

    // Convert time to minutes
    const timeOutMinutes = convertToMinutes(timeOut);
    const timeInMinutes = convertToMinutes(timeIn);
    const firstRunMinutes = convertToMinutes(firstRun);
    const secondRunMinutes = convertToMinutes(secondRun);
    const thirdRunMinutes = convertToMinutes(thirdRun);
    const fourthRunMinutes = convertToMinutes(fourthRun);

    const runTimes = [firstRunMinutes, secondRunMinutes, thirdRunMinutes, fourthRunMinutes];
    const validRunTimes = runTimes.filter(time => !isNaN(time));
    const numberOfRuns = validRunTimes.length;

    // Calculate total time in field
    const totalTimeInField = validRunTimes.reduce((sum, time) => sum + time, 0);
    const totalTimeInFieldHrs = Math.floor(totalTimeInField / 60);
    const totalTimeInFieldMins = totalTimeInField % 60;
    const totalTimeInFieldFormatted = `${totalTimeInFieldHrs}:${totalTimeInFieldMins}`;

    // Calculate average time in field
    const averageTimeInField = totalTimeInField / numberOfRuns;
    const averageTimeInFieldHrs = Math.floor(averageTimeInField / 60);
    const averageTimeInFieldMins = averageTimeInField % 60;
    const averageTimeInFieldFormatted = `${averageTimeInFieldHrs}:${averageTimeInFieldMins}`;

    // Insert into table
    const tbody = document.querySelector('#resultTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td data-label="Car Number">${carNumber}</td>
        <td data-label="Driver">${driver}</td>
        <td data-label="Time Out (HRS)">${timeOut}</td>
        <td data-label="Time In (HRS)">${timeIn}</td>
        <td data-label="Times In Field (HRS&MINS)">${totalTimeInFieldFormatted}</td>
        <td data-label="Times In Field (MIN)">${totalTimeInField}</td>
        <td data-label="1st Run">${firstRun}</td>
        <td data-label="2nd Run">${secondRun}</td>
        <td data-label="3rd Run">${thirdRun}</td>
        <td data-label="4th Run">${fourthRun}</td>
        <td data-label="Average (HRS&MINS)">${averageTimeInFieldFormatted}</td>
        <td data-label="Average (MIN)">${averageTimeInField}</td>
        <td data-label="Time In Factory (HRS&MINS)">${totalTimeInFieldFormatted}</td>
        <td data-label="Time In Factory (MIN)">${totalTimeInField}</td>
    `;

    tbody.appendChild(row);

    // Reset form inputs
    resetForm();
}

function convertToMinutes(time) {
    if (!time) return NaN;
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function resetForm() {
    document.getElementById('runForm').reset();
}

function exportToExcel() {
    const table = document.getElementById('resultTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, 'FactoryRunData.xlsx');
}
