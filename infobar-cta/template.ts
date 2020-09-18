export class StyleField {
    label: string;
    className: string;
}

export class InfobarCtaTemplate implements CampaignTemplateComponent {

    @title('Infobar Style')
    @subtitle("Define infobar background & text styling.")
    @options([
        {label: "Light on Dark", className: "evg-light-on-dark"},
        {label: "Dark on Light", className: "evg-dark-on-light" }
    ])
    style: StyleField = {label: "Light on Dark", className: "evg-light-on-dark"};

    @title('Message Text')
    messageText: string = "Infobar Message Text";

    @title('Message Visibility')
    messageVisibility: boolean = true;

    @title('CTA Text')
    ctaText: string = "Call To Action";

    @title('CTA Visibility')
    ctaVisibility: boolean = true;

    @title('CTA Destination URL')
    @subtitle("Requires full URL string including HTTPS://")
    ctaUrl: string = "https://cumulusfinserv.com/banking";

    run(context: CampaignComponentContext) {
        return {};
    }
    
}