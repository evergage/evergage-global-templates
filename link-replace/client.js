(function() {

    function apply(context, template) {
        if ((!context.fromUrl && !context.toUrl) || (context.fromUrl === context.toUrl)) {
            return;
        }

        const fromUrlHttp = context.fromUrl.replace(/s(?=:\/\/)/, "");
        const fromRelativePath = context.fromUrl.replace(/http(s?):\/\/.+?(?=\/)/, "");
        const hrefWithUrl = `[href="${context.fromUrl}"], [href="${fromUrlHttp}"], [href="${fromRelativePath}"]`;

        const bindLinkListener = () => Evergage.DisplayUtils.pageElementLoaded(hrefWithUrl).then(element => {
            if (Evergage.cashDom(hrefWithUrl).length > 0) {
                Evergage.cashDom(hrefWithUrl).attr({ 'href': context.toUrl, 'data-evg-clickthrough': '' });
                bindLinkListener();
            }
        });
        bindLinkListener();
    }

    function reset(context, template) {
        // TODO?
    }

    function control(context) {
        const selector = Evergage.getContentZoneSelector(context.contentZone);
        Evergage.cashDom(selector).attr("data-evg-campaign-id", context.campaign);
        Evergage.cashDom(selector).attr("data-evg-experience-id", context.experience);
        Evergage.cashDom(selector).attr("data-evg-user-group", "Control");
        Evergage.cashDom(selector + " a").attr("data-evg-clickthrough", "");
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
