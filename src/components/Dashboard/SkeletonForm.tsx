import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const TodoForm = () => {
  return (
    <Paper sx={{ padding: 2, borerRadius: 10 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormHelperText>What Needs to be done?</FormHelperText>
          <Skeleton width="100%" height={70} />
        </Grid>
        <Stack alignItems="end" sx={{ marginTop: 2 }}>
          <Button component={Skeleton}>Loading...</Button>
        </Stack>
      </Grid>
    </Paper>
  );
};

export default TodoForm;
