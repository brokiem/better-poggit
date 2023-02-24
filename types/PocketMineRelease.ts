export default interface PocketMineRelease {
  php_version: string;
  base_version: string;
  build: number;
  is_dev: boolean;
  channel: string;
  git_commit: string;
  mcpe_version: string;
  date: number;
  details_url: string;
  download_url: string;
  source_url: string;
  build_log_url: string;
}
