(function() {

    const CAMPAIGN_STAT_TYPE = {
        IMPRESSION: "Impression",
        CLICKTHROUGH: "Clickthrough"
    };

    function buildTargetSelectorFromContext(context) {
        return `
            [href="${context.fromUrl}"],
            [href="${context.fromUrl.replace(/s(?=:\/\/)/, "")}"],
            [href="${context.fromUrl.replace(/http(s?):\/\/.+?(?=\/)/, "")}"]
        `;
    }

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

    function buildStatFromContext(context, statType) {
        return {
            campaignStats: [
                {
                    control: context.userGroup === "Control",
                    experienceId: context.experience,
                    stat: statType
                }
            ]
        };
    }

    function apply(context, template) {
        if ((!context.fromUrl && !context.toUrl) || (context.fromUrl === context.toUrl)) {
            return;
        }

        const selector = buildTargetSelectorFromContext(context);

        const bindLinkListener = () => linkListener(selector).then(elements => {
            elements.each(function() {
                Evergage.cashDom(this).attr({ 'href': context.toUrl });
                Evergage.cashDom(this).on('click.linkReplace', e => {
                    Evergage.sendStat(buildStatFromContext(context, CAMPAIGN_STAT_TYPE.CLICKTHROUGH))
                });
            });
            Evergage.sendStat(buildStatFromContext(context, CAMPAIGN_STAT_TYPE.IMPRESSION));
            bindLinkListener();
        });
        bindLinkListener();
    }

    function reset(context, template) {
        if (typeof (observer || {}).disconnect === "function") observer.disconnect();
    }

    function control(context) {
        const selector = buildTargetSelectorFromContext(context);

        const bindLinkListener = () => linkListener(selector).then(elements => {
            elements.each(function() {
                Evergage.cashDom(this).on('click.linkReplace', e => {
                    Evergage.sendStat(buildStatFromContext(context, CAMPAIGN_STAT_TYPE.CLICKTHROUGH))
                });
            });
            Evergage.sendStat(buildStatFromContext(context, CAMPAIGN_STAT_TYPE.IMPRESSION));
            bindLinkListener();
        });
        bindLinkListener();
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
