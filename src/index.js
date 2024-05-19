import './styles.css'; // Need to set up separate css bundler
// style-loader is for inline css in html

const apiKeyThatShouldBeHidden = "8e857ce11bf040898ef92322241805";
async function getData(location) {
    try {
        const responseData = await Promise.all([
            fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKeyThatShouldBeHidden}&q=${location}`),
            // fetch("http://api.weatherapi.com/v1/forecast.json"),
            // fetch("http://api.weatherapi.com/v1/search.json"),
            // fetch("http://api.weatherapi.com/v1/timezone.json"),
            // fetch("http://api.weatherapi.com/v1")
        ]);
        const parsedData = await Promise.all(responseData.map(response => response.json()));
        console.log(parsedData);
    } catch (error) {
        console.error("Error: ", error);
    }
}

function processData(data) {
    
}
getData("Honolulu");