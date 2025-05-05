import React from 'react';
import styles from './DataTable.module.css';
import { TableRow } from '../../types/data';

interface DataTableProps {
  data: TableRow[];
  headers: string[];
  onRowSelect: (row: TableRow) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, headers, onRowSelect }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>title</th>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => onRowSelect(row)}>
            <td>{row.title}</td>
            {row.values.map((value, valueIndex) => (
              <td key={valueIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;