import { FC } from 'react';
import { TableCell } from '@mui/material';
import { AdvancedTableColumn } from './AdvancedTable';

interface AdvancedCellProps {
  column: AdvancedTableColumn;
  row: { [key: string]: any };
  value: any;
}

const AdvancedCell: FC<AdvancedCellProps> = ({ column, row, value }) => {
  let renderedValue = value;

  if (column.format) {
    renderedValue = column.format(renderedValue, row);
  }

  if (column.render) {
    renderedValue = column.render(renderedValue, row);
  }

  return (
    <TableCell key={column.name} align={column.align}>
      {renderedValue}
    </TableCell>
  );
};

export default AdvancedCell;
