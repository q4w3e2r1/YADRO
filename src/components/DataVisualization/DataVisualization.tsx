import React, { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import CustomBarChart from '../BarChat/BarChat';
import { TableRow, ChartData } from '../../types/data';
import styles from './DataVisualization.module.css';

const DataVisualization: React.FC = () => {
  const headers = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7'];
  
  const initialData: TableRow[] = [
    { title: 'abc', values: [1, 2, 3, 4, 5, 6, 7] },
    { title: 'cde', values: [2, 4, 6, 8, 10, 12, 14] },
    { title: 'fgh', values: [3, 6, 9, 12, 15, 18, 21] },
    { title: 'ijk', values: [4, 8, 12, 16, 20, 24, 28] },
    { title: 'xyz', values: [5, 10, 15, 20, 25, 30, 35] }
  ];

  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);

  const handleRowSelect = (row: TableRow) => {
    setSelectedRow(row);
  };

  const prepareChartData = (row: TableRow): ChartData[] => {
    return row.values.map((value, index) => ({
      name: headers[index],
      value: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartSection}>
        {selectedRow && (
          <CustomBarChart data={prepareChartData(selectedRow)} />
        )}
      </div>
      <div className={styles.tableSection}>
        <DataTable
          data={initialData}
          headers={headers}
          onRowSelect={handleRowSelect}
        />
      </div>
    </div>
  );
};

export default DataVisualization;