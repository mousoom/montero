import { Box, Container } from "@material-ui/core";
import UserToolbar from "../Components/UserComponent/UserToolbar";
import UserTable from "../Components/UserComponent/UserTable"
const Users = () => (
  <>
    <Box style={{ marginTop: "50px" }}>
      <Container maxWidth={false}>
        <UserToolbar />
        <Box>
          <UserTable/>
        </Box>
      </Container>
    </Box>
  </>
);

export default Users;
