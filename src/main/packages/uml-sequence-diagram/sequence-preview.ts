import { ILayer } from '../../services/layouter/layer';
import { UMLElement } from '../../services/uml-element/uml-element';
import { ComposePreview } from '../compose-preview';
import { computeDimension } from '../../utils/geometry/boundary';
import { UMLSequenceActivation } from './uml-sequence-activation/uml-sequence-activation';
import { UMLSequenceLine } from './uml-sequence-line/uml-sequence-line';
import { UMLSequenceObjectNode } from './uml-sequence-object-node/uml-sequence-object-node';
import { UMLUseCaseActor } from '../uml-use-case-diagram/uml-use-case-actor/uml-use-case-actor';
import { SequenceElementType } from '.';

export const composeSequencePreview: ComposePreview = (
  layer: ILayer,
  translate: (id: string) => string,
): UMLElement[] => {
  const elements: UMLElement[] = [];

  // Actor
  const umlActor = new UMLUseCaseActor({
    name: translate('packages.SequenceDiagram.SequenceActor'),
    type: SequenceElementType.SequenceActor,
    bounds: {
      x: 0,
      y: 0,
      width: computeDimension(1.0, 80),
      height: computeDimension(1.0, 140),
    },
  });
  elements.push(umlActor);

  // Sequence Object Node
  const sequenceObjectNode = new UMLSequenceObjectNode({
    name: translate('packages.SequenceDiagram.SequenceObjectNode'),
  });
  sequenceObjectNode.bounds = {
    ...sequenceObjectNode.bounds,
    width: sequenceObjectNode.bounds.width,
    height: sequenceObjectNode.bounds.height,
  };
  elements.push(sequenceObjectNode);

  // Sequence Fork Node
  UMLSequenceActivation.defaultWidth = Math.round(20 / 10) * 10;
  UMLSequenceActivation.defaultHeight = Math.round(60 / 10) * 10;
  const sequenceForkNode = new UMLSequenceActivation();
  elements.push(sequenceForkNode);

  UMLSequenceLine.defaultWidth = Math.round(20 / 10) * 10;
  UMLSequenceLine.defaultHeight = Math.round(60 / 10) * 10;
  const sequenceLine = new UMLSequenceLine();
  elements.push(sequenceLine);

  return elements;
};
