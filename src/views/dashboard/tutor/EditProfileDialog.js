import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import * as React from "react";

export default function EditProfileDialog({ tutor, open, handleClose, onSave }) {
  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogContent>
      <form id="editProfileForm" onSubmit={onSave}>
        <Stack spacing={3} mt={1}>
          <TextField
            name="name"
            label="Name"
            type="name"
            defaultValue={tutor.user.name}
          />
          <TextField
            name="hourlyRate"
            label="Hourly Rate"
            defaultValue={tutor.hourly_rate ?? ''}
          />
          <TextField
            name="bio"
            label="Bio"
            defaultValue={tutor.bio ?? ''}
          />
        </Stack>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit" form="editProfileForm">Save</Button>
    </DialogActions>
  </Dialog>;
}
