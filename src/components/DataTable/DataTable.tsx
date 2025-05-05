import React, { useEffect } from 'react';
import styles from './DataTable.module.css';
import { TableRow } from '../../types/data';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setSelectedRow } from '../../store/dataSlice';

const DataTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { headers, tableData, selectedRow } = useAppSelector((state) => state.data);

  const handleRowSelect = (row: TableRow) => {
    dispatch(setSelectedRow(row));
  };

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
        {tableData.map((row, index) => (
          <tr 
            key={index} 
            onClick={() => handleRowSelect(row)}
            className={selectedRow?.title === row.title ? styles.selectedRow : ''}
          >
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