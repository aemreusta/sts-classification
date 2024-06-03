import { PieChart } from "@mui/x-charts";

function RingChart({ data, colors }) {
  return (
    <PieChart
      colors={colors}
      series={[
        {
          data: data,
          innerRadius: 32,
          paddingAngle: 0,
          cornerRadius: 4,

          highlightScope: { faded: "global", highlighted: "item" },
        },
      ]}
      width={300}
      height={150}
    />
  );
}

export default RingChart;
