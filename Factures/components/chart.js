import React from 'react';

import Chart from 'chart.js';

export default class MyChart extends React.Component {
    
    constructor(props){
        super(props);
    }


    render(){
        if (this.props.client !== null) {
            const ctx = document.getElementById('chart');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                    datasets: [{
                        label: 'Eau',
                        data: this.props.client.datas[this.props.client.datas.findIndex(res => res.energy === this.props.ids.water)].data.map(value => {const index = this.props.ressources.findIndex(res=>res._id == this.props.ids.water); return value * this.props.ressources[index].price}),
                        backgroundColor: [
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )'
                        ],
                        borderColor: [
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )',
                            'rgba(173,216,230 ,1 )'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Electricité',
                        data: this.props.client.datas[this.props.client.datas.findIndex(res => res.energy === this.props.ids.electricity)].data.map(value => {const index = this.props.ressources.findIndex(res=>res._id == this.props.ids.electricity); return value * this.props.ressources[index].price}),
                        backgroundColor: [
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                        ],
                        borderColor: [
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                            'rgba(250,250,210,1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Gaz',
                        data: this.props.client.datas[this.props.client.datas.findIndex(res => res.energy === this.props.ids.gaz)].data.map(value => {const index = this.props.ressources.findIndex(res=>res._id == this.props.ids.gaz); return value * this.props.ressources[index].price}),
                        backgroundColor: [
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )'
                        ],
                        borderColor: [
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )',
                            'rgba(135,206,250 ,1 )'
                        ],
                        borderWidth: 1
                    }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
        
        return(
            <canvas id="chart" width="600" height="400"></canvas>
        )
    }
}