import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import * as React from "react";

export default function EditOfferingDialog({ offering, handleClose, onSave, loading}) {
  
  // Don't display if offering is null
  if (offering === null) return null;

  return <>
    <Dialog open onClose={handleClose}>
      <DialogTitle>
        {'New Offering'}
      </DialogTitle>
      <DialogContent>
        <form id="editOfferingForm" onSubmit={onSave}>
          <Stack spacing={3} mt={1}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Autocomplete
                disablePortal
                fullWidth
                disabled={true}
                options={''}
                defaultValue={offering.request?.course_id}
                renderInput={(params) => (
                  <TextField
                    name="course"
                    label="Course"
                    {...params}
                  />
                )}
              />
            </Stack>
            <TextField
              name="gradeReceived"
              label="Grade Received (optional)"
              defaultValue={offering.grade_received || ''}
            />
            <TextField
              name="professorName"
              label="Professor Name (optional)"
              defaultValue={offering.professor_name || ''}
            />
            <TextField
              name="yearTaken"
              label="Year Taken (optional)"
              defaultValue={offering.year_taken || ''}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={loading} type="submit" form="editOfferingForm">
          {'Save'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  </>;
}