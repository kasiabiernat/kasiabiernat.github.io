import type { Site, Socials, Page } from "@types";

export const SITE: Site = {
  NAME: "Kasia Biernat-Kluba",
  EMAIL: "k.biernat0@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_TALKS_ON_HOMEPAGE: 3,
};

export const PAGES: { [key: string]: Page } = {
  HOME: {
    TITLE: "home",
    HREF: "/",
    DESCRIPTION: "Personal homepage",
  },
  BLOG: {
    TITLE: "blog",
    HREF: "/blog",
    DESCRIPTION: "A collection of articles on topics I am passionate about",
  },
  NAME: {
    TITLE: "talks",
    HREF: "/talks",
    DESCRIPTION: "My talks and presentations.",
  },
};

// remove
export const WORK = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

// remove
export const PROJECTS = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://x.com/kathrine000",
  },
  {
    NAME: "github",
    HREF: "https://github.com/kathrine0",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/kbiernat/",
  },
];
