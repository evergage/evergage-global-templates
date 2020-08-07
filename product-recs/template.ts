import { RecommendationsConfig, recommend } from "recs";

export class ProductRecommendationsContentZones {
    name: string;
    label: string;
}

export class ProductRecommendationsTemplate implements CampaignTemplateComponent {

    /**
     * Developer Controls
     */
    @hidden(true)
    maxResults: 4 | 5 | 6 = 6;

    @hidden(true)
    visibilityOptions: object;


    /**
     * Business-User Controls
     */
    @options([
        "home_product_recommendations",
        "product_detail_recs_row_1",
        "product_detail_recs_row_2",
        "plp_recs_row",
        "cart_recs_row_1",
        "cart_recs_row_2",
        "order_confirmation_recs_row",
        "arc_modal_recs_row",
        "404_error_recs_row",
        "search_results_recs_row",
    ])
    contentZone: string = "home_product_recommendations";

    @title("Recommendations Row Header")
    header: string;

    @title(" ")
    recsConfig: RecommendationsConfig = new RecommendationsConfig().restrictItemType("Product").restrictMaxResults(this.maxResults)

    @title("Show Product name")
    // @shownIf()
    nameVisibility: boolean = true;

    @title("Show Product description")
    // @shownIf()
    descriptionVisibility: boolean = true;

    @title("Show Product price")
    // @shownIf()
    priceVisibility: boolean = true;

    @title("Show Product rating")
    // @shownIf()
    ratingVisibility: boolean = true;

    run(context: CampaignComponentContext) {
        this.visibilityOptions = {
            name: this.nameVisibility,
            description: this.descriptionVisibility,
            price: this.priceVisibility,
            rating: this.ratingVisibility
        };

        return {
            products: recommend(context, this.recsConfig)
        };
    }
}
