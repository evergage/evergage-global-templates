(function() {

    function apply(context, template) {
        Evergage.DisplayUtils.pageExit(2000).then(function () {
            var html = template(context);
            Evergage.cashDom("body").append(html);

            /** Style config setup */
            if (context.style === "Dark on Light") {
                Evergage.cashDom("#evg-email-capture-popup, #evg-email-capture-popup .evg-cta").addClass("evg-dark");
            } else {
                Evergage.cashDom("#evg-email-capture-popup, #evg-email-capture-popup .evg-cta").addClass("evg-light");
            }

            /** Lightbox config setup */
            if (context.lightboxEnabled === true) {
                Evergage.cashDom("#evg-email-capture-popup .lightbox").addClass("evg-overlay")
            } 
            else {
                Evergage.cashDom("#evg-email-capture-popup .lightbox").removeClass("evg-overlay")
            }

            /** Dismisses popup */
            Evergage.cashDom("#evg-email-capture-popup .evg-overlay, #evg-email-capture-popup .evg-btn-dismissal, #evg-email-capture-popup .evg-opt-out").on("click", function() {
                Evergage.cashDom("#evg-email-capture-popup").remove();
            });

            /** Shows secondary confirmation panel */
            Evergage.cashDom("#evg-email-capture-popup .evg-cta").on("click", function(event) {
                let emailAddress = Evergage.cashDom(".evg-form input[placeholder='Email']").val()
                const regex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+)$/);
                if (emailAddress && regex.test(emailAddress)) {
                    Evergage.cashDom("#evg-email-capture-popup .evg-content").addClass("evg-hide");
                    Evergage.cashDom("#evg-email-capture-popup .evg-confirm-content").removeClass("evg-hide");
                    Evergage.sendEvent({ user: {attributes: {emailAddress: emailAddress} } });
                } else {
                    Evergage.cashDom("#evg-email-capture-popup .evg-message").removeClass("evg-hide");
                    Evergage.cashDom("#evg-email-capture-popup .evg-message").addClass("evg-error");
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