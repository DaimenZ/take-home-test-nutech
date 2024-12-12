import App from "./main";
import InformationRoute from "./routes/information.route";
import MembershipRoute from "./routes/membership.route";

const app = new App([new MembershipRoute(), new InformationRoute()]);

app.listen();
