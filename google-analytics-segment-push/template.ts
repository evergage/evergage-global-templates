import { UserSegmentLookup, UserSegmentReference } from "common";

export class GAMapping {
    @title("Google Analytics Dimension")
    @subtitle("e.g. dimension27")
    gaDimension: string;

    @title("Segment Picker")
    @lookupOptions(() => new UserSegmentLookup())
    segments: UserSegmentReference[]
}

export class GASegmentPushTemplate implements CampaignTemplateComponent {

    @header("Why Use This Template")
    @headerSubtitle(`
        (1) Inform Google Analytics about visitors' interactions and
        (2) transfer pre-defined segments to Google Analytics.
    `)

    readonly spacing = " ";

    @header("How to Use This Template")
    @headerSubtitle(`
        This is a global template listing across any page. Choose your segment(s) from
        Interaction Studio and map to a dimension in Google Analytics."
    `)

    @tabular()
    @title("Map Segment to Google Analytics Dimensions")
    tabularComplexField: GAMapping[];

    run(context: CampaignComponentContext) {

        let gaMapping = {};
        this.tabularComplexField.forEach(mapping => {
            if (('gaDimension' in mapping) && ('segments' in mapping)) {
                const segments = [];
                mapping.segments.forEach(segment => {
                    const segmentJoinDate = context.user.getSegmentJoinDate(segment.id);
                    if (segmentJoinDate) {
                        segments.push(segment.label);
                    }
                })
                if (mapping['gaDimension'] && segments.length) {
                    gaMapping[mapping.gaDimension] = segments;
                }
            }
        })

        return {
            gaMapping: gaMapping
        };
    }
}