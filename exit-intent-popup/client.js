(function() {
     /**
    * @function applyColorTheme
    * @param {Object} context
    * @description Sets the color theme to the Color Theme option selected.
     */
    function applyColorTheme(context) {
    Evergage.cashDom("#evg-email-capture-popup, #evg-email-capture-popup .evg-h1, #evg-email-capture-popup .evg-h2, #evg-email-capture-popup .evg-btn-dismissal")
    .addClass(context.colorTheme.className);
    }

    function apply(context, template) {
        Evergage.DisplayUtils.pageExit(2000).then(function () {
            var html = template(context);
            Evergage.cashDom("body").append(html);
            applyColorTheme(context);

            // Style config setup
            if (context.style === "Dark on Light") {
                Evergage.cashDom("#evg-email-capture-popup, #evg-email-capture-popup .evg-cta").addClass("evg-dark");
            } else {
                Evergage.cashDom("#evg-email-capture-popup, #evg-email-capture-popup .evg-cta").addClass("evg-light");
            }

            // Dismisses popup
            Evergage.cashDom("#evg-email-capture-popup .evg-overlay, #evg-email-capture-popup .evg-btn-dismissal, #evg-email-capture-popup").on("click", function() {
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