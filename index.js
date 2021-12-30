$(() => {

    $('#load-all-countries').click((i) => {
        i.preventDefault()
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            success: result => {
                loadCountries(result)
            }
        })
    })

    $('#search-by-name').click((i) => {
        i.preventDefault()
        let selectedName = $('#search-input').val()
        $.ajax({
            url: `https://restcountries.com/v3.1/name/${selectedName}`,
            success: result => {
                loadCountries(result)
            }
        })
    })

    const loadCountries = (countries) => {

        let dataContainer = $('#countries-data-container')
        dataContainer.empty()
        let populationTable = $("#population-table-body")
        populationTable.empty()
        let regionTable = $("#region-num-of-countries-table-body")
        regionTable.empty()

        let populationTableRows = ''
        let regionTableRows = ''
        let totalCoutriesSum = 0
        let totalPopulation = 0
        let avgPopulation = 0
        let counterAfrica = 0
        let counterAmericas = 0
        let counterAsia = 0
        let counterEurope = 0
        let counterOceania = 0

        countries.forEach(element => {
            totalCoutriesSum++
            totalPopulation += element.population

            populationTableRows += `
            <tr>
                <td>
                    ${element.name.common}
                </td>
                <td>
                    ${element.population}
                </td>
            </tr>
            `
            if (element.region === "Africa") {
                counterAfrica++
            } else if (element.region === "Americas") {
                counterAmericas++
            } else if (element.region === "Asia") {
                counterAsia++
            } else if (element.region === "Europe") {
                counterEurope++
            } else if (element.region === "Oceania") {
                counterOceania++
            }


        });

        regionTableRows += `
        <tr>
        <td>
        Africa
        </td>
        <td>
        ${counterAfrica}
        </td>
        </tr>
        <tr>
        <td>
        Americas
        </td>
        <td>
        ${counterAmericas}
        </td>
        </tr>
        <tr>
        <td>
        Asia
        </td>
        <td>
        ${counterAsia}
        </td>
        </tr>
        <tr>
        <td>
        Europe
        </td>
        <td>
        ${counterEurope}
        </td>
        </tr>
        <tr>
        <td>
        Oceania
        </td>
        <td>
        ${counterOceania}
        </td>
        </tr>
        `
        avgPopulation = totalPopulation / totalCoutriesSum

        dataContainer.append(`
        <p>Total countries: ${totalCoutriesSum}</p>
        <p>Total  Population: ${totalPopulation} </p>
        <p>Average Population: ${avgPopulation}</p>
        `);


        populationTable.append(populationTableRows)
        regionTable.append(regionTableRows)

    }
})


