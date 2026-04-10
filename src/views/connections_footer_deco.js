import { ViewPlugin } from '@codemirror/view';
import { StateEffect } from '@codemirror/state';

export const set_connections_footer_dom_effect = StateEffect.define();

/* ------------------------------------------------------------------ plugin */
export const connections_footer_plugin = ViewPlugin.fromClass(
  class {
    /* ------------------------------------------------------ lifecycle ---- */
    constructor(view) {
      this.view = view;
      this.connections_footer_frag = null;
      this.container_el = null;
    }

    destroy() {
      if (this.container_el?.isConnected) {
        this.container_el.remove();
      }
    }

    /* ----------------------------------------------------- view updates -- */
    update(update) {
      for (const tr of update.transactions) {
        for (const ef of tr.effects) {
          if (ef.is(set_connections_footer_dom_effect)) {
            if (ef.value === null) {
              if (this.container_el) this.container_el.style.display = 'none';
            } else {
              this.render_footer(ef.value);
            }
          }
        }
      }
    }

    render_footer(container = null) {
      if (container) {
        if (this.container_el && this.container_el !== container && this.container_el.isConnected) {
          this.container_el.remove();
        }
        this.connections_footer_frag = container;
        this.container_el = container;
        this.#ensure_dom_inserted();
      }
      if (!this.container_el) return;
      this.container_el.style.display = this.connections_footer_frag ? 'block' : 'none';
    }

    #ensure_dom_inserted() {
      if (!this.container_el || this.container_el.isConnected) return;
      const cm_container = this.view.dom.querySelector('.cm-contentContainer');
      cm_container?.parentNode?.insertBefore(
        this.container_el,
        cm_container.nextSibling
      );
    }
  }
);

export default connections_footer_plugin;
