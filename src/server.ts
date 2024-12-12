import App from "./main";
import MembershipRoute from "./routes/membership.route";

const app = new App([new MembershipRoute()]);

app.listen();
