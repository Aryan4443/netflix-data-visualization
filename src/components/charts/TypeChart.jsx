import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#e50914', '#b20710', '#8b0000', '#ff4444', '#ff6666'];

const TypeChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(229, 9, 20, 0.5)',
            borderRadius: '8px',
            color: '#ffffff'
          }}
        />
        <Legend 
          wrapperStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TypeChart;

