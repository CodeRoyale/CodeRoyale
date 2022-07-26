import { DashboardPage } from "../modules/dashboard/DashboardPage";
import { withApollo } from "../utils/withApollo";

export default withApollo({ ssr: false })(DashboardPage);
