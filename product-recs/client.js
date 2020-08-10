(function() {

    /**
     * @function buildExperienceSelector
     * @param {Object} context
     * @description Concatenates selector using Experience ID from context.
     */
    function buildExperienceSelector(context) {
        return `[data-evg-experience-id=${context.experience}]`;
    }

    function apply(context, template) {
        /**
         * The code below insert your generated HTML from Handlebars before the
         * selected content zone by using .before(html), though .after(html) can
         * be used if you'd like insert the HTML after that content zone.
         *
         * If you instead wish to replace the content of your selected content zone
         * with the HTML generated from Handlebars, then .html(html) can be used.
         *
         * Note: To use a content zone, you must define a "contentZone" configuration
         * property in the Serverside Code.
         *
         * Use Evergage.DisplayUtils.pageElementLoaded to defer the rendering of
         * the template until the content zone element is loaded on page.
         * The observer element that monitors for the content zone element to get inserted
         * into its DOM node is set to "body" by default. For performance optimization, this
         * default can be overridden by adding a second selector argument, which will be used
         * as the observer element instead.
         *
         * Visit the Display Utilities documentation to learn more:
         * https://developer.evergage.com/templates/display-utilities
         *
         * Note: To use Evergage.DisplayUtils.pageElementLoaded, you must have the
         * Display Utilities gear installed and enabled for your dataset.
         */
        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils.pageElementLoaded(contentZoneSelector)
            .then(element => {
                const html = template(context);
                Evergage.cashDom(element).before(html);
            });
    }

    function reset(context, template) {
        /** Remove the template from the DOM to reset the template. */
        Evergage.cashDom(buildExperienceSelector(context)).remove();
    }

    function control(context) {
        /**
         * Add Evergage data attributes to elements you wish to track in the control experience.
         *
         * Note: Using Evergage data attributes allows you to track stats with Evergage and
         * requires the Campaign Stat Tracking gear installed and enabled for your dataset.
         * Visit the Campaign Stats Tracking documentation to learn more:
         * https://developer.evergage.com/templates/campaign-stats
         */
        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        Evergage.cashDom(contentZoneSelector).attr("data-evg-campaign-id", context.campaign);
        Evergage.cashDom(contentZoneSelector).attr("data-evg-experience-id", context.experience);
        Evergage.cashDom(contentZoneSelector).attr("data-evg-user-group", "Control");
        Evergage.cashDom(contentZoneSelector + " a").attr("data-evg-clickthrough", "");
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
