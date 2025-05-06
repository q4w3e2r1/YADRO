import dataReducer, { 
  setSelectedRow,
  clearData, 
  changeDataSet 
} from '../../store/dataSlice';
import { dataSets } from '../../data/tableDataSets';

describe('Data Reducer', () => {
  const initialState = {
    headers: ['x1', 'x2', 'x3'],
    tableData: [],
    selectedRow: null,
    currentDataSet: 'set1'
  };

  it('should handle initial state', () => {
    expect(dataReducer(undefined, { type: 'unknown' })).toEqual({
      headers: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7'],
      tableData: dataSets.set1,
      selectedRow: expect.any(Object),
      currentDataSet: 'set1'
    });
  });

  it('should handle clearData', () => {
    const actual = dataReducer(initialState, clearData());
    expect(actual.tableData).toEqual([]);
    expect(actual.selectedRow).toBeNull();
    expect(actual.headers).toEqual([]);
  });

  it('should handle setSelectedRow', () => {
    const row = { title: 'test', values: [1, 2, 3] };
    const actual = dataReducer(initialState, setSelectedRow(row));
    expect(actual.selectedRow).toEqual(row);
  });

  it('should handle changeDataSet', () => {
    const state = {
      ...initialState,
      currentDataSet: 'set1',
      tableData: dataSets.set1
    };
    const actual = dataReducer(state, changeDataSet());
    expect(actual.currentDataSet).toBe('set2');
    expect(actual.tableData).toEqual(dataSets.set2);
    expect(actual.selectedRow).toBeTruthy();
  });
}); 