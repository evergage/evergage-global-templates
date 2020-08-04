import { RecommendationsConfig, RecipeReference, RecipeReferenceLookup, recommend } from "recs";

export class ProductRecommendationsTemplate implements CampaignTemplateComponent {

    @hidden(true)
    contentZone: string = "homepage_product_recommendations";

    /** Multiple content zone options */
    // contentZone: "Homepage | Product Recommendations" | "PDP Recs Row 1" | "PDP Recs Row 2";

    @title("Recommendations Row Header")
    header: string;

    @lookupOptions((self) => new RecipeReferenceLookup("Product"))
    @title("Recipe")
    recipeId: RecipeReference;
    maxResults: number = 6;

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

    @hidden(true)
    visibilityOptions: object;

    run(context: CampaignComponentContext) {
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
