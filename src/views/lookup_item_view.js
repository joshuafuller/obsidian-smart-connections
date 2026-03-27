// TEMP during transition to Lookup as standalone plugin
import { LookupItemView } from 'smart-lookup-obsidian/src/views/lookup_item_view.js';
export class ConnectionsLookupItemView extends LookupItemView {
  static get view_type() { return 'smart-lookup-view-connections'; }
}

