import { Box, Container } from "@material-ui/core";
import CategoryTable from "../Components/CategoryComponent/CategoryTable";
import CategoryToolbar from "../Components/CategoryComponent/CategoryToolbar";
const Category = () => (
  <>
    <Box style={{ marginTop: "50px" }}>
      <Container maxWidth={false}>
        <CategoryToolbar />
        <Box>
          <CategoryTable/>
        </Box>
      </Container>
    </Box>
  </>
);

export default Category;
