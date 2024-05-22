import './styles.css'; // Need to set up separate css bundler
// style-loader is for inline css in html

const apiKeyThatShouldBeHidden = "8e857ce11bf040898ef92322241805";
async function getData(location) {
    try {
        const responseData = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKeyThatShouldBeHidden}&q=${location}`);
        const parsedData = responseData.json();
        return parsedData;
    } catch (error) {
        console.error("Error: ", error);
    }
}

const nameElem = document.querySelector(".name");
const regionElem = document.querySelector(".region");
const countryElem = document.querySelector(".country");
const localtimeElem = document.querySelector(".localtime");
const tempElem = document.querySelector(".temp");
const conditionElem = document.querySelector(".condition");
const windSpeedElem = document.querySelector(".wind-speed");
const humidityElem = document.querySelector(".humidity");

async function processData(data) {
    const objectToAccess = await data;
    console.log(objectToAccess);
    const nameVal = objectToAccess.location.name;
    const regionVal = objectToAccess.location.region;
    const countryVal = objectToAccess.location.country;
    const localtimeVal = objectToAccess.location.localtime;
    const tempCVal = objectToAccess.current.temp_c;
    const tempFVal = objectToAccess.current.temp_f;
    const conditionText = objectToAccess.current.condition.text;
    const conditionIcon = objectToAccess.current.condition.icon;
    const windSpeedMph = objectToAccess.current.wind_mph;
    const windSpeedKph = objectToAccess.current.wind_kph;
    const humidityVal = objectToAccess.current.humidity;
    // Finish setting the text content
    nameElem.textContent = nameVal;
    regionElem.textContent = regionVal;
    countryElem.textContent = countryVal;
    localtimeElem.textContent = localtimeVal;
    // Work on alternating between C and F
    const tempC = "Temperature: " + tempCVal + "\u00B0C";
    const tempF = "Temperature: " + tempFVal + "\u00B0F";
    tempElem.textContent = tempC;
    tempElem.addEventListener("click", () => {
        if (tempElem.textContent === tempC) {
            tempElem.textContent = tempF;
        } else {
            tempElem.textContent = tempC;
        }
    });

    conditionElem.textContent = conditionText;
    // Work on wind speed mph and kph
    const windMph = "Windspeed: " + windSpeedMph + " mph";
    const windKph = "Windspeed: " + windSpeedKph + " kph";
    windSpeedElem.textContent = windMph;
    windSpeedElem.addEventListener("click", () => {
        if (windSpeedElem.textContent === windMph) {
            windSpeedElem.textContent = windKph;
        } else {
            windSpeedElem.textContent = windMph;
        }
    });

    humidityElem.textContent = "Humidity: " +  humidityVal;
}

const searchButton = document.querySelector(".search-button");
const searchBar = document.querySelector(".search");
searchButton.addEventListener("click", () => {
    processData(getData(searchBar.value));
    searchBar.value = "";
});

processData(getData("Honolulu"));