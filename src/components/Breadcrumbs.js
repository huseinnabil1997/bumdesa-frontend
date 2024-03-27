import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link, Typography, Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import { useTheme } from '@emotion/react';

// ----------------------------------------------------------------------

Breadcrumbs.propTypes = {
  activeLast: PropTypes.bool,
  links: PropTypes.array.isRequired,
};

export default function Breadcrumbs({ links, activeLast = false, ...other }) {
  const currentLink = links[links.length - 1].name;

  const theme = useTheme();

  const listDefault = links.map((link) => <LinkItem key={link.name} link={link} />);

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: theme.palette.common.black,
            fontWeight: 700,
            textOverflow: 'ellipsis',
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <MUIBreadcrumbs
      separator={
        <Box
          component="span"
          sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  );
}

// ----------------------------------------------------------------------

LinkItem.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string,
    icon: PropTypes.any,
    name: PropTypes.string,
  }),
};

function LinkItem({ link }) {
  const { href = '', name, icon } = link;
  const theme = useTheme();
  return (
    <NextLink href={href} passHref>
      <Link
        key={name}
        variant="body2"
        sx={{
          lineHeight: 2,
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.grey[500],
          fontWeight: 500,
          textDecoration: 'none',
          '& > div': { display: 'inherit' },
        }}
      >
        {icon && <Box sx={{ mr: 1, '& svg': { width: 20, height: 20 } }}>{icon}</Box>}
        {name}
      </Link>
    </NextLink>
  );
}
