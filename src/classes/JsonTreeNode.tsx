import { ReactNode } from 'react'
import { toPath } from '../utils/pathUtils'

export class JsonTreeNode {
    depth: number
    pathPrefix: string
    selectSelf: () => void
    key?: string
    value?: string
    children?: JsonTreeNode[]
    nodeType?: 'object' | 'array' | 'value'
    isLastChild?: boolean

    constructor(
        depth: number,
        pathPrefix: string,
        setSelectedNode: (treeNode: JsonTreeNode) => void,
        key?: string,
        value?: any,
        isLastChild?: boolean
    ) {
        this.depth = depth
        this.pathPrefix = pathPrefix
        this.key = key
        this.selectSelf = () => setSelectedNode(this)
        this.isLastChild = isLastChild
        if (Array.isArray(value)) {
            this.nodeType = 'array'
            this.children = parseArrayChildren(this, value, setSelectedNode)
        } else if (typeof value === 'object') {
            this.nodeType = 'object'
            this.children = parseObjectChildren(this, value, setSelectedNode)
        } else if (typeof value === 'boolean' || typeof value === 'number') {
            this.nodeType = 'value'
            this.value = `${value}`
        } else {
            this.nodeType = 'value'
            this.value = `'${value}'`
        }
    }

    getIndenting(): string {
        return `${20 * this.depth}px`
    }

    getNonTrailingComma(): string {
        return this.isLastChild ? '' : ','
    }

    render(): ReactNode {
        if (this.nodeType === 'object') {
            return <ObjectNode objectNode={this} />
        } else if (this.nodeType === 'array') {
            return <ArrayNode arrayNode={this} />
        } else if (!!this.key && !!this.value) {
            return <KeyValueNode keyValueNode={this} />
        } else {
            return <ValueNode valueNode={this} />
        }
    }
}

const parseArrayChildren = (
    parent: JsonTreeNode,
    value: Array<any>,
    setSelectedNode: (treeNode: JsonTreeNode) => void
) => {
    return value.map(
        (childValue, index) =>
            new JsonTreeNode(
                parent.depth + 1,
                `${toPath(parent.pathPrefix, parent.key)}[${index}]`,
                setSelectedNode,
                undefined,
                childValue,
                index === value.length - 1
            )
    )
}

const parseObjectChildren = (
    parent: JsonTreeNode,
    value: object,
    setSelectedNode: (treeNode: JsonTreeNode) => void
) => {
    const entries = Object.entries(value)
    return entries.map(
        ([childKey, childValue], index) =>
            new JsonTreeNode(
                parent.depth + 1,
                toPath(parent.pathPrefix, parent.key),
                setSelectedNode,
                childKey,
                childValue,
                index === entries.length - 1
            )
    )
}

function ObjectNode({ objectNode }: { objectNode: JsonTreeNode }) {
    return (
        <>
            <p
                className="monospace no-margin"
                style={{ textIndent: objectNode.getIndenting() }}
            >
                {objectNode.key ? `${objectNode.key}: ` : ''}
                {'{'}
            </p>
            {objectNode.children?.map((child) => child.render())}
            <p
                className="monospace no-margin"
                style={{ textIndent: objectNode.getIndenting() }}
            >
                {'}'}
                {objectNode.getNonTrailingComma()}
            </p>
        </>
    )
}

function ArrayNode({ arrayNode }: { arrayNode: JsonTreeNode }) {
    return (
        <>
            <p
                className="monospace no-margin"
                style={{ textIndent: arrayNode.getIndenting() }}
            >
                {arrayNode.key ? `${arrayNode.key}: ` : ''}
                {'['}
            </p>

            {arrayNode.children?.map((child) => child.render())}
            <p
                className="monospace no-margin"
                style={{ textIndent: arrayNode.getIndenting() }}
            >
                {']'}
                {arrayNode.getNonTrailingComma()}
            </p>
        </>
    )
}

function KeyValueNode({ keyValueNode }: { keyValueNode: JsonTreeNode }) {
    return (
        <p
            className="monospace no-margin"
            style={{
                textIndent: keyValueNode.getIndenting(),
            }}
            onClick={keyValueNode.selectSelf}
        >
            <span className="clickable-text">{keyValueNode.key}</span>
            :&nbsp;<span>{keyValueNode.value}</span>
            {keyValueNode.getNonTrailingComma()}
        </p>
    )
}

function ValueNode({ valueNode }: { valueNode: JsonTreeNode }) {
    return (
        <p
            className="monospace no-margin"
            style={{ textIndent: valueNode.getIndenting() }}
        >
            <span>{valueNode.value}</span>
            {valueNode.getNonTrailingComma()}
        </p>
    )
}
