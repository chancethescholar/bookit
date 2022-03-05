import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <footer
      className="text-black text-center mainback bg-slate-100 pt-8 pb-8"
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex"
      }}>
      <Container>
        <Box>
          Copyright © Chance Onyiorah
        </Box>
      </Container>
    </footer>
  )
}

export default Footer;
