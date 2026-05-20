declare module 'react-force-graph-2d' {
  import { ComponentType } from 'react'

  interface ForceGraphProps {
    graphData: Record<string, unknown>
    nodeLabel?: string
    nodeColor?: (node: unknown) => string
    nodeRelSize?: number
    nodeCanvasObject?: (node: unknown, ctx: CanvasRenderingContext2D, globalScale: number) => void
    linkWidth?: number
    linkColor?: (link: unknown) => string
    backgroundColor?: string
    onNodeClick?: (node: unknown) => void
    width?: number
    height?: number
  }

  const ForceGraph2D: ComponentType<ForceGraphProps>
  export default ForceGraph2D
}
