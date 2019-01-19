import React, { Component } from 'react';
import './pokemon.scss';
const pokeurl = "https://pokeapi.co/api/v2/pokemon/";

function getResults(pokeid) {
  return fetch(`${pokeurl}${pokeid}/`)
    .then(res => res.json());
}

class Pokemon extends Component {

  state = {
    id: null,
    pool: [],
    pikachu: [],
    rocket: []
  }

  hs = e => {
    e.preventDefault();
    getResults(this.state.id)
      .then(mon => {
        this.setState({
          pool: [...this.state.pool, mon],
          id: null
        })
      })
  }

  hc = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteMon = (index, fromWhere) => {
    const filteredMons = this.state[fromWhere].filter((e, i) => i !== index);
    this.setState({ [fromWhere]: filteredMons });
  }

  monMapper = comingFrom => (mon, i) => {
    return (
      <div
        className="mon"
        key={i}
        onDragStart={e => this.onDragStart(e, i, comingFrom)}
      >
        <h3>{mon.name}</h3>
        <button
          className="pokemon-button"
          onClick={() => this.deleteMon(i, comingFrom)}
        >
          delete this mon
          </button>
        <img src={mon.sprites.front_default} alt={mon.name} />
      </div>
    )
  }

  onDragOver = e => {
    e.preventDefault();
  }

  onDrop = (e, goingTo) => {
    const comingFrom = e.dataTransfer.getData("coming-from");
    const index = e.dataTransfer.getData("index");
    this.moveMon(index, comingFrom, goingTo);
  }

  onDragStart = (event, index, comingFrom) => {
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("coming-from", comingFrom);
  }

  moveMon = (index, comingFrom, goingTo) => {
    const newFrom = this.state[comingFrom];
    const mon = newFrom.splice(index, 1)[0];
    const newTo = [...this.state[goingTo], mon];
    this.setState({
      [comingFrom]: newFrom,
      [goingTo]: newTo
    })
  }

  render() {
    return (
      <div className="pokemon">
        <h2>HOW TO USE THIS REACT COMPONENT</h2>
        <p>
          Submit a number to get a pokemon from pokeapi.
          Then, click and drag pokemon to assign them to
          teams. You can also delete pokemon if you need to.
        </p>
        <form onSubmit={this.hs}>
          <label>What number pokemon do you want?</label>
          <input
            name="id"
            type="number"
            min="1"
            max="150"
            onChange={this.hc}
          />
          <button
            className="pokemon-button"
            type="submit"
            disabled={!this.state.id}
          >
            add pokemon
          </button>
        </form>
        <div className="mons">
          <div className="pool"
            onDragOver={this.onDragOver}
            onDrop={e => this.onDrop(e, 'pool')}
          >
            <h2>unaffiliated mons</h2>
            {this.state.pool.map(this.monMapper('pool'))}
          </div>
          <div className="team"
            onDragOver={this.onDragOver}
            onDrop={e => this.onDrop(e, 'pikachu')}
          >
            <h2>TEAM PIKACHU</h2>
            {this.state.pikachu.map(this.monMapper('pikachu'))}
          </div>
          <div className="team"
            onDragOver={this.onDragOver}
            onDrop={e => this.onDrop(e, 'rocket')}
          >
            <h2>TEAM ROCKET</h2>
            {this.state.rocket.map(this.monMapper('rocket'))}
          </div>
        </div>
      </div>

    )
  }
}

export default Pokemon;
