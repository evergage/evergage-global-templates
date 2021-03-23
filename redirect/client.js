(function() {

    function apply(context, template) {

        /** Prevent redirect from occurring while in either the Template Editor or Campaign Editor. */
        if ((window.frameElement || {}).id === "siteEditorFrame") {
            return;
        }

        const currentPage = window.location.hostname + window.location.pathname.replace(/\/$/, "");
        const targetPage = context.targetPageUrl.replace(/http(s)?\:\/\//, "");
        const redirectPage = context.redirectUrl.replace(/http(s)?\:\/\//, "");
        if ((context.targetPageUrl && context.redirectUrl) &&
            (currentPage !== targetPage && currentPage === redirectPage)) {
            return;
        }

        return new Promise((resolve, reject) => {
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
                ? window.location.href.match(/\?.*/)[0]
                : "";

            window.location.href = context.redirectUrl + context.paramsForRedirect;
        });
    }

    function reset(context, template) {

    }

    function control(context) {
        const { campaign, experience } = context;
        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone) || 'body';
        Evergage.DisplayUtils.bind(`${campaign}:${experience}`).pageElementLoaded(contentZoneSelector).then(element => {
            Evergage.sendStat({
                campaignStats: [
                    {
                        control: true,
                        experienceId: context.experience,
                        stat: "Impression"
                    }
                ]
            });
        });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
