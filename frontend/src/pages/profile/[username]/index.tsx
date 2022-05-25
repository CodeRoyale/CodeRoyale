import { ProfilePage } from '../../../modules/profile/ProfilePage';
import { withApollo } from '../../../utils/withApollo';

export default withApollo({ ssr: true })(ProfilePage);
