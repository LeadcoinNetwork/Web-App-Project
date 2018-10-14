import realEstateFields from "./real-estate-fields-data"
import designFields from "./design-fields-data"

export default {
  realEstateFields,
  filteredRealEstateFields: realEstateFields.filter(lead => !lead.private),
  designFields,
  filteredDesignFields: designFields.filter(lead => !lead.private),
}
