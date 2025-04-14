import React, { ComponentType, FunctionComponent } from 'react';
import { UMLSequenceLine } from './uml-sequence-line';
import { withTheme, withThemeProps } from '../../../components/theme/styles';
import { compose } from 'redux';
import { connect, ConnectedComponent } from 'react-redux';
import { ModelState } from '../../../components/store/model-state';
import { ApollonView } from '../../../services/editor/editor-types';
import { ThemedPath } from '../../../components/theme/themedComponents';
import { Point } from '../../../utils/geometry/point';

type OwnProps = {
  element: UMLSequenceLine;
};

type SequenceProps = { interactive: boolean; interactable: boolean };

type DispatchProps = {};

type Props = OwnProps & SequenceProps & DispatchProps & withThemeProps;

const enhance = compose<ConnectedComponent<ComponentType<Props>, OwnProps>>(
  withTheme,
  connect<SequenceProps, DispatchProps, OwnProps, ModelState>((state, props) => ({
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === ApollonView.Exporting || state.editor.view === ApollonView.Highlight,
  })),
);

const UMLSequenceLineC: FunctionComponent<Props> = ({ element }) => {
  const { width, height } = element.bounds
  const startX = 0 + (width / 2)
  const startY = 0
  const [start, end] = [new Point(startX, startY), new Point(startX, height)];

  return (
    <g>
      <ThemedPath id={element.id} d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} strokeColor='transparent' strokeWidth={20} strokeDasharray={7} />
      <ThemedPath id={element.id} d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} strokeColor={element.strokeColor} strokeWidth={1} strokeDasharray={7} />
    </g>
  );
};

export const UMLSequenceLineComponent = enhance(UMLSequenceLineC);
