import { Dimensions, Line, Position, Side } from "~/types";

const getCenter = ({ x, y }: Position, { width, height }: Dimensions) => ({ x: x + width / 2, y: y + height / 2 });
const getDistance = (point1: Position, point2: Position) => Math.hypot(point1.x - point2.x, point1.y - point2.y);
const getClosestSide = (nodePosition: Position, nodeDimensions: Dimensions, targetPosition: Position): Side => {
  const nodeCenter = getCenter(nodePosition, nodeDimensions);
  const targetCenter = getCenter(targetPosition, nodeDimensions);

  const dx = Math.abs(nodeCenter.x - targetCenter.x);
  const dy = Math.abs(nodeCenter.y - targetCenter.y);

  return dx > dy ? (nodeCenter.x > targetCenter.x ? 'LEFT' : 'RIGHT') :
    (nodeCenter.y > targetCenter.y ? 'TOP' : 'BOTTOM');
};

const getSideCenter = (nodePosition: Position, nodeDimensions: Dimensions, side: Side): Position => {
  const { x, y } = nodePosition;
  const { width, height } = nodeDimensions;

  return side === 'RIGHT' ? { x: x + width / 2, y: y } :
    side === 'LEFT' ? { x: x - width / 2, y: y } :
      side === 'BOTTOM' ? { x: x, y: y + height / 2 } :
        side === 'TOP' ? { x: x, y: y - height / 2 } :
          { x: x, y: y };
};
const getPoint = (nodePosition: Position, nodeDimensions: Dimensions, targetPosition: Position): Position => getSideCenter(nodePosition, nodeDimensions, getClosestSide(nodePosition, nodeDimensions, targetPosition));
const shortenLine = (point1: Position, point2: Position, shortenBy: number): Position => {
  const distance = getDistance(point1, point2);
  const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
  const shortenDistance = Math.min(shortenBy, distance - 1);
  return {
    x: point1.x + shortenDistance * Math.cos(angle),
    y: point1.y + shortenDistance * Math.sin(angle)
  };
};

// todo: this does the same calculations for the same source many times
export const getEdgeCoordinates = (
  sourcePosition: Position,
  sourceDimensions: Dimensions,
  targetPosition: Position,
  targetDimensions: Dimensions,
  side: 'AUTO' | 'HORIZONTAL' | 'VERTICAL' = 'HORIZONTAL'
): Line => {

  const sourceCenter = side === 'HORIZONTAL' ? getSideCenter(sourcePosition, sourceDimensions, 'RIGHT') :
    side === 'VERTICAL' ? getSideCenter(sourcePosition, sourceDimensions, 'TOP') :
      getPoint(sourcePosition, sourceDimensions, targetPosition);

  const targetCenter = side === 'HORIZONTAL' ? getSideCenter(targetPosition, targetDimensions, 'LEFT') :
    side === 'VERTICAL' ? getSideCenter(targetPosition, targetDimensions, 'BOTTOM') :
      getPoint(targetPosition, targetDimensions, sourcePosition);

  const shortenedSourceCenter = side === 'AUTO' ? shortenLine(sourceCenter, targetCenter, 15) : sourceCenter;
  const shortenedTargetCenter = side === 'AUTO' ? shortenLine(targetCenter, sourceCenter, 15) : targetCenter;

  return {
    start: shortenedSourceCenter,
    end: shortenedTargetCenter
  };
};
