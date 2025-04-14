import { ActivityRelationshipType } from '..';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';

export class UMLActivityObjectFlow extends UMLRelationshipCenteredDescription {
  type = ActivityRelationshipType.ActivityObjectFlow;
}
