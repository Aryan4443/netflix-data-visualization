import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GenreChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={80}
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
        <Bar 
          dataKey="value" 
          fill="#e50914"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GenreChart;

