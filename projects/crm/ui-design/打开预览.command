#!/bin/zsh
set -eu
crm_preview_root="$(cd "$(dirname "$0")/.." && pwd)"
crm_preview_port=8768
printf 'CRM 交互设计预览：http://127.0.0.1:%s/ui-design/\n按 Ctrl C 停止。\n' "$crm_preview_port"
python3 -m http.server "$crm_preview_port" --bind 127.0.0.1 --directory "$crm_preview_root" &
crm_preview_pid=$!
trap 'kill "$crm_preview_pid" 2>/dev/null || true' EXIT INT TERM
sleep 0.6
if kill -0 "$crm_preview_pid" 2>/dev/null; then
  open "http://127.0.0.1:$crm_preview_port/ui-design/"
  wait "$crm_preview_pid"
else
  printf '预览服务未启动，请检查端口是否已占用。\n'
  exit 1
fi
