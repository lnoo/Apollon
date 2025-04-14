import { SequenceElementType, SequenceRelationshipType } from '..';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
import { DeepPartial } from 'redux';

export class UMLSequenceLine extends UMLElement {
  static supportedRelationships = [SequenceRelationshipType.SequenceMessage];
  static features: UMLElementFeatures = { ...UMLElement.features, connectable: false, updatable: false };
  static defaultWidth = 20;
  static defaultHeight = 60;

  type: UMLElementType = SequenceElementType.SequenceLine;
  bounds: IBoundary = {
    ...this.bounds,
  };

  constructor(values?: DeepPartial<IUMLElement>) {
    super(values);
    this.bounds.height = (values && values.bounds && values.bounds.height) || UMLSequenceLine.defaultHeight;
    this.bounds.width = UMLSequenceLine.defaultWidth;
  }

  render(layer: ILayer): ILayoutable[] {
    this.bounds.height = Math.max(this.bounds.height, UMLSequenceLine.defaultHeight);
    return [this];
  }
}
