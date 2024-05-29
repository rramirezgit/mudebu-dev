'use client';

import { useCallback, useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { LinearProgress } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// _mock
import { _mock, _orders } from 'src/_mock';
// utils
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
// types
import { onBoardingInfo } from 'src/sections/onboarding/onboarding-info/onboardingInfo';
import { useAxios } from 'src/axios/axios-provider';
import { endpoints_api } from 'src/axios/endpoints';
import SettingsTableRow from '../settings-table-row';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'orderNumber', label: 'Order', width: 116 },
  { id: 'name', label: 'Product' },
  { id: 'date', label: 'Fecha', width: 140 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function SettingsQuote() {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<any[]>([]);

  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const theme = useTheme();

  const router = useRouter();

  const confirm = useBoolean();

  const axiosInstace = useAxios();

  useEffect(() => {
    axiosInstace.get(endpoints_api.onboarding.getAll).then((response) => {
      if (response.data?.length > 0) {
        console.log('response.data', response.data);
        setTableData(response.data);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !tableData.length;

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  return (
    <Card
      sx={{
        background: theme.palette.background.neutral,
      }}
    >
      <TableContainer
        sx={{
          position: 'relative',
          overflow: 'unset',
          background: theme.palette.background.neutral,
        }}
      >
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={tableData.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              tableData.map((row) => row.id)
            )
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={confirm.onTrue}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
        />

        {loading && <LinearProgress />}
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {tableData
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <SettingsTableRow
                    key={row.id}
                    row={row}
                    onDeleteRow={() => {}}
                    onViewRow={() => handleViewRow(row.id)}
                  />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={tableData.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------
