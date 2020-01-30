import { Component, Input, Output, EventEmitter } from "@angular/core";
import { EcuTekBaseComponent } from "../../EcuTekComponents/EcuTekBase/ecutek-base.component";

@Component({
  selector: "ecutek-grid",
  templateUrl: "./ecutek-grid.component.html",
  styleUrls: ["./ecutek-grid.component.css"]
})
export class EcuTekGridComponent extends EcuTekBaseComponent {
  private _DataSource: DataSource;
  Columns: Column[];
  Rows: Row[];

  @Input() HeadingText: string;
  @Input() IsEditAllowed: boolean;
  @Input() IsDeleteAllowed: boolean;
  @Input() IsFilterShow: boolean;
  @Input() BooleanPresenationValue: { trueValue: "Yes"; falseValue: "No" };
  @Input() DatePresentationValue: string;

  @Output() PerformatAction = new EventEmitter<EcuTekGridEventArgs>();

  private ColumnIndex: number;
  private FilterColumns: Column[];

  ActionButtons: Action[];

  constructor() {
    super();

    this._DataSource = null;
    this.Rows = [];
    this.Columns = [];

    this.HeadingText = "Grid";
    this.IsEditAllowed = true;
    this.IsDeleteAllowed = true;
    this.IsFilterShow = false;
    this.BooleanPresenationValue = { trueValue: "Yes", falseValue: "No" };
    this.DatePresentationValue = "dd/MM/yyyy HH:mm:ss";
    this.ColumnIndex = 0;
    this.FilterColumns = [];
    this.ActionButtons = [];

    this.ActionButtons.push(new Action("buttonFileDownload", "Download File"))
  }

  @Input()
  set DataSource(list: any[]) {
    this._DataSource = new DataSource(list);
    this.BuildTable();
  }

  private BuildTable() {
    let list: ListItem[] = this._DataSource.List;
    this.Rows = [];
    this.Columns = [];
    let rowIndex = 0;

    if (list.length > 0) {
      let colKeys = Object.keys(list[0].Obj);
      for (let key in colKeys) {
        let column: Column = new Column(
          key,
          colKeys[key],
          Object.prototype.toString.call(list[0].Obj[colKeys[key]]) ==
          "[object Date]"
            ? "datetime"
            : typeof list[0].Obj[colKeys[key]],
          null,
          null,
          -1
        );

        let param: any = {};
        if (column.DataType == "boolean") {
          param.trueValue = this.BooleanPresenationValue.trueValue;
          param.falseValue = this.BooleanPresenationValue.falseValue;
        } else if (column.DataType == "datetime") {
          param.dateFormatValue = this.DatePresentationValue;
        } else if (column.DataType == "string") {
          param.stringFormatValue = null;
        }

        column.Format = FormatterFactory.GetFormatterInstance(
          column.DataType,
          param
        );
        this.Columns.push(column);
      }

      for (let x in list) {
        let cells: Cell[] = [];
        for (let y in this.Columns) {
          let cell: Cell = new Cell(
            y,
            list[x].Obj[this.Columns[y].ColumnName],
            list[x].Obj[this.Columns[y].ColumnName]
          );
          cells.push(cell);
        }
        let row: Row = new Row(
          rowIndex.toString(),
          true,
          false,
          parseInt(x) % 2 == 0 ? true : false,
          cells
        );
        row.RowKey = list[x].Key;
        this.Rows.push(row);
        rowIndex++;
      }
    }
  }

  private DisplayValue(value: any, cellIndex: string) {
    let column: Column = this.Columns[cellIndex];

    debugger;

    let formatter: Formatter = column.Format;
    formatter.Value = value;
    return formatter.DisplayValue();
  }

  private OnEditClick(event?: MouseEvent) {
    let target = <HTMLElement>event.target;
    let rowId = target.attributes["rowid"].value;
    let row: Row = this.Rows[rowId];

    let objItem: ListItem = this._DataSource.List.find(function(item) {
      return item.Key == row.RowKey;
    });

    if (objItem != undefined) {
      let eventArgs: EcuTekGridEventArgs = new EcuTekGridEventArgs(
        this,
        "Edit",
        objItem
      );
      this.PerformatAction.emit(eventArgs);
    }
    row.IsEditMode = true;
  }

  private OnDeleteClick(event?: MouseEvent) {
    let target = <HTMLElement>event.target;
    let rowId = target.attributes["rowid"].value;
    let row: Row = this.Rows[rowId];

    let itemIndex: number = this._DataSource.List.findIndex(function(item) {
      if (item == null || item == undefined) return false;
      return item.Key == row.RowKey;
    });
    if (itemIndex != undefined) {
      let eventArgs: EcuTekGridEventArgs = new EcuTekGridEventArgs(
        this,
        "Delete",
        this._DataSource.List[itemIndex]
      );
      this.PerformatAction.emit(eventArgs);

      this._DataSource.List.splice(itemIndex, 1);
    }
    this.Rows.splice(rowId, 1);
    //this.BuildTable(this.DataSource.List);
  }

  private OnCancelClick(event?: MouseEvent) {
    let target = <HTMLElement>event.target;
    let rowId = target.attributes["rowid"].value;
    let row: Row = this.Rows[rowId];
    for (let x in this.Rows[rowId].Cells) {
      row.Cells[x].Value = row.Cells[x].OrignalValue;
    }

    let itemIndex: number = this._DataSource.List.findIndex(function(item) {
      if (item == null || item == undefined) return false;
      return item.Key == row.RowKey;
    });

    if (itemIndex != undefined) {
      let eventArgs: EcuTekGridEventArgs = new EcuTekGridEventArgs(
        this,
        "Cancel",
        this._DataSource.List[itemIndex]
      );

      this.PerformatAction.emit(eventArgs);
    }

    row.IsEditMode = false;
  }

  private OnSaveClick(event?: MouseEvent) {
    let target = <HTMLElement>event.target;
    let rowId = target.attributes["rowid"].value;
    let row: Row = this.Rows[rowId];
    let objItem: ListItem = this._DataSource.List.find(function(item) {
      return item.Key == row.RowKey;
    });

    if (objItem != undefined) {
      for (let x in this.Rows[rowId].Cells) {
        row.Cells[x].OrignalValue = row.Cells[x].Value;
        let column: Column = this.Columns[row.Cells[x].CellIndex];
        objItem.Obj[column.ColumnName] = row.Cells[x].Value;
      }
      let eventArgs: EcuTekGridEventArgs = new EcuTekGridEventArgs(
        this,
        "Save",
        objItem
      );
      this.PerformatAction.emit(eventArgs);
    }

    row.IsEditMode = false;
  }

  private OnActionButtonClick(event: MouseEvent) {
    let target = <HTMLElement>event.target;
    let rowId = target.attributes["rowid"].value;
    let actionName = target.attributes["actionname"].value;

    let row: Row = this.Rows[rowId];
    let objItem: ListItem = this._DataSource.List.find(function(item) {
      return item.Key == row.RowKey;
    });

    if (objItem != undefined) {
       let eventArgs: EcuTekGridEventArgs = new EcuTekGridEventArgs(
        this,
        actionName,
        objItem
      );
      this.PerformatAction.emit(eventArgs);
    }
  }

  SortByAscendingOrderClick() {
    this.SoryBy(this.ColumnIndex, true);
  }

  SortByDescendingOrderClick() {
    this.SoryBy(this.ColumnIndex, false);
  }

  RefreshClick() {
    this.BuildTable(this.DataSource.List);
  }

  SoryBy(colIndex: number, isAcending: boolean) {
    let column: Column = this.Columns[colIndex];

    this.DataSource.List.sort(function(a, b) {
      if (typeof a.Obj[column.ColumnName] == "string") {
        let x = a.Obj[column.ColumnName].toLowerCase();
        let y = b.Obj[column.ColumnName].toLowerCase();

        if (isAcending) {
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
        } else {
          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
        }
        return 0;
      } else {
        if (isAcending) {
          if (a.Obj[column.ColumnName] < b.Obj[column.ColumnName]) {
            return -1;
          }
          if (a.Obj[column.ColumnName] > b.Obj[column.ColumnName]) {
            return 1;
          }
        } else {
          if (a.Obj[column.ColumnName] > b.Obj[column.ColumnName]) {
            return -1;
          }
          if (a.Obj[column.ColumnName] < b.Obj[column.ColumnName]) {
            return 1;
          }
        }
        return 0;
      }
    });

    this.BuildTable(this.DataSource.List);
  }

  private ClearFilterAll() {
    this.FilterColumns = [];
    this.ApplyFilter();
  }

  private ClearColumnFilter(event?: MouseEvent) {
    let target = <HTMLElement>event.target;
    let colmunIndex = target.attributes["columnid"].value;
    let column: Column = this.Columns[colmunIndex];
    column.FilterValue = "";
    let filterColumnIndex = this.FilterColumns.findIndex(function(current) {
      if (current == undefined) return;
      return current.ColumnIndex == column.ColumnIndex;
    });

    if (filterColumnIndex > -1) {
      this.FilterColumns.splice(filterColumnIndex, 1);
    }

    this.ApplyFilter();
  }

  private Filter(event?: MouseEvent) {
    let target = <HTMLElement>event.target;
    let colmunIndex = target.attributes["columnid"].value;
    let column: Column = this.Columns[colmunIndex];
    column.FilterOperation = "equalto";
    let filterColumnIndex = this.FilterColumns.findIndex(function(current) {
      if (current == undefined) return;
      return current.ColumnIndex == column.ColumnIndex;
    });

    if (
      filterColumnIndex == -1 ||
      this.FilterColumns[filterColumnIndex] == undefined
    ) {
      this.FilterColumns.push(column);
    } else {
      this.FilterColumns[filterColumnIndex].FilterValue = column.FilterValue;
    }

    this.ApplyFilter();
  }

  private ApplyFilter() {
    let filterColumns: Column[] = this.FilterColumns;
    let filteredList: ListItem[] = this.DataSource.List;

    for (let item in filterColumns) {
      let column: Column = filterColumns[item];
      let filter: Filter = FilterFactory.GetFilterInstance(column.DataType);
      filteredList = filteredList.filter(function(currntValue, index) {
        if (column == undefined) return false;
        let value: any = currntValue.Obj[column.ColumnName];
        let isTrue = filter.ApplyFilter(column, value);
        return isTrue;
      });
    }

    this.BuildTable(filteredList);
  }
}

//**********************************************/

class Column {
  ColumnIndex: string;
  ColumnName: string;
  ColumnText: string;
  DataType: string;
  FilterValue: any;
  FilterOperation: string;
  SortDirection: number;
  Format: Formatter;

  constructor(
    columnIndex: string,
    columnName: string,
    dataType: string,
    filterValue: any,
    filterOperation: string,
    sortDirection: number
  ) {
    this.ColumnIndex = columnIndex;
    this.ColumnName = columnName;
    this.ColumnText = "";
    this.DataType = dataType;
    this.FilterValue = filterValue;
    this.FilterOperation = filterOperation;
    this.SortDirection = sortDirection;
    this.Format = null;
  }
}

class Cell {
  CellIndex: string;
  Value: any;
  OrignalValue: any;
  constructor(cellIndex: string, value: any, orignalValue: any) {
    this.CellIndex = cellIndex;
    this.Value = value;
    this.OrignalValue = orignalValue;
  }
}

class Row {
  RowKey: string;
  RowIndex: string;
  IsEditable: boolean;
  IsEditMode: boolean;
  IsEven: boolean;
  Cells: Cell[];

  constructor(
    rowIndex: string,
    isEditable: boolean,
    isEditMode: boolean,
    IsEven: boolean,
    cells: Cell[]
  ) {
    this.RowKey = "";
    this.RowIndex = rowIndex;
    this.IsEditable = isEditable;
    this.IsEditMode = isEditMode;
    this.IsEven = IsEven;
    this.Cells = cells;
  }
}

class DataSource {
  List: ListItem[];

  constructor(list: any[]) {
    let objInstance = this;
    this.List = list.map(function(currentValue) {
      return new ListItem(objInstance.GUID(), currentValue);
    });

    // for (let item in list) {
    //   let listItem: ListItem = new ListItem(this.GUID(), list[item]);
    //   this.List.push(listItem);
    // }
  }

  private GUID(): any {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}

class ListItem {
  Key: string;
  Obj: any;
  constructor(key: string, obj: any) {
    this.Key = key;
    this.Obj = obj;
  }
}

/************************ Formatted Classes */

abstract class Formatter {
  Value: any;
  constructor(value: any) {
    this.Value = value;
  }
  abstract DisplayValue(): string;
}

class BooleanFormatter extends Formatter {
  TrueValue: string;
  FalseValue: string;
  //constructor(value:boolean, trueValue:string, falseValue:string){
  constructor(param: any) {
    super(param.value);
    this.TrueValue = param.trueValue;
    this.FalseValue = param.falseValue;
  }
  DisplayValue(): string {
    return this.Value == true ? this.TrueValue : this.FalseValue;
  }
}

class DateFormatter extends Formatter {
  DateFormatValue: string;

  //constructor(value:Date, dateFormatValue:string){
  constructor(param: any) {
    super(param.value);
    this.DateFormatValue = param.dateFormatValue;
  }
  DisplayValue(): string {
    let date: Date = this.Value;
    let year = date.getFullYear().toString();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : (date.getMonth() + 1).toString();
    let day =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();

    let hours =
      date.getHours() + 1 < 10
        ? "0" + (date.getHours() + 1)
        : (date.getHours() + 1).toString();
    let minutes =
      date.getMinutes() + 1 < 10
        ? "0" + (date.getMinutes() + 1)
        : (date.getMinutes() + 1).toString();
    let seconds =
      date.getSeconds() + 1 < 10
        ? "0" + (date.getSeconds() + 1)
        : (date.getSeconds() + 1).toString();

    return this.DateFormatValue == null || this.DateFormatValue == ""
      ? this.Value
      : this.DateFormatValue.replace("yyyy", year)
          .replace("MM", month)
          .replace("dd", day)
          .replace("HH", hours)
          .replace("hh", hours)
          .replace("mm", minutes)
          .replace("ss", seconds);
  }
}

class StringFormatter extends Formatter {
  StringFormatValue: string;

  //constructor(value:string, stringFormatValue:string){
  constructor(param: any) {
    super(null);
    this.StringFormatValue = param.stringFormatValue;
  }
  DisplayValue(): string {
    if (this.StringFormatValue == null || this.StringFormatValue == "")
      return this.Value;
    else return this.Value.toString().replace(this.StringFormatValue);
  }
}

class NoFormatter extends Formatter {
  //constructor(value:String){
  constructor() {
    super(null);
  }
  DisplayValue(): string {
    return this.Value.toString();
  }
}

class FormatterFactory {
  static GetFormatterInstance(dataType: string, param: any): Formatter {
    if (dataType == "boolean") return new BooleanFormatter(param);
    else if (dataType == "datetime") return new DateFormatter(param);
    else if (dataType == "string") return new StringFormatter(param);
    else return new NoFormatter();
  }
}
//********************** Filter Classes ******************/
abstract class Filter {
  abstract ApplyFilter(column: Column, value: any): boolean;
}

class StringFilter extends Filter {
  ApplyFilter(column: Column, value: any): boolean {
    if (column.FilterValue.toString().trim() == "") return false;
    if (column.FilterOperation == "contains") {
      return (
        value
          .toLowerCase()
          .indexOf(column.FilterValue.toString().toLowerCase()) >= 0
      );
    } else if (column.FilterOperation == "not_contains") {
      return value.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    } else if (column.FilterOperation == "isblank") {
      return value.toLowerCase().indexOf("") >= 0;
    } else if (column.FilterOperation == "start_with") {
      return (
        value
          .toLowerCase()
          .indexOf(column.FilterValue.toString().toLowerCase()) >= 0
      );
    } else if (column.FilterOperation == "end_with") {
      return (
        value
          .toLowerCase()
          .indexOf(column.FilterValue.toString().toLowerCase()) >= 0
      );
    } else if (column.FilterOperation == "equalto") {
      return column.FilterValue.toString().toLowerCase() == value.toLowerCase();
    }
  }
}

class NumberFilter extends Filter {
  ApplyFilter(column: Column, value: any): boolean {
    if (column.FilterValue.toString().trim() == "") return false;

    if (column.FilterOperation == "equalto") {
      return (
        column.FilterValue.toString()
          .toLowerCase()
          .indexOf(value) >= 0
      );
    } else if (column.FilterOperation == "not_equalto") {
      return (
        column.FilterValue.toString()
          .toLowerCase()
          .indexOf(value) >= 0
      );
    } else if (column.FilterOperation == "greater_than") {
      return (
        column.FilterValue.toString()
          .toLowerCase()
          .indexOf(value) >= 0
      );
    } else if (column.FilterOperation == "greater_than_or_equalto") {
      return (
        column.FilterValue.toString()
          .toLowerCase()
          .indexOf(value) >= 0
      );
    } else if (column.FilterOperation == "lesser_than") {
      return (
        column.FilterValue.toString()
          .toLowerCase()
          .indexOf(value) >= 0
      );
    } else if (column.FilterOperation == "lesser_than_or_equalto") {
      return (
        column.FilterValue.toString()
          .toLowerCase()
          .indexOf(value) >= 0
      );
    }
  }
}

class BooleanFilter extends Filter {
  ApplyFilter(column: Column, value: any): boolean {
    if (column.FilterOperation == "equalto") {
      return column.FilterValue == value;
    } else if (column.FilterOperation == "not_equalto") {
      return column.FilterValue != value;
    }
  }
}

class DateTimeFilter extends Filter {
  ApplyFilter(column: Column, value: any): boolean {
    if (column.FilterValue.toString().trim() == "") return false;

    let date1 = new Date(value);
    let date2 = new Date(column.FilterValue);

    if (column.FilterOperation == "equalto") {
      return date1.getTime() == date2.getTime();
    } else if (column.FilterOperation == "not_equalto") {
      return date1.getTime() != date2.getTime();
    } else if (column.FilterOperation == "greater_than") {
      return date1.getTime() > date2.getTime();
    } else if (column.FilterOperation == "greater_than_or_equalto") {
      return date1.getTime() >= date2.getTime();
    } else if (column.FilterOperation == "lesser_than") {
      return date1.getTime() < date2.getTime();
    } else if (column.FilterOperation == "lesser_than_or_equalto") {
      return date1.getTime() <= date2.getTime();
    }
  }
}

class FilterFactory {
  static GetFilterInstance(dataType: string): Filter {
    if (dataType == "boolean") {
      return new BooleanFilter();
    } else if (dataType == "number") {
      return new NumberFilter();
    } else if (dataType == "datetime") {
      return new DateTimeFilter();
    } else if (dataType == "string") {
      return new StringFilter();
    }
  }
}

class Criteria {
  DataType: string;

  constructor() {}
}

//************************ EcuTekGridComponent Event Class *****************/

class EcuTekGridEventArgs {
  Sender: EcuTekGridComponent;
  ActionName: string;
  Item: ListItem;

  constructor(sender: EcuTekGridComponent, actioName: string, item: ListItem) {
    this.Sender = sender;
    this.ActionName = actioName;
    this.Item = item;
  }
}

class Action {
  ActionName: string;
  ActionText: string;

  constructor(actionName: string, actionText: string) {
    this.ActionName = actionName;
    this.ActionText = actionText;
  }
}
