import React, { Component } from "react";
import "./Characters.css";

export default class Characters extends Component {
  state = {
    loading: true,
    character: null,
    prev: null,
    next: null,
    page: 1,
  };

  // async componentDidMount() {
  //   const url = "https://rickandmortyapi.com/api/character/";
  //   const response = await fetch(url);
  //   const data = await response.json();

  //   this.setState({
  //     character: data.results,
  //     loading: false,
  //     prev: data.info.prev,
  //     next: data.info.next,
  //   });
  // }

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchApi();
    }
  }

  async fetchApi() {
    const url = `https://rickandmortyapi.com/api/character?page=${this.state.page}`;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      character: data.results,
      loading: false,
    });
  }

  //Funciones de paginación
  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  prevPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  //Botones de paginación
  buttonNext() {
    return <button onClick={this.nextPage}>Next</button>;
  }

  buttonPrev() {
    if (this.state.page > 1) {
      return <button onClick={this.prevPage}>Prev</button>;
    }
  }

  // Verifica si el género del personaje es masculino, femenino o desconocido y le asigna un ícono según eso
  checkGender(gender) {
    if (gender === "Male") {
      return <i className="fas fa-male"></i>;
    } else if (gender === "Female") {
      return <i className="fas fa-female"></i>;
    } else {
      return <i className="fas fa-genderless"></i>;
    }
  }

  // Verifica si el estado del personaje es vivo, muerto o desconocido y le asigna un ícono según eso
  checkStatus(status) {
    if (status === "Dead") {
      return <i className="fas fa-skull-crossbones"></i>;
    } else if (status === "unknown") {
      return <i className="far fa-question-circle"></i>;
    }
  }

  // Convierte la fecha de creación al formato requerido, en este caso puede ser "es-GB" o "en-GB"
  convertDate(created) {
    const date = new Date(created);
    return new Intl.DateTimeFormat("en-GB").format(date);
  }

  render() {
    if (this.state.loading) {
      return <div className="spinner"></div>;
    }

    return (
      <div className="personajes">
        {this.state.character.map((character) => (
          <article key={character.id} className="personaje">
            <img src={character.image} alt="person" />
            <h3>{character.name}</h3>
            <ul>
              <li>
                <span>Species:</span> <p>{character.species}</p>
              </li>
              <li>
                <span>Gender:</span>
                <p>{character.gender}</p>
                {this.checkGender(character.gender)}
              </li>
              <li>
                <span>Location:</span>
                <p>{character.location.name}</p>
              </li>
              <li>
                <span>Status:</span>
                <p>{character.status}</p>
                {this.checkStatus(character.status)}
              </li>
              <li>
                <span>Created:</span>
                <p>{this.convertDate(character.created)}</p>
              </li>
            </ul>
          </article>
        ))}
        <footer>
          {this.state.page > 1 && (
            <button className="btn" onClick={this.prevPage}>
              Prev
            </button>
          )}
          <button className="btn" onClick={this.nextPage}>
            Next
          </button>
        </footer>
      </div>
    );
  }
}
