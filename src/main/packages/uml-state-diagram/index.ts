export const StateElementType = {
  State: 'State',
  StateFinalNode: 'StateFinalNode',
  StateForkNode: 'StateForkNode',
  StateForkNodeHorizontal: 'StateForkNodeHorizontal',
  StateInitialNode: 'StateInitialNode',
  StateMergeNode: 'StateMergeNode',
} as const;

export const StateRelationshipType = {
  StateControlFlow: 'StateControlFlow',
} as const;
