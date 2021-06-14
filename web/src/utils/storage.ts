import { Store } from "../store/interface";
import { localStore } from "../store/local";

export const storage: Store = (window as any).backend?.store ?? localStore;