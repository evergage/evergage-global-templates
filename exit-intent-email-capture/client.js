(function() {

    function apply(context, template) {
        Evergage.DisplayUtils.pageExit(2000).then(function() {
            context.overlayClass = context.lightboxEnabled ? "evg-overlay" : "";
            var html = template(context);
            Evergage.cashDom("body").append(html);

            /** Dismisses popup */
            const dismissSelectors = [
                "evg-email-capture-popup .evg-overlay",
                "#evg-email-capture-popup .evg-btn-dismissal",
                "#evg-email-capture-popup .evg-opt-out"
            ];

            Evergage.cashDom(dismissSelectors.join(", ")).on("click", () => {
                Evergage.cashDom("#evg-email-capture-popup").remove();
            });

            /** Shows secondary confirmation panel */
            Evergage.cashDom("#evg-email-capture-popup .evg-cta").on("click", () => {
                const emailAddress = Evergage.cashDom(".evg-form input[placeholder='Email']").val();
                const regex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+)$/);
                if (emailAddress && regex.test(emailAddress)) {
                    Evergage.cashDom("#evg-email-capture-popup .evg-main-panel").addClass("evg-hide");
                    Evergage.cashDom("#evg-email-capture-popup .evg-confirm-panel").removeClass("evg-hide");
                    Evergage.sendEvent({ user: {attributes: {emailAddress: emailAddress} } });
                } else {
                    Evergage.cashDom("#evg-email-capture-popup .evg-message")
                    .removeClass("evg-hide")
                    .addClass("evg-error");
                }
            });
        });
    }

    function reset(context, template) {
        Evergage.cashDom("#evg-email-capture-popup").remove();
    }

    function control() {
        
    }
  
    registerTemplate({
      apply: apply,
      reset: reset, 
      control: control
    });
    
  })();
