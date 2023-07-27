// DOM elements
const subscribeForm = document.querySelector('#subscribe form');
const ethicalConcernsInput = document.querySelector('#selection #ethical-concerns');
const companySymbolsInput = document.querySelector('#selection #company-symbols');
const analyzeButton = document.querySelector('#analyze-btn');
const outputTextDiv = document.querySelector('#output-text');

// Event listeners
subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target.elements['email'].value;
    // Use Axios to send the email to the backend for subscription handling
    // Implement the API call to the backend for subscribing the user
});

// Event listener for when the user clicks the Analyze button
analyzeButton.addEventListener('click', () => {
    const selectedEthicalConcerns = ethicalConcernsInput.value.split(',').map(concern => concern.trim());
    const selectedCompanySymbols = companySymbolsInput.value.split(',').map(symbol => symbol.trim());

    // Data to be sent to the backend
    const data = {
        ethical_concerns: selectedEthicalConcerns,
        companies: selectedCompanySymbols
    };

    // Use Axios to send the selected data to the backend for processing
    axios.post('/analyze', data)
        .then(response => {
            const analysisResults = response.data;

            // Create a table to display the analysis results
            let tableHTML = `
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Ethical Concern</th>
                            <th>Score</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Loop through the analysis results and add rows to the table
            for (const companySymbol in analysisResults) {
                const companyData = analysisResults[companySymbol];

                for (const concern in companyData) {
                    const [score, details] = companyData[concern];

                    tableHTML += `
                        <tr>
                            <td>${companySymbol}</td>
                            <td>${concern}</td>
                            <td>${score}</td>
                            <td>${details}</td>
                        </tr>
                    `;
                }
            }

            // Close the table HTML
            tableHTML += `
                    </tbody>
                </table>
            `;

            // Display the table in the output text div
            outputTextDiv.innerHTML = tableHTML;
        })
        .catch(error => {
            console.error('Error analyzing data:', error);
        });
});