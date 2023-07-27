// Ethical Considerations and Company Symbols Form Component
Vue.component('input-form', {
  data() {
    return {
      ethicalConcerns: [],
      companySymbols: []
    };
  },
  template: `
    <div>
      <div>
        <label for="ethicalConcerns">Ethical Concerns:</label>
        <input type="text" v-model="newEthicalConcern" @keyup.enter="addEthicalConcern">
        <button @click="addEthicalConcern">Add</button>
      </div>
      <div>
        <ul>
          <li v-for="(concern, index) in ethicalConcerns" :key="index">
            {{ concern }}
            <button @click="removeEthicalConcern(index)">Remove</button>
          </li>
        </ul>
      </div>
      <div>
        <label for="companySymbols">Company Symbols:</label>
        <input type="text" v-model="newCompanySymbol" @keyup.enter="addCompanySymbol">
        <button @click="addCompanySymbol">Add</button>
      </div>
      <div>
        <ul>
          <li v-for="(symbol, index) in companySymbols" :key="index">
            {{ symbol }}
            <button @click="removeCompanySymbol(index)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  `,
  methods: {
    addEthicalConcern() {
      if (this.newEthicalConcern) {
        this.ethicalConcerns.push(this.newEthicalConcern);
        this.newEthicalConcern = '';
      }
    },
    removeEthicalConcern(index) {
      this.ethicalConcerns.splice(index, 1);
    },
    addCompanySymbol() {
      if (this.newCompanySymbol) {
        this.companySymbols.push(this.newCompanySymbol);
        this.newCompanySymbol = '';
      }
    },
    removeCompanySymbol(index) {
      this.companySymbols.splice(index, 1);
    }
  }
});

// Output Component
Vue.component('output-results', {
  props: ['analysisResults'],
  template: `
    <div>
      <pre>{{ analysisResults }}</pre>
    </div>
  `
});

// Main Vue Instance
new Vue({
  el: '#app',
  data: {
    analysisResults: {}
  },
  methods: {
    // Function to make API request and update analysisResults
    // You need to implement this function to interact with your backend
    analyzeData() {
      // Replace the below with actual API request to your backend
      // Use the data from the input-form component to make the request
      this.analysisResults = { result: 'Analysis results will be displayed here.' };
    }
  }
});
