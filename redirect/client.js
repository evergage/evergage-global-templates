(function() {

    /**
     * @function removeTemplateCss
     * @param {Object} context
     * @description Removes the inserted style tag inserted by this template
     */
    function removeTemplateCss(context) {
        const selector = `style[evg-experience=${context.experience}][evg-campaign=${context.campaign}]`;
        if (Evergage.cashDom(selector).length > 0) {
            Evergage.cashDom(selector).remove();
        }
    }

    function apply(context, template) {
        clearTimeout(window.evergageReshowPersonalizationsTimeout);
        window.evergageReshowPersonalizationsTimeout = setTimeout(function() {
            removeTemplateCss(context);
        }, (Evergage.getConfig().hideContentSectionsMillis || 2500));

        if ((context.targetPage && context.urlForRedirect)
            && window.location.href !== context.urlForRedirect
            && (window.frameElement || {}).id !== "siteEditorFrame") {

            window.location.href = context.urlForRedirect;

            Evergage.sendStat({
                campaignStats: [
                    {
                        control: context.userGroup === "Control",
                        experienceId: context.experience,
                        stat: "Impression"
                    }
                ]
            });
        }
    }

    function reset(context, template) {
        removeTemplateCss(context);

        if ((context.targetPage && context.urlForRedirect)
            && window.location.href === context.urlForRedirect
            && (window.frameElement || {}).id !== "siteEditorFrame") {

            window.location.href = currentHref;
        }
    }

    function control(context) {
        Evergage.sendStat({
            campaignStats: [
                {
                    control: context.userGroup === "Control",
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
