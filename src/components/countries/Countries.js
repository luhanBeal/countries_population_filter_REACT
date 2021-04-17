import React, { Component } from 'react';
import Country from './Country';

import css from './countries.module.css';

export default class Countries extends Component {
    render() {
        // utilisar as props por esse componente ser somente leitura
        // desestruturar countries recebida de props
        const { countries } = this.props;

        // map para li que se repete
        // key para cada li ter um id
        return (
            <div className={css.border}>
                {countries.map((country) => {
                    return <Country key={country.id} country={country}/>
                })}
            </div>
        )
    }
}
