import {commitData} from "./commitData";

/**
 * Represents data for a single tag.
 */
export interface TagData {
	name: string,
	commit: commitData,
}
