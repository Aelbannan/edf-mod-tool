import { WeaponTableFile, WeaponTextFile } from "@/lib/sgo/core";
import { FolderMetadata } from "./files";

export enum Languages {
	English 	= "EN",
	Japanese 	= "JA",
	Chinese 	= "CN",
	Korean 		= "KR",
}

export interface LanguageSpecificFiles {
	weaponText: WeaponTextFile
}
