import React from "react";
import { View } from "react-native";
import Tabs from "./components/Tabs";
import Locale from "./locale";
import LocaleType from "./locale/locale.type";

class App extends React.Component {
  state = {
    translation: null,
  };

  async componentDidMount() {
    const locale = new Locale("pt-br");
    const text: LocaleType = await locale.getTranslation();
    this.setState({ translation: text });
  }

  render() {
    const { translation } = this.state;

    if (translation === null) {
      return <View></View>;
    }

    return (
      <View>
        <Tabs translation={translation}></Tabs>
      </View>
    );
  }
}

export default App;
