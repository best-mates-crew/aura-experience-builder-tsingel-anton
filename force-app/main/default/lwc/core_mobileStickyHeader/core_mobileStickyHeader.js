import {LightningElement, track, api} from "lwc";
//services
import Commons from "c/core_mobileCommons";

export default class StickyHeader extends LightningElement {
    @api
    showBackgroundOnTop;
    @api
    title;
    @api
    subTitle;
    @api
    hideBackButton;
    @api
    buttonIcon = "back";//back arrow icon (*back/cross)
    @track
    isSticky;
    @track
    showSpinner;
    @track
    isIphone;

    @api
    turnOnSpinner() {
        this.showSpinner = true;
    }

    @api
    turnOffSpinner() {
        this.showSpinner = false;
    }

    connectedCallback() {
        window.handleBack = () => this.handleClick();
        this.isIphone = Commons.Browser.isIPhone();
        window.addEventListener("scroll", this.scrollHandler.bind(this));
    }

    get backButtonClass() {
        let classList = ["back-button"];

        if (this.isIphone) classList.push("iphone");

        return classList.join(" ");
    }

    get titleClass() {
        let classList = ["core-title", "core-color-white"];

        if (!this.subTitle) classList.push("full-length");

        return classList.join(" ");
    }

    get iconName() {
        let iconName;

        switch (this.buttonIcon) {
            case "cross":
                iconName = "small-cross";
                break;
            case "back":
                this.isIphone ? iconName = "chevron-left" : iconName = "back";
                break;
        }

        return iconName;
    }

    get headerStyle() {
        let classList = ["container safe-area-top"];

        if (!this.showBackgroundOnTop && !this.isSticky) classList.push("transparent-background");

        if (this.isSticky) {
            classList.push("sticky");
        }

        if (this.isIphone) {
            classList.push("iphone");
        }

        if (!this.title && !this.subTitle) {
            classList.push("full");
        }

        return classList.join(" ");
    }

    scrollHandler() {
        this.isSticky = (window.pageYOffset > 0);
    }

    handleClick() {
        Commons.throwEvent(this, "buttonClick");
    }
}