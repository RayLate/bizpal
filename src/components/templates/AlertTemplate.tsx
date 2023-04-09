import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Fade } from '@mui/material';
interface AlertProps {
  severity?: 'success' | 'info' | 'warning' | 'error';
  title: string;
  body: string;
  showAlert: boolean;
  onClose: () => void;
}

const AlertTemplate = ({
  severity = 'success',
  title,
  body,
  showAlert,
  onClose,
}: AlertProps) => {
  return (
    <Fade in={showAlert}>
      <Alert
        severity={severity}
        onClose={onClose}
        sx={{
          position: 'absolute',
          zIndex: 9999,
          width: '100%',
          height: 'auto',
          borderRadius: 0,
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {body}
      </Alert>
    </Fade>
  );
};

export default AlertTemplate;
