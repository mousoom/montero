import { Box, Container } from '@material-ui/core';
import AdminToolbar from '../Components/AdminComponent/AdminToolbar'
import AdminTable from '../Components/AdminComponent/AdminTable'
const StaffList = () => (
  <>
    <Box style={{marginTop:'50px'}}>
      <Container maxWidth={false}>
        <AdminToolbar/>
        <Box>
            <AdminTable/>
        </Box>
      </Container>
    </Box>
  </>
);

export default StaffList;
