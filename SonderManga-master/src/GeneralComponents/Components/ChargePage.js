import React, { Component } from 'react';

import '../Styles/ChargePage.css';

class ChargePage extends Component{
    render(){
        return (
        <div className="chargePageContainer">   
            Loading<img src={require('../Images/loading.gif')} alt="loading..." /> 
        </div>
        
        );
    }
}

export default ChargePage;