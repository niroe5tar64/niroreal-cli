# 概要

事前に設定ファイルで指定した GitHub リポジトリ・ブランチに対する差分ファイルを一覧取得するシェルスクリプトです。

# 使い方

## 設定ファイルの準備

1. 設定ファイル`config/repo-branch-settings.<configEnvKey>.json`を作成する。（`<configEnvKey>`には任意の英数字を指定）
1. [repo-branch-settings.sample.json](./config/repo-branch-settings.sample.json)を参考に
   実行対象としたいリポジトリとブランチの指定を行う。
   (TODO: 設定用の GUI ツールを別途作成する)
1. 以下のコマンドを実行して差分ファイルの一覧を取得します。

   ```bash
   # デフォルト設定ファイル(repo-branch-settings.default.json)で実行する場合
   bin/git-diff-file

   # 任意の設定ファイル(repo-branch-settings.<configEnvKey>.json)で実行する場合
   bin/git-diff-file -e <configEnvKey>
   bin/git-diff-file --configEnv <configEnvKey>

   # 指定したレポジトリに対してのみ操作を行う場合
   bin/git-diff-file -r <repositoryName>
   bin/git-diff-file -repository <repositoryName>
   ```
