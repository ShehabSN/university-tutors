import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import * as React from "react";

export default function EditProfileDialog({ tutor, open, handleClose, onSave, universities, loading }) {
  const [university, setUniversity] = React.useState(
    tutor.user.university
      ? {
        label: tutor.user.university.name,
        id: tutor.user.university.university_id,
      }
      : null
  );

  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogContent>
      <form id="editProfileForm" onSubmit={(event) => onSave(event, university)}>
        <Stack spacing={3} mt={1}>
          <TextField
            required
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
          <Autocomplete
            disablePortal
            options={universities}
            value={university}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, value) => setUniversity(value)}
            renderInput={(params) => (
              <TextField {...params} label="University" />
            )}
          />
        </Stack>
      </form>
    </DialogContent>
    <DialogActions>
      <Button disabled={loading} onClick={handleClose}>Cancel</Button>
      <LoadingButton loading={loading} type="submit" form="editProfileForm">
        Save
      </LoadingButton>
    </DialogActions>
  </Dialog>;
}
