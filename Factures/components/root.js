import React from 'react';

import ClientPart from './clientPart';
import DataPart from './dataPart';

import '../public/stylesheets/root.css';

export default class Root extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            ressources : [],
            clients : [],
            displayedClients : [],
            clientComponentVisible : true
        };
        this.actual = "Client";
        this.handleButtonClicked = this.handleButtonClicked.bind(this);
        this.handleClientDeleted = this.handleClientDeleted.bind(this);
        this.handleNewClientCreated = this.handleNewClientCreated.bind(this);
        this.handleInputReset = this.handleInputReset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRessourceModified = this.handleRessourceModified.bind(this);
    }

    componentDidMount(){
        this.getClients();
        this.getRessources();
    }

    getRessources(){
        let requestOptions = { method :'GET' };
        fetch('http://127.0.0.1:3000/ressources/all', requestOptions)
            .then( response => response.json())
            .then( allressources => {
                let waterId = allressources[allressources.findIndex(res => res.name === "eau")]._id;
                let gazId = allressources[allressources.findIndex(res => res.name === "gaz")]._id;
                let electricityId = allressources[allressources.findIndex(res => res.name === "électricité")]._id;
                this.setState({ ressources : allressources,
                                ids : {water : waterId, gaz : gazId, electricity : electricityId}
                            });

            })
            .catch( error => console.log(error.message) );
    }

    getClients(){
        let requestOptions = { method :'GET' };
        fetch('http://127.0.0.1:3000/clients/', requestOptions)
            .then( response => response.json())
            .then( allclients => this.setState({clients : allclients, displayedClients : allclients}))
            .catch( error => log.textContent = `error : ${error.message}` );
    }

    handleRessourceModified(modifiedRessource){
        const index = this.state.ressources.findIndex(ressource => ressource._id == modifiedRessource._id);
        const newList = this.state.ressources;
        newList[index].price = modifiedRessource.price;
        this.setState({ressources : newList});
    }

    handleInputChange(str){
        const strLen = str.length;
        const pattern = str.toUpperCase();
        const displayedClients = this.state.clients.filter(client => client.name.substring(0, strLen).toUpperCase() === pattern);
        this.setState({displayedClients : displayedClients});
    }

    handleInputReset(){
        this.setState({displayedClients : this.state.clients});
    }

    handleButtonClicked(prevState){
        prevState == "Go to data" ? 
            (
                this.button.textContent = "Go to client gestion",
                this.setState({clientComponentVisible : false})
            )
            :
            (
                this.button.textContent = "Go to data",
                this.setState({clientComponentVisible : true})
            );
    }

    handleNewClientCreated(newClient){
        const newList = this.state.clients;
        newList.push(newClient);
        this.setState({clients : newList});
    }

    handleClientDeleted(clientId){
        const index = this.state.clients.findIndex(client => client._id == clientId);
        const newList = this.state.clients;
        newList.splice(index, 1);
        this.setState({clients : newList});
    }

    render(){

        const display = this.state.clientComponentVisible ? 
            <ClientPart 
            ressources = {this.state.ressources}
            clients={this.state.clients} 
            displayedClients={this.state.displayedClients}
            ids={this.state.ids}
            handleNewClientCreated={this.handleNewClientCreated} 
            handleClientDeleted={this.handleClientDeleted}
            handleInputChange = {this.handleInputChange}
            handleInputReset = {this.handleInputReset}/> 
            : 
            <DataPart 
            clients={this.state.clients}
            ressources={this.state.ressources}
            handleRessourceModified={this.handleRessourceModified}
            ids={this.state.ids}/> ;

        return(
            <div id="root">
                <button
                ref = {ref => this.button = ref}
                onClick = {() => this.handleButtonClicked(this.button.textContent)}>
                    Go to data 
                </button>
                {display}
            </div>
        )
    }
}