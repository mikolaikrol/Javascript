import React from 'react';

import '../public/stylesheets/ressource.css';

export default class Ressource extends React.Component {
    
    constructor(props){
        super(props);
        this.modifyResource = this.modifyResource.bind(this);
    }

    modifyResource(){
        let newRessource = { name : this.props.name, price : this.priceInput.value};
        let body = JSON.stringify(newRessource);
        let requestOptions = { method :'PUT', headers : { "Content-Type": "application/json" }, body : body };
        fetch(`http://127.0.0.1:3000/ressources/modify/${this.props._id}`, requestOptions)
        .then ( response => response.json())
        .then ( modifiedRessource => this.props.handleRessourceModified(modifiedRessource))
        .catch ( error => console.log(error) );
    }

    render(){
        return(
            <div className="ressource">
                <span>{this.props.name}</span>
                <input type="number" defaultValue={this.props.price}
                ref={ input => this.priceInput = input }
                onChange={this.modifyResource}
                ></input>
            </div>
        )
    }
}