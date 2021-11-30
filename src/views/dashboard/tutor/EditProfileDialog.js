import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import * as React from "react";

export default function EditProfileDialog({ tutor, open, handleClose, onSave }) {
  const [data, setData] = React.useState(tutor);

  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogContent>
      <Stack spacing={3}>
        <TextField
          id="name"
          label="Name"
          type="name"
          value={data.user.name ?? ''}
          onChange={(event) => setData({
            ...data,
            user: {
              name: event.target.value,
            },
          })}
        />
        <TextField
          id="hourlyRate"
          label="Hourly Rate"
          value={data.hourly_rate ?? ''}
          onChange={(event) => setData({
            ...data,
            hourly_rate: event.target.value,
          })}
        />
        <TextField
          id="bio"
          label="Bio"
          value={data.bio ?? ''}
          onChange={(event) => setData({
            ...data,
            bio: event.target.value,
          })}
        />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={() => onSave(data)}>Save</Button>
    </DialogActions>
  </Dialog>;
}
