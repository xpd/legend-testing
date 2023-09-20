import { useObservable, useObserveEffect } from "@legendapp/state/react";
import { BgGrid } from "~/components/BgGrid";
import { Container } from "~/components/Container";
import ErrorBoundary from "~/components/ErrorOutput";
import type { Direction } from "./types";

function Sprite({
  sprite,
  row,
  col,
  size = 16,
}: {
  sprite: string;
  row: number;
  col: number;
  size?: number;
}) {
  const spriteStore$ = useObservable({
    direction: "DOWN" as Direction,
    isActive: true,
    row: 0,
    col: 0,
    frame: 1,
    position: { gx: 5, gy: 5 },
  });

  useObserveEffect(() => {
    const interval =
      spriteStore$.isActive.get() &&
      setInterval(() => {
        const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
        const randomDirection =
          directions[Math.floor(Math.random() * directions.length)];
        spriteStore$.direction.set(randomDirection);
        switch (randomDirection) {
          case "UP":
            spriteStore$.position.set((prev) => ({
              gx: prev.gx,
              gy: prev.gy - 1,
            }));
            break;
          case "DOWN":
            spriteStore$.position.set((prev) => ({
              gx: prev.gx,
              gy: prev.gy + 1,
            }));
            break;
          case "LEFT":
            spriteStore$.position.set((prev) => ({
              gx: prev.gx - 1,
              gy: prev.gy,
            }));
            break;
          case "RIGHT":
            spriteStore$.position.set((prev) => ({
              gx: prev.gx + 1,
              gy: prev.gy,
            }));
            break;
        }
        spriteStore$.frame.set((prevFrame) => (prevFrame + 1) % 3);
      }, 1000);
    return () =>
      interval && clearInterval(interval) && spriteStore$.frame.set(1);
  });

  const x =
    spriteStore$.position.use().gx * size + spriteStore$.frame.use() * size;
  const y = spriteStore$.position.use().gy * size;
  return (
    <div
      style={{
        backgroundImage: `url(/img/sprite/${sprite})`,
        backgroundPosition: `-${x}px -${y}px`,
        width: size,
        height: size,
        top: spriteStore$.position.gy.use() * size,
        left: spriteStore$.position.gx.use() * size,
      }}
      className="absolute transition-align-middle ease-linear duration-1000"
    />
  );
}

// Route Components

function Observability() {
  return (
    <div className="text-xs overflow-scroll">
      <ErrorBoundary>{/* <Json value={store$.use()} /> */}</ErrorBoundary>
    </div>
  );
}

// experiement with reactive store
export default function App() {
  return (
    <Container>
      <div className="flex flex w-full h-full">
        <div className="flex-1 overflow-hidden relative">
          <Sprite sprite="05-devout.png" row={0} col={0} />
          <BgGrid />
        </div>
        <div className="flex-none w-[350px] overflow-hidden">
          <Observability />
        </div>
      </div>
    </Container>
  );
}
