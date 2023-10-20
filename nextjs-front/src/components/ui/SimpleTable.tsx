import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import dayjs from 'dayjs';
import {readableNumber} from '@/helpers/common';

export default function SimpleTable({data, ticker}) {
	const propertiesToShow = ['revenue', 'costOfRevenue', 'grossProfit', 'netIncome', 'totalAssets', 'totalLiabilities'];
	if (!data)
		return null;

	return (
		<TableContainer component={Paper} >
			<Table sx={{minWidth: 650}} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						{data.map(i => (
							<TableCell key={i.date}>{dayjs(i.date).year()}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{propertiesToShow.map(property => (
						<TableRow>
							<TableCell>{property}</TableCell>
							{data.map(i => (
								<TableCell sx={{whiteSpace: 'nowrap'}}>
									{readableNumber(i[property])}
								</TableCell>
							))}

						</TableRow>))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
