import { RecommendationsConfig, RecipeReference, RecipeReferenceLookup, recommend } from "recs";

export class ProductRecommendationsContentZones {
    name: string;
    label: string;
}

export class ProductRecommendationsTemplate implements CampaignTemplateComponent {

    /**
     * Business-User Controls
     */
    // @hidden(true)
    // contentZone: string = "home_product_recommendations";
    @options([
        { name: "home_product_recommendations", label: "Homepage Product Recommendations" },
        { name: "product_detail_recs_row_1", label: "Product Details Recommendations Row 1" },
        { name: "product_detail_recs_row_2", label: "Product Details Recommendations Row 2" },
        // TODO: Needed in sitemap
        // { name: "plp_recs_row", label: "PLP Recommendations Row" },
        // { name: "cart_recs_row_1", label: "Cart Recommendations Row 1" },
        // { name: "cart_recs_row_2", label: "Cart Recommendations Row 2" },
        // { name: "order_confirmation_recs_row", label: "Order Confirmation Recommendations Row" },
        // { name: "arc_modal_recs_row", label: "Arc Modal Recommendations Row" },
        // { name: "404_error_recs_row", label: "404 Error Recommendations Row" },
        // { name: "search_results_recs_row", label: "Search Results Recommendations Row" },
    ])
    selectedContentZone: ProductRecommendationsContentZones = { name: "home_product_recommendations", label: "Homepage Product Recommendations" };

    @hidden(true)
    contentZone: string = this.selectedContentZone.name;

    @title("Recommendations Row Header")
    header: string;

    @lookupOptions((self) => new RecipeReferenceLookup("Product"))
    @title("Recipe")
    recipeId: RecipeReference;

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

    /**
     * Developer Controls
     */
    @hidden(true)
    maxResults: 4 | 5 | 6 = 6;

    @hidden(true)
    visibilityOptions: object;

    run(context: CampaignComponentContext) {
        this.contentZone = this.selectedContentZone.name;
        this.visibilityOptions = {
            name: this.nameVisibility,
            description: this.descriptionVisibility,
            price: this.priceVisibility,
            rating: this.ratingVisibility
        };

        return {
            products: recommend(context, {
                itemType: "Product",
                maxResults: this.maxResults,
                recipeId: this.recipeId,
                validate: () => true

            } as RecommendationsConfig)
        };
    }
}
