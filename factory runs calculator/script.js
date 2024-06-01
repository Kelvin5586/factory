function calculate() {
    const date = document.getElementById('date').value;
    const numberPlate = document.getElementById('numberPlate').value;
    const driverName = document.getElementById('driverName').value;
    const timeOut = document.getElementById('timeOut').value;
    const timeIn = document.getElementById('timeIn').value;
    const firstRun = document.getElementById('firstRun').value;
    const secondRun = document.getElementById('secondRun').value;
    const thirdRun = document.getElementById('thirdRun').value;
    const fourthRun = document.getElementById('fourthRun').value;
    const timeOutFactory = document.getElementById('timeOutFactory').value;

    // Convert time to minutes
    const timeInMinutes = convertToMinutes(timeIn);
    const firstRunMinutes = convertToMinutes(firstRun);
    const secondRunMinutes = convertToMinutes(secondRun);
    const thirdRunMinutes = convertToMinutes(thirdRun);
    const fourthRunMinutes = convertToMinutes(fourthRun);

    // Calculate number of runs
    const runTimes = [firstRunMinutes, secondRunMinutes, thirdRunMinutes, fourthRunMinutes];
    const validRunTimes = runTimes.filter(time => !isNaN(time));
    const numberOfRuns = validRunTimes.length;

    // Calculate average time in
    const averageInTime = validRunTimes.reduce((sum, time) => sum + time, 0) / numberOfRuns;

    // Calculate time in factory
    const timeOutFactoryMinutes = convertToMinutes(timeOutFactory);
    const timeInFactory = timeOutFactoryMinutes - timeInMinutes;
    const timeInFactoryHrs = Math.floor(timeInFactory / 60);
    const timeInFactoryMins = timeInFactory % 60;
    const timeInFactoryFormatted = `${timeInFactoryHrs} HRS ${timeInFactoryMins} MINS`;

    // Calculate average time in factory
    const averageFactoryTime = timeInFactory / numberOfRuns;

    // Insert into table
    const tbody = document.querySelector('#resultTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${date}</td>
        <td>${numberPlate}</td>
        <td>${driverName}</td>
        <td>${timeOut}</td>
        <td>${timeIn}</td>
        <td>${timeInMinutes}</td>
        <td>${firstRun}</td>
        <td>${secondRun}</td>
        <td>${thirdRun}</td>
        <td>${fourthRun}</td>
        <td>${averageInTime.toFixed(2)}</td>
        <td>${timeOutFactory}</td>
        <td>${timeInFactoryFormatted}</td>
        <td>${timeInFactory}</td>
        <td>${averageFactoryTime.toFixed(2)}</td>
    `;

    tbody.appendChild(row);
}

function convertToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function exportToExcel() {
    const table = document.getElementById('resultTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, 'FactoryRunData.xlsx');
}
