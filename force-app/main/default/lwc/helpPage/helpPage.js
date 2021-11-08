// import {LightningElement, api} from "lwc";
// import Commons from "c/core_mobileCommons";
// export default class HelpPage extends LightningElement {
//     @api
//     openModal = false;
//     @api
//     title;
//     @api
//     subtitle;
//     @api
//     buttonIcon = "back";//back arrow icon (*back/cross)
//     @api
//     show() {
//         this.openModal = true;
//     }

//     @api
//     hide() {
//         let modalBody = this.template.querySelector(".body-slot");
//         if(modalBody) modalBody.scrollTop = 0;

//         this.openModal = false;
//         Commons.throwEvent(this, "close");
//     }

//     @api
//     setTitle(title) {
//         this.title = title;
//     }

//     @api
//     setSubtitle(subtitle) {
//         this.subtitle = subtitle;
//     }

//     @api
//     setBody(body) {
//         let bodySlot = this.template.querySelector(".body");
//         if (bodySlot) bodySlot.innerHTML = body;
//     }

//     @api
//     reset() {
//         this.title = undefined;
//         let bodySlot = this.template.querySelector(".body");
//         bodySlot.parentNode.replaceChild(bodySlot, bodySlot);
//     }

//     get modalClass() {
//         let classList = ["modal", "core-modal"];

//         if (Commons.Browser.isIPhone()) classList.push("i-phone");

//         if (!this.openModal) classList.push("hidden");

//         return classList.join(" ");
//     }
// }

//  import { LightningElement, api, track } from "lwc";
//  import batchHelpImages from "@salesforce/resourceUrl/batchHelpImages";
// Labels
//  import pageTitle from "@salesforce/label/c.Core_mobile_BH_Title";
//  import pageSubtitle from "@salesforce/label/c.Core_mobile_BH_Subtitle";
//  import outerPackagingHeader from "@salesforce/label/c.Core_mobile_BH_OuterPackagingHeader";
//  import outerPackagingBody from "@salesforce/label/c.Core_mobile_BH_OuterPackagingDescription";
//  import outerPackagingImage from "@salesforce/label/c.Core_mobile_BH_OuterPackagingImageName";
//  import blisterPackHeader from "@salesforce/label/c.Core_mobile_BH_BlisterHeader";
//  import blisterPackBody from "@salesforce/label/c.Core_mobile_BH_BlisterDescription";
//  import blisterPackImage from "@salesforce/label/c.Core_mobile_BH_BlisterImageName";
//  import pillBottleHeader from "@salesforce/label/c.Core_mobile_BH_PillBottleHeader";
//  import pillBottleBody from "@salesforce/label/c.Core_mobile_BH_PillBottleDescription";
//  import pillBottleImage from "@salesforce/label/c.Core_mobile_BH_PillBottleImageName";

//services
import { LightningElement, api } from "lwc";
import Commons from "c/core_mobileCommons";
import { getData } from "./helpPageMocks";

export default class HelpPage extends LightningElement {
    // =============================================
    // LOCAL PROPS:
    showInfo = 'Learn more';
    pageSubtitle = 'Rebecca, help stay on course with treatment';
    isSticky = false;
    openModal = false;
    link = 'https://www.arthritis.org/living-with-arthritis/treatments/plan/remission/rheumatoid-arthritisremission-and-relapse.php';
    data = getData();
    accessedDate = 'Accessed: March 2019';
    reference = 'Reference(s)'
    // =============================================
    // API PROPS:
    @api showInfo = 'Learn More';
    @api title = 'My Adherence';
    @api buttonIcon = 'back'; //back arrow icon (*back/cross)


    // =============================================
    // GETTERS/SETTERS:
    get modalClass() {
        const hide = !this.openModal ? 'hidden' : '';
        const classname = `modal core-modal ${hide}`;
        return classname;
    }


    // =============================================
    // HANDLERS:
    show() {
        this.openModal = true;
        this.enableScrollTrack();
    }
    hide() {
        let modalBody = this.template.querySelector(".body-slot");
        if (modalBody) modalBody.scrollTop = 0;
        this.openModal = false;
        Commons.throwEvent(this, "close");
    }
    connectedCallback() {
        if (this.openModal) this.enableScrollTrack();
    }
    enableScrollTrack() {
        this.template.querySelector(".content").addEventListener("scroll", this.scrollHandler);
    }
    disableScrollTrack() {
        this.template.querySelector(".content").removeEventListener("scroll", this.scrollHandler);
    }
    scrollHandler() {
        this.isSticky = !!this.template.querySelector(".content").scrollTop;
    }


    // =============================================
    // HELPERS
}