(function() {

    function apply(context, template, render) {
        var contentZone = Evergage.getContentZoneSelector(context.contentZone);
        if (contentZone) {
            var html = template(context);
            Evergage.cashDom(contentZone).after(html);
        }
    }

    function reset(context, template) {
        Evergage.cashDom("[data-evg-experience-id=" + context.experience + "]").remove();
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