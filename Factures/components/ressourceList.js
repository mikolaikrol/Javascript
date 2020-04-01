import React from 'react';
import Ressource from './ressource'

import '../public/stylesheets/ressourceList.css'

export default class RessourceList extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const allressources = this.props.ressources.map(
            ressource =>
              <Ressource
                {...ressource}
                key = {ressource._id}
                handleRessourceModified = {this.props.handleRessourceModified}
              />
          )
        return(
            <div id="ressourceList">
                {allressources}
            </div>
        )
    }
}