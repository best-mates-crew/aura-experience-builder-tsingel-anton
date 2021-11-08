import { LightningElement, wire, api, track } from 'lwc';
import { loadStyle } from "lightning/platformResourceLoader";
import getSObjects from "@salesforce/apex/ObjectInfoRetrieve.getSObjects";
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class AtQueryBuilderObjects extends LightningElement {
    viewOptions = [];
    fieldsName = [];

    deletedOptions = [
        { label: "Exclude", value: "Exclude" },
        { label: "Include", value: "Include" }
    ];

    vOptions = [
        { label: "List", value: "List" },
        { label: "Matrix", value: "Matrix" },
        { label: "Bulk", value: "Bulk" },
        { label: "CSV", value: "CSV" },
        { label: "Bulk XML", value: "Bulk XML" }
    ];

    @api selectedObjectApiName;
    @track selectedObjInfo;

    @wire(getObjectInfo, { objectApiName: "$selectedObjectApiName" })
    selectedObjInfo;

    async connectedCallback() {
        this.viewOptions = await getSObjects();
    }

    handleChange(event) {
        this.selectedObjectApiName = { objectApiName: event.detail.value };

        this.fieldsName = event.target.fieldsName;
        console.log("this.selectedObjInfo: ", this.selectedObjInfo);
        console.log("this.selectedObjectApiName: ", this.selectedObjectApiName);
    }
}