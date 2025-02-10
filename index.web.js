import { AppRegistry } from "react-native";
import App from "./src/Web";
import { name as appName } from './app.json';

function setTheme () {
  const html = document.getElementsByTagName("html")[0];
  html.setAttribute("data-bs-theme", "dark");
}

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById("root")
});

setTheme();