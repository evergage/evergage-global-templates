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
    @subtitle('Optional text input field')
    preAttrMessageText: string = "Message Text, ";

    @title('User Attribute Default')
    @subtitle('Text to appear in place of the user attribute (in this case, first name)')
    userAttrDefault: string = "Default";

    @title('Post-Attribute Message Text')
    @subtitle('Optional text input field')
    postAttrMessageText: string = ", Additional Message Text";

    @title('CTA Text')
    ctaText: string = "Call To Action";

    @title('CTA Visibility')
    ctaVisibility: boolean = true;

    @title('CTA Destination URL')
    @subtitle("Requires full URL string including https://")
    ctaUrl: string = "https://cumulusfinserv.com/banking";

    run(context: CampaignComponentContext) {
        const firstNameAttribute = context?.user?.attributes?.firstName as Attribute;
        const firstName = firstNameAttribute?.value;
        return {
            userAttr: firstName || this.userAttrDefault
        };
    }

}
