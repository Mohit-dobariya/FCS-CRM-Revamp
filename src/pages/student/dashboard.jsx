// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

// ==============================|| SAMPLE PAGE ||============================== //

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <MainCard title={`Student Dashboard`}>
      <Typography variant="body2">Welcome to First 4 Counselling - Student</Typography>
    </MainCard>
  );
};

export default Dashboard;
