import { useEffect, useState, useCallback } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import * as db from '../db'

const NODE_COLORS: Record<string, string> = {
  belief: '#a855f7',
  emotion: '#ef4444',
  event: '#3b82f6',
  pattern: '#f59e0b',
  trigger: '#f97316',
  progress: '#22c55e',
}

interface FGNode {
  id: string
  label: string
  type: string
  val: number
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number
  fy?: number
  index?: number
}

interface FGEdge {
  source: string
  target: string
  relation: string
}

export default function GraphView() {
  const [nodes, setNodes] = useState<FGNode[]>([])
  const [links, setLinks] = useState<FGEdge[]>([])
  const [selectedNode, setSelectedNode] = useState<FGNode | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGraph()
  }, [])

  async function loadGraph() {
    const data = await db.getGraph()
    const fgNodes: FGNode[] = data.nodes.map(n => ({
      id: n.id,
      label: n.label,
      type: n.type,
      val: n.val || 1,
    }))
    const fgLinks: FGEdge[] = data.edges.map(e => ({
      source: e.source,
      target: e.target,
      relation: e.relation,
    }))
    setNodes(fgNodes)
    setLinks(fgLinks)
    setLoading(false)
  }

  const handleNodeClick = useCallback((node: FGNode) => {
    setSelectedNode(node)
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Загрузка графа...</p>
      </div>
    )
  }

  if (nodes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--text-muted)] mb-2">Граф пуст</p>
          <p className="text-xs text-[var(--text-muted)]">
            Узлы появятся после извлечения фактов из сессий
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex">
      <div className="flex-1 relative">
        <ForceGraph2D
          graphData={{ nodes, links } as Record<string, unknown>}
          nodeLabel="label"
          nodeColor={(node: unknown) => NODE_COLORS[(node as FGNode).type] || '#737373'}
          nodeRelSize={4}
          linkWidth={1}
          linkColor={() => '#2a2a2a'}
          backgroundColor="#0a0a0a"
          onNodeClick={(node: unknown) => handleNodeClick(node as FGNode)}
          nodeCanvasObject={(node: unknown, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const n = node as FGNode
            const label = n.label
            const fontSize = 12 / globalScale
            const color = NODE_COLORS[n.type] || '#737373'

            ctx.beginPath()
            ctx.arc(n.x!, n.y!, 4, 0, 2 * Math.PI)
            ctx.fillStyle = color
            ctx.fill()

            if (globalScale > 0.5) {
              ctx.font = `${fontSize}px sans-serif`
              ctx.fillStyle = color
              ctx.fillText(label, n.x! + 8, n.y! + 4)
            }
          }}
        />

        <div className="absolute top-4 left-4 bg-[var(--bg-secondary)]/90 backdrop-blur rounded-lg p-3 text-xs space-y-1">
          {Object.entries(NODE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[var(--text-muted)]">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedNode && (
        <div className="w-80 border-l border-[var(--border)] p-4 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-sm">{selectedNode.label}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-[var(--text-muted)]">Тип:</span>
              <span
                className="ml-2 text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: `${NODE_COLORS[selectedNode.type]}20`,
                  color: NODE_COLORS[selectedNode.type],
                }}
              >
                {selectedNode.type}
              </span>
            </div>
            <div>
              <span className="text-xs text-[var(--text-muted)]">Связи:</span>
              <div className="mt-1 space-y-1">
                {links
                  .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                  .map((edge, i) => {
                    const otherId = edge.source === selectedNode.id ? edge.target : edge.source
                    const other = nodes.find(n => n.id === otherId)
                    return (
                      <button
                        key={i}
                        onClick={() => other && setSelectedNode(other)}
                        className="w-full text-left bg-[var(--bg-tertiary)] rounded px-3 py-2 text-xs hover:bg-[var(--border)] transition-colors"
                      >
                        <span className="text-[var(--text-muted)]">{edge.relation}</span>
                        <span className="ml-1">→ {other?.label || otherId}</span>
                      </button>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
