(function() {

    function apply(context, template) {
        const selector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils.pageElementLoaded(selector).then(function(element) {
            const html = template(context);
            Evergage.cashDom(element).html(html);
        });
    }

    function reset(context, template) {
        Evergage.cashDom("#evg-contextual-bandit-promotions-banner").remove();
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
