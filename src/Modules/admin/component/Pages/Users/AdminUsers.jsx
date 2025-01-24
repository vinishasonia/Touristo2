import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AuthContext } from "../../../../GlobalContext";

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "rgb(255 192 203)",
  color: "black",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 700,
}));

const Users = () => {
  const { alluser } = useContext(AuthContext);

  return (
    <StyledBox>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Manage Users
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
        Here you can review and manage all registered users. Check their details and keep track of user information.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <TableContainer>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell>S.No</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Phone</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {alluser?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No users available
                      </TableCell>
                    </TableRow>
                  ) : (
                    alluser?.map((user,index) => (
                      <TableRow key={user._id}>
                        <TableCell align="center" sx={{ fontWeight: 500 }}>{index+1}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 500 }}>{user.email}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 500 }}>{user.phone}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 500 }}>{user.address}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default Users;
