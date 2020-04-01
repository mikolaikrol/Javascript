import React from 'react';
import ReactDOM from 'react-dom';

// import ReactJs components
import Root from '../components/root.js';


const bootstrapReact =
() => ReactDOM.render(
    <Root/>,
    document.getElementById('insertReactHere')
);


window.addEventListener('DOMContentLoaded', bootstrapReact );
