import { ContextualBanditConfig, decide } from "corvus";

export class EinsteinDecisionsTemplate implements CampaignTemplateComponent {

    @header(' ')
    @headerSubtitle('Only offer assets tagged with the targeted web content zone will be eligible to return in the campaign.')

    @hidden(true)
    forHeaderSubtitle;

    run(context: CampaignComponentContext) {
        const banditConfig: ContextualBanditConfig = {
            maxResults: 1,
            contentZone: context.contentZone
        } as ContextualBanditConfig;

        const promotion = decide(context, banditConfig, null)[0] as Promotion;

        return promotion == null ? {} : { promotion };
    }

}
