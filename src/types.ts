export type Site = {
  NAME: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_TALKS_ON_HOMEPAGE: number;
};

export type Page = {
  TITLE: string;
  HREF: string;
  DESCRIPTION: string;
}

export type Socials = {
  NAME: string;
  HREF: string;
}[];
