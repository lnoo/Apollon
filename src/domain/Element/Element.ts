import uuid from './../utils/uuid';
import Boundary from './../geo/Boundary';

abstract class Element {
  static isHoverable = true;
  static isSelectable = true;
  static isMovable = true;
  static isResizable: 'BOTH' | 'WIDTH' | 'HEIGHT' | 'NONE' = 'BOTH';
  static isConnectable = true;
  static isDroppable = false;
  static isEditable = true;
  static isInteractable = true;

  readonly id: string = uuid();
  readonly base: string = 'Element';
  abstract readonly kind: string;
  bounds: Boundary = new Boundary(0, 0, 200, 100);

  hovered: boolean = false;
  selected: boolean = false;
  interactive: boolean = false;

  owner: string | null = null;

  constructor(public name: string) {}
}

export default Element;