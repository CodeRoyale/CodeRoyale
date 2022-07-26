import { HomePage } from "../modules/home/HomePage";
import { withApollo } from "../utils/withApollo";

export default withApollo({ ssr: false })(HomePage);
