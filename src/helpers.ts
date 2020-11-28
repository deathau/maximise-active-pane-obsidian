import './styles.scss'
import { Plugin, WorkspaceSplit } from 'obsidian';

// interface for extending WorkspaceSplit with undocumented properties
export interface WorkspaceSplitExt extends WorkspaceSplit {
  // the container element of a leaf
  containerEl: HTMLElement;
}

export abstract class PluginBase extends Plugin {

  // get the class name for the plugin
  private _cachedClassName: string;
  get className() {
    if (!this._cachedClassName) {
      this._cachedClassName = 'plugin-' + this.manifest.id;
      if (this._cachedClassName.endsWith('-obsidian')) {
        this._cachedClassName = this._cachedClassName.substring(0, this._cachedClassName.lastIndexOf('-obsidian'));
      }
    }

    return this._cachedClassName;
  }

  // helper property to get the rootSplit with some extra properties
  get rootSplit() { return this.app.workspace.rootSplit as WorkspaceSplitExt; }

  // is this deprecated now, or what?
  async onInit() {
  }

  // runs when the plugin is loaded
  onload() {
    // add in the required command pallete commands
    this.addCommands();

    // add in any settings
    this.addSettings();

    // wait for layout to be ready to perform the rest
    this.app.workspace.layoutReady ? this.enable() : this.app.workspace.on('layout-ready', () => this.enable());
  }

  // runs when the plugin is onloaded
  onunload() {
    // run through the disable steps
    this.disable();
  }
  
   // perform any setup required to enable the plugin
  enable(): void {
    document.body.toggleClass(this.className, true);
  }

  // perform any required disable steps, leave nothing behind
  disable(): void {
    document.body.toggleClass(this.className, false);
  }

  // add in any required command pallete commands
  addCommands(): void { };

  // add in any settings
  addSettings(): void { };
}
