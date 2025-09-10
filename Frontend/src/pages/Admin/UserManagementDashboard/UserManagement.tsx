import React, { useEffect, useState, FC } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { getUsers, UserData } from "src/api/getUsers";
import { useTranslation } from "react-i18next";

const UserManagement: FC = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // pagination params
  const start = 0;
  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getUsers(start, limit);
        setUsers(res.data);
      } catch (err) {
        setError(t("Failed to fetch users"));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [start, limit, t]);

  return (
    <Stack gap={2}>
      <Typography variant="h4">{t("User Management")}</Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && users.length === 0 && (
        <Typography>{t("No users found")}</Typography>
      )}

      {!loading && !error && users.length > 0 && (
        <Stack gap={1}>
          {users.map((user) => (
            <Box
              key={user.id}
              sx={{
                padding: 1,
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">{user.username}</Typography>
              {user.email && (
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default UserManagement;
