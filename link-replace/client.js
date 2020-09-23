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
        config = config || { childList: true };

        observer = new MutationObserver(callback);

        observer.observe(targetNode, config);

        return observer;
    };

    function buildTargetSelectorFromContext(context) {
        return `
            [href="${context.fromUrl}"],
            [href="${context.fromUrl.replace(/s(?=:\/\/)/, "")}"],
            [href="${context.fromUrl.replace(/http(s?):\/\/.+?(?=\/)/, "")}"]
        `;
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

    function replaceLinks(context, selector) {
        if (Evergage.cashDom(selector).length > 0) {
            Evergage.cashDom(selector).each(function() {
                if (context.userGroup !== "Control") Evergage.cashDom(this).attr({ 'href': context.toUrl });
                Evergage.cashDom(this).off('click.linkReplace');
                Evergage.cashDom(this).on('click.linkReplace', e => {
                    Evergage.sendStat(buildStatFromContext(context, CAMPAIGN_STAT_TYPE.CLICKTHROUGH))
                });
            });
            Evergage.sendStat(buildStatFromContext(context, CAMPAIGN_STAT_TYPE.IMPRESSION));
        }
    }

    function apply(context, template) {
        if ((!context.fromUrl && !context.toUrl) || (context.fromUrl === context.toUrl)) {
            return;
        }

        const selector = buildTargetSelectorFromContext(context);

        replaceLinks(context, selector);
        attachObserver({
            selector: 'body',
            config: observerConfig,
            callback: function(mutationsList) {
                replaceLinks(context, selector);
            }
        });
    }

    function reset(context, template) {
        if (typeof (observer || {}).disconnect === "function") observer.disconnect();
    }

    function control(context) {
        const selector = buildTargetSelectorFromContext(context);

        replaceLinks(context, selector);
        attachObserver({
            selector: 'body',
            config: observerConfig,
            callback: function(mutationsList) {
                replaceLinks(context, selector);
            }
        });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
