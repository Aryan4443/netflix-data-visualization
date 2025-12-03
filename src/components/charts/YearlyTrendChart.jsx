import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const YearlyTrendChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis 
          dataKey="year" 
          stroke="rgba(255, 255, 255, 0.7)"
          fontSize={12}
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
            color: '#ffffff',
            maxWidth: '300px'
          }}
          formatter={(value, name, props) => {
            const titles = props.payload.titles || [];
            const titleList = titles.length > 0 
              ? `\n\nTitles: ${titles.slice(0, 5).join(', ')}${titles.length > 5 ? ` (+${titles.length - 5} more)` : ''}`
              : '';
            return [`${value} titles${titleList}`, name];
          }}
        />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke="#e50914" 
          strokeWidth={3}
          dot={{ fill: '#e50914', r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyTrendChart;

