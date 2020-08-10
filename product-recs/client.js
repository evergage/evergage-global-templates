(function() {

    /**
     * @function buildExperienceSelector
     * @param {Object} context
     * @description Concatenates selector using Experience ID from context.
     */
    function buildExperienceSelector(context) {
        return "[data-evg-experience-id=" + context.experience + "]";
    }

    /**
     * @function applyVisibilityOptions
     * @param {Object} context
     * @description Hides elements based on selected Visibility options.
     */
    function applyVisibilityOptions(context) {
        var experienceContainer = Evergage.cashDom(buildExperienceSelector(context));
        var options = context.visibilityOptions;
        if (typeof options === "object") {
            Object.keys(options).map(optionKey => {
                if (!options[optionKey]) {
                    experienceContainer.find("[class*=evg-product-rec-" + optionKey + "]").addClass("evg-hide");
                }
            });
        }
    }

    function apply(context, template) {

        /**
         * The code below replaces the content of your selected content zone
         * with the HTML generated from Handlebars.
         *
         * If you instead wish to insert your generated HTML before or after your
         * selected content zone, use .before(html) or .after(html), respectively.
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
        var contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils.pageElementLoaded(contentZoneSelector).then(element => {
            var html = template(context);
            Evergage.cashDom(element).before(html);
            applyVisibilityOptions(context);
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
        var contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
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
