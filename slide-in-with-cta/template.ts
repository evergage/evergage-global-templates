export class SlideInTriggerOptions {
    name: string;
    label: string;
}

export class StyleField {
    label: string;
    className: string;
}

export class SlideInWithCTATemplate implements CampaignTemplateComponent {

    @options([
        {
            name: "timeOnPage",
            label: "Time on Page (Delay)"
        },
        {
            name: "pageScroll",
            label: "Page Scroll"
        },
        {
            name: "inactivity",
            label: "Inactivity"
        }
    ])
    triggerOptions: SlideInTriggerOptions = { name: "", label: "Select..." };

    @shownIf(this, self => self.triggerOptions.name === "timeOnPage")
    @title(" ")
    @subtitle("Seconds on page")
    secondsOnPage: number = 0;

    @shownIf(this, self => self.triggerOptions.name === "pageScroll")
    @title(" ")
    @subtitle("% of page the user has scrolled")
    percentageScrolled: number = 0;

    @shownIf(this, self => self.triggerOptions.name === "inactivity")
    @title(" ")
    @subtitle("Seconds of inactivity on page")
    secondsInactive: number = 0;

    @hidden(true)
    triggerOptionsNumber: number;

    @subtitle("Define infobar background & text styling.")
    @options([
        { label: "Light on Dark", className: "evg-light-on-dark" },
        { label: "Dark on Light", className: "evg-dark-on-light" }
    ])
    style: StyleField = { label: "Light on Dark", className: "evg-light-on-dark" };

    header: string = "Header Text";

    @title("Header Visibility")
    headerVisibility: boolean = true;

    subheader: string = "Subheader Text";

    @title("Subheader Visibility")
    subheaderVisibility: boolean = true;

    @title("CTA Text")
    ctaText: string = "Call To Action";

    @title("CTA Visibility")
    ctaVisibility: boolean = true;

    @title("CTA Destination URL")
    @subtitle("Requires full URL string including https://")
    ctaUrl: string = "https://www.northerntrailoutfitters.com";

    run(context: CampaignComponentContext) {
        switch (this.triggerOptions.name) {
            case "timeOnPage":
                this.triggerOptionsNumber = this.secondsOnPage * 1000;
                break;
            case "pageScroll":
                this.triggerOptionsNumber = (this.percentageScrolled / 100);
                break;
            case "inactivity":
                this.triggerOptionsNumber = this.secondsInactive * 1000;
                break;
        }
        return {
            triggerOptionsNumber: this.triggerOptionsNumber
        };
    }

}
