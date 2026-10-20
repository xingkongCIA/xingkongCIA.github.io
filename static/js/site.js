(() => {
const root = document.documentElement;
try { const saved = localStorage.getItem('paper-theme'); if (saved === 'dark' || saved === 'light') root.dataset.theme = saved; } catch {}
document.getElementById('theme')?.addEventListener('click', () => {
const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = dark ? 'light' : 'dark';
try { localStorage.setItem('paper-theme', root.dataset.theme); } catch {}
});
const input = document.getElementById('query');
if (!input) return;
const status = document.getElementById('search-status'), results = document.getElementById('results');
let index;
async function search() {
const query = input.value.trim().toLocaleLowerCase(); results.replaceChildren();
if (!query) { status.textContent = '输入关键词开始搜索。'; return; }
try {
index ??= fetch(input.dataset.index).then(r => { if (!r.ok) throw Error(); return r.json(); }).catch(e => { index = undefined; throw e; });
const items = await index;
if (input.value.trim().toLocaleLowerCase() !== query) return;
const matches = items.filter(p => (p.title + ' ' + p.content).toLocaleLowerCase().includes(query)).slice(0, 50);
status.textContent = matches.length ? '找到 ' + matches.length + ' 篇文章（最多显示 50 篇）。' : '没有找到，换一个关键词试试。';
for (const item of matches) { const article = document.createElement('article'); article.className = 'card'; const heading = document.createElement('h2'), link = document.createElement('a'), text = document.createElement('p'); link.href = item.url; link.textContent = item.title; text.textContent = item.description; heading.append(link); article.append(heading, text); results.append(article); }
} catch { status.textContent = '暂时无法加载搜索索引，请稍后重试或查看归档。'; }
}
input.addEventListener('input', search);
})();
