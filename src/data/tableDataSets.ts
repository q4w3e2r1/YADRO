import { TableRow } from '../types/data';

export const dataSets: { [key: string]: TableRow[] } = {
  set1: [
    { title: 'abc', values: [1, 2, 3, 4, 5, 6, 7] },
    { title: 'cde', values: [2, 4, 6, 8, 10, 12, 14] },
    { title: 'fgh', values: [3, 6, 9, 12, 15, 18, 21] },
    { title: 'ijk', values: [4, 8, 12, 16, 20, 24, 28] },
    { title: 'xyz', values: [5, 10, 15, 20, 25, 30, 35] }
  ],
  set2: [
    { title: 'row1', values: [10, 20, 30, 40, 50, 60, 70] },
    { title: 'row2', values: [15, 25, 35, 45, 55, 65, 75] },
    { title: 'row3', values: [5, 15, 25, 35, 45, 55, 65] },
    { title: 'row4', values: [8, 18, 28, 38, 48, 58, 68] }
  ],
  set3: [
    { title: 'data1', values: [100, 150, 200, 250, 300, 350, 400] },
    { title: 'data2', values: [120, 170, 220, 270, 320, 370, 420] },
    { title: 'data3', values: [90, 140, 190, 240, 290, 340, 390] },
    { title: 'data4', values: [80, 130, 180, 230, 280, 330, 380] },
    { title: 'data5', values: [110, 160, 210, 260, 310, 360, 410] }
  ]
}; 