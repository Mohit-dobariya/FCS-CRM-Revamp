// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

// ==============================|| SAMPLE PAGE ||============================== //

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <MainCard title={`Dashboard Card - ${user?.name}`}>
      <Typography variant="body2">Welcome to FCS Staff</Typography>
    </MainCard>
  );
};

export default Dashboard;
