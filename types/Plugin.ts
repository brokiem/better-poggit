export default interface Plugin {
  id: number;
  name: string;
  version: string;
  html_url: string;
  tagline: string;
  artifact_url: string;
  downloads: number;
  score: number;
  repo_id: number;
  repo_name: string;
  project_id: number;
  project_name: string;
  build_id: number;
  build_number: number;
  build_commit: string;
  description_url: string;
  icon_url: string;
  changelog_url: string;
  license: string;
  license_url: string | null;
  is_obsolete: boolean;
  is_pre_release: boolean;
  is_outdated: boolean;
  is_official: boolean;
  submission_date: number;
  state: number;
  last_state_change_date: number;
  categories: {
    major: boolean;
    category_name: string;
  }[];
  keywords: string[];
  api: {
    from: string;
    to: string;
  }[];
  deps: any[];
  producers: {
    "Collaborator": string[];
    "Contributor": string[];
    "Maintainer": string[];
  }[];
  state_name: string;
}
