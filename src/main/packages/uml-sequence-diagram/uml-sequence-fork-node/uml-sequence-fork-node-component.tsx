import React, { ComponentType, FunctionComponent } from 'react';
import { UMLSequenceForkNode } from './uml-sequence-fork-node';
import { withTheme, withThemeProps } from '../../../components/theme/styles';
import { compose } from 'redux';
import { connect, ConnectedComponent } from 'react-redux';
import { ModelState } from '../../../components/store/model-state';
import { ApollonView } from '../../../services/editor/editor-types';
import { ThemedRectContrast } from '../../../components/theme/themedComponents';

type OwnProps = {
  element: UMLSequenceForkNode;
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

const UMLSequenceForkNodeC: FunctionComponent<Props> = ({ element, interactive, interactable, theme }) => {
  return (
    <g>
      <ThemedRectContrast
        width={element.bounds.width}
        height={element.bounds.height}
        strokeColor="none"
        fillColor={interactive && interactable ? theme.interactive.normal : element.fillColor}
        fillOpacity={1}
      />
    </g>
  );
};

export const UMLSequenceForkNodeComponent = enhance(UMLSequenceForkNodeC);
