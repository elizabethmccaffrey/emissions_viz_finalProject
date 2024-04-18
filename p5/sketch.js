let SELECTEDCOUNTRIES = [
  "Afghanistan", "Albania", "Aruba", "Australia", "Bahamas", "Brazil", "Canada", "Cayman Islands",
  "Chile", "China", "Cuba", "Egypt", "Fiji", "Germany", "Greece", "Greenland", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Jamaica", "Japan", "Liberia", "Luxembourg", "Mexico", "Netherlands", "Pakistan",
  "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Sudan", "Sweden",
  "Türkiye", "United Arab Emirates", "Ukraine", "United Kingdom", "United States", "Vietnam"
];

let countryMapping;
let emissionsTotal_perYear;

let countries = [];
let emissionsMap = {};

let year = 1970;
let yearCounter = 0;

function preload() {
  countryMapping = loadTable('world_country_and_usa_states_latitude_and_longitude_values.csv', 'header');
  emissionsTotal_perYear = loadTable('totalEmissions_perYear.csv', 'header');
}

function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  const canvas = createCanvas(800, 500);
  canvas.parent('sketch-container');
  //smooth();
  pixelDensity(3);

  for (let j = 0; j < emissionsTotal_perYear.getRowCount(); j++) {
    let countryName = emissionsTotal_perYear.getString(j, 'Country');
    let emissionsByYear = {};

    for (let year = 1970; year <= 2022; year++) {
      let emissionString = emissionsTotal_perYear.getString(j, String(year));
      let emissionValue = parseFloat(emissionString);

      // Check if emissionValue is a valid number (not NaN)
      if (!isNaN(emissionValue)) {
        emissionsByYear[year] = emissionValue;
      } else {
        // Handle non-numeric or NaN values (e.g., set a default value, skip, etc.)
        // Here, you can choose what action to take for NaN values
        // For example, setting a default value:
        emissionsByYear[year] = 0; // Set to 0 or any other default value
      }
    }

    emissionsMap[countryName] = emissionsByYear;
  }



  for (let i = 0; i < countryMapping.getRowCount(); i++) {
    let countryName = countryMapping.getString(i, 'country');
    if (SELECTEDCOUNTRIES.includes(countryName)) {
      let lon = countryMapping.getNum(i, 'longitude');
      let lat = countryMapping.getNum(i, 'latitude');

      let emissionsData = [];
      let emissionsByYear = emissionsMap[countryName];
      if (emissionsByYear) {
        for (let year = 1970; year <= 2022; year++) {
          let emissionValue = emissionsByYear[year];
          if (emissionValue !== undefined) {
            emissionsData.push(emissionValue);
          }
        }
      }
      let country = new Country(countryName, emissionsData, lon, lat);
      countries.push(country);
    }
  }
}

function draw() {
  background('#FFFFFF');

  textSize(12);
  noStroke();
  fill(0);
  text("Year: ", 20, 25);
  text(yearCounter + 1970, 50, 25);

  for (let country of countries) {
    country.drawYear(yearCounter);
  }

  if (frameCount % 30 === 0) {
    if (yearCounter < 52) {
      yearCounter++;
    } else {
      yearCounter = 0;
      year = 0;

    }
  }
}

function displayCountryName(name, x, y) {
  textSize(14);
  fill(0);
  text(name, x + 15, y - 10); // Adjust text position
}
