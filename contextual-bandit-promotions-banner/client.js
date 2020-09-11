(function() {

    function apply(context, template) {
        /**
         * The pageElementLoaded method waits for the content zone to load into the DOM
         * before rendering the template. The observer element that monitors for the content
         * zone element to get inserted into its DOM node is set to "body" by default.
         * For performance optimization, this default can be overridden by adding
         * a second selector argument, which will be used as the observer element instead.
         *
         * Visit the Template Display Utilities documentation to learn more:
         * https://developer.evergage.com/templates/display-utilities
         */
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
