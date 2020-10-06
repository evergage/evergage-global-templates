(function() {

    /**
     * @function getBindId
     * @param {Object} context
     * @description Create unique bind ID based on the campaign and experience IDs.
     */
    function getBindId(context) {
        return `${context.campaign}:${context.experience}`;
    }

    /**
     * @function setConfirmationPanel
     * @description Adds click listener to the Call-To-Action button that validates the user email address, 
     * shows the Confirmation Panel, and sends an event to Interaction Studio to set the emailAddress attribute to
     * the user email address.
     */
    function setConfirmationPanel() {
        Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-cta").on("click", () => {
            const emailAddress = Evergage.cashDom(".evg-form input[placeholder='Email']").val();
            const regex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+)$/);
            if (emailAddress && regex.test(emailAddress)) {
                Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-main-panel").addClass("evg-hide");
                Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-confirm-panel").removeClass("evg-hide");
                Evergage.sendEvent({ user: { attributes: { emailAddress: emailAddress } } });
            } else {
                Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-error-msg")
                    .removeClass("evg-hide")
                    .addClass("evg-error");
            }
        });
    }

    /**
     * @function setDismissal
     * @description Adds click listener to the overlay, "X" button, and opt-out text that removes the 
     * template from the DOM.
     */
    function setDismissal() {
        const dismissSelectors = [
            "#evg-exit-intent-popup-email-capture .evg-overlay",
            "#evg-exit-intent-popup-email-capture .evg-btn-dismissal",
            "#evg-exit-intent-popup-email-capture .evg-opt-out-msg"
        ];

        Evergage.cashDom(dismissSelectors.join(", ")).on("click", () => {
            Evergage.cashDom("#evg-exit-intent-popup-email-capture").remove();
        });
    }

    function apply(context, template) {
        
        /**
         * The pageExit method waits for the user's cursor to exit through the top edge of the page before rendering the
         * template after a set delay.
         * 
         * Visit the Template Display Utilities documentation to learn more:
         * https://developer.evergage.com/templates/display-utilities
         */
        Evergage.DisplayUtils.bind(getBindId(context)).pageExit(500).then(() => {
            context.overlayClass = context.lightbox ? "evg-overlay" : "";
            var html = template(context);
            Evergage.cashDom("body").append(html);
            setConfirmationPanel();
            setDismissal();
        });
    }

    function reset(context, template) {
        Evergage.DisplayUtils.unbind(getBindId(context));
        Evergage.cashDom(`[data-evg-campaign-id=${context.campaign}][data-evg-experience-id=${context.experience}]`)
            .remove();
    }

    function control() {
 
    }
  
    registerTemplate({
      apply: apply,
      reset: reset, 
      control: control
    });

})();