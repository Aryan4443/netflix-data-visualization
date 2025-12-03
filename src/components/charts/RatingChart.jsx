import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RatingChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis 
          dataKey="name" 
          stroke="rgba(255, 255, 255, 0.7)"
          fontSize={11}
        />
        <YAxis 
          stroke="rgba(255, 255, 255, 0.7)"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(229, 9, 20, 0.5)',
            borderRadius: '8px',
            color: '#ffffff'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="#e50914"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RatingChart;

