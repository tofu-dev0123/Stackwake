# Stackwake — Claude 向けプロジェクトコンテキスト

## これは何か

ポリレポ構成の Web アプリを、**1 つの設定ファイル（`stackwake.yml`）と 1 コマンド（`swk`）で
開発環境として一斉に立ち上げる**言語非依存な CLI ツール。

- **パッケージ名**: `stackwake` / **コマンド名**: `swk`（二階建て構成）
- **タグライン**: "Wake your whole stack with one command."
- **差別化**: 単なる複数プロセス実行ツール（Overmind 等）ではなく、Git リポジトリ前提の機能
  （未 clone の自動 clone・一括 pull・横断 status）を持つ「ポリレポ特化の Procfile 的ツール」。

## 学習ゴール（重要）

本プロジェクトの主目的は、**CLI ツールを OSS として npm 公開するまでの一連のフロー**
（ドキュメント設計・配布導線・CI/CD・バージョニング・リリース・運用）を学ぶこと。
言語習得や機能の豊富さが目的ではない。設計判断は [ADR](./docs/adr) に記録する。

## コマンド（MVP）

- `swk up` … 未 clone なら自動 clone → 各リポの起動コマンドを子プロセスで起動 →
  リポ名プレフィックス・色分けで出力集約 → `Ctrl+C` で一括停止
- `swk status` … 全リポのブランチ / 差分有無 / ahead-behind を一覧
- `swk pull` … 全リポを一括 `git pull`

## 技術スタック

- **言語**: TypeScript（ESM, `NodeNext`）→ `tsup` で `dist/` にバンドル
- **CLI**: commander
- **予定（実装時に追加）**: simple-git（Git 操作）/ execa（子プロセス）/ js-yaml（設定）/ chalk（色分け）
- **品質**: Biome（Lint + Format を 1 ツールで）
- **Node**: `>=20`（`.nvmrc` は 22）

## ディレクトリ構成

```
bin/swk.js      # 薄いランチャ（dist/index.js を import）
src/index.ts    # commander エントリ（サブコマンド定義）
dist/           # ビルド成果物（gitignore）
docs/adr/       # 設計決定記録（ADR）
```

## 開発コマンド

```bash
npm run build      # tsup で src/ -> dist/
npm run typecheck  # tsc --noEmit
npm run lint       # biome check .
npm run lint:fix   # biome check --write .
npm run format     # biome format --write .
```

## 運用方針

- **ブランチ戦略**: GitHub Flow（`main` トランク + 短命な `feat/`・`fix/`・`docs/`・`chore/` ブランチ + PR）
- **コミット規約**: Conventional Commits
- **リリース**: `main` にタグ `vX.Y.Z` → CI で自動 `npm publish`（`--provenance`）
- コミットメッセージに `Co-Authored-By` や AI 生成フッターは付けない

### Trusted Publishing（OIDC）導入時の落とし穴

`v0.1.1` の初リリースで踏んだ3点。次に別の CLI を作るときの再発防止メモ：

1. **`setup-node` に `registry-url` を指定しない**。指定すると空トークンの `.npmrc`
   （`_authToken=` + `always-auth`）が生成され、トークン認証が強制されて OIDC に切り替わらず
   `E404` になる。Trusted Publishing では registry-url もトークンも不要。
2. **npm 側の Trusted Publisher 設定を完全一致で登録する**（repo 名の大文字小文字・
   workflow ファイル名は `release.yml`・Environment は空欄）。不一致だと `ENEEDAUTH`。
3. **`package.json` に `repository` を入れる**。無い（空文字）と provenance 検証で
   `E422`（`repository.url is ""`）になり公開できない。`homepage`・`bugs` も併せて入れておく。

## 現状 / 次のステップ

- 現状: プロジェクト基盤（TypeScript + Biome）・ドキュメント・CI/CD を整備済み。CI/CD は稼働し、
  `stackwake@0.1.1` を Trusted Publishing 経由（provenance 付き）で npm 公開済み。
  CLI はサブコマンドのスタブのみ（`not implemented yet` を返す）。
- 次: MVP 仕様の確定（`swk up` の挙動・設定探索・部分起動の要否）→ ADR 整備 → 実装。
- **未確定の設計は実装着手前に作者と詰めること。**
