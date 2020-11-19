(function() {

    function apply(context, template) {
        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);

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
        return Evergage.DisplayUtils.pageElementLoaded(contentZoneSelector).then(element => {
            const html = template(context);
            Evergage.cashDom(element).html(html);
        });
    }

    function reset(context, template) {
        Evergage.cashDom(`[data-evg-campaign-id="${context.campaign}"][data-evg-experience-id="${context.experience}"]`)
            .remove();
    }

    function control(context) {
        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils.pageElementLoaded(contentZoneSelector).then(element => {
            Evergage.cashDom(element).attr({
                "data-evg-campaign-id": context.campaign,
                "data-evg-experience-id": context.experience,
                "data-evg-user-group": "Control"
            });
        });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
