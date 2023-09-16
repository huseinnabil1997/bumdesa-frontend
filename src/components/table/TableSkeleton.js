// @mui
import { TableRow, TableCell, Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }) {
  const count = 5;
  return (
    <>
      {Array(count)
        .fill('x')
        .map((row, i) => (
          <TableRow {...other} key={i}>
            <TableCell colSpan={9}>
              <Stack spacing={3} direction="row" alignItems="center" sx={{ ml: 1 }}>
                <Skeleton variant="rectangular" width={25} height={25} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width={250} height={20} />
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={50} height={20} />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
