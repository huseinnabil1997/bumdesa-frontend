import {
  Card,
  CardContent,
  CardActions,
  Box,
  Avatar,
  Typography,
  Rating,
  AvatarGroup,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/router';

export default function EducationCard({ content }) {
  const router = useRouter();

  const { author, title, rating, participants, contents, commentators } = content;

  return (
    <Card sx={{ maxWidth: 345, borderRadius: '16px', p: '16px' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: blue[500], width: 25, height: 25, fontSize: 12 }}>B</Avatar>
            <Typography variant="h6" component="div" ml={1} fontWeight={600}>
              {author}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Rating
              value={rating / 5}
              max={1}
              precision={0.01}
              readOnly
              icon={
                <StarIcon sx={{ color: '#1078CA', fontSize: 'inherit', borderRadius: '50%' }} />
              }
              emptyIcon={
                <StarIcon sx={{ color: '#BBDEFA', fontSize: 'inherit', borderRadius: '50%' }} />
              }
            />
            <Typography variant="body2" color="textSecondary" ml={0.5}>
              {rating}
            </Typography>
            <Typography variant="body2" color="textSecondary" ml={0.5}>
              ({participants.length})
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body1"
          color="#292929"
          component="p"
          fontWeight="bold"
          mt={3}
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="#292929"
          component="p"
          mt={1}
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 3,
          }}
        >
          {contents}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{ bgcolor: blue[50], p: 1, borderRadius: 1 }}
        >
          <Box display="flex" flexDirection="row-reverse">
            <AvatarGroup
              max={5}
              sx={{
                '& .MuiAvatar-root': { width: 25, height: 25, fontSize: 12 },
                '& .MuiAvatarGroup-avatar': { width: 25, height: 25, fontSize: 12 },
              }}
            >
              {commentators?.slice(0, 4).map((commentator, index) => (
                <Avatar
                  key={index}
                  sx={{ width: 25, height: 25, zIndex: index + 1, fontSize: 12 }}
                  alt={`User ${index + 1}`}
                  src={commentator.avatar}
                />
              ))}
              {commentators.length > 4 && (
                <Avatar sx={{ width: 25, height: 25, fontSize: 12, zIndex: 5 }}>
                  +{commentators.length - 4}
                </Avatar>
              )}
            </AvatarGroup>
          </Box>
          <StyledLoadingButton
            onClick={() => router.push(`/education/detail?title=${content.title}&id=${content.id}`)}
            variant="contained"
            color="primary"
            sx={{ width: '105px', height: '40px', fontSize: '12px' }}
          >
            Lihat Modul
          </StyledLoadingButton>
        </Box>
      </CardActions>
    </Card>
  );
}
