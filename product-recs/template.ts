import { RecommendationsConfig, recommend } from "recs";

export class ProductRecommendationsTemplate implements CampaignTemplateComponent {

    /**
     * Developer Controls
     */
    // @hidden(true)
    maximumNumberOfProducts: 2 | 4 | 6 | 8 = 4;

    @hidden(true)
    maxRatingBound: number = 5;


    /**
     * Business-User Controls
     */
    @options([
        "home_recs",
        "product_detail_recs_row_1",
        "product_detail_recs_row_2",
        "category_recs",
        "cart_recs_row_1",
        "cart_recs_row_2",
        "search_recs"
    ])
    contentZone: string = "home_product_recommendations";

    @title("Title")
    @subtitle("i.e. You May Also Like")
    header: string = "You May Also Like";

    @title(" ")
    @subtitle("i.e. Collaborative with Trending")
    recsConfig: RecommendationsConfig = new RecommendationsConfig()
        .restrictItemType("Product")
        .restrictMaxResults(this.maximumNumberOfProducts);

    @title("Show Product name")
    nameVisibility: boolean = true;

    @title("Show Product description")
    descriptionVisibility: boolean = true;

    @title("Show Product price")
    priceVisibility: boolean = true;

    @title("Show Product rating")
    ratingVisibility: boolean = false;

    run(context: CampaignComponentContext) {
        this.recsConfig.maxResults = this.maximumNumberOfProducts;
        return {
            itemType: this.recsConfig.itemType,
            products: recommend(context, this.recsConfig)
        };
    }
}
