import { LightningElement } from 'lwc';
import displayInfo from "@salesforce/label/c.displayInfo";

import mySVG_icon from "@salesforce/resourceUrl/queryBuilderImages";

export default class QueryBuilder extends LightningElement {

    warningIcon = mySVG_icon + "/images/" + "warningBlue.png";
    _selected = [];
    get displayInfo() {
        return displayInfo ? displayInfo : "";
    }

    
    options = [
        {'label': 'List', 'value': 'option1'},
        {'label': 'Matrix', 'value': 'option2'},
        {'label': 'Bulk CSV', 'value': 'option3'},
        {'label': 'Bulk XML', 'value': 'option4'},
    ];

    records = [
        {'label': 'Exclude', 'value': 'option1'},
        {'label': 'Include', 'value': 'option2'},
    ];

    // Select option1 by default
   value = 'option1';



   statusOptions = [
    {value: 'new', label: 'New', description: 'A new item'},
    {value: 'in-progress', label: 'In Progress', description: 'Currently working on this item'},
    {value: 'finished', label: 'Finished', description: 'Done working on this item'}
];

    comboboxValue = 'new';

    handleChangeCombobox(event) {
    // Get the string of the "value" attribute on the selected option
        this.value = event.detail.value;
    }   

    handleChange(event) {
        const selectedOption = event.detail.value;
        console.log('Option selected with value: ' + selectedOption);
    }

    renderedCallback() {
        const style = document.createElement('style');
        style.innerText = `.radio-group fieldset div .slds-radio{
            display: inline-block !important;
          }`;
        this.template.querySelector('lightning-radio-group').appendChild(style);
        this.template.querySelector('lightning-radio-group').appendChild(style);
    }


    get multiselectOptions() {
        return [
            { label: 'English', value: 'en' },
            { label: 'German', value: 'de' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
            { label: 'Italian', value: 'it' },
            { label: 'Japanese', value: 'ja' },
        ];
    }

    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChangeMultiselect(e) {
        this._selected = e.detail.value;
    }





}