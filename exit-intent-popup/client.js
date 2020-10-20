(function() {

    /**
     * @function buildTemplateSelector
     * @param {Object} context
     * @description Creates unique selector that targets the template.
     */
    function buildTemplateSelector(context) {
        return `[data-evg-campaign-id=${context.campaign}][data-evg-experience-id=${context.experience}]`;
    }

    /**
     * @function buildBindId
     * @param {Object} context
     * @description Create unique bind ID based on the campaign and experience IDs.
     */
    function buildBindId(context) {
        return `${context.campaign}:${context.experience}`;
    }

    /**
     * @function setDismissal
     * @param {Object} context
     * @description Adds click listener to the overlay and "X" button that removes the template from the DOM.
     */
    function setDismissal(context) {
        const dismissSelectors = [
            "#evg-exit-intent-popup .evg-overlay",
            "#evg-exit-intent-popup .evg-btn-dismissal",
        ];

        Evergage.cashDom(dismissSelectors.join(", ")).on("click", () => {
            Evergage.cashDom(buildTemplateSelector(context)).remove();
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
        return Evergage.DisplayUtils.bind(buildBindId(context)).pageExit(500).then(() => {
            const html = template(context);
            Evergage.cashDom("body").append(html);
            setDismissal(context);
        });
    }

    function reset(context, template) {
        Evergage.DisplayUtils.unbind(buildBindId(context));
        Evergage.cashDom(buildTemplateSelector(context)).remove();
    }

    function control() {

    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();