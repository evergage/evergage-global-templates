(function() {

    function apply(context, template) {
        //Evergage.DisplayUtils.pageExit(2000).then(function() {
                context.overlayClass = context.lightboxEnabled ? "evg-overlay" : "";
                var html = template(context);
                Evergage.cashDom("body").append(html);

            /** Dismisses popup */
            const dismissSelectors = [
                "#evg-exit-intent-popup .evg-overlay",
                "#evg-exit-intent-popup .evg-btn-dismissal",
            ];

            Evergage.cashDom(dismissSelectors.join(", ")).on("click", () => {
                Evergage.cashDom("#evg-exit-intent-popup").remove();
            });
        //});
    }

    function reset(context, template) {
        Evergage.cashDom("#evg-exit-intent-popup").remove();
    }

    function control() {
 
    }
  
    registerTemplate({
      apply: apply,
      reset: reset, 
      control: control
    });

})();