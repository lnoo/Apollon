import { SequenceRelationshipType } from '..';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';

export class UMLSequenceControlFlow extends UMLRelationshipCenteredDescription {
  type = SequenceRelationshipType.SequenceControlFlow;
}
