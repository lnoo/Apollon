import React, { ComponentType, FunctionComponent } from 'react';
import { UMLSequenceActivation } from './uml-sequence-activation';
import { withTheme, withThemeProps } from '../../../components/theme/styles';
import { compose } from 'redux';
import { connect, ConnectedComponent } from 'react-redux';
import { ModelState } from '../../../components/store/model-state';
import { ApollonView } from '../../../services/editor/editor-types';
import { ThemedRectContrast } from '../../../components/theme/themedComponents';

type OwnProps = {
  element: UMLSequenceActivation;
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

const UMLSequenceActivationC: FunctionComponent<Props> = ({ element, interactive, interactable, theme }) => {
  return (
    <g>
      <ThemedRectContrast
        width={element.bounds.width}
        height={element.bounds.height}
        strokeColor="var(--apollon-primary-contrast)"
        fillColor="var(--apollon-background)"
        fillOpacity={1}
      />
    </g>
  );
};

export const UMLSequenceActivationComponent = enhance(UMLSequenceActivationC);
