import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Logo from "../assets/Images/travclan_logo_latest.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./style.css";

import { useHistory } from "react-router";

const loading = () => {
  return <div>Loading........</div>;
};
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const appbar = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  back: {
    justifyContent: "center",
    marginTop: "20px",
  },
}));

function BidInfo(props) {
  const {
    location: { state: { response: { bids = [] } = {} } = {} },
  } = props;
  const classes2 = appbar();
  const history = useHistory();
  const RedirectToHome = () => {
    history.push({
      pathname: `/`,
    });
  };

  return (
    <>
      <TableContainer>
        <div>
          <AppBar position="static">
            <Toolbar>
              <img src={Logo} />

              <Typography variant="h6" className={classes2.title}>
                Bids List
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        {bids ? (
          <>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>Car Title</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>created</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids &&
                  bids.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell>{row.carTitle}</StyledTableCell>
                      <StyledTableCell>{row.amount}</StyledTableCell>
                      <StyledTableCell>{row.created}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography variant="h6" className={classes2.back}>
              <Button
                variant="contained"
                color="success"
                className="sort"
                onClick={RedirectToHome}
              >
                BACK
              </Button>
            </Typography>{" "}
          </>
        ) : (
          <div className="loader">
            <CircularProgress color="secondary" />
          </div>
        )}
      </TableContainer>
    </>
  );
}

export default BidInfo;
