import Container from '@mui/material/Container';

 const MainScreen = ({title, children}) => {
   return (
     <div className="mainback bg-slate-100" style={{minHeight: "93vh"}}>
      <Container>
        <div class="grid grid-rows-1">
          <div className="page text-black pt-8 pl-8 font-mono">
            {title && (
              <>
                <h1 className="heading xl:text-6xl lg:text-6xl sm:text-4xl xs:text-4xl font-medium pb-4">{title}</h1>
                <hr style={{backgroundColor: "white"}}/>
              </>
            )}
            <div class="pt-4">{children}</div>
          </div>
        </div>
      </Container>
     </div>
   )
 }

 export default MainScreen;
