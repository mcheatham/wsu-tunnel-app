import React from 'react';
import Dropdown from 'react-dropdown'
import './SelectFrom.css';

const SelectFrom = props =>{
    const options = ['A','B',"C","D",'E'];
    const defaultOption = options[0];

        return(
        <div>
            <p>Select Starting Point:</p>
            <Dropdown  options={options} value={defaultOption} placeholder="Select an option"/>
        </div>

        );

};
export default SelectFrom;
