import { PluginBase } from './helpers'

// The actual plugin class
export default class MaximiseActivePanePlugin extends PluginBase {

  // perform any setup required to enable the plugin
  enable() {
    super.enable();
  }

  // perform any required disable steps, leave nothing behind
  disable() {
    super.disable();

    // remove the maximised class if necessary
    this.rootSplit.containerEl.toggleClass('maximised', false);
  }

  // add in the required command pallete commands
  addCommands() {
    // add the maximise command
    this.addCommand({
      id: 'maximise-active-pane',
      name: 'Toggle',
      hotkeys: [{modifiers: ['Mod', 'Shift'], key: 'x'}],
      callback: () => {
        // simply toggle the 'maximised' class and let the css do its thing
        this.rootSplit.containerEl.toggleClass('maximised', !this.rootSplit.containerEl.hasClass('maximised'));
        if (this.app.workspace.activeLeaf) {
          let i = this.app.workspace.activeLeaf.containerEl.parentNode;
          for (; i != this.rootSplit.containerEl ; i = i.parentNode) {
          i.toggleClass('maximisedparentsplit', !i.hasClass('maximisedparentsplit'));
          };
        };
        this.app.workspace.onLayoutChange();
      }
    });
  }
}
