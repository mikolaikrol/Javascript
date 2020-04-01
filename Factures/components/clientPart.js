import React from 'react';

import CreateClient from './createClient';
import ClientList from './clientList';

import '../public/stylesheets/clientPart.css';

export default class ClientPart extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="clientPart">
               <CreateClient 
               ids = {this.props.ids}
               handleNewClientCreated = {this.props.handleNewClientCreated}
               handleInputChange = {this.props.handleInputChange}
               handleInputReset = {this.props.handleInputReset}/>
               <ClientList 
                clients = {this.props.displayedClients}
                ressources = {this.props.ressources}
                displayDeleteButton = {true}
                displayRessourceList = {false}
                handleClientDeleted = {this.props.handleClientDeleted}
                />
            </div>
        )
    }
}