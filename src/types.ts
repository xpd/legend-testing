import { Edge, Node } from '../../store/store$';

export type Side = 'RIGHT' | 'LEFT' | 'BOTTOM' | 'TOP';
export type Position = { x: number; y: number; };
export type Dimensions = { width: number; height: number; };
export type Direction = 'VERTICAL' | 'HORIZONTAL';
export type Line = { start: Position; end: Position; };
export type NodeId = string;
export type EdgeId = string;

export interface Graph {
	nodes: Node[];
	edges: Edge[];
}

