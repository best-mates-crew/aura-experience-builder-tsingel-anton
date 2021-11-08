//URL
const URL_PAGE_SEPARATOR = "/s/";
//My Care App Event URLs
const URL_EXIT = "my-care-exit://?refresh=no";//Close webview without data refresh (Deep link)
const URL_EXIT_LITE_REFRESH = "my-care-exit://?refresh=lite";//Close webview with LITE data refresh (User,Account,Case) (Deep link)
const URL_EXIT_FULL_REFRESH = "my-care-exit://?refresh=full";//Close webview with FULL data refresh (Deep link)
const URL_EXIT_TREATMENT_REFRESH = "my-care-exit://?refresh=treatment";//Close webview with TREATMENT refresh (Case,Medication Reminder,Patient Batches) (Deep link)
const URL_LOADING_COMPLETE = "my-care-loading://?status=success";//Loading success (Deep link)
const URL_LOGOUT = "my-care-logout://?status=success";//Do Logout (Deep link)
const URL_OPEN_REPORT = "my-care-open://?name=report";//Deep link for Report page
const URL_OPEN_PRIVACY_POLICY = "my-care-open://?name=privacy-policy";//Deep link for Privacy Policy information
const URL_OPEN_PRIVACY_NOTICE = "my-care-open://?name=privacy-notice";//Deep link for Privacy Notice information
const URL_OPEN_PRIVACY_POLICY_EXTERNAL = "my-care-external://";//Deep link for Privacy Notice information
const URL_OPEN_TEL = "tel:";//Deep link for Privacy Notice information
const URL_RUN_APP = "mycare://open";//Run myCare App (Deep link) could be with parameters [href]

class Commons {

    /**
     * Js Bridge between LWC and Mobile Application
     */
    Application = {
        /**
         * Throws event - Component successfully loaded
         */
        loadingComplete() {
            this.doRedirect(URL_LOADING_COMPLETE);
        },

        /**
         * Throws event - User needs to be logged out
         */
        logout() {
            this.doRedirect(URL_LOGOUT);
        },

        /**
         * Throws close event - Opens Report page
         */
        openReportPage() {
            this.doRedirect(URL_OPEN_REPORT);
        },

        /**
         * Throws event - Opens Privacy Policy
         */
        openPrivacyPolicy() {
            this.doRedirect(URL_OPEN_PRIVACY_POLICY);
        },

        /**
         * Throws event - Opens Privacy Notice
         */
        openPrivacyNotice() {
            this.doRedirect(URL_OPEN_PRIVACY_NOTICE);
        },

        WebView: {
            /**
             * Throws close event - Close Web View without refresh
             */
            close() {
                this.doRedirect(URL_EXIT);
            },

            /**
             * Throws close event - Close Web View with LITE refresh
             * -
             * Affected objects:
             * - User
             * - Account
             * - Case
             */
            closeWithLiteRefresh() {
                this.doRedirect(URL_EXIT_LITE_REFRESH);
            },

            /**
             * Throws close event - Close Web View with FULL refresh
             * -
             * All Data affected
             */
            closeWithFullRefresh() {
                this.doRedirect(URL_EXIT_FULL_REFRESH);
            },

            /**
             * Throws close event - Close Web View with Treatment refresh
             * -
             * Affected objects:
             * - Case
             * - Medication Reminder
             * - Patient Batches
             * */
            closeWithTreatmentRedirect() {
                this.doRedirect(URL_EXIT_TREATMENT_REFRESH);
            },

            /**
             * Throws Event (Specific URL Scheme) to Mobile Application
             * @param eventURLScheme - Custom URL Scheme
             */
            doRedirect(eventURLScheme) {
                let a = document.createElement("a");
                a.href = eventURLScheme;
                a.click();
            }
        },

        /**
         * Throws Event (Specific URL Scheme) to Mobile Application
         * @param eventURLScheme - Custom URL Scheme
         */
        doRedirect(eventURLScheme) {
            let a = document.createElement("a");
            a.href = eventURLScheme;
            a.click();
        }
    };

    /**
     * Browser Info
     */
    Browser = {
        /**
         * Returns TRUE if device is Iphone or Android
         */
        isMobile() {
            return !!(this.isIPhone() || this.isAndroid());
        },

        /**
         * Returns TRUE if device is Iphone
         */
        isIPhone() {
            return !!navigator.userAgent.match(/(iPhone)/);
        },

        /**
         * Returns TRUE if device is Android
         */
        isAndroid() {
            return !!navigator.userAgent.match(/(Android)/);
        },

        openApplication() {
            let a = document.createElement("a");
            a.href = URL_RUN_APP;
            a.click();
        },

        openLinkInsideApplication(link) {
            let a = document.createElement("a");
            a.href = URL_RUN_APP + (link ? ("?href=" + link) : "");
            a.click();
        },

        openPrivacyPolicyExternalLink(link) {
            let a = document.createElement("a");
            a.href = URL_OPEN_PRIVACY_POLICY_EXTERNAL + (link ? ("?href=" + link) : "");
            a.click();
        },

        callSelectedNumber(link) {
            let a = document.createElement("a");
            a.href = URL_OPEN_TEL + (link ?  link : "");
            a.click();
        },

        getPageURL() {
            return window.location.href.substring(window.location.href.indexOf(URL_PAGE_SEPARATOR) + URL_PAGE_SEPARATOR.length);
        },

        getPageURLWithoutParams() {
            return this.getURLWithoutParams(window.location.href);
        },

        /**
         * Returns user primary language code (en)
         * Code representing the language version as defined in BCP 47.
         */
        getPrimaryLanguageCode() {
            let primaryLanguage = window.navigator.language;
            let primaryLanguageCode = primaryLanguage ? primaryLanguage.split("-")[0] : undefined;

            return primaryLanguageCode ? primaryLanguageCode.toLowerCase() : undefined;
        },

        /**
         * Returns an array of the user's preferred languages. (["en-US", "en"])
         */
        getLanguages() {
            return window.navigator.languages;
        },

        getURLWithoutParams(target) {
            let pageLinkEndIndex = target.indexOf("?");
            return (!pageLinkEndIndex || pageLinkEndIndex === -1) ? target : target.substring(0, pageLinkEndIndex);
        },

        getURLParameterValue(param) {
            let parameter = decodeURI(new URL(location.href).searchParams.get(param));
            return (parameter !== "undefined" && parameter !== "null") ? parameter : undefined;
        },

        /**
         * Scroll to the top
         */
        scrollTop() {
            window.scrollTo(0, 0);
        },

        /**
         * Scroll to the bottom
         */
        scrollBottom() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
            //remove smooth
            setTimeout(() => {
                    window.scrollTo({
                        behavior: "inherit"
                    });
                }, 1000
            );
        }
    };

    /**
     * Google Analytics bridge
     * Connect LWC component with Google Analytics Provider(Aura Core_GoogleAnalyticsProvider)
     */
    GoogleAnalytics = {

        /** Logs Google Analytics custom "click" event
         * @param context - this (LWC context)
         * @param screenName - event category
         * @param eventLabel - event label
         * @param action - (optional) - event action type (*click, blur, etc.)
         */
        logClick(context, screenName, eventLabel, action) {
            this.throwEvent(context, "click", {
                "eventCategory": screenName,
                "eventAction": action ? action : "click",
                "eventLabel": eventLabel,
            });
        },

        /** Logs Google Analytics custom "screeenview" event
         * @param context - this (LWC context)
         * @param screenName - screen name
         */
        logScreenView(context, screenName) {
            this.throwEvent(context, "screenview", {
                "screenname": screenName,
                "eventHitTimeStamp": new Date().toISOString(),
            });
        },

        /** Throws LWC(standard) event with bubbling.
         * @param context - this (LWC context)
         * @param eventName - invent name in Camelcase
         * @param options - event options (optionally)
         */
        throwEvent(context, eventName, options) {
            context.dispatchEvent(new CustomEvent('googleAnalyticsEvent'.toLocaleLowerCase(), {
                detail: {
                    "event": eventName.toLowerCase(),
                    "options": options ? options : "",
                },
                bubbles: true,
                composed: true
            }));
        }
    };

    /** Throws LWC(standard) event.
     * @param context - this
     * @param eventName - invent name in Camelcase
     * @param dataDetail - detail(optionally)
     */
    throwEvent(context, eventName, dataDetail) {
        context.dispatchEvent(new CustomEvent(eventName.toLowerCase(), {detail: dataDetail}));
    }

    /** Returns String errors from apex method error
     * @param error - apex method error
     */
    getErrorMessage(error) {
        if (!error || !error.body) return "";

        let errorMessages = [];
        if (error.body.message) errorMessages.push(error.body.message);
        if (error.body.fieldErrors) {
            errorMessages.push("Filed Errors:");
            for (let field in error.body.fieldErrors) {
                if (error.body.fieldErrors.hasOwnProperty(field)) {
                    errorMessages.push(field + ": " + error.body.fieldErrors[field].message);
                }
            }
        }
        if (error.body.pageErrors) {
            errorMessages.push("Page Errors:");
            for (let page in error.body.pageErrors) {
                if (error.body.pageErrors.hasOwnProperty(page)) {
                    errorMessages.push(page + ": " + error.body.pageErrors[page].message);
                }
            }
        }
        return errorMessages.join("\n");
    }
}

export default new Commons()