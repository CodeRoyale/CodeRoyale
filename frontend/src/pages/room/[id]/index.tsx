import { RoomPage } from '../../../modules/room/RoomPage';
import { withApollo } from '../../../utils/withApollo';

export default withApollo({ ssr: false })(RoomPage);
