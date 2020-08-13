(function() {
    
    function apply(context, template) {
        Evergage.DisplayUtils.pageExit(2000).then(function() {
                context.overlayClass = context.lightboxEnabled ? "evg-overlay" : "";
                var html = template(context);
                Evergage.cashDom("body").append(html);

            /** Dismisses popup */
            const dismissSelectors = [
                "#evg-exit-intent-popup-email-capture .evg-overlay",
                "#evg-exit-intent-popup-email-capture .evg-btn-dismissal",
                "#evg-exit-intent-popup-email-capture .evg-opt-out-msg"
            ];

            Evergage.cashDom(dismissSelectors.join(", ")).on("click", () => {
                Evergage.cashDom("#evg-exit-intent-popup-email-capture").remove();
            });

            /** Shows secondary confirmation panel */
            Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-cta").on("click", () => {
                const emailAddress = Evergage.cashDom(".evg-form input[placeholder='Email']").val();
                const regex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+)$/);
                if (emailAddress && regex.test(emailAddress)) {
                    Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-main-panel").addClass("evg-hide");
                    Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-confirm-panel").removeClass("evg-hide");
                    Evergage.sendEvent({ user: {attributes: {emailAddress: emailAddress} } });
                } else {
                    Evergage.cashDom("#evg-exit-intent-popup-email-capture .evg-error-msg")
                    .removeClass("evg-hide")
                    .addClass("evg-error");
                }
            });
        });
    }

    function reset(context, template) {
        Evergage.cashDom("#evg-exit-intent-popup-email-capture").remove();
    }

    function control() {
        
    }
  
    registerTemplate({
      apply: apply,
      reset: reset, 
      control: control
    });

})();
