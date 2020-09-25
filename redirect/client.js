(function() {

    let currentHref;

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

        if ((context.redirectUrl
            && window.location.href !== context.redirectUrl
            && (window.frameElement || {}).id !== "sideEditorFrame")) {

            currentHref = window.location.href;

            window.location.href = context.redirectUrl;

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
        if ((currentHref
            && (context.redirectUrl === currentHref
            || context.redirectUrl === window.location.href))) {

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
