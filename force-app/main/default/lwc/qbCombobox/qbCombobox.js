import { LightningElement, api, track } from "lwc";
import qbComboboxBase from "./qbCombobox.html";
import qbComboboxGrouped from "./qbComboboxGrouped.html";

export default class qbCombobox extends LightningElement {
    @api variation = "grouped"; // 'default', 'grouped'
    @api qbLabel = "Select";
    @api values = [];
    @track selectedvalues = [];
    @api selected = false;
    @api label;
    @api value;
    @api isMultiSelect;
    @track isAttributeRequired = false;
    showdropdown;

    connectedCallback() {
        // toDo add getPicklistOptions via apex controller to retrieve data from org
        //  this.values = ['select1', 'select2', 'select3', 'select4', 'select5'];
        this.values = [
            { label: "label1", value: "value1", selected: true },
            { label: "label2", value: "value2", selected: true },
            { label: "label3", value: "value3", selected: true },
            { label: "label4", value: "value4", selected: false },
            { label: "label5", value: "value5", selected: true }
        ];
        this.selectedvalues = this.values.filter((element) => element.selected).map((element) => element.value);
        console.log(this.selectedvalues);
    }

    fetchSelectedValues() {
        //  this.selectedvalues = [];
        // get all the selected values
        const result = this.template.querySelectorAll("li.slds-listbox__item").filter((element) => element.selected);
        console.log("fetch result:", result);
        this.selectedvalues = result;
        this.refreshOrginalList();
    }

    refreshOrginalList() {
        //update the original value array to shown after close
        const picklistvalues = this.values;
        console.log("picklistvalues:", picklistvalues);
        console.log(picklistvalues);
        picklistvalues.forEach((element, index) => {
            if (this.selectedvalues.includes(element.value)) {
                picklistvalues[index].selected = true;
            } else {
                picklistvalues[index].selected = false;
            }
        });

        this.values = picklistvalues;
    }

    handleSelect(event) {
        console.log("event.target.dataset.value:", event.target.dataset.value);
        let selection = event.target.label;
        console.log("event target title: ", event.target);
        this.selectedvalues.push(event.target.title);
        console.log(selection);

        console.log(this.values);
        // this.selectedvalues.push(this.values.filter((element) => element.selected).map(element => element.value));
        //  this.selected = true;

        if (this.selected) {
            this.selected = false;
        } else {
            this.selected = true;
        }
        this.refreshOrginalList();
    }

    handleShowdropdown() {
        let isDropdown = this.showdropdown;
        if (isDropdown) {
            this.showdropdown = false;
            this.fetchSelectedValues();
        } else {
            this.showdropdown = true;
        }
    }

    closePill(event) {
        console.log("event.target.dataset.value:", event.target.dataset.value);
        let selection = event.target.dataset.value;
        let selectedpills = this.selectedvalues;
        console.log("selectedpills:", selectedpills);
        let pillIndex = selectedpills.indexOf(selection);
        console.log(pillIndex);
        this.selectedvalues.splice(pillIndex, 1);
        this.refreshOrginalList();
    }

    get selectedmessage() {
        return this.selectedvalues.length + " values are selected";
    }

    checkValidity() {}
    blur() {}
    focus() {}

    render() {
        switch (true) {
            case this.variation === "default":
                return qbComboboxBase;
            case this.variation === "grouped":
                return qbComboboxGrouped;
            default:
                return qbComboboxBase;
        }
    }
}