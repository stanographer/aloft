import React from 'react'

const NavBar = () => {
  return(
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            React & Material-UI Sample Application
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default NavBar;