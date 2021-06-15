import Home from "../views/home";
import Details from "../views/details";

const router = async (currency, interval) => {
  const routes = [
    { path: "/", view: Home },
    { path: "/details", view: Details },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // if no match redirect to home screen
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  const view = new match.route.view(currency, interval);
  document.querySelector("#app").innerHTML = await view.getHtml();
  await view.getData();
};

export default router;
