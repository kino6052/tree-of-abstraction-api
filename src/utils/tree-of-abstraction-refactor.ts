
interface Hierarchy {
    name: String,
    id: String,
    noteIds: Array<String>,
}

interface ChildrenJSON {
    children: Array<HierarchyChildrenJSON>
}

interface ChildrenIds {
    children: Array<String>
}

interface DFSCallback {
    (input: HierarchyChildrenIds): void 
}

type HierarchyChildrenJSON = Hierarchy & ChildrenJSON;
type HierarchyChildrenIds = Hierarchy & ChildrenIds;

export const dfs = (json:  HierarchyChildrenJSON, callback: DFSCallback) => {
    let name: String = json.name;
    let id: String = json.id;
    let noteIds: Array<String> = json.noteIds;
    let children: Array<HierarchyChildrenJSON> = json.children;

    if (children.length > 0) {
        let childrenIds: Array<String> = [];
        json.children.forEach(
            (child: HierarchyChildrenJSON) => {
                childrenIds.push(child.id);
                dfs(child, callback);
            }
        );
        callback({ name, id, noteIds, children: childrenIds });
    } else {
        callback({ name, id, noteIds, children: [] });
    }
};