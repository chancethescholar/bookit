import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <footer
      class="text-white text-center"
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex"
      }}>
      <Container>
        <Box>
          Created by Chance Onyiorah
        </Box>
      </Container>
    </footer>
  )
}

export default Footer;
