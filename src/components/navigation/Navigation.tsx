import React from "react";
import { styled } from "../../theme";
import Box from "../box/Box";
import Grid from "../grid/Grid";


const Sticky = styled(Box, {
  position: "sticky",
  top: 0,
  zIndex: "$3",
});

const Nav = styled("nav", {
  height: "4rem",
  fontSize: "1rem",
  boxSizing: "border-box"
});

const Container = styled(Box, {
  marginRight: "auto",
  marginLeft: "auto",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  boxSizing: "border-box",
  display: "block",
  position: "relative",
  maxHeight: "600px",
  overflowY: "auto",
  overflowX: "hidden"
});

const Navigation = () => {
  return (
    <Sticky>
      <Nav>
        <Container>
          <Grid css={{
            gridTemplateAreas:"\"logo nav\"",
            gridTemplateColumns: "min-content 1fr"
          }}>
            Aleksandre Adamia
          </Grid>
        </Container>
      </Nav>
    </Sticky>
  );
};

export default Navigation;