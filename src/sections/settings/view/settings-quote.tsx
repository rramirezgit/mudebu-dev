'use client';

import { useState, useCallback } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
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
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const theme = useTheme();

  const router = useRouter();

  const confirm = useBoolean();

  const ITEMS = onBoardingInfo;

  const tableData = [...Array(20)].map((_, index) => {
    const shipping = 10;

    const discount = 10;

    const taxes = 10;

    const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 3 && ITEMS.slice(1, 3)) || ITEMS;

    const totalQuantity = items.reduce((accumulator, item) => accumulator + 0, 0);

    const subTotal = 0;

    const totalAmount = subTotal - shipping - discount + taxes;

    const customer = {
      id: _mock.id(index),
      name: _mock.fullName(index),
      email: _mock.email(index),
      avatarUrl: _mock.image.avatar(index),
      ipAddress: '192.158.1.38',
    };

    const delivery = {
      shipBy: 'DHL',
      speedy: 'Standard',
      trackingNumber: 'SPX037739199373',
    };

    const history = {
      orderTime: _mock.time(1),
      paymentTime: _mock.time(2),
      deliveryTime: _mock.time(3),
      completionTime: _mock.time(4),
      timeline: [
        { title: 'Delivery successful', time: _mock.time(1) },
        { title: 'Transporting to [2]', time: _mock.time(2) },
        { title: 'Transporting to [1]', time: _mock.time(3) },
        {
          title: 'The shipping unit has picked up the goods',
          time: _mock.time(4),
        },
        { title: 'Order has been created', time: _mock.time(5) },
      ],
    };

    return {
      id: _mock.id(index),
      orderNumber: `#601${index}`,
      createdAt: _mock.time(index),
      taxes,
      items,
      history,
      subTotal,
      shipping,
      discount,
      customer,
      delivery,
      totalAmount,
      totalQuantity,
      shippingAddress: {
        fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
        phoneNumber: '365-374-4961',
      },
      payment: {
        cardType: 'mastercard',
        cardNumber: '**** **** **** 5678',
      },
      status:
        (index % 2 && 'completed') ||
        (index % 3 && 'pending') ||
        (index % 4 && 'cancelled') ||
        'refunded',
    };
  });

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
