import realEstateFields from "./real-estate-fields-data"
import designFields from "./design-fields-data"

export default {
  "Real Estate": {
    private: realEstateFields.filter(lead => lead.private),
    public: realEstateFields.filter(lead => !lead.private),
  },
  Design: {
    private: designFields.filter(lead => lead.private),
    public: designFields.filter(lead => !lead.private),
  },
}
