import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CountryChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart 
        data={data.slice(0, 10)} 
        layout="vertical"
        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis 
          type="number"
          stroke="rgba(255, 255, 255, 0.7)"
          fontSize={12}
        />
        <YAxis 
          dataKey="name" 
          type="category"
          stroke="rgba(255, 255, 255, 0.7)"
          fontSize={11}
          width={150}
          tick={{ fill: 'rgba(255, 255, 255, 0.9)' }}
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
        <Bar 
          dataKey="value" 
          fill="#e50914"
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CountryChart;

