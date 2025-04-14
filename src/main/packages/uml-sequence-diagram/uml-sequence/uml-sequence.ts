import { SequenceElementType, SequenceRelationshipType } from '..';
import { UMLPackage } from '../../common/uml-package/uml-package';

export class UMLSequence extends UMLPackage {
  static supportedRelationships = [SequenceRelationshipType.SequenceControlFlow];
  type = SequenceElementType.Sequence;
}
