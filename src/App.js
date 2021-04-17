import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  // montar o estado
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '', // filter com '' para não dar erro de null/undefined 
    }
  }

  // req. http
  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    // map para pegar keys especificas de cada elem do json
    // apos map ja pode desestruturar
    const allCountries = json.map( ({name, numericCode, flag, population}) => {
      return {
        id: numericCode,
        name, 
        filterName: name.toLowerCase(),
        flag,
        population
      }
    });
// para o App começar com a população total 
    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);

    this.setState({ 
      allCountries, //atalho p atribuir
      // fazer uma copia do obj para nao apontar para o mesmo lugar na memoria
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
    });
  }

  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    // filtrar antes para todos e ganhar performance.
    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter(country => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(filteredCountries);

    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  };

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;

    // countryCount para passar o tamanho do vetor e mostrar no label 
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header 
          filter={filter}
          countryCount={filteredCountries.length} 
          totalPopulation={filteredPopulation}
          onChangeFilter={this.handleChangeFilter} />

        <Countries countries={ filteredCountries }/>
      </div>
    )
  }
}

// outra forma de estilizar (JS puro)
const styles = {
  centeredTitle: {
      textAlign: 'center',
  },
};
