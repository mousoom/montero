import { Box, Container } from "@material-ui/core";
import CategoryTable from "../Components/CategoryComponent/CategoryTable";
import CategoryToolbar from "../Components/CategoryComponent/CategoryToolbar";
import ResourceToolbar from "../Components/ResourceComponent/ResourceToolbar";
import ResourceTable from "../Components/ResourceComponent/ResourceTable";
const Category = () => (
  <>
    <Box style={{ marginTop: "50px" }}>
      <Container maxWidth={false}>
        <ResourceToolbar />
        <Box>
          <ResourceTable/>
        </Box>
      </Container>
    </Box>
  </>
);

export default Category;
