import React from 'react';
import YAML from 'yaml';
import LocaleType from '../../locale/locale.type';

interface TabsProps {
  translation: LocaleType;
};

class Tabs extends React.Component<TabsProps> {
  translation: LocaleType;
  constructor(props: any) {
    super(props);
    this.translation = props.translation;
  }

  createButton(tabName: string, index: number) {
    return <button
      key={index}
      className={`nav-link ${index === 0 ? "active" : ""}`}
      id={`nav-${tabName}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${tabName}`}
      type="button"
      role="tab"
      aria-controls={`nav-${tabName}`}
      aria-selected={index === 0 ? "true" : "false"}>
      {tabName}
    </button>;
  }

  createDiv(tabName: string, index: number) {
    return <div
      key={index}
      className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
      id={`nav-${tabName}`}
      role="tabpanel"
      aria-labelledby={`nav-${tabName}-tab`}
      tabIndex={0}>
      {tabName} content
    </div>;
  }

  createTabs(tabs: string[]) {
    return tabs.map((tabName, index) => this.createButton(tabName, index));
  }

  createDivs(tabs: string[]) {
    return tabs.map((tabName, index) => this.createDiv(tabName, index));
  }

  getTabsNames(): string[] {
    return Object.values(this.translation.tabs.names);
  }

  render() {
    const tabNames = this.getTabsNames();
    return (
      <div>
        <nav className="nav nav-tabs" id="nav-tab" role="tablist">
          {this.createTabs(tabNames)}
        </nav>
        <div className="tab-content" id="nav-tabContent">
          {this.createDivs(tabNames)}
        </div>
      </div>
    );
  }
}

export default Tabs;