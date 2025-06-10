// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

// ==============================|| SAMPLE PAGE ||============================== //

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <MainCard title={`Staff Dashboard`}>
      <Typography variant="body2">Welcome to First 4 Counselling - Staff</Typography>
    </MainCard>
  );
};

export default Dashboard;
