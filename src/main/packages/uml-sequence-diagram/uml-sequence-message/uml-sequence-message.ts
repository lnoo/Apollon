import { SequenceRelationshipType } from '..';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';

export class UMLSequenceMessage extends UMLRelationshipCenteredDescription {
  type = SequenceRelationshipType.SequenceMessage;
}
