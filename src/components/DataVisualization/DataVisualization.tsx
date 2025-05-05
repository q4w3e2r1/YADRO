import React from 'react';
import DataTable from '../DataTable/DataTable';
import CustomBarChart from '../BarChat/BarChat';
import { TableRow, ChartData } from '../../types/data';
import styles from './DataVisualization.module.css';
import { useAppSelector } from '../../store/hooks';

const DataVisualization: React.FC = () => {
  const { headers, selectedRow } = useAppSelector((state) => state.data);


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
        <DataTable />
      </div>
    </div>
  );
};

export default DataVisualization;