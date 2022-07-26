import { SettingsPage } from "../modules/settings/SettingsPage";
import { withApollo } from "../utils/withApollo";

export default withApollo({ ssr: false })(SettingsPage);
