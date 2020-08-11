export class StyleField {
    label: string;
    styleClass: string;
}

export class EmailCapturePopupTemplate implements CampaignTemplateComponent {
    
    @title('Background Image URL')
    imageUrl: string = "https://cumulus-fs.s3.amazonaws.com/images/banking-savings.png"
    
    @options([
        {label: "Light text on dark background", styleClass: "evg-light-on-dark"},
        {label: "Dark text on light background", styleClass: "evg-dark-on-light"}
    ])
    style: StyleField = {label: "Dark text on light background", styleClass: "evg-dark-on-light"};

    header: string = "Wait, don't leave!";

    @subtitle('Input sub-header text')
    
    subheader: string = "Grow your money with a Cumulus account.";

    @title('CTA Text')
    ctaText: string ="Learn More";

    @title('CTA Destination URL')
    @subtitle("Enter a fully qualified destination URL for the CTA (e.g., https://www.cumulusfinserv.com/)")
    ctaUrl: string = "/banking/checking-and-savings";

    @hidden(true)
    contentZone = "global_popup";

    run(context: CampaignComponentContext) {
        return {};
    }
    
}