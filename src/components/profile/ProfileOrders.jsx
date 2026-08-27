import { useState } from "react";
import { Alert, Box, Card, Chip, Divider, MenuItem, Select, Skeleton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useProfile from "../../hooks/useProfile";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

function getNormalizedStatus(status) {
  if (status === 3) return "delivered";
  if (String(status).toLowerCase() === "active") return "active";
  return "cancelled";
}

function StatusChip({ status }) {
  const norm = getNormalizedStatus(status);
  if (norm === "active") {
    return <Chip icon={<LocalShippingOutlinedIcon fontSize="small" />} label="Active" size="small" sx={{ bgcolor: "info.soft", color: "info.main", fontWeight: 600, borderRadius: 3 }} />;
  }
  if (norm === "delivered") {
    return <Chip icon={<CheckCircleOutlinedIcon fontSize="small" />} label="Delivered" size="small" sx={{ bgcolor: "success.soft", color: "success.main", fontWeight: 600, borderRadius: 3 }} />;
  }
  return <Chip icon={<CancelOutlinedIcon fontSize="small" />} label="Cancelled" size="small" sx={{ bgcolor: "action.selected", color: "text.secondary", fontWeight: 600, borderRadius: 3 }} />;
}

function PaymentStatusChip({ paymentStatus }) {
  const status = String(paymentStatus || "unpaid").toLowerCase();
  if (status === "paid") {
    return <Chip icon={<CheckCircleOutlinedIcon fontSize="small" />} label="Paid" size="small" sx={{ bgcolor: "success.soft", color: "success.main", fontWeight: 600, borderRadius: 3 }} />;
  }
  return <Chip icon={<CreditCardOutlinedIcon fontSize="small" />} label="Unpaid" size="small" sx={{ bgcolor: "warning.soft", color: "warning.main", fontWeight: 600, borderRadius: 3 }} />;
}

function OrderRow({ order }) {
  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", p: 2, borderRadius: 2, transition: "border-color 0.2s", "&:hover": { borderColor: "primary.main" } }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1.2fr 1fr 1fr 1fr 1fr" }, gap: 2, alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>#KS-{order?.id}</Typography>
        <Typography variant="body2" color="text.secondary">{order?.orderDate ? new Date(order.orderDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}</Typography>
        <Box><StatusChip status={order?.status} /></Box>
        <Box><PaymentStatusChip paymentStatus={order?.paymentStatus} /></Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>${Number(order?.amountPaid || 0).toFixed(2)}</Typography>
      </Box>
    </Card>
  );
}

export default function ProfileOrders() {
  const { t } = useTranslation();
  const { data: profile, isLoading, isError, error } = useProfile();
  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rounded" height={72} />
        <Skeleton variant="rounded" height={72} />
      </Stack>
    );
  }

  if (isError) {
    return <Alert severity="error">{error?.response?.data?.message || t("Could_not_load_orders") || "Could not load orders"}</Alert>;
  }

  const allOrders = profile?.orders || [];
  const activeOrders = allOrders.filter(o => getNormalizedStatus(o?.status) === "active");
  const pastOrders = allOrders.filter(o => getNormalizedStatus(o?.status) !== "active");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>{t("Order_History") || "Order History"}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{t("Order_History_Subtitle") || "Manage and track your recent and past purchases."}</Typography>
      </Box>

      {activeOrders.length > 0 && (
        <Stack spacing={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{t("Active_Orders") || "Active Orders"}</Typography>
            <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", px: 1, py: 0.2, borderRadius: 10, fontSize: 12, fontWeight: 700 }}>{activeOrders.length}</Box>
          </Box>
          <Divider />
          
          <Box sx={{ display: { xs: "none", sm: "grid" }, gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr", gap: 2, px: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Order_Num") || "Order #"}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Date") || "Date"}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Status") || "Status"}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Payment_Status") || "Payment Status"}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Total_Price") || "Total Price"}</Typography>
          </Box>

          <Stack spacing={1.5}>
            {activeOrders.map((order) => <OrderRow key={order?.id} order={order} />)}
          </Stack>
        </Stack>
      )}

      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{t("Past_Orders") || "Past Orders"}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">{t("Filter") || "Filter:"}</Typography>
            <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ borderRadius: 2, fontSize: 14 }}>
              <MenuItem value="all">{t("All_Time") || "All time"}</MenuItem>
              <MenuItem value="6months">{t("Last_6_Months") || "Last 6 months"}</MenuItem>
              <MenuItem value="30days">{t("Last_30_Days") || "Last 30 days"}</MenuItem>
            </Select>
          </Box>
        </Box>
        <Divider />

        {pastOrders.length > 0 ? (
          <>
            <Box sx={{ display: { xs: "none", sm: "grid" }, gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr", gap: 2, px: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Order_Num") || "Order #"}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Date") || "Date"}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Status") || "Status"}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Payment_Status") || "Payment Status"}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>{t("Total_Price") || "Total Price"}</Typography>
            </Box>

            <Stack spacing={1.5}>
              {pastOrders.map((order) => (
                <OrderRow key={order?.id} order={order} />
              ))}
            </Stack>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>{t("No_Past_Orders") || "No past orders found."}</Typography>
        )}
      </Stack>
    </Box>
  );
}