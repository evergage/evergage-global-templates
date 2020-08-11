(function() {

    function apply(context, template) {
        Evergage.DisplayUtils.pageExit(2000).then(function () {
            var html = template(context);
            Evergage.cashDom("body").append(html);

             /** Dismisses popup */
            const dismissSeletors = [
                "#evg-email-capture-popup .evg-overlay",
                "#evg-email-capture-popup .evg-btn-dismissal"
            ];
            Evergage.cashDom(dismissSeletors.join(", ")).on("click", () => {
                Evergage.cashDom("#evg-email-capture-popup").remove();
            });
        });
    }

    function reset(context, template) {
        var popup = Evergage.cashDom("#evg-email-capture-popup");
        if (popup) popup.remove();
    }

    function control() {
    
    }
  
    registerTemplate({
      apply: apply,
      reset: reset, 
      control: control
    });
    
  })();