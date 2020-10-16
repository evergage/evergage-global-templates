export class RedirectTemplate implements CampaignTemplateComponent {

    @title("Target Page")
    @subtitle("Requires full URL string, including https://, and operates on exact match criteria")
    targetPage: string;

    @title("URL for Redirect")
    @subtitle("New destination. Requires full URL string, including https://")
    urlForRedirect: string;

    @title("Redirect with query parameters from original URL")
    maintainQueryParams: boolean = true;

    private prepareUrlForRedirect(): string {
        return (this.urlForRedirect || "").replace(/(http:)|([^\/]$)/gim, (match, p1, p2) => {
            if (p1) {
                return "https:"
            } else if (p2) {
                return `${p2}/`;
            }
        });
    }

    run(context: CampaignComponentContext) {
        return {
            targetPage: this.targetPage,
            urlForRedirect: this.prepareUrlForRedirect(),
            maintainQueryParams: this.maintainQueryParams
        };
    }

}
