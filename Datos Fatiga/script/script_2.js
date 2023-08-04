// Función para leer el archivo CSV y obtener los datos en formato numérico
function readCSV(file) {
    return fetch(file)
        .then(response => response.text())
        .then(data => {
            // Dividir el archivo CSV en líneas
            const lines = data.split('\n');
            // Convertir las líneas en datos numéricos
            const numericData = lines.map(line => parseFloat(line));
            return numericData;
        })
        .catch(error => {
            console.error('Error al cargar el archivo:', error);
            return [];
        });
}

// Calcular el promedio de los datos
function calculateAverage(data) {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
}

// Leer los datos del archivo CSV emg_data.csv
const emgDataPromise = readCSV('emg_data.csv');

// Leer los datos del archivo CSV emg_data_2.csv
const emgData2Promise = readCSV('emg_data_2.csv');

// Procesar ambos archivos CSV y comparar los promedios
Promise.all([emgDataPromise, emgData2Promise])
    .then(([emgData, emgData2]) => {
        // Calcular el promedio de los datos EMG del archivo emg_data.csv
        const average = calculateAverage(emgData);

        // Mostrar el promedio del archivo emg_data.csv en el HTML
        const averageElement = document.getElementById('average');
        averageElement.textContent = `Average (File 1): ${average.toFixed(2)}`;

        // Obtener los datos por encima del promedio del archivo emg_data.csv
        const aboveAverageData = emgData.filter(value => value > average);

        // Mostrar los datos por encima del promedio del archivo emg_data.csv en el HTML
        const aboveAverageElement = document.getElementById('above-average');
        aboveAverageElement.textContent = `Data above average (File 1): ${aboveAverageData.join(', ')}`;

        // Calcular el promedio de los datos EMG del archivo emg_data_2.csv
        const average2 = calculateAverage(emgData2);

        // Mostrar el promedio del archivo emg_data_2.csv en el HTML
        const averageElement2 = document.getElementById('average2');
        averageElement2.textContent = `Average (File 2): ${average2.toFixed(2)}`;

        // Obtener los datos por encima del promedio del archivo emg_data_2.csv
        const aboveAverageData2 = emgData2.filter(value => value > average2);

        // Mostrar los datos por encima del promedio del archivo emg_data_2.csv en el HTML
        const aboveAverageElement2 = document.getElementById('above-average2');
        aboveAverageElement2.textContent = `Data above average (File 2): ${aboveAverageData2.join(', ')}`;

        // Mostrar el mensaje de entrenamiento dependiendo de la comparación de promedios
        const messageElement = document.getElementById('training-message');
        if (aboveAverageData2.length >= 20) {
            messageElement.textContent = 'Entrenamiento completamente eficiente';
        } else if (aboveAverageData2.length >= 15) {
            messageElement.textContent = 'Entrenamiento eficiente';
        } else {
            messageElement.textContent = 'Entrenamiento no eficiente';
        }
    });
