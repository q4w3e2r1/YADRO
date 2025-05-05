import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableRow } from '../types/data';
import { dataSets } from '../data/tableDataSets';

interface DataState {
  headers: string[];
  tableData: TableRow[];
  selectedRow: TableRow | null;
  currentDataSet: string;
}

const findRowWithMaxValue = (data: TableRow[]): TableRow => {
  return data.reduce((max, current) => {
    const currentMaxValue = Math.max(...current.values.map(Number));
    const maxValue = Math.max(...max.values.map(Number));
    return currentMaxValue > maxValue ? current : max;
  }, data[0]);
};

const initialState: DataState = {
    headers: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7'],
    tableData: dataSets.set1,
    selectedRow: findRowWithMaxValue(dataSets.set1),
    currentDataSet: 'set1'
  };

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSelectedRow: (state, action: PayloadAction<TableRow>) => {
      state.selectedRow = action.payload;
    },
    setTableData: (state, action: PayloadAction<TableRow[]>) => {
      state.tableData = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string[]>) => {
      state.headers = action.payload;
    },
    changeDataSet: (state) => {
      const sets = Object.keys(dataSets);
      const currentIndex = sets.indexOf(state.currentDataSet);
      const nextIndex = (currentIndex + 1) % sets.length;
      const nextSet = sets[nextIndex];
      
      state.currentDataSet = nextSet;
      state.tableData = dataSets[nextSet];
      
      if (state.tableData.length > 0) {
        state.selectedRow = findRowWithMaxValue(state.tableData);
      }
    },
    clearData: (state) => {
      state.tableData = [];
      state.selectedRow = null;
    }
  }
});

export const { setSelectedRow, setTableData, setHeaders, changeDataSet, clearData } = dataSlice.actions;
export default dataSlice.reducer; 