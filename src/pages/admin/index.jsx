// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

// ==============================|| SAMPLE PAGE ||============================== //

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <MainCard title={`Dashboard Card - ${user?.name}`}>
      <Typography variant="body2">Welcome to FCS Admin</Typography>
    </MainCard>
  );
};

export default AdminDashboard;
