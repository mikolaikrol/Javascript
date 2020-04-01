import React from 'react';

import Client from './client'

export default class ClientList extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const allclients = this.props.clients.map(
            client =>
              <Client
                {...client}
                ressources = {this.props.ressources}
                ids = {this.props.ids}
                key = {client._id}
                displayDeleteButton = {this.props.displayDeleteButton}
                displayRessourceList = {this.props.displayRessourceList}
                handleClientDeleted = {this.props.handleClientDeleted}
                handleClientSelected = { this.props.handleClientSelected}
              />
        )
        return(
            <div id="clientList">
                {allclients}
            </div>
        )
    }
}