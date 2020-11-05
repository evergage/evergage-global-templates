(function() {

    function apply(context, template) {

        /**
         * Prevent redirect from occurring while in either the Template Editor or Campaign Editor.
         */
        if ((window.frameElement || {}).id === "siteEditorFrame"
            || !context.targetPage.includes(window.location.hostname + window.location.pathname.replace(/\/$/gim, ""))) {
            return;
        }

        return new Promise((resolve, reject) => {
            if ((context.targetPage && context.urlForRedirect)
                && window.location.href !== context.urlForRedirect) {

                Evergage.cashDom("body").css("visibility", "hidden");

                Evergage.sendStat({
                    campaignStats: [
                        {
                            control: false,
                            experienceId: context.experience,
                            stat: "Impression"
                        }
                    ]
                });

                context.paramsForRedirect = (context.maintainQueryParams && window.location.href.match(/\?.*/gim))
                    ? window.location.href.match(/\?.*/gim)[0]
                    : "";

                window.location.href = context.urlForRedirect + context.paramsForRedirect;
            }
        });
    }

    function reset(context, template) {

    }

    function control() {

    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();