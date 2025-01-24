import React, { useContext, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "rgb(255 192 203)",
color:"black",

}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 700 ,

}));

const RequestDetails = ({ request }) => (
  <Box>
    <StyledCard>
      <CardContent>
        {Object.entries({
          ID: request._id,
          TransactionId: request.transactionId,
          Name: request.name,
          Email: request.email,
          Phone: request.phone,
          Address: request.address,
          Package: request.packageId?.name,
          Price: request.packageId?.price,
          Status: request.status,
        }).map(([label, value]) => (
          <StyledTypography key={label} variant="body1" paragraph>
            <strong>{label}:</strong> {value ?? "N/A"}
          </StyledTypography>
        ))}
      </CardContent>
    </StyledCard>
  </Box>
);

const ManagePayment = () => {
  const { allreq } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  return (
    <StyledBox>
     <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Manage Transactions
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
        Here you can review and manage all financial transactions. You can delete any transaction as needed and keep track of transaction details and status.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <TableContainer>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell>S.No</StyledTableCell>
                    <StyledTableCell>Customer Name</StyledTableCell>
                    <StyledTableCell>Phone Number</StyledTableCell>
                    <StyledTableCell>Package Name</StyledTableCell>
                    <StyledTableCell>Package Status</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {allreq?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    allreq?.map((request,index) => (
                      <TableRow key={request._id}>
                        <TableCell align="center"  sx={{ fontWeight: 500 }}>{index+1}</TableCell>
                        <TableCell align="center"  sx={{ fontWeight: 500 }}>{request.name}</TableCell>
                        <TableCell align="center"  sx={{ fontWeight: 500 }}>{request.phone}</TableCell>
                        <TableCell align="center"  sx={{ fontWeight: 500 }}>{request.packageId?.name ?? "N/A"}</TableCell>
                        <TableCell align="center"  sx={{ fontWeight: 500 }}>{request.status}</TableCell>
                        <TableCell align="center"  sx={{ fontWeight: 500,color:request.transactionId?"green":"orange" }}>{request.transactionId?"Paid":"Pending"}</TableCell>
                        <TableCell align="center"  sx={{ fontWeight: 500 }}>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenModal(request)}
                          >
                            <InfoIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent>
          {selectedRequest ? <RequestDetails request={selectedRequest} /> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </StyledBox>
  );
};

export default ManagePayment;
