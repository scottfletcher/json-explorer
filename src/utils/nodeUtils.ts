import { JsonTreeNode } from '../classes/JsonTreeNode'
import { toPath } from './pathUtils'

export const toNodeRecord = (
    rootNode: JsonTreeNode
): Record<string, JsonTreeNode> => {
    const addNodeToRecord = (
        record: Record<string, JsonTreeNode>,
        treeNode: JsonTreeNode
    ) => {
        const path = toPath(treeNode.pathPrefix, treeNode.key)
        record[path] = treeNode
        treeNode.children?.forEach((child) => addNodeToRecord(record, child))
    }
    const record: Record<string, JsonTreeNode> = {}
    addNodeToRecord(record, rootNode)
    return record
}
