(function() {

    function buildExperienceSelector(context) {
        return "[data-evg-experience-id=" + context.experience + "]";
    }

    function applyVisibilityOptions(context) {
        var experienceContainer = Evergage.cashDom(buildExperienceSelector(context));
        var options = context.visibilityOptions;
        Object.keys(options).map(optionKey => {
            if (!options[optionKey]) {
                experienceContainer.find("[class*=evg-" + optionKey + "]").addClass("evg-hide");
            }
        });
    }

    function apply(context, template, render) {
        var contentZone = Evergage.getContentZoneSelector(context.contentZone);
        if (contentZone) {
            var html = template(context);
            Evergage.cashDom(contentZone).after(html);
            applyVisibilityOptions(context);
        }
    }

    function reset(context, template) {
        Evergage.cashDom(buildExperienceSelector(context)).remove();
    }

    function control() {
        // TODO
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();