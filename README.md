# 業務効率化 CLI ツール

私（**niroe5tar64**）の業務効率化 CLI ツールです。日々の業務改善アイデアを片っ端から実装し、集約させることを目的としています。

## 概要

このプロジェクトは、業務を効率化するための様々な CLI ツールをまとめたものです。

現在は以下のツールが実装されています。

### git-diff-files

事前に設定ファイルで指定した GitHub リポジトリ・ブランチに対する差分ファイルの一覧を取得するシェルスクリプトです。（[詳細](./src/git-diff-files/README.md)）

## 前提条件

- [Bun](https://bun.sh/) がインストールされていること
- [Biome](https://biome.dev/) を使用していること

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/niroe5tar64/niroreal-cli.git

# ディレクトリに移動
cd niroreal-cli

# 依存関係をインストール
bun install
```

## 開発者向け情報

### コードの整形と静的解析

Biome を使用してコードの整形と静的解析を行っています。

```bash
# 静的解析
bun run lint

# コードの整形
bun run format

# 静的解析 & コードの整形
bun run check
```

## ライセンス

このプロジェクトは [MIT ライセンス](https://opensource.org/licenses/mit-license.php) の下で公開されています。
