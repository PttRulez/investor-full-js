import Grid from "@mui/material/Unstable_Grid2";

const PortfolioTableFooter = ({depositsSum, cashoutsSum, currentValue, profitability}) => {
  return (<Grid justifyContent={'space-between'} container sx={{width: '100%', '& .MuiGrid2-root': {padding: '20px'}}}>
    <Grid>Сумма депозитов: {depositsSum.toLocaleString()}</Grid>
    <Grid>Сумма кэшаутов: {cashoutsSum.toLocaleString()}</Grid>
    <Grid>Текущая стоимость: {currentValue.toLocaleString()}</Grid>
    <Grid>Общая доходность: {profitability}</Grid>
  </Grid>)
}

export default PortfolioTableFooter