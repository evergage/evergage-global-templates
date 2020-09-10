import { ContextualBanditConfig, decide } from "corvus";

export class PromotionImageDimensions {
    label: string;
    width: number;
    height: number;
}

export class ContextualBanditPromotionsBannerTemplate implements CampaignTemplateComponent {

    @title("Why Use This Template:")
    @subtitle("Let Einstein choose the Best Banner for your visitors.")

    readonly spacing1 = " ";

    @title("How To Use This Template")
    @subtitle("Choose your content zone and let Einstein do the rest.")

    readonly spacing2 = " ";

    @title("Choose Content Zone")
    @subtitle("Where the banner will be located")
    @options([
        "home_hero",
        "home_sub_hero",
        "category_hero",
        "category_sub_hero",
    ])
    contentZone: string = "home_hero";

    @title("Choose Image Size")
    @options([
        { label: "700x300", width: 700, height: 300 },
        { label: "1440x617", width: 1440, height: 617 },
        { label: "2160x450", width: 2160, height: 450 },
        { label: "2800x400", width: 2800, height: 400 }
    ])
    promoSelection: PromotionImageDimensions = { label: "1440x617", width: 1440, height: 617 };

    @hidden(true)
    banditFeatureSubsetId: string = "TdPHw";

    run(context: CampaignComponentContext) {
        let banditConfig: ContextualBanditConfig = {
            contentZone: this.contentZone,
            maxResults: 1,
            banditFeatureSubsetId: this.banditFeatureSubsetId,
            imageWidth: this.promoSelection.width,
            imageHeight: this.promoSelection.height,
        } as ContextualBanditConfig;
        let promo = decide(context, banditConfig, null)[0] as Promotion;

        return promo == null
            ? {}
            : {
                promotion: promo as Promotion,
                promotionImageUrl: promo.images[`${banditConfig.imageWidth}x${banditConfig.imageHeight}`].imageUrl
            };
    }

}
