import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo() {
  return (
    <Box sx={{ minWidth: 60  }}>
      <FormControl  fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Maquina
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={1}>Maquina 1</option>
          <option value={2}>Maquina 2</option>
          <option value={3}>Maquina 3</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}