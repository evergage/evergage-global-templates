(function() {

    function apply(context, template) {
        switch (context.triggerOptions.name) {
            case "timeOnPage":
                setTimeout(() => {
                    const html = template(context);
                    Evergage.cashDom("body").append(html);
                }, context.triggerOptionsNumber)
                break;
            case "pageScroll":
                return Evergage.DisplayUtils
                    .bind("pageScroll")
                    .pageScroll(context.triggerOptionsNumber)
                    .then(function(event) {
                        const html = template(context);
                        Evergage.cashDom("body").append(html);
                    });
            case "inactivity":
                return Evergage.DisplayUtils
                    .bind("inactivity")
                    .pageInactive(context.triggerOptionsNumber)
                    .then(function(event) {
                        const html = template(context);
                        Evergage.cashDom("body").append(html);
                    });
        }
    }

    function reset(context, template) {
        Evergage.cashDom("[id*=evg-slide-in]").remove();
    }

    function control(context) {
        var selector = Evergage.getContentZoneSelector(context.contentZone);
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
