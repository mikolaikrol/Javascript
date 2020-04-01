import React from 'react';

import RessourceList from './ressourceList';
import ClientList from './clientList';
import DataTable from './dataTable';
import MyChart from './chart';

import '../public/stylesheets/dataPart.css';

export default class DataPart extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedClient : null
        };
        this.handleClientSelected = this.handleClientSelected.bind(this);
    }

    handleClientSelected(id){
        const index = this.props.clients.findIndex((client)=> client._id == id);
        const client = this.props.clients[index];
        this.setState({selectedClient : client});
    }

    render(){
        return(
            <div id="dataPart">
                <RessourceList ressources = {this.props.ressources} handleRessourceModified={this.props.handleRessourceModified}/>
                <ClientList clients = {this.props.clients} ressources = {this.props.ressources} ids = {this.props.ids} displayRessourceList = {true} handleClientSelected = {this.handleClientSelected}/>
                <DataTable ressources = {this.props.ressources} ids = {this.props.ids} selectedClient = {this.state.selectedClient}/>
                <MyChart client = {this.state.selectedClient} ressources = {this.props.ressources} ids = {this.props.ids}/>
            </div>
        )
    }
}