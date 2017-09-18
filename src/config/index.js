import autobind from 'auto-bind';

export class Config {
  constructor() {
    autobind(this);

    this.webUrl = "http://<this_host>:3000";
    this.apiUrl = "http://<this_host>:14400";

    this.towercg = {
      logPackets: false
    };

    this.plugins = [];
  }

  registerPlugin(pluginClass, pluginConfig = {}) {
    pluginConfig.tabName = pluginConfig.tabName || "General";

    if (this.plugins.some((e) => e.pluginClass === pluginClass)) {
      throw new Error(`Duplicate plugin registration: ${pluginClass}`);
    }

    this.plugins.push({ pluginClass, pluginConfig });

    return this;
  }

  finalize() {
    this.webUrlOriginal = this.webUrl;
    this.apiUrlOriginal = this.apiUrl;

    this.webUrl = this.webUrl.replace("<this_host>", window.location.hostname);
    this.apiUrl = this.apiUrl.replace("<this_host>", window.location.hostname);

    this.finalized = true;
  }
}
