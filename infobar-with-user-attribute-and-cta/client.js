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
     * @function setInfobarPosition
     * @param {Object} context
     * @description Sets the position of the infobar via class assignments, based on content zone selected.
     */
    function setInfobarPosition(context) {
        context.infobarClass = context.contentZone == "global_infobar_top_of_page"
            ? "evg-infobar-top"
            : "evg-infobar-bottom";
        if (context.infobarClass === "evg-infobar-top") {
            Evergage.cashDom("body").css({ "margin-bottom": "0", "margin-top": "2.5rem" });
        } else {
            Evergage.cashDom("body").css({ "margin-bottom": "2.5rem", "margin-top": "0" });
        }
    }

    /**
     * @function setDismissal
     * @param {Object} context
     * @description Adds click listener to the "X" button that removes the template from the DOM.
     */
    function setDismissal(context) {
        Evergage.cashDom("#evg-infobar-with-user-attr .evg-btn-dismissal").on("click", () => {
            Evergage.cashDom(buildTemplateSelector(context)).remove();
            Evergage.cashDom("body").css({ "margin-top": "0", "margin-bottom": "0" });
        });
    }

    function apply(context, template) {
        const { preAttrMessageText, userAttrDefault, postAttrMessageText } = context;
        const { firstName } = context.user.attributes;
        const userAttr = firstName || userAttrDefault;
        context.messageText = `${preAttrMessageText}${userAttr}${postAttrMessageText}`;
        setInfobarPosition(context);
        const html = template(context);
        Evergage.cashDom("body").append(html);
        setDismissal(context);
    }

    function reset(context, template) {
        Evergage.cashDom(buildTemplateSelector(context)).remove();
        Evergage.cashDom("body").css({ "margin-top": "0", "margin-bottom": "0" });
    }

    function control() {
        Evergage.sendStat({
            campaignStats: [
                {
                    control: true,
                    experienceId: context.experience,
                    stat: "Impression"
                }
            ]
        });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
