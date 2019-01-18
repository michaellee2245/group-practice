import React, { Component } from 'react';
import './pokemon.scss';
const pokeurl = "https://pokeapi.co/api/v2/pokemon/";

function getResults(pokeid){
  console.log(`${pokeurl}${pokeid}/`);
  return fetch(`${pokeurl}${pokeid}/`)
    .then(res => res.json());
}

class Pokemon extends Component{

    state={
        id: null,
        mons: []
    }

    hs = e => {
      e.preventDefault();
      getResults(this.state.id)
        .then(mon => {
          this.setState({
            mons: [...this.state.mons,mon],
            id: null
            })
        })
    }

    hc = e => {
      this.setState({[e.target.name]: e.target.value})
    }

    monMapper = (e,i) => {
      return (
        <div className="mon" key={i}>
          <h2>{e.name}</h2>
          <img src={e.sprites.front_default} alt={e.name} />
        </div>
      )
    }

    render(){
        return(
            <div className="pokemon">
                <form onSubmit={this.hs}>
                  <label>What number pokemon do you want?</label>
                  <input
                    name="id"
                    type="number"
                    min="1"
                    max="150"
                    onChange={this.hc}
                    />
                  <button id="pokemon-button" type="submit" disabled={!this.state.id}>
                    add pokemon
                  </button>
                </form>
                <div className="mons">
                {this.state.mons.map(this.monMapper)}
                </div>
            </div>

        )
    }
}

export default Pokemon;
