import React, { FunctionComponent } from 'react';
import { Text } from '../../../components/controls/text/text';
import { Point } from '../../../utils/geometry/point';
import { UMLUseCaseAssociation } from './uml-use-case-association';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
import { ThemedPath } from '../../../components/theme/themedComponents';

const Arrow: FunctionComponent<{ id: string; color?: string; d: string }> = ({ id, color, d }) => (
  <g>
    <marker
      id={`marker-${id}`}
      viewBox="0 0 30 30"
      markerWidth="22"
      markerHeight="30"
      refX="30"
      refY="15"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <ThemedPath d="M0,29 L30,15 L0,1" fillColor="none" strokeColor={color} />
    </marker>
    <ThemedPath d={d} strokeColor={color} strokeDasharray={7} markerEnd={`url(#marker-${id})`} />
  </g>
);

export const UMLUseCaseAssociationComponent: FunctionComponent<Props> = ({ element }) => {
  const [start, end] = element.path.map((p) => new Point(p.x, p.y));
  const line = end.subtract(start);
  const norm = line.normalize();
  const center = start.add(norm.scale(0.5 * line.length));
  const startSection = start.add(norm.scale(0.5 * line.length - 40));
  const endSection = end.subtract(norm.scale(0.5 * line.length - 40));


  return (
    <g>
      <Arrow
        id={element.id}
        color={element.strokeColor}
        d={`
          M ${start.x} ${start.y} L ${startSection.x} ${startSection.y}
          M ${endSection.x} ${endSection.y} L ${end.x} ${end.y}
        `}
      />
      <path
        id={`textpath-${element.id}`}
        d={`
        M ${start.x} ${start.y - 10}
        L ${end.x} ${end.y - 10}
    `}
      />
      <Text
        dy="20px"
        noX
        noY
        fill={element.textColor}
        transform={
          norm.x < 0
            ? `
            translate(${center.x}, ${center.y})
            rotate(180)
            translate(${-center.x}, ${-center.y})
          `
            : undefined
        }
      >
        <textPath xlinkHref={`#textpath-${element.id}`} startOffset="50%">
          {element.name}
        </textPath>
      </Text>
      <ThemedPolyline
        points={element.path.map((point) => `${point.x} ${point.y}`).join(',')}
        strokeColor={element.strokeColor}
        fillColor="none"
        strokeWidth={1}
      />
    </g>
  );
};

interface Props {
  element: UMLUseCaseAssociation;
}
