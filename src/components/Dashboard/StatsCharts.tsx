import Box from "@mui/material/Box";
import { BarPlot } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";

type Todo = {
  id: string;
  todo: string;
  completed: boolean;
  addDate: Date;
  completedDate: Date;
};

interface AxisBarLineProps {
  todos: Todo[];
}

const dayOfWeek = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

const convertDates = (todoArray: Todo[]) => {
  const map = new Map();

  todoArray?.forEach((todo) => {
    const addDate = new Date(todo?.addDate);
    const completedDate = todo?.completedDate
      ? new Date(todo?.completedDate)
      : null;
    const addDay = dayOfWeek[addDate.getDay() as keyof typeof dayOfWeek];

    if (!map.has(addDay)) {
      map.set(addDay, {
        createdTasks: 0,
        completedTasks: 0,
      });
    }

    const getMap = map.get(addDay);
    getMap.createdTasks += 1;

    if (todo?.completed && completedDate) {
      const completedDay =
        dayOfWeek[completedDate.getDay() as keyof typeof dayOfWeek];
      if (!map.has(completedDay)) {
        map.set(completedDay, {
          completedTasks: 0,
          createdTasks: 0,
        });
      }
      const getCompletedDay = map.get(completedDay);
      getCompletedDay.completedTasks += 1;
    }
  });

  return Array.from(map, ([day, count]) => ({
    day,
    createdTasks: count.createdTasks,
    completedTasks: count.completedTasks,
  }));
};

//credit to MUI material
export default function StatsChart({ todos }: AxisBarLineProps) {
  const todoData = convertDates(todos);

  const days = todoData?.map((val) => val?.day);
  const createdTasks = todoData?.map((val) => val?.createdTasks);
  const completedTasks = todoData?.map((val) => val?.completedTasks);

  console.log("days", days);
  console.log("created tasks", createdTasks);
  console.log("completed tasks", completedTasks);

  return (
    <Box sx={{ width: "100%", maxWidth: 600 }}>
      <ResponsiveChartContainer
        xAxis={[
          {
            scaleType: "band",
            data: days,
            id: "days",
            label: "Days of the Week",
          },
        ]}
        yAxis={[{ id: "createdTasks" }, { id: "completedTasks" }]}
        series={[
          {
            type: "line",
            id: "createdTasks",
            yAxisId: "createdTasks",
            data: createdTasks,
          },
          {
            type: "bar",
            id: "completedTasks",
            yAxisId: "completedTasks",
            data: completedTasks,
            color: "#dfeaf5",
          },
        ]}
        height={400}
        margin={{ left: 70, right: 70 }}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-25px, 0)",
          },
          [`.${axisClasses.right} .${axisClasses.label}`]: {
            transform: "translate(30px, 0)",
          },
        }}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis
          axisId="days"
          label="Days of the week"
          labelstyle={{ fontSize: 18 }}
        />
        <ChartsYAxis axisId="createdTasks" label="Created Tasks" />
        <ChartsYAxis
          labelStyle={{ stroke: "none", fill: "#fbefef" }}
          axisId="completedTasks"
          position="right"
          label="completed tasks"
        />
      </ResponsiveChartContainer>
    </Box>
  );
}
