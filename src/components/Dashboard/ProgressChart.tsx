import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

interface ProgressProps {
  totalTodos: number;
  completedTodos: number;
}

const TodoProgressGuage = ({ totalTodos, completedTodos }: ProgressProps) => {
  return (
    <Gauge
      value={completedTodos}
      valueMax={totalTodos}
      startAngle={-110}
      endAngle={110}
      sx={{
        width: 200,
        height: 200,
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 41,
          transform: "translate(1px, 0px)",
        },
      }}
      text={`${completedTodos}/${totalTodos}`}
    />
  );
};

export default TodoProgressGuage;
