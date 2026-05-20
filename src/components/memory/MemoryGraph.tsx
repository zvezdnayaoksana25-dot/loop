import { useMemo, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { Memory } from '../../types';
import { DOMAIN_COLORS } from '../../utils/constants';

interface MemoryGraphProps {
  memories: Memory[];
}

interface GraphNode {
  id: number;
  name: string;
  val: number;
  color: string;
  domain: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: number;
  target: number;
}

export function MemoryGraph({ memories }: MemoryGraphProps) {
  const [highlightNode, setHighlightNode] = useState<number | null>(null);

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = memories
      .filter((m) => m.id != null)
      .map((m) => ({
        id: m.id!,
        name: m.title.slice(0, 20),
        val: m.importance,
        color: DOMAIN_COLORS[m.domain] || DOMAIN_COLORS.general,
        domain: m.domain,
      }));

    const links: GraphLink[] = [];
    const processed = new Set<string>();

    memories.forEach((m) => {
      if (!m.id) return;
      m.relatedIds.forEach((rid) => {
        if (!rid) return;
        const key = [Math.min(m.id!, rid), Math.max(m.id!, rid)].join('-');
        if (!processed.has(key) && memories.some((x) => x.id === rid)) {
          processed.add(key);
          links.push({ source: m.id!, target: rid });
        }
      });
    });

    return { nodes, links };
  }, [memories]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setHighlightNode(node.id);
  }, []);

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    setHighlightNode(node?.id ?? null);
  }, []);

  if (graphData.nodes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🔗</div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No connections yet</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            The graph will appear as memories connect to each other.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ForceGraph2D
        graphData={graphData}
        backgroundColor="#0F172A"
        nodeLabel="name"
        nodeColor="color"
        nodeRelSize={3}
        linkWidth={1}
        linkColor={() => 'rgba(148, 163, 184, 0.15)'}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const n = node as GraphNode;
          const label = n.name;
          const fontSize = 12 / globalScale;
          const radius = n.val * 0.8;

          ctx.beginPath();
          ctx.arc(n.x!, n.y!, radius, 0, 2 * Math.PI);
          ctx.fillStyle = highlightNode === n.id ? n.color : n.color + 'CC';
          ctx.fill();

          if (highlightNode === n.id) {
            ctx.beginPath();
            ctx.arc(n.x!, n.y!, radius + 2, 0, 2 * Math.PI);
            ctx.strokeStyle = n.color;
            ctx.lineWidth = 1 / globalScale;
            ctx.stroke();
          }

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = highlightNode === n.id ? '#F1F5F9' : '#94A3B8';
          ctx.fillText(label, n.x!, n.y! + radius + fontSize);
        }}
      />
    </div>
  );
}
