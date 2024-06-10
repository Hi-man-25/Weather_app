import React , { useState  } from 'react';
import { Typography, IconButton, Box ,AppBar, Toolbar, InputBase, Button } from '@mui/material';
import './Header.css';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Header = ({ onSearch , darkMode , toggleDarkMode }) => {
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch(searchTerm);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Weather App
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 , alignItems: 'center' , marginLeft:2 }}>
                    <Button color="inherit">
                        <Typography variant="button">Map</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography variant="button">Cities</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography variant="button">Weather</Typography>
                    </Button>
                    <IconButton onClick={toggleDarkMode} color="inherit">
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Search>
                <Button color="inherit" onClick={handleSearchSubmit}>Search</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
