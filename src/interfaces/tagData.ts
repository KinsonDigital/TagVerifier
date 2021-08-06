import {tagObjData} from "./tagObj";

/**
 * Represents data for a single tab.
 */
export interface TagData {
	ref: string,
	node_id: string,
	url: string,
	object: tagObjData
}
