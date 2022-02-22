import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export default class Chart extends PureComponent {
  
  render() {
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 20,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fill: 'white' }} stroke="#ffff" />
          <YAxis tick={{ fill: 'white' }} stroke="#ffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="max" stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="min" stroke="#82ca9d" strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
