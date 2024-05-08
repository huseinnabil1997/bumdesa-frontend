import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Collapse, Stack, List, ListItem } from "@mui/material";
import { Masonry } from "@mui/lab";
import Iconify from 'src/components/Iconify';

const styles = {
  boxStyle: {
    maxWidth: 468,
    minHeight: 80,
    padding: '24px 20px',
    gap: '24px',
    borderRadius: '16px',
    border: '1px solid #EAEBEB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  typographyStyle: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    fontSize: '20px',
    fontWeight: 600,
    color: '#1C1548'
  },
  iconStyle: {
    minWidth: 32,
    minHeight: 32,
    color: '#1078CA'
  },
  stackStyle: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  answerTypographyStyle: {
    margin: 2
  },
  listItemStyle: {
    fontSize: '18px',
    fontWeight: 400,
    display: 'list-item',
    padding: 0
  },
  listStyle: {
    px: 2,
    py: 1,
    listStyle: 'disc',
    marginLeft: '20px'
  }
};

export default function FaqsList({ data }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const handleExpandClick = (index) => {
    if (expandedIds.includes(index)) {
      setExpandedIds(expandedIds.filter(id => id !== index));
    } else {
      setExpandedIds([...expandedIds, index]);
    }
  };

  return (
    <Masonry columns={2} spacing={2}>
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            ...styles.boxStyle,
            flexDirection: expandedIds.includes(index) ? 'column' : 'row',
          }}
          onClick={() => handleExpandClick(index)}
        >
          <Stack sx={styles.stackStyle}>
            <Typography sx={{
              ...styles.typographyStyle,
              WebkitLineClamp: expandedIds.includes(index) ? undefined : 1
            }}>
              {item.question}
            </Typography>
            <Iconify
              icon={
                expandedIds.includes(index)
                  ? 'f7:chevron-up-square-fill'
                  : 'f7:chevron-down-square-fill'
              }
              sx={styles.iconStyle} />
          </Stack>
          {expandedIds.includes(index) &&
            <Collapse in={expandedIds.includes(index)} timeout="auto" unmountOnExit>
              <Typography sx={styles.answerTypographyStyle}>
                {item?.answer?.map(ans => {
                  if (ans.type === "text") {
                    return (
                      <Typography
                        fontSize="18px"
                        fontWeight={400}
                        key={ans.value}>
                        {ans.value}
                      </Typography>
                    );
                  } else if (ans.type === "list") {
                    return (
                      <List key={ans.value} sx={styles.listStyle}>
                        {ans.value.map((listItem, listItemIndex) => (
                          <ListItem
                            key={listItemIndex}
                            sx={styles.listItemStyle}>
                            {listItem}
                          </ListItem>
                        ))}
                      </List>
                    );
                  }
                })}
              </Typography>
            </Collapse>
          }
        </Box>
      ))}
    </Masonry>
  )
}

FaqsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string
    }))
  }))
}
