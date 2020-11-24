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
     * @description Create unique selector that targets the template.
     */
    function buildTemplateSelector(context) {
        return `[data-evg-campaign-id="${context.campaign}"][data-evg-experience-id="${context.experience}"]`;
    }

    /**
     * @function setDismissal
     * @param {Object} context
     * @description Add click listener to the "X" button that removes the template from the DOM.
     */
    function setDismissal(context) {
        Evergage.cashDom(`${buildTemplateSelector(context)} .evg-btn-dismissal`).on("click", () => {
            Evergage.cashDom(buildTemplateSelector(context)).remove();
        });
    }

    /**
     * @function handleTemplateContent
     * @param {Object} context
     * @description Build and insert Template HTML, attach dismissal listener
     */
    function handleTemplateContent({ context, template }) {
        const html = template(context);
        Evergage.cashDom("body").append(html);
        setDismissal(context);
    }

    /**
     * @function handleTriggerEvent
     * @param {Object} context
     * @description Create trigger event based on context
     */
    function handleTriggerEvent({ context, template }) {
        const { userGroup, triggerOptions, triggerOptionsNumber } = context || {};

        switch (triggerOptions.name) {
            case "timeOnPage":
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (userGroup === "Control") return true;

                        handleTemplateContent({ context, template });
                        resolve(true);
                    }, triggerOptionsNumber);
                });
            case "scrollDepth":
                return Evergage.DisplayUtils
                    .bind(buildBindId(context))
                    .pageScroll(triggerOptionsNumber)
                    .then((event) => {
                        if (userGroup === "Control") return true;

                        handleTemplateContent({ context, template });
                    });
            case "inactivity":
                return Evergage.DisplayUtils
                    .bind(buildBindId(context))
                    .pageInactive(triggerOptionsNumber)
                    .then((event) => {
                        if (userGroup === "Control") return true;

                        handleTemplateContent({ context, template });
                    });
        }
    }

    function apply(context, template) {
        if (Evergage.cashDom(buildTemplateSelector(context)).length > 0) return;

        return handleTriggerEvent({ context, template });
    }

    function reset(context, template) {
        Evergage.DisplayUtils.unbind(buildBindId(context));
        Evergage.cashDom(buildTemplateSelector(context)).remove();
    }

    function control(context) {
        return handleTriggerEvent({ context });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
