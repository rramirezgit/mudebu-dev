'use client';

import { Container, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { _userAddressBook, _userInvoices, _userPayment, _userPlans } from 'src/_mock';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify/iconify';
import { paths } from 'src/routes/paths';
import AccountGeneral from 'src/sections/account/account-general';
import SettingsQuote from './settings-quote';

const TABS = [
  {
    value: 'general',
    label: 'General',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'quote',
    label: 'Mis Cotizaciones',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
];

export default function SettingsView() {
  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container sx={{ pt: 10, pb: 15 }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Cuenta
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'general' && <AccountGeneral />}

      {currentTab === 'quote' && <SettingsQuote />}
    </Container>
  );
}
