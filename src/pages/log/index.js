// @mui
import { Button, Card, Container, Paper, Typography } from '@mui/material';
// hooks
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';
import Iconify from 'src/components/Iconify';
import useSettings from 'src/hooks/useSettings';
import { useRouter } from 'next/router';
import { useGetLogs } from 'src/query/hooks/log/useGetLog';
import moment from 'moment';

// ----------------------------------------------------------------------

JurnalList.getLayout = function getLayout(page) {
  return <Layout title="Log Aktivitas">{page}</Layout>;
};
// ----------------------------------------------------------------------

const TIMELINES = [
  {
    key: 1,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <Iconify icon="eva:image-2-fill" width={24} height={24} />,
  },
  {
    key: 2,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <Iconify icon="eva:image-2-fill" width={24} height={24} />,
  },
  {
    key: 3,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <Iconify icon="eva:image-2-fill" width={24} height={24} />,
  },
];

export default function JurnalList() {
  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const { data } = useGetLogs({ page: 1, limit: 5 });

  console.log(data);

  const generateIcon = (value) => {
    if (value === 'tambah') return <Iconify icon="eva:plus-fill" width={24} height={24} />;
    else if (value === 'edit') return <Iconify icon="eva:edit-2-fill" width={24} height={24} />;
    else if (value === 'hapus') return <Iconify icon="eva:trash-2-fill" width={24} height={24} />;
    else return <Iconify icon="eva:info-fill" width={24} height={24} />;
  };

  const generateColor = (value) => {
    if (value === 'tambah') return 'secondary';
    else if (value === 'edit') return 'warning';
    else if (value === 'hapus') return 'error';
    else return 'grey';
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Scrollbar>
          <Timeline position="right">
            {data?.map((item, i) => (
              <TimelineItem key={item.key} sx={{ '&:before': { display: 'none' } }}>
                <TimelineSeparator>
                  <TimelineDot color={generateColor(item?.action)} sx={{ color: 'white' }}>
                    {generateIcon(item?.action)}
                  </TimelineDot>
                  {data?.length - 1 !== i && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    sx={{
                      width: 'fit-content',
                      p: 3,
                      bgcolor: 'grey.50012',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#777' }}>
                      {moment(item?.timestamp).format('DD/MM/yyyy HH.mm')}
                    </Typography>
                    <Typography variant="subtitle2">{item?.description ?? '-'}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Scrollbar>
        <Button variant="outlined" fullWidth size="large" onClick={() => push('/log/list')}>
          Lihat Selengkapnya
        </Button>
      </Container>
    </Page>
  );
}
