import React from 'react';

import '../public/stylesheets/createClient.css';

export default class CreateClient extends React.Component {
    
    constructor(props){
        super(props);
        this.createClient = this.createClient.bind(this);
        this.clearField = this.clearField.bind(this);
        this.handleInputReset = this.handleInputReset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return(
            <div id="createClient">
                <input id="newClientName" type="text" placeholder="name" 
                ref={input => this.input = input}
                onChange={this.handleInputChange}
                onBlur={this.handleInputReset}></input>
                <button id="buttonCreate"
                onClick={this.createClient}>Create</button>
            </div>
        )
    }

    handleInputChange(){
        this.props.handleInputChange(this.input.value);
    }

    handleInputReset(){
        this.props.handleInputReset();
    }

    randomArray(){ 
        let arr = new Array(12).fill(4).map((e) => {
          let rand = Math.round((Math.random() * 11));
          return e + rand;
        });
        return arr;
      };

    createClient() {
        const name = document.getElementById("newClientName");
        let datas = [{energy : this.props.ids.water, data : this.randomArray()}, {energy : this.props.ids.gaz, data : this.randomArray()}, {energy : this.props.ids.electricity, data : this.randomArray()}];
        let newClient = { name : name.value, datas : datas};
        let body = JSON.stringify(newClient);
        let requestOptions = { method :'POST', headers : { "Content-Type": "application/json" }, body : body };
        fetch('http://127.0.0.1:3000/clients/', requestOptions)
        .then( response => response.json() )
        .then( client => this.props.handleNewClientCreated(client))
        .then( () => this.clearField() )
        .catch( error => console.log(error.message) ); 
    }

    clearField() {
        const name = document.getElementById("newClientName");
        name.value = "";
    }

}