export class StyleField {
    label: string;
    className: string;
}

export class LightboxField {
    label: boolean;
    overlayClass: string
}

export class ExitIntentPopupEmailCapture implements CampaignTemplateComponent {

    @title("Title")
    @subtitle("i.e. Don't leave yet!")
    @richText(true)
    title: string = "Don't leave yet!";

    @title("Subtitle")
    @subtitle("i.e. Do you want to learn more about our special summer offers?")
    @richText(true)
    subtitle: string = "Do you want to learn more about our special summer offers?";

    @title("Confirmation Title")
    @subtitle("i.e. Thanks for subscribing!")
    @richText(true)
    confirmationTitle: string = "Thanks for subscribing!";

    @title("Confirmation Subtitle")
    @subtitle("i.e. We're excited to have you")
    @richText(true)
    confirmationSubtitle: string = "We're excited to have you";

    @title("CTA Text")
    @subtitle("i.e. Definitely!")
    ctaText: string = "Definitely!";

    @title("Opt-out Text")
    @subtitle("i.e. No Thanks")
    optOutText: string = "No Thanks";

    @title("Lightbox")
    lightboxEnabled: boolean = true;

    @options([
        {label: "Light on Dark", className: "evg-light-on-dark"},
        {label: "Dark on Light", className: "evg-dark-on-light" }
    ])
    style: StyleField = {label: "Light on Dark", className: "evg-light-on-dark"}


    @title("Background Image URL")
    imageUrl: string = "https://cdn.evergage.com/evergage-content/nto/nto_footwear.jpg";

    @hidden(true)
    contentZone = "global_popup"

    run(context: CampaignComponentContext) {
        return {};
    }
    
}
