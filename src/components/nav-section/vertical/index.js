import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader, Skeleton } from '@mui/material';
import DOMPurify from 'dompurify';
//
import { NavListRoot } from './NavList';
import { useGetMenus } from 'src/query/hooks/auth/useGetMenus';
import { useEffect, useState } from 'react';
// import { stringify } from 'stylis';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ isCollapse = false, ...other }) {
  const safeParseJSON = (json) => {
    try {
      return JSON.parse(json);
    } catch (e) {
      return [];
    }
  };

  const defaultValue = safeParseJSON(localStorage.getItem('@menu')) ?? [];

  const [navConfig, setNavConfig] = useState(defaultValue);

  const { data, isLoading } = useGetMenus();

  useEffect(() => {
    if (data) {
      const cleanedData = data.map((group) => ({
        ...group,
        subheader: DOMPurify.sanitize(group.subheader),
        items: group.items.map((item) => ({
          ...item,
          title: DOMPurify.sanitize(item.title),
        })),
      }));
      localStorage.setItem('@menu', JSON.stringify(cleanedData));
      setNavConfig(cleanedData);
    }
  }, [data]);

  return (
    <Box {...other}>
      {navConfig?.map((group) => (
        <List key={group?.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group?.subheader}
          </ListSubheaderStyle>

          {group?.items?.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </List>
      ))}

      {isLoading && (
        <Box sx={{ p: 3 }}>
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </Box>
      )}
    </Box>
  );
}
