import { useEffect, useState } from 'react'
import { JsonTreeNode } from './classes/JsonTreeNode'
import { toNodeRecord } from './utils/nodeUtils'
import { toPath } from './utils/pathUtils'

interface JsonExplorerProps {
    json: string
}

export default function JsonExplorer({ json }: JsonExplorerProps) {
    const [rootNode, setRootNode] = useState<JsonTreeNode>()
    const [selectedNode, setSelectedNode] = useState<JsonTreeNode>()
    const [nodeRecord, setNodeRecord] = useState<Record<string, JsonTreeNode>>()
    const [searchPath, setSearchPath] = useState<string>('')

    const handleSetSelectedNode = (treeNode: JsonTreeNode) => {
        setSelectedNode(treeNode)
        setSearchPath(toPath(treeNode.pathPrefix, treeNode.key))
    }

    useEffect(() => {
        let jsonObject = {};
        try {
            jsonObject = JSON.parse(json);
        } catch(error) {
            jsonObject = {errorMessage: 'Invalid JSON provided. Please try again :)'}
        }
        const objectTree = new JsonTreeNode(
            0,
            '',
            handleSetSelectedNode,
            undefined,
            jsonObject,
            true
        )
        setRootNode(objectTree)
        setNodeRecord(toNodeRecord(objectTree))
    }, [])

    const handleSearch = (searchValue: string) => {
        if (nodeRecord) {
            const matchingNode = nodeRecord[searchValue]
            console.log(matchingNode)
            if (matchingNode) {
                setSelectedNode(matchingNode)
            } else {
                setSelectedNode(undefined)
            }
        }
        setSearchPath(searchValue)
    }

    return (
        <div className="container">
            <input
                className="text-box monospace"
                style={{
                    border: '1px solid #bbb',
                }}
                value={searchPath}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <p className="monospace no-margin color-darkgray">
                {selectedNode?.value
                    ? selectedNode.value
                    : selectedNode?.nodeType
                      ? selectedNode.nodeType
                      : 'undefined'}
            </p>
            <p
                className="no-margin color-darkgray"
                style={{ marginTop: '20px' }}
            >
                Response
            </p>
            <div
                className="text-box"
                style={{
                    boxShadow: '0 3px 10px #00000033',
                }}
            >
                {rootNode ? rootNode.render() : null}
            </div>
        </div>
    )
}
