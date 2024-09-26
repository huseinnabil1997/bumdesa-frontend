// @mui
import {
  Box,
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  CircularProgress,
  InputAdornment,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable from '../../hooks/useTable';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../components/table';
// sections
import { TableRow, Header } from 'src/sections/log';
import { useTheme } from '@mui/material/styles';
import TableError from 'src/components/table/TableError';
import { useGetLogs } from 'src/query/hooks/log/useGetLog';
import { LOG_HEAD } from 'src/utils/constant';
import { useEffect, useRef, useState } from 'react';
import { capitalCase } from 'change-case';
import jwtDecode from 'jwt-decode';
import { getSessionToken } from 'src/utils/axios';
import { useGetBusinessUnits } from 'src/query/hooks/report/useGetBusinessUnit';
import { useRouter } from 'next/router';
import { StyledButton } from 'src/theme/custom/Button';
import { ArrowDropDown, Download } from '@mui/icons-material';
import { useDownloadLog } from 'src/query/hooks/log/useDownloadLog';
import { useSnackbar } from 'notistack';
import onDownload from 'src/utils/onDownload';
import { useGetModules } from 'src/query/hooks/options/useGetModules';

// ----------------------------------------------------------------------

LogList.getLayout = function getLayout(page) {
  return <Layout title="Semua Log Aktivitas">{page}</Layout>;
};
// ----------------------------------------------------------------------

const options = ['', 'Unduh format PDF', 'Unduh format Excel'];

export default function LogList() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const token = getSessionToken();
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  } else {
    console.error('Token not available');
  }

  const { page, rowsPerPage, onChangeRowsPerPage, onChangePage, setPage } = useTable({
    defaultCurrentPage: 1,
    defaultRowsPerPage: 10,
  });

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [module, setModule] = useState('0');
  const [action, setAction] = useState('0');
  const [business, setBusiness] = useState({ id: -1, name: 'SEMUA' });
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const { mutate: download, isLoading: downloading } = useDownloadLog();
  const { data: modules, isLoading: loadingModules } = useGetModules();
  const { data: businesses, isLoading: loadingBusiness } = useGetBusinessUnits();
  const { data, isLoading, isError } = useGetLogs({
    page,
    limit: rowsPerPage,
    module,
    action,
    unit: business?.id ?? -1,
  });

  useEffect(() => {
    setPage(1);
  }, [module, action, business, rowsPerPage, business?.id]);

  const handleMenuItemClick = (event, index) => {
    const payload = {
      page,
      limit: rowsPerPage,
      module,
      action,
      unit: business?.id ?? -1,
      type: index,
    };

    if (payload.module === '0') delete payload.module;
    if (payload.action === '0') delete payload.action;

    download(payload, {
      onSuccess: (res) => {
        enqueueSnackbar('Sedang mengunduh...', { variant: 'warning' });
        onDownload({
          file: res,
          title: decoded?.bumdesid + '_Log_Activity',
          type: index,
        });
        setSelectedIndex(index);
        setOpen(false);
      },
      onError: () => {
        enqueueSnackbar('Gagal mengunduh!', { variant: 'error' });
      },
    });
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Header />
        <Box display="flex">
          <Select
            fullWidth
            sx={{ mt: 3 }}
            size="small"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <MenuItem value="0">-- Pilih Aksi --</MenuItem>
            {['tambah', 'hapus', 'edit'].map((row) => (
              <MenuItem key={row} value={row}>
                {capitalCase(row)}
              </MenuItem>
            ))}
          </Select>

          <Select
            fullWidth
            sx={{ mt: 3, ml: 1 }}
            size="small"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            {...(loadingModules && {
              startAdornment: (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
            })}
          >
            <MenuItem value="0">-- Pilih Modul --</MenuItem>
            {modules?.map((row) => (
              <MenuItem key={row} value={row?.id}>
                {capitalCase(row?.name)}
              </MenuItem>
            ))}
          </Select>
          {decoded?.sub?.businessid === 0 && (
            <Autocomplete
              InputProps={{
                startAdornment: (
                  <>
                    {loadingBusiness && (
                      <CircularProgress size={12} color="primary" sx={{ ml: 1 }} />
                    )}
                  </>
                ),
              }}
              value={business}
              onChange={(event, newValue) => {
                setBusiness(newValue);
              }}
              sx={{ ml: 1, mt: 3 }}
              size="small"
              getOptionLabel={(option) => option?.name}
              options={businesses ?? []}
              fullWidth
              renderInput={(params) => <TextField {...params} placeholder="Pilih Unit" />}
            />
          )}
          <StyledButton
            ref={anchorRef}
            sx={{ ml: 1, mt: 3 }}
            fullWidth
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            startIcon={downloading ? <CircularProgress size="1rem" /> : <Download />}
            endIcon={<ArrowDropDown />}
            variant="outlined"
            disabled={data?.data?.length === 0}
          >
            Unduh Dokumen
          </StyledButton>
          <Popper
            sx={{ zIndex: 99 }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={LOG_HEAD}
                  rowCount={data?.data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.data?.length > 0 &&
                    data?.data?.map((row, i) => (
                      <TableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onClickDetail={() => push(row?.url)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!data?.data?.length > 0 && !isError && !isLoading && (
                    <TableNoData
                      isNotFound
                      title="Data Kosong"
                      description="Buku besar belum tersedia."
                    />
                  )}

                  {!isLoading && isError && (
                    <TableError
                      title="Koneksi Error"
                      description="Silakan cek koneksi Anda dan muat ulang halaman."
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ py: 3 }}
          flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
        >
          <FormControl>
            <Select
              value={rowsPerPage}
              onChange={onChangeRowsPerPage}
              displayEmpty
              inputProps={{ 'aria-label': 'Rows per page' }}
              aria-controls=""
              sx={{ height: 32, width: 100 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            color="primary"
            count={data?.metadata?.paging?.total_page ?? 0}
            rowsPerPage={rowsPerPage ?? 10}
            page={page ?? 0}
            onChange={onChangePage}
            sx={{
              '& .MuiPaginationItem-page': {
                border: 'none !important',
              },
              '& .MuiPaginationItem-icon': {
                color: '#1078CA',
              },
              '& .MuiPaginationItem-previousNext': {
                borderColor: '#1078CA',
              },
              '& .MuiPaginationItem-firstLast': {
                borderColor: '#1078CA',
              },
            }}
          />
        </Box>
      </Container>
    </Page>
  );
}
