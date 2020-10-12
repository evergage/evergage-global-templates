export class StyleField {
    label: string;
    className: string;
}

export class InfobarWithUserAttrAndCTATemplate implements CampaignTemplateComponent {

    @subtitle("Define infobar background & text styling.")
    @options([
        { label: "Light on Dark", className: "evg-light-on-dark" },
        { label: "Dark on Light", className: "evg-dark-on-light" }
    ])
    style: StyleField = { label: "Light on Dark", className: "evg-light-on-dark" };

    @title('Pre-Attribute Message Text')
    @subtitle('Insert message text to appear before the dynamic attribute')
    preAttrMessageText: string = "Infobar Message Text";

    @title('User Attribute Default')
    @subtitle('Text to appear in place of the user attribute (in this case, first name)')
    userAttrDefault: string = "";

    @title('Post-Attribute Message Text')
    @subtitle('Insert message text to appear after the dynamic attribute')
    postAttrMessageText: string = "Infobar Message Text";

    messageVisibility: boolean = true;

    @title('CTA Text')
    ctaText: string = "Call To Action";

    @title('CTA Visibility')
    ctaVisibility: boolean = true;

    @title('CTA Destination URL')
    @subtitle("Requires full URL string including https://")
    ctaUrl: string = "https://cumulusfinserv.com/banking";

    run(context: CampaignComponentContext) {
        return {
            userAttrDefault: this.userAttrDefault,
            user: context.user
        };
    }

}
