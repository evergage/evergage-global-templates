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
        if ((window.frameElement || {}).id === "siteEditorFrame") {
            removeTemplateCss(context);
            return;
        }

        if (context.targetPage.includes(window.location.hostname + window.location.pathname)) {
            clearTimeout(window.evergageReshowPersonalizationsTimeout);
            window.evergageReshowPersonalizationsTimeout = setTimeout(function() {
                removeTemplateCss(context);
            }, (Evergage.getConfig().hideContentSectionsMillis || 2500));

            if ((context.targetPage && context.urlForRedirect)
                && window.location.href !== context.urlForRedirect) {

                Evergage.sendStat({
                    campaignStats: [
                        {
                            control: false,
                            experienceId: context.experience,
                            stat: "Impression"
                        }
                    ]
                });

                window.location.href = context.urlForRedirect + (context.maintainQueryParams ? window.location.search : "");
            }
        }
    }

    function reset(context, template) {
        removeTemplateCss(context);
    }

    function control() {

    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
