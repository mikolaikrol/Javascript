import React from 'react';

import '../public/stylesheets/client.css';

export default class Client extends React.Component {
    
    constructor(props){
        super(props);
        this.deleteClient = this.deleteClient.bind(this);
        this.computeYearlyCost = this.computeYearlyCost.bind(this);
        this.handleClientSelected = this.handleClientSelected.bind(this);
    }

    deleteClient(){
        let requestOptions = { method :'DELETE' };
        fetch(`http://127.0.0.1:3000/clients/${this.props._id}`, requestOptions)
            .then( response => response.json())
            .then( this.props.handleClientDeleted(this.props._id))
            .catch( error => console.log(error) );
    }

    computeYearlyCost(){
        const waterObject = this.props.datas[this.props.datas.findIndex(res => res.energy === this.props.ids.water)];
        const electricityObject = this.props.datas[this.props.datas.findIndex(res => res.energy === this.props.ids.electricity)];
        const gazObject = this.props.datas[this.props.datas.findIndex(res => res.energy === this.props.ids.gaz)];
        const reduce = (accumulator, currentValue) => accumulator + currentValue;
        const electricity = this.props.ressources[this.props.ressources.findIndex(res => res._id === this.props.ids.electricity)].price * electricityObject.data.reduce(reduce);
        const gaz = this.props.ressources[this.props.ressources.findIndex(res => res._id === this.props.ids.gaz)].price * gazObject.data.reduce(reduce);
        const water = this.props.ressources[this.props.ressources.findIndex(res => res._id === this.props.ids.water)].price * waterObject.data.reduce(reduce);
        return {electricity : electricity.toFixed(2), water : water.toFixed(2), gaz : gaz.toFixed(2)};
    }

    handleClientSelected(){
        this.props.handleClientSelected(this.props._id);
    }

    render(){
        const button = this.props.displayDeleteButton ? <button onClick={this.deleteClient}>Delete</button> : null;
        const costs = this.props.displayRessourceList && this.props.ressources.length !== 0 ? this.computeYearlyCost() : null;
        const ressourceList = this.props.displayRessourceList && this.props.ressources.length !== 0 ? 
            <div className="ressourceYear">
                <span className="electricity">Électricité : {costs.electricity}€</span>
                <span className="gaz">Gaz : {costs.gaz}€</span>
                <span className="water">Eau : {costs.water}€</span>
                
            </div>
            :
            null;

        return(
            <div className="client"
            ref = {div => this.div = div}
            onClick={this.props.handleClientSelected ? this.handleClientSelected : null}>
                {this.props.name}
                {ressourceList}
                {button}
            </div>
        )
    }
}