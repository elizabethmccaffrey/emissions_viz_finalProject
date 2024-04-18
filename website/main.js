//Define data
update = undefined;
const emissions_2022 = d3.csv("../emissions_viz_finalProject/data/emissions_data_2022.csv");

emissions_2022.then(function (data) {
    data.forEach(function (d) {
        d.EmissionsPerCapita = +d.EmissionsPerCapita;
        d.Population = +d.Population;
        d["Total Emissions"] = +d["Total Emissions"];
    });
    data.sort((a, b) => b.EmissionsPerCapita - a.EmissionsPerCapita);

    let width = 760;
    let height = 700;
    let margin = { top: 20, bottom: 100, left: 100, right: 30 };

    let svg = d3.select('#plot')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#FFFFFF')


    let xScale = d3.scaleBand()
        .domain(d3.map(data, d => d.Country))
        .range([width - margin.right, margin.left])
        .padding(0.2);

    const xAxe = d3.axisBottom(xScale).tickSizeOuter(0);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.EmissionsPerCapita) + 0.000001]).nice()
        .range([height - margin.bottom, margin.top])


    let xAxis = svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxe);

    xAxis.selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');


    let yAxis = svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft().scale(yScale));

    let bar = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.Country))
        .attr('y', d => yScale(d.EmissionsPerCapita))
        .attr('width', d => xScale.bandwidth())
        .attr('height', d => height - margin.bottom - yScale(d.EmissionsPerCapita))
        .attr('fill', d => {
            if (d.Country === "China" || d.Country === "United States" || d.Country === "India" || d.Country === "Russia"
                || d.Country === "Brazil" || d.Country === "Indonisia" || d.Country === "Japan" || d.Country === "Iran"
                || d.Country === "Mexico" || d.Country === "Saudi Arabia") {
                return "#FF5733"; // Change the color for specified countries
            } else {
                return "#697FD9"; // Default color for other countries
            }
        })
    //.attr('fill', '#697FD9');

    yAxis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -250)
        .attr('y', -65)
        .style('stroke', '#000000')
        .text('Emissions per Capita (mt)');

    let legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 200) + "," + (margin.top + 20) + ")");

    legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", "#FF5733");

    legend.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("dy", "0.5em")
        .style("font-size", "12px")
        .text("Top 10 GHG Producers");

    legend.append("rect")
        .attr("x", 0)
        .attr("y", 20)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", "#697FD9");

    legend.append("text")
        .attr("x", 20)
        .attr("y", 30)
        .attr("dy", "0.5em")
        .style("font-size", "12px")
        .text("Other Countries");


    update = function (order) {

        if (order === 'EmissionsPerCapita') {
            data.sort((a, b) => b.EmissionsPerCapita - a.EmissionsPerCapita);
        } else if (order === 'Population') {
            data.sort((a, b) => b.Population - a.Population);
        } else if (order === 'Total Emissions') {
            data.sort((a, b) => b['Total Emissions'] - a['Total Emissions']);
        }

        xScale.domain(data.map(d => d.Country));

        const t = svg.transition()
            .duration(750);

        bar.data(data, d => d.Country)
            .order()
            .transition(t)
            .delay((d, i) => i * 20)
            .attr('x', d => xScale(d.Country));

        xAxis.transition(t)
            .call(xAxe)
            .selectAll(".tick")
            .delay((d, i) => i * 20)
            .selectAll("text")
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)');
    };

    function handleButtonClick(order) {
        update(order); // Call the update function with the selected ordering criterion
    }

    // Call the function with the desired ordering criterion when a button is clicked
    d3.select("#emissionsPerCapitaButton").on("click", function () {
        handleButtonClick('EmissionsPerCapita');
    });

    d3.select("#populationButton").on("click", function () {
        handleButtonClick('Population');
    });

    d3.select("#totalEmissionsButton").on("click", function () {
        handleButtonClick('Total Emissions');
    });

});




