class EmissionCircle {
    constructor(emissionTotal, country) {
        this.emissionTotal = emissionTotal;
        this.country = country;
        this.radius = this.emissionToRadius();
    }

    drawCircle() {
        noFill();
        stroke(0);
        strokeWeight(2);
        circle(this.country.lon, this.country.lat, this.radius);
        textAlign(CENTER);
        textSize(8);
        text(this.country.name, this.country.lon, this.country.lat + 20);
    }

    emissionToRadius() {
        return map(this.emissionTotal, 0, 16000, 20, 200);
    }

    grow() {
        this.radius++;
    }
}
