import { useState } from "react";
import { Box, Button, Card, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePasswordSchema } from "../../validation/updatePasswordSchema";
import { useTranslation } from "react-i18next";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import toast from "react-hot-toast";
import useUpdatePassword from "../../hooks/useUpdatePassword";

export default function UpdatePassword() {
  const { t } = useTranslation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = async (data) => {
  try {
    await updatePassword({
      CurrentPassword: data.currentPassword,
      NewPassword: data.newPassword,
      ConfirmNewPassword: data.confirmNewPassword,
    });
    reset();
    toast.success(t("Password_Updated_Successfully"));
  } catch (error) {
    toast.error(error?.response?.data?.message || t("Password_Update_Failed"));
  }
};

  const getAdornment = (showState, setShowState, labelShow, labelHide) => (
    <InputAdornment position="end">
      <IconButton onClick={() => setShowState((prev) => !prev)} edge="end" size="small" aria-label={showState ? labelHide : labelShow}>
        {showState ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", p: { xs: 3, sm: 4 } }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        {t("Update_Password")}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2.5, maxWidth: 420 }}>
        <TextField {...register("currentPassword")} type={showCurrentPassword ? "text" : "password"} label={t("Current_Password")} fullWidth error={!!errors.currentPassword} helperText={errors.currentPassword?.message ? t(errors.currentPassword.message) : ""} slotProps={{ input: { endAdornment: getAdornment(showCurrentPassword, setShowCurrentPassword, t("Show_Password"), t("Hide_Password")) } }} />
        <TextField {...register("newPassword")} type={showNewPassword ? "text" : "password"} label={t("New_Password")} fullWidth error={!!errors.newPassword} helperText={errors.newPassword?.message ? t(errors.newPassword.message) : ""} slotProps={{ input: { endAdornment: getAdornment(showNewPassword, setShowNewPassword, t("Show_Password"), t("Hide_Password")) } }} />
        <TextField {...register("confirmNewPassword")} type={showConfirmPassword ? "text" : "password"} label={t("Confirm_New_Password")} fullWidth error={!!errors.confirmNewPassword} helperText={errors.confirmNewPassword?.message ? t(errors.confirmNewPassword.message) : ""} slotProps={{ input: { endAdornment: getAdornment(showConfirmPassword, setShowConfirmPassword, t("Show_Password"), t("Hide_Password")) } }} />
        <Stack direction="row" spacing={1.5} sx={{ mt: 0.5 }}>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? t("Updating") : t("save")}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}