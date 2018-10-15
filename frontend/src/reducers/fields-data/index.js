import realEstateFields from "./real-estate-fields-data"
import designFields from "./design-fields-data"

export default {
  all: {
    realEstateFields,
    designFields,
  },
  public: {
    realEstateFields: realEstateFields.filter(lead => !lead.private),
    designFields: designFields.filter(lead => !lead.private),
  },
}
