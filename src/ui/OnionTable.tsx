import * as React from 'react';
import { Button, Table } from 'reactstrap';
import { ParsedOnion } from '../types';

export interface OnionTableProps {
  onions: {[hostname:string]:ParsedOnion}
}

export const OnionTable: React.FunctionComponent<OnionTableProps> = props => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Hostname</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.onions).sort().map(hostname => (
          <tr key={props.onions[hostname].hostname}>
            <td>{props.onions[hostname].hostname}</td>
            <td>{props.onions[hostname].time.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default OnionTable;
