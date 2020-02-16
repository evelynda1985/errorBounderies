import React, { Component } from 'react';
import './App.css';
import Person from "./component/person/Person";
import ErrorBoundery from "./ErrorBoundary/ErrorBoundery";



class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
      otherState: 'some other value',
      showPersons: false
  };

  deletePersonHandler = (personIndex) =>{
    // const persons = this.state.persons.slice(); /* Splice make mutable a unmuatable object IT IS NOT A GOOD PRACTICE!! make copies alwasy using slice*/
    //Other way to do this is (copy) is with the spread operator
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons : persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]) //Diffeent alternativa for clone the object but it is very to use spread operator

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }


  render() {

    let persons = null;
    if (this.state.showPersons){
      persons = (
          <div>
            {this.state.persons.map ((person, index) => { /*map is a method same sitaxis js method with arrow function*/
              return <ErrorBoundery>
                <Person
                    click = {() => this.deletePersonHandler(index)}
                    name = {person.name}
                    age = {person.age}
                    key = {person.id} /*Efficient way */
                    changed = {(event) => this.nameChangeHandler(event, person.id)}
                />
              </ErrorBoundery>
            })}
          </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
