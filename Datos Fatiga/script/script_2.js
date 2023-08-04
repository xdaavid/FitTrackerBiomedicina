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

        // Calcular el promedio del archivo emg_data_2.csv
        const average2 = calculateAverage(emgData2);

        // Mostrar el promedio del archivo emg_data.csv en el HTML
        const averageElement = document.getElementById('average');
        averageElement.textContent = `Average (File 1): ${average.toFixed(2)}`;

        // Mostrar el promedio del archivo emg_data_2.csv en el HTML
        const averageElement2 = document.getElementById('average2');
        averageElement2.textContent = `Average (File 2): ${average2.toFixed(2)}`;

        // Mostrar el mensaje de entrenamiento dependiendo de la comparación de promedios
        const messageElement = document.getElementById('training-message');
        if (average > average2) {
            messageElement.textContent = 'No presenta fatiga muscular';
        } else {
            messageElement.textContent = 'Presenta fatiga muscular';
        }
    });
