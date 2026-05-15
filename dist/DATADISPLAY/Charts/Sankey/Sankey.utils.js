import { SANKEY_ROOT_CLASS } from "./Sankey.constants";
import { buildChartRootClasses } from "../_base/utils";
function buildSankeyClasses(className, unstyled) {
  return buildChartRootClasses(SANKEY_ROOT_CLASS, className, unstyled);
}
function computeSankeyLayout(data, width, height, nodeWidth, nodePadding) {
  const linksRaw = data.links.filter((l) => (l.value ?? 0) > 0);
  const outgoing = /* @__PURE__ */ new Map();
  const incoming = /* @__PURE__ */ new Map();
  const nodeIds = /* @__PURE__ */ new Set();
  for (const n of data.nodes) nodeIds.add(n.id);
  for (const l of linksRaw) {
    nodeIds.add(l.source);
    nodeIds.add(l.target);
    if (!outgoing.has(l.source)) outgoing.set(l.source, []);
    outgoing.get(l.source).push({ target: l.target, value: l.value });
    if (!incoming.has(l.target)) incoming.set(l.target, []);
    incoming.get(l.target).push({ source: l.source, value: l.value });
  }
  const layerMap = /* @__PURE__ */ new Map();
  const visited = /* @__PURE__ */ new Set();
  function assignLayer(id) {
    if (layerMap.has(id)) return layerMap.get(id);
    if (visited.has(id)) return 0;
    visited.add(id);
    const inc = incoming.get(id) ?? [];
    const layer = inc.length === 0 ? 0 : Math.max(...inc.map((l) => assignLayer(l.source) + 1));
    layerMap.set(id, layer);
    return layer;
  }
  for (const id of nodeIds) assignLayer(id);
  const maxLayer = Math.max(0, ...layerMap.values());
  const layerWidth = maxLayer > 0 ? (width - nodeWidth) / maxLayer : 0;
  const layers = Array.from({ length: maxLayer + 1 }, () => []);
  for (const [id, layer] of layerMap) layers[layer].push(id);
  const nodeValueMap = /* @__PURE__ */ new Map();
  for (const id of nodeIds) {
    const outVal = (outgoing.get(id) ?? []).reduce((s, l) => s + l.value, 0);
    const inVal = (incoming.get(id) ?? []).reduce((s, l) => s + l.value, 0);
    nodeValueMap.set(id, Math.max(outVal, inVal));
  }
  const nodeMap = /* @__PURE__ */ new Map();
  const nodeLabel = /* @__PURE__ */ new Map();
  for (const n of data.nodes) nodeLabel.set(n.id, n.label ?? n.id);
  for (let li = 0; li <= maxLayer; li++) {
    const ids = layers[li];
    const totalValue = ids.reduce((s, id) => s + nodeValueMap.get(id), 0);
    const totalPadding = (ids.length - 1) * nodePadding;
    const availableHeight = Math.max(height - totalPadding, 10);
    const scale = totalValue > 0 ? availableHeight / totalValue : 1;
    let y = 0;
    for (const id of ids) {
      const val = nodeValueMap.get(id);
      const h = Math.max(val * scale, 2);
      const x0 = li * layerWidth;
      nodeMap.set(id, {
        id,
        label: nodeLabel.get(id) ?? id,
        group: data.nodes.find((n) => n.id === id)?.group,
        x0,
        x1: x0 + nodeWidth,
        y0: y,
        y1: y + h,
        value: val,
        layer: li
      });
      y += h + nodePadding;
    }
  }
  const sourceOffsets = /* @__PURE__ */ new Map();
  const targetOffsets = /* @__PURE__ */ new Map();
  const layoutLinks = linksRaw.map((l) => {
    const sNode = nodeMap.get(l.source);
    const tNode = nodeMap.get(l.target);
    const sH = sNode.y1 - sNode.y0;
    const tH = tNode.y1 - tNode.y0;
    const sTotal = nodeValueMap.get(l.source);
    const tTotal = nodeValueMap.get(l.target);
    const linkSHeight = sTotal > 0 ? l.value / sTotal * sH : 0;
    const linkTHeight = tTotal > 0 ? l.value / tTotal * tH : 0;
    const sOff = sourceOffsets.get(l.source) ?? 0;
    const tOff = targetOffsets.get(l.target) ?? 0;
    const sy0 = sNode.y0 + sOff;
    const sy1 = sy0 + linkSHeight;
    const ty0 = tNode.y0 + tOff;
    const ty1 = ty0 + linkTHeight;
    sourceOffsets.set(l.source, sOff + linkSHeight);
    targetOffsets.set(l.target, tOff + linkTHeight);
    return { ...l, sy0, sy1, ty0, ty1, width: Math.max(linkSHeight, 1) };
  });
  return { nodes: [...nodeMap.values()], links: layoutLinks };
}
function buildLinkPath(sx, sy0, sy1, tx, ty0, ty1) {
  const midX = (sx + tx) / 2;
  return [
    `M${sx},${sy0}`,
    `C${midX},${sy0} ${midX},${ty0} ${tx},${ty0}`,
    `L${tx},${ty1}`,
    `C${midX},${ty1} ${midX},${sy1} ${sx},${sy1}`,
    "Z"
  ].join(" ");
}
function buildTooltipContent(node) {
  const label = node.label ?? node.id;
  return node.value != null ? `${label}: ${node.value.toLocaleString()}` : label;
}
export {
  buildLinkPath,
  buildSankeyClasses,
  buildTooltipContent,
  computeSankeyLayout
};
//# sourceMappingURL=Sankey.utils.js.map
