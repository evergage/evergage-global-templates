(function() {

    function apply(context, template) {

        /**
         * (window.frameElement || {}).id === "siteEditorFrame" is present in order to prevent redirection from
         * occurring while in either the Template Editor or Campaign Editor.
         */
        const currentPage = window.location.hostname + window.location.pathname.replace(/\/$/, "");
        const targetPage = context.targetPageUrl.replace(/http(s)?\:\/\//, "");
        if ((window.frameElement || {}).id === "siteEditorFrame"
            || !(currentPage.includes(targetPage) && targetPage.includes(currentPage))) {
            return;
        }

        return new Promise((resolve, reject) => {
            if ((context.targetPageUrl && context.redirectUrl)
                && window.location.href !== context.redirectUrl) {

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

                context.paramsForRedirect = (context.maintainQueryParams && window.location.href.match(/\?.*/))
                    ? window.location.href.match(/\?.*/gim)[0]
                    : "";

                window.location.href = context.redirectUrl + context.paramsForRedirect;
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
