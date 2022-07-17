import { withSSRGuest } from '$utils/withSSRGuest';
import { LoginTemplate } from '$templates/LoginTemplate';

export default function Login() {
  return <LoginTemplate />;
}

export const getServerSideProps = withSSRGuest();
