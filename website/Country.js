class Country {
    constructor(name, emissions, lon, lat) {
        this.name = name;
        this.emissions = emissions;
        this.lon = map(lon, -180, 180, -100, width - 20);
        this.lat = map(lat, -90, 90, height, 0);
        this.sizes = [];
        this.size = 0;
        this.emissionToRadius();
    }

    drawYear(yearCounter) {
        noFill();
        if (this.sizes.length < 1) {
            circle(this.lon, this.lat, 0);
        } else {
            this.determineColor(this.emissions[yearCounter]);
            stroke(this.hue);
            strokeWeight(1);
            circle(this.lon, this.lat, this.sizes[yearCounter]);
        }
        
        noStroke();
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(6);
        text(this.name, this.lon, this.lat + 12);

        /*
        if (dist(mouseX, mouseY, this.x, this.y) < this.circleRadius) {
            this.showCountryName();
          }*/
    }

    emissionToRadius() {
        for (let i = 0; i < this.emissions.length; i++) {
            this.sizes.push(map(this.emissions[i], 0, 16000, 5, 250));
        }
    }

    determineColor(emissions) {
        if (emissions > 0 && emissions < 100) {
            this.hue = color('#17D169');
        } else if (emissions >= 100 && emissions < 500) {
            this.hue = color('#17D122');
        } else if (emissions >= 500 && emissions < 700) {
            this.hue = color('#93D117');
        } else if (emissions >= 700 && emissions < 3000) {
            this.hue = color('#EEE413');
        } else if (emissions >= 3000 && emissions < 10000) {
            this.hue = color('#EEA513');
        } else {
            this.hue = color('#EE3413');
        }
    }

    /*
    showCountryName() {
        textSize(14);
        fill(0);
        text(this.name, this.x + 15, this.y - 10); // Adjust text position
      }*/
}
