"""公开内容基本检查；不替代人工隐私审核。Python 3.11+。"""
from pathlib import Path
import sys, tomllib
root = Path(__file__).resolve().parents[1]
issues = []
for path in (root / "content").rglob("*"):
    if path.is_symlink():
        issues.append(f"{path.relative_to(root)}: 不允许符号链接")
    if path.suffix == ".md":
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---\n") or "\n---\n" not in text[4:]:
            issues.append(f"{path.relative_to(root)}: 缺少 YAML front matter")
            continue
        front = text.split("---", 2)[1]
        # 仅接受独立一行的明确公开声明，避免误匹配正文。
        import re
        if not re.search(r"^public: true\s*$", front, re.M):
            issues.append(f"{path.relative_to(root)}: 缺少 public: true；请确认内容可公开")
for name in ("private", "journal", "backups", ".env"):
    if (root / name).exists():
        issues.append(f"禁止在公开仓库内保留 {name}")
tomllib.loads((root / "hugo.toml").read_text(encoding="utf-8"))
if issues:
    print("\n".join(issues))
    sys.exit(1)
print("基础检查通过；仍需人工确认正文、附件、图片元数据和 Git 历史。")
