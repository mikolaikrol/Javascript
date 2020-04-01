import React from 'react';

import '../public/stylesheets/dataTable.css';

export default class DataTable extends React.Component {
    
    constructor(props){
        super(props);
        this.buildRow = this.buildRow.bind(this);
    }

    buildRow(name, id){
        const list = this.props.selectedClient.datas[this.props.selectedClient.datas.findIndex(res => res.energy === id)].data;
        const index = this.props.ressources.findIndex(ressource => ressource._id == id);
        const row = list.map(value => <td>{(value * this.props.ressources[index].price).toFixed(2)}€</td>);
        return <tr><td>{name}</td>{row}</tr>;
    }

    buildTable(){
        const init = <thead><tr><th></th><th>Janvier</th><th>Février</th><th>Mars</th><th>Avril</th><th>Mai</th><th>Juin</th><th>Juillet</th><th>Aout</th><th>Septembre</th><th>Octobre</th><th>Novembre</th><th>Décembre</th></tr></thead>;
        const waterRow = this.buildRow("water", this.props.ids.water);
        const electricityRow = this.buildRow("electricity", this.props.ids.electricity);
        const gazRow = this.buildRow("gaz", this.props.ids.gaz);
        return <table>{init}<tbody>{waterRow}{electricityRow}{gazRow}</tbody></table>
    }

    render(){
        const table = this.props.selectedClient ? this.buildTable() : null;
        
        return(
            <div id="dataTable">
                {table}
            </div>
        )
    }
}