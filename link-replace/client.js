(function() {

    const CAMPAIGN_STAT_TYPE = {
        IMPRESSION: "Impression",
        CLICKTHROUGH: "Clickthrough"
    };

    let observer;

    let observerConfig = {
        attributes: true,
        childList: true,
        subtree: true,
    };

    function attachObserver({ selector, config, callback }) {
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        let targetNode = Evergage.cashDom(selector)[0];
        let observerConfig = config || { childList: true };

        observer = new MutationObserver(callback);

        observer.observe(targetNode, observerConfig);

        return observer;
    };

    function linkListener(selector) {
        return new Promise(function(resolve) {
            if (Evergage.cashDom(selector).length > 0) {
                resolve(Evergage.cashDom(selector));
            } else {
                attachObserver({
                    selector: 'body',
                    config: observerConfig,
                    callback: function(mutationsList) {
                        if (Evergage.cashDom(selector).length > 0) {
                            observer.disconnect();
                            resolve(Evergage.cashDom(selector));
                        }
                    }
                });
            }
        });
    }

    function apply(context, template) {
        if ((!context.fromUrl && !context.toUrl) || (context.fromUrl === context.toUrl)) {
            return;
        }

        const fromUrlHttp = context.fromUrl.replace(/s(?=:\/\/)/, "");
        const fromRelativePath = context.fromUrl.replace(/http(s?):\/\/.+?(?=\/)/, "");
        const hrefWithFromUrl = `[href="${context.fromUrl}"], [href="${fromUrlHttp}"], [href="${fromRelativePath}"]`;
        const baseStats = {
            control: false,
            experienceId: context.experience
        };

        const bindLinkListener = () => linkListener(hrefWithFromUrl).then(elements => {
            elements.each(function() {
                Evergage.cashDom(this).attr({ 'href': context.toUrl });
                Evergage.cashDom(this).on('click.linkReplace', e => {
                    Evergage.sendStat({
                        campaignStats: [
                            {
                                ...baseStats,
                                stat: CAMPAIGN_STAT_TYPE.CLICKTHROUGH
                            }
                        ]
                    });
                });
            });
            Evergage.sendStat({
                campaignStats: [
                    {
                        ...baseStats,
                        stat: CAMPAIGN_STAT_TYPE.IMPRESSION
                    }
                ]
            });
            bindLinkListener();
        });
        bindLinkListener();
    }

    function reset(context, template) {
        if (typeof (observer || {}).disconnect === "function") observer.disconnect();
    }

    function control(context) {
        // TODO
        // const selector = Evergage.getContentZoneSelector(context.contentZone);
        // Evergage.cashDom(selector).attr("data-evg-campaign-id", context.campaign);
        // Evergage.cashDom(selector).attr("data-evg-experience-id", context.experience);
        // Evergage.cashDom(selector).attr("data-evg-user-group", "Control");
        // Evergage.cashDom(selector + " a").attr("data-evg-clickthrough", "");
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
