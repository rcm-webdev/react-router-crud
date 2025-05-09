import { type RouteConfig, index, route } from "@react-router/dev/routes";

//use the route function to create new routes
//index function only for the main page

export default [
  index("routes/tickets.tsx"),
  route("new", "routes/newTicket.tsx"),
  route("tickets/:id", "routes/ticket.tsx"),
] satisfies RouteConfig;
