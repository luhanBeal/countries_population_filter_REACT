import React, { Component } from 'react';

import css from './countries.module.css';

export default class Country extends Component {
    render() {
        const { country } = this.props;
        const { name, flag } = country;
// duas classes css em js
        return (
        <div className={`${css.country} ${css.border}`}>
            <img className={css.flag} src={flag} alt={name}></img>
            <span className={css.countryName}>{name}</span>
        </div>
        );
    }
}
