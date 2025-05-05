# Тестовое задание YADRO 2025
Выполнил: Зарафутдинов А.М.

Поскольку в задании указано уделить тестированию особое внимание, я решил попутно с описанием как бы я реализовал функцианальность приложения, реализовать само приложение. Таким образом при создании тестов я буду опираться не на какие-то выдуманные компоненты, а на конкретную фукнциональнось и поведение.

## Теоретическая часть

1. Почему современные веб-приложения часто реализовывают с разделением на backend и frontend части? За что отвечает backend,  а за что frontend ?

Ответ:

2. Почему современный frontend часто реализовывают с помощью фрейморков (angular, react, vue.js) ? Почему часто на фронтенде используют стейт-менеджеры (redux, mobx) ? 

Ответ:

3. Зачем в веб приложениях использовать дизайн систему и компоненты? Почему бы не использовать просто  CSS?

Ответ:

4. Зачем придумали разные виды тестирования: юнит-тестирование, интеграционное тестирование, e2e тестирование? В чем разница и какое когда использовать?
## Практическая часть

**Условие:** *Представь, что тебе нужно разработать простой фронтенд для веб-приложения, состоящего из одной страницы. Эта страница разделена на три блока:*
1. *Блок с кнопками: "Получить данные", "Очистить данные", "Сохранить в CSV".*
2. *График: Отображает данные выбранной строки таблицы в виде столбчатой диаграммы (bar-chart).*
3. *Таблица: Хранит данные, полученные с сервера. По умолчанию выделена строка с наибольшим числовым значением. Данные из таблицы можно сохранить в CSV.*

*Твоя задача — описать на псевдокоде, как бы ты реализовал(-а) эту функциональность с использованием React и Redux. Также опиши, как бы ты организовал(-а) тестирование (юнит, интеграционное и E2E).*

### **Решение**

### 1. Реализация интерфейса ключевых компонент
Как написано в условии задания, всё приложение можно поделить на 3 основных основных части:

1.1 **Блок с кнопками** состоит из 3 одинаковых кнопок, единственное отличие это событие, которое должно произойти при нажатия на кнопку и как вариант визуал самой кнопки. В такой ситуации, чтобы не дублировать одинаковый шаблонный код для 3 кнопок, реализуем 1 компонент `Button.component.tsx`, который будет принимать в props: скрипт при нажатии, название, класс CSS.
Реализация компонента будет выглядеть так:
```tsx

type ButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`base-button ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;

```

А его использование в компоненте `ButtonBar.component.tsx` может выглядеть так:
```tsx
const ButtonBar: React.FC<ButtonBarProps> = ({
  onSave,
  onFetch,
  onClear,
}) => {
  return (
    <div className={styles['data-controls']}>
      <Button 
        label="fetch" 
        onClick={onFetch} 
        className="fetch-button"
      />
      <Button
        label="clear"
        onClick={onClear}
        className="clear-button"
      />
        <Button
          type
          label="save"
          onClick={onSave}
          className="save-button"
        />
    </div>
  );
};
```


1.2 **График bar-chat** представялет из себя визуальное отобажение значений из таблицы выбраной строке. Построение различных графиков и диаграмм по заданным значением задача довольно повседневная, следовательно должны существовать готовые решения для таких задач. Я решил использовать библиотеку Recharts, поскольку она предоставляет необходимые мне возможности пострение графиков.

Создадим компонент `BarChat.module.css` с использованием уже готовых компонент для графика библиотеки Recharts:
``` jsx

<div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
```

Данны для таблцы и графка на данный момент храним прямо в компоненте, чуть дальше добавим Redux. `DataVisualization.tsx` компонент, содержаший данные для таблцы и графика, соотвественно в нём и буду находится эти компоненты.

```jsx
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
```
1.3 **Таблица** значений, которые мы получаем/храним. Состоит из заголовков, и строк формируемых на основании переданным данных.
Пример реализации из `DataTable.tsx`:
```jsx
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
```
Все компоненты готовы, далше следует внедрение Redux для хранения табличных данных.

### 2. Redux
  В нашем приложении есть данные, которые используются в таблице и графике. Воспользуемся Redux для создания глобального хранилише приложения.

  2.1 Создадим store `store.ts`:
  ```jsx
  export const store = configureStore({
    reducer: {
      data: dataReducer,
    },
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch; 
  ```

  2.2 Создадим slice с начальным состоянием и reducers `dataSlice.ts`:
  ```jsx
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
    }
  }
});
  ```

  2.3 Типизируем хуки `hools.ts`:
  ```jsx
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
  ```

  2.4 Теперь если нам понадобится использовать и изменять данные, мы будем это делать через store `DataTable.tsx`:
  ```jsx
const DataTable: React.FC = () => {

  const dispatch = useAppDispatch();
  const { headers, tableData, selectedRow } = useAppSelector((state) => state.data);
  

  const handleRowSelect = (row: TableRow) => {
    dispatch(setSelectedRow(row));
  };
  ```

### 3. Работа кнопок

3.1 Кнопка **fetch** должна получать новые данные с сервера. В нашем случае создадим отдельный файл, который будет хранить экземпляры данных. Создадим новый reducer, который будет отвечать за изменения данных (в моём случае он будет просто брать следущую запись из файла, однако ничего не мешает потом заменить это на запрос к предоставленному API)

Reducer changeDataSet в `dataSlice.ts`
```jsx
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
    }
```

При смене данных, по умолчанию в таблце должна выбираться строка с наибольшим числовым значением. Раньше эта логика находилась прямо в компоненте `DataTable`, однако сейчас с добавлением store в проект это можно упростить.

Новое начальное состояне и функция findRowWithMaxValue `dataSlice.ts`:
```jsx
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
```

