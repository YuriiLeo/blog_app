import React from 'react';
import { Container, Box } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Container maxWidth="md">
			<Box sx={{ padding: 4 }}>{children}</Box>
		</Container>
	);
};

export default Layout;
