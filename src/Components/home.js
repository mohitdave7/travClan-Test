import React, { useState, useEffect } from "react";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  TablePagination,
} from "@material-ui/core";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import ToggleButton from "@material-ui/lab/ToggleButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./style.css";
import { useHistory, hashHistory, withRouter } from "react-router";
import Logo from "../assets/Images/travclan_logo_latest.png";
import _ from "underscore";
import Avatar from "@material-ui/core/Avatar";

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function Home(props) {
  const [data, SetData] = useState([]);
  const [selected, setSelected] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [loading, SetLoading] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    SetLoading(true);
    fetch("https://intense-tor-76305.herokuapp.com/merchants")
      .then((results) => results.json())
      .then((data) => {
        SetData(data);
        SetLoading(false);
      });
  }, []);
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
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
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
  }));
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  const classes = useStyles();
  const classes2 = appbar();
  const history = useHistory();

  const toggleBid = () => {
    setSelected(!selected);
  };
  const sortBid = () => {
    var sortedData;
    if (sort) {
      sortedData = _.chain(data).sortBy("bids").sortBy("amount").value();
      SetData(sortedData);
    } else {
      sortedData = _.chain(data).sortBy("bids").value();
    }
    SetData(sortedData);
    setSort(!sort);
  };
  const handleRowClick = (row) => {
    console.log("handleRowClick", row);
    history.push({
      pathname: `/home/:${row.id}`,
      state: {
        response: row,
      },
    });
  };
  return (
    <TableContainer component={Paper}>
      <div className={classes2.root}>
        <AppBar position="static">
          <Toolbar>
            <img src={Logo} />
            <Typography variant="h6" className={classes2.title}>
              Merchants List
            </Typography>
            <Button
              variant="contained"
              color="success"
              className="sort"
              onClick={sortBid}
            >
              Sort
            </Button>
            <ToggleButton
              value="check"
              selected={selected}
              className={selected ? "black" : "white"}
              onChange={toggleBid}
            >
              <Typography variant="button" className={classes2.title}>
                Lowest Bid
              </Typography>
              <CheckIcon />
            </ToggleButton>
          </Toolbar>
        </AppBar>
      </div>
      {!loading ? (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Avatar</StyledTableCell>

              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Premium</StyledTableCell>
              <StyledTableCell>Bid</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <StyledTableRow key={row.id} onClick={() => handleRowClick(row)}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Avatar alt="Remy Sharp" src={row.avatarUrl} />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.firstname ? row.firstname : "No Data"}
                </StyledTableCell>
                <StyledTableCell>
                  {row.email ? row.email : "No data"}
                </StyledTableCell>
                <StyledTableCell>
                  {row.phone ? row.phone : "No Data"}
                </StyledTableCell>
                <StyledTableCell>
                  {row.hasPremium ? "yes" : "no"}
                </StyledTableCell>
                <StyledTableCell>
                  {row.bids && !selected
                    ? Math.max.apply(
                        Math,
                        row.bids.map(function (o) {
                          return o.amount;
                        })
                      )
                    : row.bids && selected
                    ? Math.min.apply(
                        Math,
                        row.bids.map(function (o) {
                          return o.amount;
                        })
                      )
                    : null}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="loader">
          <CircularProgress color="secondary" />
        </div>
      )}
    </TableContainer>
  );
}

export default Home;
