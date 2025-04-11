export type UMLDiagramType = keyof typeof UMLDiagramType;

export const UMLDiagramType = {
  ClassDiagram: 'ClassDiagram',
  ObjectDiagram: 'ObjectDiagram',
  ActivityDiagram: 'ActivityDiagram',
  StateDiagram: 'StateDiagram',
  UseCaseDiagram: 'UseCaseDiagram',
  CommunicationDiagram: 'CommunicationDiagram',
  ComponentDiagram: 'ComponentDiagram',
  DeploymentDiagram: 'DeploymentDiagram',
  PetriNet: 'PetriNet',
  ReachabilityGraph: 'ReachabilityGraph',
  SyntaxTree: 'SyntaxTree',
  Flowchart: 'Flowchart',
  BPMN: 'BPMN',
  // SequenceDiagram: 'SequenceDiagram', //TODO: 添加顺序图
} as const;
