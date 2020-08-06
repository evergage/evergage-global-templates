export class EmailCapturePopupTemplate implements CampaignTemplateComponent {
    
    @title("Title")
    @richText(true)
    title: string = "Don't leave yet!";

    @title("Subtitle")
    @richText(true)
    subtitle: string = "Do you want to learn more about our special summer offers?"

    @title("Confirmation Title")
    @richText(true)
    confirmationTitle: string = "Thanks for subscribing!";

    @title("Confirmation Subtitle")
    @richText(true)
    confirmationSubtitle: string = "We're excited to have you";

    @title("CTA Text")
    ctaText: string = "Definitely!";

    @title("Opt-out Text")
    optOutText: string = "No Thanks";

    @title("Lightbox")
    lightboxEnabled: boolean = true;

    @title("Font Styling")
    style: "Dark on Light" | "Light on Dark" = "Dark on Light";

    @title("Background Image URL")
    imageUrl: string = "https://evergage-content.s3.us-east-1.amazonaws.com/evergage-content/untitled%20folder/ntoImage.png";

    @hidden(true)
    contentZone = "global_popup"

    run(context: CampaignComponentContext) {
        return {};
    }
    
}