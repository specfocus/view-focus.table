import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TableCell, TableSortLabel, Tooltip } from '@mui/material';
import { TableCellProps } from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';
import {
  FieldTitle,
  useTranslate,
  SortPayload,
  useResourceContext,
} from '../core';

import { ClassesOverride } from '../types';

// remove the sort icons when not active
const useStyles = makeStyles(
  {
    icon: {
      display: 'none',
    },
    active: {
      '& $icon': {
        display: 'inline',
      },
    },
  },
  { name: 'RaDataHeaderCell' }
);

export const DataHeaderCell = (
  props: DataHeaderCellProps
): JSX.Element => {
  const {
    className,
    classes: classesOverride,
    field,
    currentSort,
    updateSort,
    isSorting,
    ...rest
  } = props;
  const resource = useResourceContext(props);
  const classes = useStyles(props);
  const translate = useTranslate();

  return (
    <TableCell
      className={classnames(className, field.props.headerClassName)}
      align={field.props.textAlign}
      variant="head"
      {...rest}
    >
      {updateSort &&
        field.props.sortable !== false &&
        (field.props.sortBy || field.props.source) ? (
        <Tooltip
          title={translate('action.sort')}
          placement={
            field.props.textAlign === 'right'
              ? 'bottom-end'
              : 'bottom-start'
          }
          enterDelay={300}
        >
          <TableSortLabel
            active={
              currentSort.field ===
              (field.props.sortBy || field.props.source)
            }
            direction={currentSort.order === 'ASC' ? 'asc' : 'desc'}
            data-sort={field.props.sortBy || field.props.source} // @deprecated. Use data-field instead.
            data-field={field.props.sortBy || field.props.source}
            data-order={field.props.sortByOrder || 'ASC'}
            onClick={updateSort}
            classes={classes}
          >
            <FieldTitle
              label={field.props.label}
              source={field.props.source}
              resource={resource}
            />
          </TableSortLabel>
        </Tooltip>
      ) : (
        <FieldTitle
          label={field.props.label}
          source={field.props.source}
          resource={resource}
        />
      )}
    </TableCell>
  );
};

DataHeaderCell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  field: PropTypes.element,
  currentSort: PropTypes.shape({
    sort: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  isSorting: PropTypes.bool,
  resource: PropTypes.string,
  updateSort: PropTypes.func,
};

export interface DataHeaderCellProps
  extends Omit<TableCellProps, 'classes'> {
  className?: string;
  classes?: ClassesOverride<typeof useStyles>;
  field?: JSX.Element;
  isSorting?: boolean;
  resource: string;
  currentSort: SortPayload;
  updateSort?: (event: any) => void;
}

export default memo(
  DataHeaderCell,
  (props, nextProps) =>
    props.updateSort === nextProps.updateSort &&
    props.currentSort.field === nextProps.currentSort.field &&
    props.currentSort.order === nextProps.currentSort.order &&
    props.isSorting === nextProps.isSorting &&
    props.resource === nextProps.resource
);
