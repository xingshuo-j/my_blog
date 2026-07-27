/**
 * 内容工具函数：frontmatter 日期解析与排序
 */

/**
 * 解析 frontmatter 中的日期值，返回时间戳（毫秒）。
 * 兼容写法："2026-07-10"、"2026-07-10 21:15"、ISO 字符串、Date 对象。
 * 注意：Safari 无法解析空格分隔的日期（"YYYY-MM-DD HH:mm"），
 * 因此归一化时将空格替换为 "T"。解析失败返回 0（排到最后）。
 */
export function parseDate(value: unknown): number {
  if (value == null) return 0;
  if (value instanceof Date) return value.getTime();
  const s = String(value).trim().replace(' ', 'T');
  const t = new Date(s).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/**
 * 按 frontmatter.date 倒序排序（新文章在前）。
 * 原地排序并返回原数组。
 */
export function sortByDateDesc<T extends { frontmatter?: { date?: unknown } }>(
  entries: T[]
): T[] {
  return entries.sort(
    (a, b) => parseDate(b.frontmatter?.date) - parseDate(a.frontmatter?.date)
  );
}
