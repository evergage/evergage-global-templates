(function() {

    /**
     * @function buildBindId
     * @param {Object} context
     * @description Create unique bind ID based on the campaign and experience IDs.
     */
    function buildBindId(context) {
        return `${context.campaign}:${context.experience}`;
    }

    /**
     * @function buildTemplateSelector
     * @param {Object} context
     * @description Creates unique selector that targets the template.
     */
    function buildTemplateSelector(context) {
        return `[data-evg-campaign-id="${context.campaign}"][data-evg-experience-id="${context.experience}"]`;
    }

    /**
     * @function setDismissal
     * @param {Object} context
     * @description Adds click listener to the "X" button that removes the template from the DOM.
     */
    function setDismissal(context) {
        Evergage.cashDom(`${buildTemplateSelector(context)} .evg-btn-dismissal`).on("click", () => {
            Evergage.cashDom(buildTemplateSelector(context)).remove();
        });
    }

    function apply(context, template) {
        switch (context.triggerOptions.name) {
            case "timeOnPage":
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const html = template(context);
                        Evergage.cashDom("body").append(html);
                        setDismissal(context);
                        resolve(true);
                    }, context.triggerOptionsNumber);
                });
            case "scrollDepth":
                return Evergage.DisplayUtils
                    .bind(buildBindId(context))
                    .pageScroll(context.triggerOptionsNumber)
                    .then((event) => {
                        const html = template(context);
                        Evergage.cashDom("body").append(html);
                        setDismissal(context);
                    });
            case "inactivity":
                return Evergage.DisplayUtils
                    .bind(buildBindId(context))
                    .pageInactive(context.triggerOptionsNumber)
                    .then((event) => {
                        const html = template(context);
                        Evergage.cashDom("body").append(html);
                        setDismissal(context);
                    });
        }
    }

    function reset(context, template) {
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
