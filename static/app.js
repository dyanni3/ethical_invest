import axios from 'axios';

Vue.config.delimiters = ['[[', ']]'];

// EthicalDropdown Component
Vue.component('ethical-dropdown', {
  data() {
    return {
      selectedEthicalConcerns: '',
      ethicalConcerns: [
        'Environmental impact',
        'Social Impact',
        'Halal investing',
        'Labor Practices',
        'Animal Welfare',
        'Military' ,
      ]
    };
  },
  template: `
    <div>
      <label for="ethicalConcerns">Ethical Concerns:</label>
      <select v-model="selectedEthicalConcerns" multiple>
        <option v-for="concern in ethicalConcerns" :key="concern">[[ concern ]]</option>
      </select>
      <button @click="addEthicalConcerns">Add</button>
    </div>
  `,
  methods: {
    addEthicalConcerns() {
      if (this.selectedEthicalConcerns.length > 0) {
        this.$emit('add-ethical-concerns', this.selectedEthicalConcerns);
        this.selectedEthicalConcerns = [];
      }
    }
  }
});

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
            [[ concern ]]
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
           [[{ symbol ]]
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
      <pre>{[[analysisResults ]]</pre>
    </div>
  `
});

document.addEventListener('DOMContentLoaded', function () {
// Main Vue Instance
new Vue({
  el: '#app',
  data: {
    analysisResults: {}
  },
  methods: {
    analyzeData() {
      // Get the ethical concerns and company symbols from the Vue component
      const ethicalConcerns = this.$refs.inputForm.ethicalConcerns;
      const companySymbols = this.$refs.inputForm.companySymbols;

      // Make the API request to your Flask backend
      axios.post('/analyze', { ethical_concerns: ethicalConcerns, company_symbols: companySymbols })
        .then(response => {
          // Handle the response from the backend
          this.analysisResults = response.data;
        })
        .catch(error => {
          // Handle any errors that occurred during the API request
          console.error('Error:', error);
        });
    }
  }
});

