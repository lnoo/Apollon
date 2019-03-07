import React, { Component, ComponentClass } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { State as ReduxState } from './../Store';
import Element, { ElementRepository } from './../../domain/Element';
import ElementComponent, { OwnProps } from './ElementComponent';
import { withCanvas, CanvasContext } from './../Canvas';

const moveable = (WrappedComponent: typeof ElementComponent) => {
  class Moveable extends Component<Props, State> {
    state: State = {
      movable: false,
      moving: false,
      offset: { x: 0, y: 0 },
    };

    private move = (x: number, y: number) => {
      const { bounds } = this.props.element;
      if (bounds.x === x && bounds.y === y) return;

      this.props.move(null, {
        x: x - this.props.element.bounds.x,
        y: y - this.props.element.bounds.y,
      });
    };

    private onMouseDown = (event: MouseEvent) => {
      if (event.which !== 1) return;
      const target = event.currentTarget as HTMLElement;
      window.setTimeout(() => {
        if (!this.props.element.selected) return;
        const rect = target.getBoundingClientRect();
        const offset = this.props.coordinateSystem.offset();
        offset.x += event.clientX - rect.left;
        offset.y += event.clientY - rect.top;

        let ownerID = this.props.element.owner;
        while (ownerID) {
          const owner = this.props.getById(ownerID);
          offset.x += owner.bounds.x;
          offset.y += owner.bounds.y;
          ownerID = owner.owner;
        }

        this.setState({ movable: true, offset });
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
      }, 0);
    };

    private onMouseMove = (event: MouseEvent) => {
      if (!this.state.movable) return;
      const x = event.clientX - this.state.offset.x;
      const y = event.clientY - this.state.offset.y;

      if (!this.state.moving) {
        const { bounds } = this.props.element;
        if (Math.abs(bounds.x - x) > 5 || Math.abs(bounds.y - y) > 5) {
          this.setState({ moving: true });
        }
      } else {
        const point = this.props.coordinateSystem.screenToPoint(x, y);
        this.move(point.x, point.y);
      }
    };

    private onMouseUp = () => {
      this.setState({ movable: false, moving: false, offset: { x: 0, y: 0 } });
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    };

    componentDidMount() {
      const node = findDOMNode(this) as HTMLElement;
      const child = node.firstChild as HTMLElement;
      child.addEventListener('mousedown', this.onMouseDown);
    }

    componentWillUnmount() {
      const node = findDOMNode(this) as HTMLElement;
      const child = node.firstChild as HTMLElement;
      child.removeEventListener('mousedown', this.onMouseDown);
    }

    render() {
      return <WrappedComponent {...this.props} moving={this.state.moving} />;
    }
  }

  interface StateProps {
    getById: (id: string) => Element;
  }

  interface DispatchProps {
    move: typeof ElementRepository.move;
  }

  type Props = OwnProps & StateProps & DispatchProps & CanvasContext;

  interface State {
    movable: boolean;
    moving: boolean;
    offset: { x: number; y: number };
  }

  return compose<ComponentClass<OwnProps>>(
    withCanvas,
    connect<StateProps, DispatchProps, OwnProps, ReduxState>(
      state => ({ getById: ElementRepository.getById(state.elements) }),
      { move: ElementRepository.move }
    )
  )(Moveable);
};

export default moveable;