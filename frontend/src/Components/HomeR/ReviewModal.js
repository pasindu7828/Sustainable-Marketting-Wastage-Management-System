import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Avatar, Rating } from '@mui/material';
import { Close as CloseIcon, AttachFile as AttachFileIcon, Chat as ChatIcon, Star as StarIcon, Email as EmailIcon, Person as PersonIcon } from '@mui/icons-material';

const ReviewModal = ({ review, onClose }) => {
  return (
    <Dialog open={Boolean(review)} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header with Close Button */}
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Review #{review?._id?.slice(-6)}
        <IconButton onClick={onClose} sx={{ color: 'red' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {/* Name */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: 'green' }}><PersonIcon /></Avatar>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">Customer Name</Typography>
            <Typography variant="h6">{review?.name}</Typography>
          </Box>
        </Box>

        {/* Email */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: 'green' }}><EmailIcon /></Avatar>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">Email</Typography>
            <Typography>{review?.email}</Typography>
          </Box>
        </Box>

        {/* Rating */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: 'green' }}><StarIcon /></Avatar>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">Rating</Typography>
            <Rating value={review?.rating || 0} readOnly />
          </Box>
        </Box>

        {/* Review Text */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: 'green' }}><ChatIcon /></Avatar>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">Review</Typography>
            <Typography>{review?.reviewText}</Typography>
          </Box>
        </Box>

        {/* Photo */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: 'green' }}><AttachFileIcon /></Avatar>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">Photo</Typography>
            {review?.photo ? (
              <Box mt={1} component="img" src={`../public/images/${review.photo}`} alt="Review" width="100%" maxWidth={300} borderRadius={2} />
            ) : (
              <Typography color="textSecondary" fontStyle="italic">No photo attached</Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
