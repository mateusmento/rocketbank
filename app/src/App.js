import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './views/signin/SignIn';
import { Clients } from './views/client/Clients';
import { SignUp } from './views/signup/SignUp';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './views/home/Home';
import { AppBar, Box, Button, Link, ListItem, Menu, MenuItem, Toolbar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { http } from './shared/http';

export function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<SignIn/>}/>
				<Route path="/signup" element={<SignUp/>}/>
				<Route element={<Root/>}>
					<Route path="/" element={<Home/>}/>
					<Route path="/clients" element={<Clients/>}/>
					<Route path="*" element={
						<main style={{ padding: "1rem" }}>
							<p>Página não encontrada.</p>
						</main>
					}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export const AuthUserContext = createContext({});

export function Root() {
	let location = useLocation();
	let navigate = useNavigate();
	let [user, setUser] = useState({});

	let signout = useCallback(async (e) => {
		http().delete("/auth/signin");
		navigate("/signin");
	}, [navigate]);

	let authenticateAccess = useCallback(async () => {
		try {
			const { data: user } = await http().get("/auth/user");
			const timeout = user.expiresAt * 1000 - new Date().getTime();
			setTimeout(signout, timeout);
			setUser(user);
		} catch(ex) {
			signout();
			console.error(ex);
		}
	}, [navigate, signout]);

	useEffect(() => {
		authenticateAccess();
	}, [location, authenticateAccess]);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<div>
			<AuthUserContext.Provider value={user}>
				<AppBar position="static">
					<Toolbar>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<Button sx={{ my: 2, display: 'block' }}>
								<Link to="/" sx={{color: 'white'}} component={RouterLink}>Home</Link>
							</Button>
							<Button sx={{ my: 2, display: 'block' }}>
								<Link to="/clients" sx={{color: 'white'}} component={RouterLink}>Clientes</Link>
							</Button>

							<Button id="account-button" onClick={handleClick} sx={{ my: 2, color: 'white', display: 'block', ml: "auto" }}>
								<AccountCircle />
							</Button>
							<Menu open={open} anchorEl={anchorEl} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'account-button' }}>
								<ListItem>Olá {user.name}</ListItem>
								<MenuItem onClick={signout}>Sair</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</AppBar>

				<Outlet/>
			</AuthUserContext.Provider>
		</div>
	);
}
