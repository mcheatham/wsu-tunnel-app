import React from 'react';
import Dropdown from 'react-dropdown'
import './SelectTo.css';

const SelectTo = props =>{
    const options = ['A','B',"C","D",'E'];
    const defaultOption = options[0];

    return(
        <div>
            <p>Select Destination</p>
            <Dropdown  options={options} value={defaultOption} placeholder="Select an option"/>
        </div>

    );

};
export default SelectTo;